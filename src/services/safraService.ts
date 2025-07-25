import { Safra } from '../types/safra';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

class SafraService {
  async getAll(): Promise<Safra[]> {
    const response = await fetch(`${API_URL}/safras`);
    if (!response.ok) {
      throw new Error('Erro ao buscar safras');
    }
    return response.json();
  }

  async getByPropriedade(propriedadeRuralId: string): Promise<Safra[]> {
    const response = await fetch(
      `${API_URL}/safras?propriedadeRuralId=${propriedadeRuralId}`
    );
    if (!response.ok) {
      throw new Error('Erro ao buscar safras da propriedade');
    }
    return response.json();
  }

  async getById(id: string): Promise<Safra> {
    const response = await fetch(`${API_URL}/safras/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar safra');
    }
    return response.json();
  }

  async create(
    data: Omit<Safra, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Safra> {
    const now = new Date();
    const safra: Omit<Safra, 'id'> = {
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    const response = await fetch(`${API_URL}/safras`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(safra),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar safra');
    }

    return response.json();
  }

  async update(
    id: string,
    data: Partial<Omit<Safra, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Safra> {
    const response = await fetch(`${API_URL}/safras/${id}`, {
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
      throw new Error('Erro ao atualizar safra');
    }

    return response.json();
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/safras/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar safra');
    }
  }
}

export const safraService = new SafraService();
