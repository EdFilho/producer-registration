import {
  PropriedadeRural,
  PropriedadeRuralFormData,
} from '../types/propriedadeRural';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

class PropriedadeRuralService {
  async getAll(): Promise<PropriedadeRural[]> {
    const response = await fetch(`${API_URL}/propriedades-rurais`);
    if (!response.ok) {
      throw new Error('Erro ao buscar propriedades rurais');
    }
    return response.json();
  }

  async getByProdutor(produtorId: string): Promise<PropriedadeRural[]> {
    const response = await fetch(
      `${API_URL}/propriedades-rurais?produtorId=${produtorId}`
    );
    if (!response.ok) {
      throw new Error('Erro ao buscar propriedades rurais do produtor');
    }
    return response.json();
  }

  async getById(id: string): Promise<PropriedadeRural> {
    const response = await fetch(`${API_URL}/propriedades-rurais/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar propriedade rural');
    }
    return response.json();
  }

  async create(
    data: PropriedadeRuralFormData & { produtorId: string }
  ): Promise<PropriedadeRural> {
    const now = new Date();
    const propriedadeRural: Omit<PropriedadeRural, 'id'> = {
      produtorId: data.produtorId,
      nomeFazenda: data.nomeFazenda,
      cidade: data.cidade,
      estado: data.estado,
      areaTotalHectares: Number(data.areaTotalHectares),
      areaAgricultavelHectares: Number(data.areaAgricultavelHectares),
      areaVegetacaoHectares: Number(data.areaVegetacaoHectares),
      createdAt: now,
      updatedAt: now,
    };

    const response = await fetch(`${API_URL}/propriedades-rurais`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propriedadeRural),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar propriedade rural');
    }

    return response.json();
  }

  async update(
    id: string,
    data: PropriedadeRuralFormData
  ): Promise<PropriedadeRural> {
    const response = await fetch(`${API_URL}/propriedades-rurais/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nomeFazenda: data.nomeFazenda,
        cidade: data.cidade,
        estado: data.estado,
        areaTotalHectares: Number(data.areaTotalHectares),
        areaAgricultavelHectares: Number(data.areaAgricultavelHectares),
        areaVegetacaoHectares: Number(data.areaVegetacaoHectares),
        updatedAt: new Date(),
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar propriedade rural');
    }

    return response.json();
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/propriedades-rurais/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar propriedade rural');
    }
  }
}

export const propriedadeRuralService = new PropriedadeRuralService();
