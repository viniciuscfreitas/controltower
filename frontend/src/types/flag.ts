export interface FeatureFlag {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFlagRequest {
  name: string;
  description: string;
}

export interface UpdateFlagRequest {
  name?: string;
  description?: string;
  enabled?: boolean;
}

export interface FlagResponse {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
