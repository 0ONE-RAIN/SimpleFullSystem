export interface AddressResponseDTO {
  calle: string;
  ciudad: string;
  pais: string;
  codigo_postal: string;
}

export interface UserResponseDTO {
  id: string;
  nombre: string;
  email: string;
  edad?: number;
  fecha_creacion?: string;
  direcciones: AddressResponseDTO[];
}
