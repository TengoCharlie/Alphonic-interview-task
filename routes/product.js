const router = require("express").Router();
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();

// Create new MongoClient
const dbName = "myDb";

MongoClient.connect(
  process.env.MONGO_URL,
  {
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
      await productDB.insertOne(req.body, (err, result) => {
        if (err) return console.log(err);
        res.send(result.ops[0]);
      });
    });

    // =================================================================================
    // Get product By ID
    router.get("/getProduct", async (req, res) => {
      const query = req.query.id;
      if (!query)
        return res.status(400).send({ error: "Please specify an Id" });

      if (!ObjectId.isValid(query))
        return res.status(422).send({ error: "Invalid ObjectId" });

      await productDB.findOne(ObjectId(query), (err, result) => {
        if (err) return console.log(err);
        if (!result)
          return res.send({ error: "No data Avialable with the Id" });
        res.send(result);
      });
    });

    // =================================================================================
    // Get all the products
    router.get("/getProducts", async (req, res) => {
      await productDB.find({}).toArray((err, result) => {
        if (err) return console.log(err);
        if (result.length === 0)
          return res.send({ message: "Database is empty" });
        res.send(result);
      });
    });

    // =================================================================================
    // update data in DATABASE
    router.post("/updateProduct/:id", async (req, res) => {
      const id = req.params.id;
      if (!ObjectId.isValid(id))
        return res.status(422).send({ error: "Invalid ObjectId" });

      await productDB.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: req.body },
        (err, result) => {
          if (err)
            return res
              .status(422)
              .send({ error: "Fields for updates are Empty" });
          if (result.value === null)
            return res.send({
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
