require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const uri = process.env.DB_String;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function insertData(client) {
    // Make Sure collection is empty first
    await client.db("Eminem-sorter").collection("Songs").drop();
    
    songEntries = [
        { name: "Premonition" }, { name: "Unaccomodating" }, { name: "You Gon' Learn" },
        { name: "Those Kinda Nights" }, { name: "In Too Deep" }, { name: "Godzilla" },
        { name: "Darkness" }, { name: "Leaving Heaven" }, { name: "Yah Yah" },
        { name: "Stepdad" }, { name: "Marsh" }, { name: "Never Love Again" },
        { name: "Little Engine" }, { name: "Lock It Up" }, { name: "Farewell" },
        { name: "No Regrets" }, { name: "I Will" }, // Side A Ends
        { name: "Black Magic" }, { name: "Alfred's Theme" }, { name: "Tone Deaf" },
        { name: "Book of Rhymes" }, { name: "Favorite Bitch" }, { name: "Guns Blazing" }, 
        { name: "Gnat" }, { name: "Higher" }, { name: "These Demons" }, 
        { name: "She Loves Me" }, { name: "Killer" }, { name: "Zeus" }, 
        { name: "Discombobulated" }
    ]
    const result = await client.db("Eminem-sorter").collection("Songs").insertMany(songEntries);
    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}

async function createDataset() {
    try {
        await client.connect();
        await insertData(client);
    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

createDataset().catch(console.error);