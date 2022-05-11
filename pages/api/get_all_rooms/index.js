import dbConnection from "../../../mongodb/Dbconnection";
import ReservedRooms from "../../../models/reservedRooms";

export default async function handler(req, res) {
  if (req.method == "GET") {
    await dbConnection();
    const response = await ReservedRooms.find({});
    if (!response) {
      return res.status(400).json({
        success: false,
        message: "Cannot fetch the all rooms reservation.",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Yehey! success request.",
      data: response,
    });
  }
}
