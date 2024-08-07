import mongoose, { Schema, Document } from 'mongoose';

interface Passenger {
  Firstname: string;
  Lastname: string;
}

export interface IPurchase extends Document {
  idUser: string;
  idTrip: string;
  origen: string;
  destino: string;
  fecha: string;
  horario: string;
  pasajeros: Passenger[];
  precio: string;
  impuesto: string;
  total: string;
}

const PurchaseSchema: Schema = new Schema({
  idUser: { type: String, required: true },
  idTrip: { type: String, required: true },
  origen: { type: String, required: true },
  destino: { type: String, required: true },
  fecha: { type: String, required: true },
  horario: { type: String, required: true },
  pasajeros: [
    {
      Firstname: { type: String, required: true },
      Lastname: { type: String, required: true },
    },
  ],
  precio: { type: String, required: true },
  impuesto: { type: String, required: true },
  total: { type: String, required: true },
});

const Purchase = mongoose.models.Purchase || mongoose.model<IPurchase>('Purchase', PurchaseSchema);

export default Purchase;
