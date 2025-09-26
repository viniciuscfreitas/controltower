import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { FeatureFlag, CreateFlagRequest, UpdateFlagRequest, FlagResponse } from '@/types/flag';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
      headers: {
        'Content-Type': 'application/json',
      },
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
    const response: AxiosResponse<FlagResponse[]> = await this.api.get('/flags');
    return response.data;
  }

  async getFlagById(id: number): Promise<FeatureFlag> {
    const response: AxiosResponse<FlagResponse> = await this.api.get(`/flags/${id}`);
    return response.data;
  }

  async createFlag(flag: CreateFlagRequest): Promise<FeatureFlag> {
    const response: AxiosResponse<FlagResponse> = await this.api.post('/flags', flag);
    return response.data;
  }

  async updateFlag(id: number, flag: UpdateFlagRequest): Promise<FeatureFlag> {
    const response: AxiosResponse<FlagResponse> = await this.api.put(`/flags/${id}`, flag);
    return response.data;
  }

  async deleteFlag(id: number): Promise<void> {
    await this.api.delete(`/flags/${id}`);
  }

  async toggleFlag(id: number, enabled: boolean): Promise<FeatureFlag> {
    return this.updateFlag(id, { enabled });
  }
}

export const apiService = new ApiService();
