export interface PropriedadeRural {
  id: string;
  produtorId: string;
  nomeFazenda: string;
  cidade: string;
  estado: string;
  areaTotalHectares: number;
  areaAgricultavelHectares: number;
  areaVegetacaoHectares: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropriedadeRuralFormData {
  nomeFazenda: string;
  cidade: string;
  estado: string;
  areaTotalHectares: string;
  areaAgricultavelHectares: string;
  areaVegetacaoHectares: string;
}
