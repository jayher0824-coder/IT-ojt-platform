const mongoose = require('mongoose');
require('dotenv').config();

// Local MongoDB connection
const localUri = 'mongodb://localhost:27017/it-ojt-platform';

// Atlas MongoDB connection (from .env)
const atlasUri = process.env.MONGODB_URI;

async function migrateData() {
  try {
    console.log('🔄 Starting data migration...\n');

    // Connect to local MongoDB
    console.log('📦 Connecting to local MongoDB...');
    const localConnection = await mongoose.createConnection(localUri).asPromise();
    console.log('✅ Connected to local MongoDB\n');

    // Connect to Atlas MongoDB
    console.log('☁️  Connecting to MongoDB Atlas...');
    const atlasConnection = await mongoose.createConnection(atlasUri).asPromise();
    console.log('✅ Connected to MongoDB Atlas\n');

    // Get all collections from local database
    const localDb = localConnection.db;
    const collections = await localDb.listCollections().toArray();
    console.log(`📋 Found ${collections.length} collections to migrate:\n`);

    // Migrate each collection
    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      console.log(`   Migrating: ${collectionName}...`);

      try {
        // Get data from local collection
        const localCollection = localDb.collection(collectionName);
        const documents = await localCollection.find({}).toArray();

        if (documents.length === 0) {
          console.log(`   ⚠️  ${collectionName} is empty, skipping.`);
          continue;
        }

        // Drop existing collection in Atlas (if exists) to avoid duplicates
        const atlasDb = atlasConnection.db;
        try {
          await atlasDb.collection(collectionName).drop();
        } catch (err) {
          // Collection might not exist, that's ok
        }

        // Insert data into Atlas collection
        const atlasCollection = atlasDb.collection(collectionName);
        await atlasCollection.insertMany(documents);

        console.log(`   ✅ Migrated ${documents.length} documents from ${collectionName}`);
      } catch (err) {
        console.error(`   ❌ Error migrating ${collectionName}:`, err.message);
      }
    }

    console.log('\n🎉 Migration completed successfully!');
    console.log('\n📊 Summary:');
    
    // Show summary of migrated data
    const atlasDb = atlasConnection.db;
    const atlasDatabaseStats = await atlasDb.stats();
    console.log(`   Total collections: ${collections.length}`);
    console.log(`   Total size: ${(atlasDatabaseStats.dataSize / 1024 / 1024).toFixed(2)} MB`);

    // Close connections
    await localConnection.close();
    await atlasConnection.close();
    
    console.log('\n✅ All done! Your data is now in MongoDB Atlas.');
    console.log('   You can now deploy your application with confidence!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run migration
migrateData();
