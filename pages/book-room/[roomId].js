import { useEffect, useState } from "react";
import axios from "axios";
import { IoHeart, IoArrowForwardOutline } from "react-icons/io5";
import styles from "../../styles/Roomid.module.scss";
import { Container, Row, Col, Spinner, Modal } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Copyright from "../../components/Copyright";
import dbConnection from "../../mongodb/Dbconnection";
import RoomSchema from "../../models/rooms";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/config";
// import Dbconnection from "../../mongodb/Dbconnection";
// import ReservedRooms from "../../models/reservedRooms";

export async function getStaticPaths() {
  await dbConnection();
  const get_id = await RoomSchema.find({});
  const paths = get_id.map((x) => {
    return {
      params: { roomId: `${x._id}` },
    };
  });
  console.log(paths);
  if (!get_id) {
    return {
      paths: [],
      fallback: false,
    };
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  await dbConnection();
  const { params } = context;
  const find_room = await RoomSchema.findOne({ _id: `${params.roomId}` });
  if (!find_room) {
    return {
      props: {
        data: null,
      },
    };
  }

  console.log(find_room);

  return {
    props: {
      data: JSON.stringify(find_room),
    },
  };
}

const Book_Room = ({ data }) => {
  const [selected_room, setSelected_Room] = useState([]);
  const [room_d, setRoom_D] = useState([]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [arrival, setArrival] = useState("");
  const [adult, setAdult] = useState("");
  const [children, setChildren] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(`${BASE_URL}/api/reserveroom`);

  const [demo_user, setDemo_User] = useState(null);

  useEffect(() => {
    const isAuth = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (isAuth) {
      setDemo_User(isAuth);
    } else {
      setDemo_User(null);
    }
  }, []);

  useEffect(() => {
    if (data) {
      const parse_data = JSON.parse(data);
      setSelected_Room(parse_data);
      localStorage.setItem("parse_data", JSON.stringify(parse_data));
    }
  }, [data]);

  useEffect(() => {
    let data_from_ls = localStorage.getItem("parse_data")
      ? JSON.parse(localStorage.getItem("parse_data"))
      : null;
    if (data_from_ls) {
      setRoom_D(data_from_ls);
    }
  }, []);

  const handleBookRoom = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await axios.post(
      url,
      {
        username,
        email,
        checkin,
        checkout,
        arrival,
        adult,
        children,
        img: room_d.img,
        desc: room_d.desc,
        price: room_d.price,
        rating: room_d.rating,
        title: room_d.title,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        },
      }
    );

    console.log(response);

    if (response.data.already_reserve) {
      console.log(response.data);
      setLoading(false);
      return Swal.fire({
        position: "top",
        icon: "error",
        title: "You already reserved this room.",
        showConfirmButton: true,
        // timer: 5000,
      });
    }

    if (response && response.data) {
      setUsername("");
      setEmail("");
      setCheckin("");
      setCheckout("");
      setArrival("");
      setAdult("");
      setChildren("");
      setLoading(false);
      Swal.fire({
        position: "top",
        icon: "success",
        title: "New reservation added.",
        showConfirmButton: true,
        // timer: 5000,
      });
    } else {
      setLoading(false);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Something went wrong, please try again later.",
        showConfirmButton: true,
        // timer: 5000,
      });
    }
  };

  return (
    <>
      <Navbar />

      <div className={styles.PAGES_HEADER}>
        <h2>Book a Room</h2>
      </div>

      {/* ========================= */}

      {selected_room && (
        <div className={styles.containerWrapper}>
          <Container fluid="lg">
            <Row className="gy-0 gx-4" id={styles.ROW}>
              <Col xs={12} md={8}>
                {selected_room.img && (
                  <Row className="g-2">
                    <Col xs={12}>
                      <div className={styles.LARGE_Image_Section}>
                        <img src={`/rooms/${selected_room.img}`} />
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className={styles.Image_Section}>
                        <img src={`/rooms/${selected_room.img}`} />
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className={styles.Image_Section}>
                        <img src={`/rooms/${selected_room.img}`} />
                      </div>
                    </Col>
                  </Row>
                )}

                {!selected_room.img && (
                  <Spinner
                    animation="border"
                    role="status"
                    style={{
                      color: "black",
                      margin: "0 auto",
                      display: "block",
                    }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                )}
              </Col>
              {/* ========================= */}
              <Col xs={12} md={4}>
                <div className={styles.Details_Section}>
                  <h2>{selected_room.title}</h2>
                  <div className={styles.ratingWrapper}>
                    {selected_room.rating >= 5 && (
                      <span
                        className="badge bg-danger"
                        id={styles.Ratings_Badge}
                      >
                        {selected_room.rating} <IoHeart />
                      </span>
                    )}
                    {selected_room.rating < 5 && (
                      <span
                        className="badge bg-success"
                        id={styles.Ratings_Badge}
                      >
                        {selected_room.rating} <IoHeart />
                      </span>
                    )}
                  </div>
                  <form onSubmit={handleBookRoom}>
                    <input
                      type="text"
                      required
                      placeholder="Username"
                      value={demo_user ? demo_user.username : username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={demo_user ? true : false}
                    />
                    <input
                      type="text"
                      required
                      placeholder="Email"
                      value={demo_user ? "user@demo.only" : email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={demo_user ? true : false}
                    />
                    <label>CheckIn</label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={checkin}
                      onChange={(e) => setCheckin(e.target.value)}
                    />
                    <label>CheckOut</label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={checkout}
                      onChange={(e) => setCheckout(e.target.value)}
                    />

                    <label>Adult</label>
                    <select
                      value={adult}
                      onChange={(e) => setAdult(e.target.value)}
                    >
                      <option disabled>Maximum of 5</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>

                    <label>Children</label>
                    <select
                      value={children}
                      onChange={(e) => setChildren(e.target.value)}
                    >
                      <option disabled>Maximum of 5</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>

                    {!loading && <button type="submit">Book Now</button>}

                    {loading && (
                      <button>
                        <Spinner animation="border" size="sm" />
                      </button>
                    )}
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}

      {!selected_room && <h1>Nothing to show</h1>}

      {/* ============================================= */}
      <Footer />
      <Copyright />
    </>
  );
};

export default Book_Room;
