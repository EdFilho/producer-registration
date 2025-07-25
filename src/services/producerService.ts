import { Producer, ProducerFormData } from '../types/producer';
import { apiClient, apiConfig } from './api';

export interface ProducerResponse {
  producers: Producer[];
  total: number;
  page: number;
  limit: number;
}

export const producerService = {
  async getAll(): Promise<Producer[]> {
    return apiClient.get<Producer[]>(apiConfig.endpoints.producers);
  },

  async getById(id: string): Promise<Producer> {
    return apiClient.get<Producer>(`${apiConfig.endpoints.producers}/${id}`);
  },

  async create(producerData: ProducerFormData): Promise<Producer> {
    const producer: Omit<Producer, 'id' | 'createdAt' | 'updatedAt'> = {
      cpfCnpj: producerData.cpfCnpj,
      nomeProdutor: producerData.nomeProdutor,
    };

    const newProducer = {
      ...producer,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return apiClient.post<Producer>(apiConfig.endpoints.producers, newProducer);
  },

  async update(id: string, producerData: ProducerFormData): Promise<Producer> {
    const producer = {
      cpfCnpj: producerData.cpfCnpj,
      nomeProdutor: producerData.nomeProdutor,
      updatedAt: new Date(),
    };

    return apiClient.put<Producer>(
      `${apiConfig.endpoints.producers}/${id}`,
      producer
    );
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete(`${apiConfig.endpoints.producers}/${id}`);
  },

  async search(
    params: {
      page?: number;
      limit?: number;
      search?: string;
    } = {}
  ): Promise<Producer[]> {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.append('_page', params.page.toString());
    if (params.limit) searchParams.append('_limit', params.limit.toString());
    if (params.search) searchParams.append('q', params.search);

    const query = searchParams.toString();
    const endpoint = query
      ? `${apiConfig.endpoints.producers}?${query}`
      : apiConfig.endpoints.producers;

    return apiClient.get<Producer[]>(endpoint);
  },
};
