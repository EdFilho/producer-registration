export interface Producer {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpfCnpj: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  crops: string[];
}

export interface ProducerFormData {
  name: string;
  email: string;
  phone: string;
  cpfCnpj: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: string;
  arableArea: string;
  vegetationArea: string;
  crops: string[];
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
