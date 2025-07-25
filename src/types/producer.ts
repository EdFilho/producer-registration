export interface Safra {
  id: string;
  ano: number;
  nome: string; // ex: "Safra 2021"
}

export interface Cultura {
  id: string;
  nome: string; // ex: "Soja", "Milho", "Café"
  safraId: string;
}

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

// Tipos para formulários
export interface ProducerFormData {
  cpfCnpj: string;
  nomeProdutor: string;
  nomeFazenda: string;
  cidade: string;
  estado: string;
  areaTotalHectares: string; // String no form para validação
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

// Estados brasileiros
export const ESTADOS_BRASILEIROS = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

// Culturas comuns
export const CULTURAS_COMUNS = [
  'Soja',
  'Milho',
  'Café',
  'Cana-de-açúcar',
  'Algodão',
  'Arroz',
  'Feijão',
  'Trigo',
  'Girassol',
  'Sorgo',
  'Amendoim',
  'Mandioca',
];
