import { Client, Account, Databases, Storage } from "appwrite";

let client: Client | null = null;

export function getBrowserAppwrite() {
  if (!client) {
    client = new Client()
      .setEndpoint(
        process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "https://appwrite.tranzlo.net/v1",
      )
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "69cd26bd000709d10282");
  }

  return {
    client,
    account: new Account(client),
    databases: new Databases(client),
    storage: new Storage(client),
  };
}
