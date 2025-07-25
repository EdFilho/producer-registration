import { Cultura } from '../types/cultura';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

class CulturaService {
  async getAll(): Promise<Cultura[]> {
    const response = await fetch(`${API_URL}/culturas`);
    if (!response.ok) {
      throw new Error('Erro ao buscar culturas');
    }
    return response.json();
  }

  async getByPropriedade(propriedadeRuralId: string): Promise<Cultura[]> {
    const response = await fetch(
      `${API_URL}/culturas?propriedadeRuralId=${propriedadeRuralId}`
    );
    if (!response.ok) {
      throw new Error('Erro ao buscar culturas da propriedade');
    }
    return response.json();
  }

  async getBySafra(safraId: string): Promise<Cultura[]> {
    const response = await fetch(`${API_URL}/culturas?safraId=${safraId}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar culturas da safra');
    }
    return response.json();
  }

  async getById(id: string): Promise<Cultura> {
    const response = await fetch(`${API_URL}/culturas/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar cultura');
    }
    return response.json();
  }

  async create(
    data: Omit<Cultura, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Cultura> {
    const now = new Date();
    const cultura: Omit<Cultura, 'id'> = {
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    const response = await fetch(`${API_URL}/culturas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cultura),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar cultura');
    }

    return response.json();
  }

  async update(
    id: string,
    data: Partial<Omit<Cultura, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Cultura> {
    const response = await fetch(`${API_URL}/culturas/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        updatedAt: new Date(),
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar cultura');
    }

    return response.json();
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/culturas/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar cultura');
    }
  }
}

export const culturaService = new CulturaService();
