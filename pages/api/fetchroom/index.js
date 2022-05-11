import Dbconnection from "../../../mongodb/Dbconnection";
import ReserveRooms from "../../../models/reservedRooms";

export default async function handler(req, res) {
  if (req.method == "GET") {
    await Dbconnection();

    // const { checkin, checkout } = req.query;

    console.log(`From backend: ${req.query.checkin}`);

    // const isAvailable = await ReserveRooms.find({ checkin, checkout });
    await ReserveRooms.find({
      $or: [{ checkin: req.query.checkin }, { checkout: req.query.checkout }],
    })
      .then((result) => {
        if (!result) {
          return (
            res.status(400),
            json({
              success: false,
              message: "Something went wrong, please try again later.",
              data: null,
            })
          );
        }

        return res.status(200).json({
          success: true,
          message: "Fetch success",
          data: result,
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  }
}
