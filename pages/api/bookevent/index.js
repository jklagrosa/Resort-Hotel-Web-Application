import dbConnection from "../../../mongodb/Dbconnection";
import Events from "../../../models/events";

export default async function handler(req, res) {
  if (req.method == "POST") {
    await dbConnection();

    const { event_date } = req.body;

    const check_if_exist = await Events.findOne({ event_date });
    if (check_if_exist) {
      return res.status(409).json({
        isExist: true,
        message: "You already reserved an event for this date.",
      });
    }

    const new_event_added = new Events(req.body);
    new_event_added
      .save()
      .then((result) => {
        if (result) {
          return res.status(200).json({
            success: true,
            message: "Yehey! New event reservation added.",
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Something went wrong, cannot add this event.",
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          message: `Opps error occured while booking an event, ${error}`,
        });
      });
  }
}
