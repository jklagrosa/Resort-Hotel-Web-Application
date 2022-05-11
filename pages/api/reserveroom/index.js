import Dbconnection from "../../../mongodb/Dbconnection";
import ReserveRooms from "../../../models/reservedRooms";

export default async function handler(req, res) {
  if (req.method == "POST") {
    // const parsed_body = JSON.parse(req.body);

    await Dbconnection();

    const check_if_already_reserved = await ReserveRooms.findOne(req.body);
    if (check_if_already_reserved) {
      return res.status(200).json({
        already_reserve: true,
        message: "You already reserve this room.",
      });
    }

    const new_reservation = new ReserveRooms(req.body);

    console.log(new_reservation);

    new_reservation
      .save()
      .then((result) => {
        if (result) {
          return res.status(200).json({
            success: true,
            message: "Yehey! New reservation added.",
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: `${err.message}`,
        });
      });
  }
}
