// STEP-1 : IMPORT MONGOOSE PACKAGE
const mongoose = require('mongoose');

// Database Connection URL
// const uri = "mongodb://user1:aupp@ac-irevfzj-shard-00-00.jh094ab.mongodb.net:27017,ac-irevfzj-shard-00-01.jh094ab.mongodb.net:27017,ac-irevfzj-shard-00-02.jh094ab.mongodb.net:27017/practice?ssl=true&replicaSet=atlas-u04hq6-shard-0&authSource=admin&appName=MyCluster1";
//const uri = 'mongodb://localhost:27017/Aupp2025';
const uri = 'mongodb+srv://thuenaratt:EbN06sijGP9yVWJR@mydb.5dfi2bs.mongodb.net/mydb?appName=mydb'

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    // STEP-2 : ESTABLISH CONNECTION WITH MONGODB DATABASE THROUGH MONGOOSE
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await mongoose.disconnect();
  }
}
run().catch(console.dir);

// STEP-3 : EXPORT MODULE mongoose because we need it in other JS file
module.exports = mongoose;
