import { Client, Account, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('http://appwrite.tranzlo.tech/v1') // Your Appwrite Endpoint
    .setProject('67d018590013d368e734'); // Your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export { client };