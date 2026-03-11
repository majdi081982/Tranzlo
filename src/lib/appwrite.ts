import { Client, Account, Databases, Storage, ID } from 'appwrite';

const client = new Client()
    .setEndpoint('http://appwrite.tranzlo.tech/v1')
    .setProject('67d018590013d368e734');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database and Collection IDs
export const DATABASE_ID = '67d018c10026e492b95b'; // Your DB ID
export const COLLECTION_JOBS = '67d018d00010c79f38e0'; // Your Jobs Collection ID
export const COLLECTION_PROFILES = 'profiles'; // Example Profiles Collection

export { client, ID };