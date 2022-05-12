import mongoose from "mongoose";

let connection = {};
// let dbString = process.env.MONGODB_URI ? process.env.MONGODB_URI : "";

const Dbconnection = async () => {
  if (connection) return connection;

  connection = await mongoose.connect(
    `${process.env.MONGODB_URI}`,

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

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
