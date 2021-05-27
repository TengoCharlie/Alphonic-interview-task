// Import Packages
const router = require("express").Router();
require("dotenv").config();

// Import MogoDB package
const { MongoClient, ObjectId } = require("mongodb");

// Create new MongoClient
const dbName = "myDb"; //name of database

MongoClient.connect(
  process.env.MONGO_URL, //Connection URL
  {
    //To prevent deprecation Warnings
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  async (err, client) => {
    if (err) return console.log("unable to connect to DB");

    console.log("Connect to Database");
    const db = await client.db(dbName);
    const productDB = db.collection("product");
    // =================================================================================
    // Add product to DB
    router.post("/addProduct", async (req, res) => {
      // Insert Data to DB
      await productDB.insertOne(req.body, (err, result) => {
        if (err) return console.log(err);
        res.send(result.ops[0]);
      });
    });

    // =================================================================================
    // Get product By ID
    router.get("/getProduct", async (req, res) => {
      const query = req.query.id;
      // validate the query string, that is it available and Correct
      if (!query)
        return res.status(400).send({ error: "Please specify an Id" });

      if (!ObjectId.isValid(query))
        return res.status(422).send({ error: "Invalid ObjectId" });

      // Find the DB accroding to ID
      await productDB.findOne(ObjectId(query), (err, result) => {
        if (err) return console.log(err);
        if (!result)
          return res.status(404).send({ error: "No data Avialable with the Id" });
        res.send(result);
      });
    });

    // =================================================================================
    // Get all the products
    router.get("/getProducts", async (req, res) => {
      //get all the data from collection or DB
      await productDB.find({}).toArray((err, result) => {
        if (err) return console.log(err);
        if (result.length === 0)
          return res.status(404).send({ message: "Database is empty" });
        res.send(result);
      });
    });

    // =================================================================================
    // update data in DATABASE
    router.post("/updateProduct/:id", async (req, res) => {
      const id = req.params.id;
      // validate the ID
      if (!ObjectId.isValid(id))
        return res.status(422).send({ error: "Invalid ObjectId" });

      // find the data and then update it and then return the data than find by id
      await productDB.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: req.body },
        (err, result) => {
          if (err)
            return res
              .status(422)
              .send({ error: "Fields for updates are Empty" });
          if (result.value === null)
            return res.status(404).send({
              message: "No data Available with the Id",
            });
          res.send(result.value);
        }
      );
    });
  }

  // =================================================================================
);

module.exports = router;
