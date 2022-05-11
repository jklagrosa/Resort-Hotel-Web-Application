// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import Dbconnection from "../../mongodb/Dbconnection";
// import RoomsModel from "../../models/rooms";

// export default async function handler(req, res) {
//   await Dbconnection();
//   const getRooms = await RoomsModel.find({}).exec();
//   if (getRooms) {
//     console.log(`Get Rooms: ${Object.values(getRooms)}`);
//     res.status(200).json(getRooms);
//   }
//   res.status(500).json({
//     success: false,
//     message: "Cannot fetch rooms data.",
//   });
// }
