import { IPassenger } from '@/interfaces/order';
import mongoose, { Schema, model, Model } from 'mongoose';

const passengerSchema = new Schema<IPassenger>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  id: { type: String, required: true },
  origen: { type: String, required: true },
  destino: { type: String, required: true },
  fecha: { type: String, required: true },
  precio: { type: Number, required: true },
  total: { type: Number, required: true },
  horarioSeleccionado: { type: String, required: true },
  inpuesto: { type: String, required: true },
  pasajeros: { type: Number, required: true },
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: { type: String },
  transactionId: { type: String },
}, {
  timestamps: true,
});

const Passenger: Model<IPassenger> = mongoose.models.Passenger || model<IPassenger>('Passenger', passengerSchema);

export default Passenger;
