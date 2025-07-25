import { Safra } from './safra';
import { Cultura } from './cultura';
import { PropriedadeRuralFormData } from './propriedadeRural';

export interface Producer {
  id: string;
  cpfCnpj: string;
  nomeProdutor: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FazendaWithSafras {
  nomeFazenda: string;
  cidade: string;
  estado: string;
  areaTotalHectares: string;
  areaAgricultavelHectares: string;
  areaVegetacaoHectares: string;
  safras: Array<{
    ano: string;
    nome: string;
    culturasPlantadas: string[];
  }>;
}

export interface ProducerFormData {
  cpfCnpj: string;
  nomeProdutor: string;
  fazendas: FazendaWithSafras[];
}
