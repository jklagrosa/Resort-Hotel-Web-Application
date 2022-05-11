import Dbconnection from "../../../mongodb/Dbconnection";
import User from "../../../models/user";

export default async function handler(req, res) {
  if (req.method == "POST") {
    await Dbconnection();
    const { username, password } = req.body;
    const isUser = await User.findOne({ username, password });
    if (!isUser) {
      return res.status(400).json({
        isAuth: false,
        message: "User not found.",
        data: null,
      });
    }

    return res.status(200).json({
      isAuth: true,
      message: "Yehey! you're now logged in.",
      data: isUser,
    });
  }
}
