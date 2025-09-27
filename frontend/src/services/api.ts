import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { FeatureFlag, CreateFlagRequest, UpdateFlagRequest, FlagResponse } from '@/types/flag';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    console.log('🔧 ApiService constructor called');
    console.log('🔧 Environment variables:', {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NODE_ENV: process.env.NODE_ENV
    });
    
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    console.log('🔧 Base URL:', baseURL);
    
    try {
      this.api = axios.create({
        baseURL,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('✅ Axios instance created successfully');
    } catch (error) {
      console.error('❌ Error creating axios instance:', error);
      throw error;
    }

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
    console.log('🔧 getAllFlags called');
    console.log('🔧 this.api exists:', !!this.api);
    console.log('🔧 this.api type:', typeof this.api);
    
    if (!this.api) {
      console.error('❌ this.api is undefined!');
      console.trace('Stack trace:');
      throw new Error('API instance is not initialized');
    }
    
    try {
      console.log('🔧 Making request to:', this.api.defaults.baseURL + '/admin/flags');
      const response: AxiosResponse<FlagResponse[]> = await this.api.get('/admin/flags');
      console.log('✅ getAllFlags response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ getAllFlags error:', error);
      console.trace('Stack trace:');
      throw error;
    }
  }

  async getFlagById(id: number): Promise<FeatureFlag> {
    const response: AxiosResponse<FlagResponse> = await this.api.get(`/admin/flags/${id}`);
    return response.data;
  }

  async createFlag(flag: CreateFlagRequest): Promise<FeatureFlag> {
    const response: AxiosResponse<FlagResponse> = await this.api.post('/admin/flags', flag);
    return response.data;
  }

  async updateFlag(id: number, flag: UpdateFlagRequest): Promise<FeatureFlag> {
    const response: AxiosResponse<FlagResponse> = await this.api.put(`/admin/flags/${id}`, flag);
    return response.data;
  }

  async deleteFlag(id: number): Promise<void> {
    await this.api.delete(`/admin/flags/${id}`);
  }

  async toggleFlag(id: number, enabled: boolean): Promise<FeatureFlag> {
    const response: AxiosResponse<FlagResponse> = await this.api.patch(`/admin/flags/${id}`);
    return response.data;
  }
}

console.log('🔧 Creating apiService instance...');
let apiService: ApiService;

try {
  apiService = new ApiService();
  console.log('✅ apiService created successfully:', apiService);
} catch (error) {
  console.error('❌ Error creating apiService:', error);
  console.trace('Stack trace:');
  throw error;
}

export { apiService };
