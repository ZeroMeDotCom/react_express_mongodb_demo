import express from 'express';
import cors from 'cors';
import { client, db_name } from './mongodb_connect_and_config.js';
const app = express();

// Enable CORS for all routes
app.use(cors());
async function ConnectMongodb() {
  try {
    console.log("111")
      await client.connect();
      console.log("Connected!")
      const db = client.db(db_name);
      const collection = db.collection("Demo_Database");
    //   const data_fetch = await collection.find({ date: "20241204" }).toArray();
    const data_fetch = await collection.find({ }).toArray();

      console.log(data_fetch);

      // route
      app.get('/data', (req, res) => {
        setTimeout(() => {
            res.json({ message: data_fetch });
        }, 2000); 
      });

      app.listen(5001, () => {
        console.log('Server is running on http://localhost:5001');
      });
  } catch (error) {
      console.error(error)
  } finally {
      await client.close();
  }
}

ConnectMongodb();
