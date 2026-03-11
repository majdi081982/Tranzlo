import { Client, Account, Databases, Storage, ID } from 'appwrite';

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || 'http://tranzlo-appwrite-5f2c3f-187-124-35-158.traefik.me/v1')
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || '69b177380027537e37c5');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Note: These IDs might need to be updated to match your new Appwrite project structure
export const DATABASE_ID = '69b15c880036f57c2909'; 
export const COLLECTION_JOBS = '8nfhi86kwwlmgsgibk7k2jgtsm8shboq'; 
export const COLLECTION_PROFILES = 'profiles';

export { client, ID };