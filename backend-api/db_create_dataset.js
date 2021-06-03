require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const uri = process.env.DB_String;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function insertData(client) {
    // Make Sure collection is empty first
    await client.db("Eminem-sorter").collection("Songs").drop();
    
    songEntries = [
        { name: "Premonition", url: "spotify:track:7ccTcabbJlCJiIqtrSSwBk" },
        { name: "Unaccomodating", url: "spotify:track:0q2vG0UVuy6ajjcpkQHdZM" },
        { name: "You Gon' Learn", url: "spotify:track:0GQ5bFTVFFKpwNPc7KwQnB" },
        { name: "Those Kinda Nights", url: "spotify:track:0VSzREd1OjEWJ9tXoFHRQH" },
        { name: "In Too Deep", url: "spotify:track:7Dj2wqPYXfSRFwa6qyOztr" },
        { name: "Godzilla", url: "spotify:track:7FIWs0pqAYbP91WWM0vlTQ" },
        { name: "Darkness", url: "spotify:track:5SiZJoLXp3WOl3J4C8IK0d" },
        { name: "Leaving Heaven", url: "spotify:track:5CpsIb7SMFHjmAG8RvIWfq" },
        { name: "Yah Yah", url: "spotify:track:5mZXWEH2eh8zMZGCxT5aW0" },
        { name: "Stepdad", url: "spotify:track:3QVHSV8YKYq4L8tI5rnFgj" },
        { name: "Marsh", url: "spotify:track:34d7sGX6WUqq8f04e7CSNF" },
        { name: "Never Love Again", url: "spotify:track:40YbWniIEmqy6s58fYXLUh" },
        { name: "Little Engine", url: "spotify:track:4qNWEOMyexn7b8Icyk29t9" },
        { name: "Lock It Up", url: "spotify:track:1qwMkkRiD5jqLeUUjfgblh" },
        { name: "Farewell", url: "spotify:track:74gykWHknHDrg4eMdcmdRq" },
        { name: "No Regrets", url: "spotify:track:1lO9CZo6eDrOy0S7khgryG" }, 
        { name: "I Will", url: "spotify:track:3CJbxqRQ0JNCqboWDNUUeX" }, // Side A Ends
        { name: "Black Magic", url: "spotify:track:50le2HSqQAIqB4BGD4cE9e" },
        { name: "Alfred's Theme", url: "spotify:track:0uAkm1iQLrzweZ4U1iXy6w" },
        { name: "Tone Deaf", url: "spotify:track:1cEUi8QulMj1xgrPwwGC2p" },
        { name: "Book of Rhymes", url: "spotify:track:08ir631EiCA7xIms7JDp15" },
        { name: "Favorite Bitch", url: "spotify:track:2KBRNUt33CrlaFPEz4bQYs" }, 
        { name: "Guns Blazing", url: "spotify:track:3WpHqtFUwzIQBsV9YC5iNc" }, 
        { name: "Gnat", url: "spotify:track:6cS9PmLky2NhLOhpIsUlow" },
        { name: "Higher", url: "spotify:track:3eMsgWDRq5dKl5SBTYGv2J" },
        { name: "These Demons", url: "spotify:track:086LXfSk4U5XEALardCE7k" }, 
        { name: "She Loves Me", url: "spotify:track:0BUFqsMsqAmKQPhLBXnmv7" },
        { name: "Killer", url: "spotify:track:0FLIBDpU2S5bb6TfMB4NuQ" },
        { name: "Zeus", url: "spotify:track:2lPE6W6ONJKmBE6hLjpIYo" }, 
        { name: "Discombobulated", url: "spotify:track:1oHXeD1gQQCQUYHeHp2HMU" }
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