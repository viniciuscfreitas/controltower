import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { FeatureFlag, CreateFlagRequest, UpdateFlagRequest, FlagResponse } from '@/types/flag';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 segundos timeout
    });

    // Interceptor para adicionar autenticação básica
    this.api.interceptors.request.use((config) => {
      const auth = localStorage.getItem('auth');
      if (auth) {
        const { username, password } = JSON.parse(auth);
        config.auth = {
          username,
          password,
        };
      }
      return config;
    });

    // Interceptor para tratar erros de autenticação
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Feature Flags endpoints
  async getAllFlags(): Promise<FeatureFlag[]> {
    if (!this.api) {
      throw new Error('API instance is not initialized');
    }
    
    try {
      const response: AxiosResponse<FlagResponse[]> = await this.api.get('/admin/flags');
      
      // Map backend isActive to frontend enabled
      return response.data.map(flag => ({
        ...flag,
        enabled: flag.isActive
      }));
    } catch (error) {
      throw error;
    }
  }

  async getFlagById(id: number): Promise<FeatureFlag> {
    const response: AxiosResponse<FlagResponse> = await this.api.get(`/admin/flags/${id}`);
    return {
      ...response.data,
      enabled: response.data.isActive
    };
  }

  async createFlag(flag: CreateFlagRequest): Promise<FeatureFlag> {
    const response: AxiosResponse<FlagResponse> = await this.api.post('/admin/flags', flag);
    return {
      ...response.data,
      enabled: response.data.isActive
    };
  }

  async updateFlag(id: number, flag: UpdateFlagRequest): Promise<FeatureFlag> {
    const response: AxiosResponse<FlagResponse> = await this.api.put(`/admin/flags/${id}`, flag);
    return {
      ...response.data,
      enabled: response.data.isActive
    };
  }

  async deleteFlag(id: number): Promise<void> {
    await this.api.delete(`/admin/flags/${id}`);
  }

  async toggleFlag(id: number): Promise<FeatureFlag> {
    const response: AxiosResponse<FlagResponse> = await this.api.patch(`/admin/flags/${id}`);
    return {
      ...response.data,
      enabled: response.data.isActive
    };
  }

  // Public endpoint to get active flag names (for feature flag checking)
  async getActiveFlags(): Promise<string[]> {
    const response: AxiosResponse<string[]> = await this.api.get('/api/v1/flags/active');
    return response.data;
  }
}

let apiService: ApiService;

try {
  apiService = new ApiService();
} catch (error) {
  throw error;
}

export { apiService };
