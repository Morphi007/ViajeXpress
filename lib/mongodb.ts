import { MongoClient } from 'mongodb';

// Usa la URL de conexión desde las variables de entorno
const uri = process.env.MONGO_URL!;
const client = new MongoClient(uri);

let clientPromise: Promise<MongoClient>;

// Configuración específica para desarrollo y producción
if (process.env.NODE_ENV === 'development') {
  // En desarrollo, usa un cliente global para evitar múltiples conexiones
  if (!(global as any)._mongoClientPromise) {
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // En producción, simplemente conecta
  clientPromise = client.connect();
}

export default clientPromise;
