import { Safra } from './safra';
import { Cultura } from './cultura';

export interface Producer {
  id: string;
  cpfCnpj: string;
  nomeProdutor: string;
  nomeFazenda: string;
  cidade: string;
  estado: string;
  areaTotalHectares: number;
  areaAgricultavelHectares: number;
  areaVegetacaoHectares: number;
  safras: Safra[];
  culturas: Cultura[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProducerFormData {
  cpfCnpj: string;
  nomeProdutor: string;
  nomeFazenda: string;
  cidade: string;
  estado: string;
  areaTotalHectares: string;
  areaAgricultavelHectares: string;
  areaVegetacaoHectares: string;
  safras: Array<{
    ano: string;
    nome: string;
  }>;
  culturas: Array<{
    nome: string;
    safraAno: string;
  }>;
}
