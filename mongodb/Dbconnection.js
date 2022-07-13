import mongoose from "mongoose";

const Dbconnection = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("DB already connected");
    return;
  }

  return await mongoose
    .connect(
      process.env?.mongo_uri,

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((result) => {
      if (result) return;
    })
    .catch((err) => console.log("DB Error: " + err));

  // const db = await mongoose.createConnection(
  //   process.env.MONGODB_URI ? `${process.env.MONGODB_URI}` : "",
  //   // process.env.MONGODB_URI,
  //   {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   }
  // );

  //   connection.isConnected = db.createConnection[0].readyState;
  //   if (connection.isConnected) {
  //     console.log(`DB is now running.`);
  //   } else {
  //     console.log(`DB encountered an error.`);
  //   }
  // };
};
export default Dbconnection;
