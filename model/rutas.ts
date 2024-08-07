import mongoose, { Schema, Document } from 'mongoose';

interface Location {
  latitude: number;
  longitude: number;
}

interface Ruta extends Document {
  id: number;
  nombre: string;
  parada: string;
  mapa: string;
  precio: string;
  location: Location;
  horarios: string[];
}

const RutaSchema: Schema<Ruta> = new Schema({
  id: { type: Number, required: true },
  nombre: { type: String, required: true },
  parada: { type: String, required: true },
  mapa: { type: String, required: true },
  precio: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  horarios: { type: [String], required: true },
});

const RutaModel = mongoose.model<Ruta>('Ruta', RutaSchema);

export default RutaModel;
