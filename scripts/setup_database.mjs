import { Client, Databases, ID } from 'node-appwrite';

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;

if (!endpoint || !projectId || !apiKey) {
    console.error("❌ Missing required Appwrite environment variables in .env.local");
    process.exit(1);
}

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

const databases = new Databases(client);

async function setupDatabase() {
  try {
    console.log("🚀 Initializing Tranzlo Database on Appwrite...");
    
    // 1. Create Main Database
    const db = await databases.create(ID.unique(), 'Tranzlo_Main_DB');
    console.log(`✅ Database created! ID: ${db.$id}`);

    // Wait slightly to ensure propagation
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 2. Create Profiles Collection
    console.log("⏳ Creating Profiles Collection...");
    const profiles = await databases.createCollection(db.$id, ID.unique(), 'Profiles');
    console.log(`✅ Profiles Collection created! ID: ${profiles.$id}`);
    
    // Profiles Attributes
    await databases.createStringAttribute(db.$id, profiles.$id, 'role', 50, true); // company or translator
    await databases.createStringAttribute(db.$id, profiles.$id, 'fullName', 255, true);
    await databases.createStringAttribute(db.$id, profiles.$id, 'companyName', 255, false);

    // Wait slightly due to rate limiting / processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 3. Create Jobs Collection
    console.log("⏳ Creating Jobs Collection...");
    const jobs = await databases.createCollection(db.$id, ID.unique(), 'Jobs');
    console.log(`✅ Jobs Collection created! ID: ${jobs.$id}`);
    
    // Jobs Attributes
    await databases.createStringAttribute(db.$id, jobs.$id, 'companyId', 50, true);
    await databases.createStringAttribute(db.$id, jobs.$id, 'title', 255, true);
    await databases.createStringAttribute(db.$id, jobs.$id, 'description', 5000, true);
    await databases.createStringAttribute(db.$id, jobs.$id, 'targetLanguage', 100, true);
    await databases.createIntegerAttribute(db.$id, jobs.$id, 'budget', true);
    
    console.log("\n=======================================================");
    console.log("🎉 SCHEMA CREATED SUCCESSFULLY!");
    console.log("🚨 COPY AND PASTE THESE 3 LINES INTO YOUR .env.local:");
    console.log("=======================================================");
    console.log(`NEXT_PUBLIC_APPWRITE_DATABASE_ID="${db.$id}"`);
    console.log(`NEXT_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID="${profiles.$id}"`);
    console.log(`NEXT_PUBLIC_APPWRITE_JOBS_COLLECTION_ID="${jobs.$id}"`);
    console.log("=======================================================\n");

  } catch (err) {
    console.error("❌ Error setting up database:", err.message);
  }
}

setupDatabase();
