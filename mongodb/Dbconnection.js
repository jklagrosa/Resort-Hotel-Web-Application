import mongoose from "mongoose";

// try {
//   mongoose.connect(
//     process.env.MONGO_URI,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//     () => console.log("connected")
//   );
// } catch (error) {
//   console.log("could not connect");
// }

// export default dbConnection;

const connection = {};

const Dbconnection = async () => {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
  if (connection.isConnected) {
    console.log(`DB is now running.`);
  } else {
    console.log(`DB encountered an error.`);
  }
};

export default Dbconnection;
