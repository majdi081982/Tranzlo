import { Client, Databases, Storage, Account, ID } from "appwrite";

function createClient() {
  const client = new Client()
    .setEndpoint(
      process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "https://appwrite.tranzlo.net/v1",
    )
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "69cd26bd000709d10282");

  if (process.env.APPWRITE_API_KEY) {
    const privilegedClient = client as Client & {
      setKey?: (value: string) => Client;
    };
    privilegedClient.setKey?.(process.env.APPWRITE_API_KEY);
  }

  return client;
}

export function getAppwriteServices() {
  const client = createClient();
  return {
    client,
    account: new Account(client),
    databases: new Databases(client),
    storage: new Storage(client),
  };
}

export const appwriteIds = {
  databaseId: process.env.APPWRITE_DATABASE_ID ?? "tranzlo",
  cvBucketId: process.env.APPWRITE_CV_BUCKET_ID ?? "translator-cvs",
  attachmentsBucketId: process.env.APPWRITE_ATTACHMENTS_BUCKET_ID ?? "job-attachments",
};

export { ID };
