import { IUser } from './user';

export interface IPassenger {
  user: IUser | string;
  id: string;
  origen: string;
  destino: string;
  fecha: string;
  precio: number;
  total: number;
  horarioSeleccionado: string;
  inpuesto: string;
  pasajeros: number;
  isPaid: boolean;
  paidAt?: string;
  transactionId?: string;
  createdAt?: string;
  updatedAt?: string;
}
