import { Client, Account, Databases } from 'appwrite';

const client = new Client();

// You will need to replace these with your actual Appwrite project details
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('YOUR_PROJECT_ID'); // Your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export { client };