const express = require("express");
const ObjectId = require("mongodb").ObjectID;
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 5055;

const app = express();
app.use(express.json());
console.log("user:", process.env.DB_USER);
app.use(cors());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9hyks.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log("database is connected on", uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const personalDetailsCollection = client
    .db("Dygnify_Ventures_Private_Limited")
    .collection("personal_details");
  const businessDetailsCollection = client
    .db("Dygnify_Ventures_Private_Limited")
    .collection("business_details");
  const LoanDetailsCollection = client
    .db("Dygnify_Ventures_Private_Limited")
    .collection("loan_details");

  // Personal Details [POST]
  app.post("/addPersonalDetails", (req, res) => {
    const newPersonalDetails = req.body;
    console.log("adding new personal details data: ", newPersonalDetails);
    personalDetailsCollection
      .insertOne(newPersonalDetails)
      .then((result) => {
        console.log("inserted count", result.insertedCount);
        res.send(result.insertedCount > 0);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // Business Details [POST]
  app.post("/addBusinessDetails", (req, res) => {
    const newBusinessDetails = req.body;
    console.log("adding new business details data: ", newBusinessDetails);
    businessDetailsCollection
      .insertOne(newBusinessDetails)
      .then((result) => {
        console.log("inserted count", result.insertedCount);
        res.send(result.insertedCount > 0);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // Loan Application Details [POST]
  app.post("/addLoanDetails", (req, res) => {
    const newLoan = req.body;
    console.log("adding new business details data: ", newLoan);
    LoanDetailsCollection.insertOne(newLoan)
      .then((result) => {
        console.log("inserted count", result.insertedCount);
        res.send(result.insertedCount > 0);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
