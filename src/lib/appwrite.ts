import { Client, Account, Databases, Storage } from 'appwrite';

export const appwriteConfig = {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://appwrite.tranzlo.net/v1',
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'dummy_project_id',
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
    usersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || '',
    profilesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID || '',
    jobsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_JOBS_COLLECTION_ID || '',
};

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
