import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.development.local');
}

const uri = process.env.MONGODB_URI;

const options: MongoClientOptions = {
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    minPoolSize: 2,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// eslint-disable-next-line no-var
declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export async function connectToDatabase() {
    try {
        const client = await clientPromise;
        const db = client.db('users');
        return { client, db };
    } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Unable to connect to the database. Please try again later.');
    }
}

