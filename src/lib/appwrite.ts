import { Client, Account, Databases, Storage, ID } from 'appwrite';

const client = new Client()
    .setEndpoint('http://tranzlo-appwrite-23c51b-187-124-35-158.traefik.me/v1')
    .setProject('69b15c35000068046427');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database and Collection IDs
export const DATABASE_ID = '69b15c880036f57c2909'; 
export const COLLECTION_JOBS = '67d018d00010c79f38e0'; // Note: Ensure this collection exists in the new DB
export const COLLECTION_PROFILES = 'profiles';

export { client, ID };