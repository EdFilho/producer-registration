import { Producer, ProducerFormData } from '../types/producer';
import { apiClient, apiConfig } from './api';

export interface ProducerResponse {
  producers: Producer[];
  total: number;
  page: number;
  limit: number;
}

export const producerService = {
  /**
   * Busca todos os produtores
   */
  async getAll(): Promise<Producer[]> {
    return apiClient.get<Producer[]>(apiConfig.endpoints.producers);
  },

  /**
   * Busca um produtor por ID
   */
  async getById(id: string): Promise<Producer> {
    return apiClient.get<Producer>(`${apiConfig.endpoints.producers}/${id}`);
  },

  /**
   * Cria um novo produtor
   */
  async create(producerData: ProducerFormData): Promise<Producer> {
    const producer: Omit<Producer, 'id' | 'createdAt' | 'updatedAt'> = {
      cpfCnpj: producerData.cpfCnpj,
      nomeProdutor: producerData.nomeProdutor,
      nomeFazenda: producerData.nomeFazenda,
      cidade: producerData.cidade,
      estado: producerData.estado,
      areaTotalHectares: parseFloat(producerData.areaTotalHectares),
      areaAgricultavelHectares: parseFloat(
        producerData.areaAgricultavelHectares
      ),
      areaVegetacaoHectares: parseFloat(producerData.areaVegetacaoHectares),
      safras: producerData.safras.map((safra) => ({
        id: Date.now().toString() + Math.random(),
        ano: parseInt(safra.ano),
        nome: safra.nome,
      })),
      culturas: producerData.culturas.map((cultura) => ({
        id: Date.now().toString() + Math.random(),
        nome: cultura.nome,
        safraId: cultura.safraAno,
      })),
    };

    const newProducer = {
      ...producer,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return apiClient.post<Producer>(apiConfig.endpoints.producers, newProducer);
  },

  /**
   * Atualiza um produtor existente
   */
  async update(id: string, producerData: ProducerFormData): Promise<Producer> {
    const producer: Omit<Producer, 'id' | 'createdAt'> = {
      cpfCnpj: producerData.cpfCnpj,
      nomeProdutor: producerData.nomeProdutor,
      nomeFazenda: producerData.nomeFazenda,
      cidade: producerData.cidade,
      estado: producerData.estado,
      areaTotalHectares: parseFloat(producerData.areaTotalHectares),
      areaAgricultavelHectares: parseFloat(
        producerData.areaAgricultavelHectares
      ),
      areaVegetacaoHectares: parseFloat(producerData.areaVegetacaoHectares),
      safras: producerData.safras.map((safra) => ({
        id: Date.now().toString() + Math.random(),
        ano: parseInt(safra.ano),
        nome: safra.nome,
      })),
      culturas: producerData.culturas.map((cultura) => ({
        id: Date.now().toString() + Math.random(),
        nome: cultura.nome,
        safraId: cultura.safraAno,
      })),
      updatedAt: new Date(),
    };

    return apiClient.put<Producer>(
      `${apiConfig.endpoints.producers}/${id}`,
      producer
    );
  },

  /**
   * Remove um produtor
   */
  async delete(id: string): Promise<void> {
    return apiClient.delete(`${apiConfig.endpoints.producers}/${id}`);
  },

  /**
   * Busca produtores com paginação e filtros
   */
  async search(
    params: {
      page?: number;
      limit?: number;
      search?: string;
      estado?: string;
    } = {}
  ): Promise<Producer[]> {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.append('_page', params.page.toString());
    if (params.limit) searchParams.append('_limit', params.limit.toString());
    if (params.search) searchParams.append('q', params.search);
    if (params.estado) searchParams.append('estado', params.estado);

    const query = searchParams.toString();
    const endpoint = query
      ? `${apiConfig.endpoints.producers}?${query}`
      : apiConfig.endpoints.producers;

    return apiClient.get<Producer[]>(endpoint);
  },
};
