import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import styles from "../styles/Rooms.module.scss";
import { IoHeart, IoArrowForwardOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Rooms = () => {
  const { rooms } = useSelector((state) => state?.roomSlice);
  const [rooms_data, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const [demo_user, setDemo_User] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (isAuth) {
      setIsLoggedin(true);
      setDemo_User(isAuth);
    } else {
      setIsLoggedin(false);
      setDemo_User(null);
    }
  }, []);

  useEffect(() => {
    if (rooms) {
      //   console.log(`Response: ${rooms}`);
      setRooms(rooms);
    }
  }, [rooms]);

  console.log(router.pathname);

  const handleSelectedRoom = (id) => {
    setLoading(true);
    if (id) {
      if (router.pathname !== "/") {
        setLoading(false);
      } else {
        router.push(`/book-room/${id}`);
      }
    }
  };

  return (
    <>
      <div className={styles.containerWrapper} id="rooms">
        <Container fluid="lg">
          <h2>Our Rooms</h2>
          <Row className="gy-0 gx-4">
            {rooms_data &&
              rooms_data.map((room) => (
                <Col xs={12} sm={6} lg={4} xl={3} key={room._id}>
                  <Card className={styles.Card}>
                    <Card.Img
                      variant="top"
                      src={`/rooms/${room.img}`}
                      className={styles.Card_Image}
                    />
                    <Card.Body>
                      <div className={styles.Card_Price}>
                        <span className={styles.Card_Price_Title}>
                          ₱{room.price}/Night
                        </span>

                        {room.rating >= 5 && (
                          <span
                            className="badge bg-danger"
                            id={styles.Ratings_Badge}
                          >
                            {room.rating} <IoHeart />
                          </span>
                        )}
                        {room.rating < 5 && (
                          <span
                            className="badge bg-success"
                            id={styles.Ratings_Badge}
                          >
                            {room.rating} <IoHeart />
                          </span>
                        )}
                      </div>

                      <Card.Title className={styles.Card_Title}>
                        {room.title}
                      </Card.Title>
                      <Card.Text className={styles.Card_Para}>
                        {room.desc}
                      </Card.Text>

                      {!loading && isLoggedin && (
                        // IF USER IS LOGGED IN
                        <Button onClick={() => handleSelectedRoom(room._id)}>
                          Book Now <IoArrowForwardOutline />
                        </Button>
                      )}

                      {!loading && !isLoggedin && (
                        // IF USER IS NOT LOGGED IN
                        <Button onClick={() => router.push("/login")}>
                          Book Now <IoArrowForwardOutline />
                        </Button>
                      )}

                      {loading && (
                        <Button style={{ background: "darkgrey" }}>
                          Please wait.
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Rooms;
