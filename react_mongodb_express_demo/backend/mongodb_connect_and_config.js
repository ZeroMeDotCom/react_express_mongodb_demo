import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://Ueki:QQWqjlApQcMVmcbP@cluster0.o3wje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
export const client = new MongoClient(uri);
export const db_name = "Demo_Database";

const data_demo = {
    date: "20241203",
    task: [
        "Guitar Solo",
        "Piano Smooth Jazz",
        "English Practice"
    ]
}

async function ConnectMongodb() {
    try {
        await client.connect();
        console.log("Connected!")
        const db = client.db(db_name);
        const collection = db.collection("Demo_Database");
        // await collection.insertOne(data_demo);
        // const data_fetch = await collection.find({ date: "20241203" }).toArray();
        const data_fetch = await collection.updateOne(
            { date: "20241203" },
            { $set: {date: "20241204"} }
        )
        console.log(data_fetch);
    } catch (error) {
        console.error(error)
    } finally {
        await client.close();
    }
}

// ConnectMongodb();