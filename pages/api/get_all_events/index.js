import dbConnection from "../../../mongodb/Dbconnection";
import Events from "../../../models/events";

export default async function handler(req, res) {
  if (req.method == "GET") {
    await dbConnection();
    const get_all_events = await Events.find({});
    if (!get_all_events) {
      return res.status(400).json({
        success: false,
        message: "Cannot fetch all events, please try again later.",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Yehey! all fetch events success.",
      data: get_all_events,
    });
  }

  if (req.method == "POST") {
    await dbConnection();

    const { id } = req.body;
    const delete_event = await Events.findOneAndDelete({ _id: id });
    if (!delete_event) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong, cannot cancel this event.",
        data: null,
      });
    }

    const get_updated_data = await Events.find({});

    return res.status(200).json({
      success: true,
      message: "This event is now canceled.",
      data: get_updated_data,
    });
  }
}
