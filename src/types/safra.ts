export interface Safra {
  id: string;
  propriedadeRuralId: string;
  ano: number;
  nome: string;
  culturasPlantadas: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SafraFormData {
  ano: string;
  nome: string;
  culturasPlantadas: string[];
}

export interface CreateSafraData
  extends Omit<Safra, 'id' | 'createdAt' | 'updatedAt'> {
  propriedadeRuralId: string;
}
