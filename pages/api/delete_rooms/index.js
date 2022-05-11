import dbConnection from "../../../mongodb/Dbconnection";
import ReservedRooms from "../../../models/reservedRooms";

export default async function handler(req, res) {
  if (req.method == "POST") {
    await dbConnection();

    const { id } = req.body;
    console.log(id);

    const deleteRoom = await ReservedRooms.findOneAndDelete({
      _id: id,
    });
    if (!deleteRoom) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete this reservation, please try again later.",
        new_data: null,
      });
    }

    const get_new_data = await ReservedRooms.find({});

    return res.status(200).json({
      success: true,
      message: "This reservation is now deleted.",
      new_data: get_new_data,
    });
  }
}
