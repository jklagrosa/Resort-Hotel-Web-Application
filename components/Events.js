import { useState, useEffect } from "react";
import styles from "../styles/Events.module.scss";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../config/config";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Events = () => {
  const [selected, setSelected] = useState(null);
  const [other, setOther] = useState(false);
  const [name, setName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startat, setStartAt] = useState("");
  const [endat, setEndAt] = useState("");
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
    if (selected == "other") {
      setOther(true);
    } else {
      setOther(false);
    }
  }, [selected]);

  const handleSelectedEvent = (e) => {
    const { value } = e.target;
    setSelected(value);
  };

  const handleEventBooking = async (e) => {
    e.preventDefault();

    setLoading(true);

    // START AT
    let timeSplit = startat.split(":");
    let hours = null;
    let minutes = null;
    let meridian = null;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = "PM";
      hours -= 12;
    } else if (hours < 12) {
      meridian = "AM";
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = "PM";
    }
    const converted_start_at = hours + ":" + minutes + " " + meridian;
    // END

    // ============================================

    // END AT
    let timeSplit2 = endat.split(":");
    let hours2 = null;
    let minutes2 = null;
    let meridian2 = null;
    hours2 = timeSplit2[0];
    minutes2 = timeSplit2[1];
    if (hours2 > 12) {
      meridian2 = "PM";
      hours2 -= 12;
    } else if (hours2 < 12) {
      meridian2 = "AM";
      if (hours2 == 0) {
        hours2 = 12;
      }
    } else {
      meridian2 = "PM";
    }
    const converted_end_at = hours2 + ":" + minutes2 + " " + meridian2;
    // END

    const payload = {
      name,
      event: selected,
      event_desc: eventDesc,
      event_date: eventDate,
      startat: converted_start_at,
      endat: converted_end_at,
    };

    if (isLoggedin) {
      const response = await axios.post(`${BASE_URL}/api/bookevent`, payload, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        },
      });

      if (response.data.isExist) {
        setLoading(false);
        return Swal.fire({
          position: "top",
          icon: "error",
          title: "You already reserved an event for this date.",
          showConfirmButton: true,
          // timer: 5000,
        });
      }

      if (!response.data.success) {
        setLoading(false);

        return Swal.fire({
          position: "top",
          icon: "error",
          title: "Something went wrong, please try again later.",
          showConfirmButton: true,
          // timer: 5000,
        });
      }

      if (response && response.data && response.data.success) {
        setLoading(false);

        setSelected(null);
        setName("");
        setEventDate("");
        setEventDesc("");
        setStartAt("");
        setEndAt("");

        return Swal.fire({
          position: "top",
          icon: "success",
          title: "New reservation added.",
          showConfirmButton: true,
          // timer: 5000,
        });
      }
    }
  };

  return (
    <>
      <div className={styles.containerWrapper} id="events">
        <Container fluid="lg">
          <Row className="gy-0 gx-4">
            <Col xs={12} md={4}>
              <div className={styles.contactWrapper}>
                <h2>Book Events</h2>
                <form onSubmit={handleEventBooking}>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={demo_user ? demo_user.username : name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={demo_user ? true : false}
                  />

                  <label>Type of event</label>
                  <select required onChange={handleSelectedEvent}>
                    <option value="birthday">Birthday</option>
                    <option value="wedding">Wedding</option>
                    <option value="debut">Debut</option>
                    <option value="jsprom">Js Prom</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="other">Other</option>
                  </select>

                  {/* SHOW THIS IF OTHER IS SELECTED */}

                  {other && (
                    <textarea
                      rows="5"
                      cols="30"
                      placeholder="Please specify the type of event"
                      value={eventDesc}
                      onChange={(e) => setEventDesc(e.target.value)}
                    ></textarea>
                  )}

                  {/* END */}

                  <label>Event date</label>
                  <input
                    type="date"
                    placeholder="Start date"
                    min={new Date().toISOString().split("T")[0]}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                  />
                  <label>Start time</label>
                  <input
                    type="time"
                    value={startat}
                    onChange={(e) => setStartAt(e.target.value)}
                    required
                  />
                  <label>End time</label>
                  <input
                    type="time"
                    value={endat}
                    onChange={(e) => setEndAt(e.target.value)}
                    required
                  />

                  {!loading && isLoggedin && (
                    // IF USER IS LOGGED IN
                    <button type="submit">Book Now</button>
                  )}

                  {!loading && !isLoggedin && (
                    // IF USER IS NOT LOGGED IN
                    <button onClick={() => router.push("/login")}>
                      Book Now
                    </button>
                  )}

                  {loading && (
                    <button>
                      <Spinner animation="border" size="sm" />
                    </button>
                  )}
                </form>
              </div>
            </Col>
            <Col xs={12} md={8}>
              <Row className="gy-0 gx-3">
                <Col xs={6}>
                  <div className={styles.imageWrapper}>
                    <img
                      src="/events/events1.jpg"
                      alt="About Us Image"
                      className={styles.aboutImage}
                    />
                  </div>
                </Col>
                <Col xs={6}>
                  <div className={styles.imageWrapper}>
                    <img
                      src="/events/events2.jpg"
                      alt="About Us Image"
                      className={styles.aboutImage}
                    />
                  </div>
                </Col>
                <Col xs={6}>
                  <div className={styles.imageWrapper}>
                    <img
                      src="/events/events3.jpg"
                      alt="About Us Image"
                      className={styles.aboutImage}
                    />
                  </div>
                </Col>
                <Col xs={6}>
                  <div className={styles.imageWrapper}>
                    <img
                      src="/events/events4.jpg"
                      alt="About Us Image"
                      className={styles.aboutImage}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Events;
