import styles from "../../styles/ALL_R_pages.module.scss";
import Navbar2 from "../../components/Navbar2";
import Footer from "../../components/Footer";
import Copyright from "../../components/Copyright";
import { Row, Col, Spinner } from "react-bootstrap";
import { IoHeart } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const RoomsReservation = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const [loading, setLoading] = useState(false);

  const [isLoggedin, setIsLoggedin] = useState(false);

  const [parentLoader, setParentLoader] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (!isAuth) {
      setIsLoggedin(false);
      router.push("/login");
    } else {
      setIsLoggedin(true);
    }
  }, []);

  useEffect(() => {
    const get_rooms = async () => {
      const response = await axios.get(`${BASE_URL}/api/get_all_rooms`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        },
      });
      if (!response.data.success) {
        setData(null);
        setError(true);
      } else if (response && response.data && response.data.success) {
        setData(response.data.data.reverse());
        setError(null);
        console.log(response.data);
      }

      setParentLoader(false);
    };
    get_rooms();
  }, []);

  useEffect(() => {
    if (data.length == 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [data]);

  const handleDeleteRoom = async (id) => {
    setLoading(true);
    const payload = { id };
    const deleteRoom = await axios.post(
      `${BASE_URL}/api/delete_rooms`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        },
      }
    );
    if (!deleteRoom.data.success) {
      setLoading(false);
      setError(deleteRoom.data.message);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Something went wrong, please try again later.",
        showConfirmButton: true,
        // timer: 1500,
      });
    } else if (deleteRoom && deleteRoom.data && deleteRoom.data.success) {
      setError(null);
      setData(deleteRoom.data.new_data.reverse());
      setLoading(false);

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "This reservation is now deleted.",
        showConfirmButton: true,
        // timer: 1500,
      });
    }
  };

  return (
    <>
      {!isLoggedin && (
        <div style={{ padding: "1rem" }}>
          <Spinner animation="border" role="status" size="sm">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <span className="ms-2">Loading...</span>
        </div>
      )}

      {isLoggedin && (
        <>
          <Navbar2 />
          <div className={styles.PAGES_HEADER}>
            <h2>Rooms Reservations</h2>
          </div>

          {parentLoader && (
            <div style={{ padding: "4rem 1rem", textAlign: "center" }}>
              <Spinner animation="border" />
            </div>
          )}

          {!parentLoader && (
            <div className={styles.containerWrapper}>
              {data.length > 0 &&
                data.map((x) => (
                  <div className={styles.resultsContainer} key={x._id}>
                    <Row className="g-0">
                      <Col xs={12} md={4}>
                        <img
                          src={`/rooms/${x.img}`}
                          className={styles.IMAGE_CARD}
                        />
                      </Col>
                      <Col xs={12} md={8}>
                        <div className={styles.room_details}>
                          <span className={styles.HEADER_TITLE}>{x.title}</span>

                          {x.rating >= 5 && (
                            <span
                              className="badge bg-danger"
                              id={styles.Ratings_Badge}
                            >
                              {x.rating} <IoHeart />
                            </span>
                          )}
                          {x.rating < 5 && (
                            <span
                              className="badge bg-success"
                              id={styles.Ratings_Badge}
                            >
                              {x.rating} <IoHeart />
                            </span>
                          )}
                          <hr className="my-2" />
                          <h6>CheckIn: {x.checkin}</h6>
                          <h6>CheckOut: {x.checkout}</h6>
                          <h6>Adult: {x.adult == "" ? "1" : x.adult}</h6>
                          <h6>
                            Children: {x.children == "" ? "0" : x.children}
                          </h6>
                          <h6>Price: ₱{x.price} / Night</h6>

                          {!loading && (
                            <button onClick={() => handleDeleteRoom(x._id)}>
                              <MdDelete /> Delete
                            </button>
                          )}

                          {loading && (
                            <button>
                              <Spinner animation="border" size="sm" />
                            </button>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </div>
                ))}

              {isEmpty && (
                <div className={styles.NO_RESULTS_FOUND}>
                  <h1>No results found.</h1>
                  <Link href="/">Reserve now</Link>
                </div>
              )}
            </div>
          )}
          <Footer />
          <Copyright />
        </>
      )}
    </>
  );
};

export default RoomsReservation;
