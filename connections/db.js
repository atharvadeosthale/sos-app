import mongo from "mongoose";

mongo.connect(
  "mongodb+srv://dbuser:dbpass@cluster0.22rbk.mongodb.net/sosapp?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("Connection to MongoDB failed!");
      console.error(err);
    } else {
      console.log("Connected with MongoDB!");
    }
  }
);

export default mongo.connection;
