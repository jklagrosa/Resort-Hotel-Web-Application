import styles from "../../styles/C_E_pages.module.scss";
import Navbar2 from "../../components/Navbar2";
import Footer from "../../components/Footer";
import Copyright from "../../components/Copyright";
import { Container, Row, Col, Table, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Link from "next/link";

const EventsReservations = () => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);

  const [isLoggedin, setIsLoggedin] = useState(false);

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
    let isCanceled = false;
    const get_events = async () => {
      const response = await axios.get(`${BASE_URL}/api/get_all_events`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        },
      });
      if (!isCanceled) {
        setIsLoading(false);
        if (!response.data.success) {
          setIsError(true);
        } else if (response.data.data.length === 0) {
          setIsEmpty(true);
        } else if (response && response.data && response.data.data) {
          setIsError(false);
          setData(response.data.data);
          console.log(response.data.data);
        }
      }
    };
    get_events();

    return () => {
      isCanceled = true;
    };
  }, []);

  const handleCancelReservation = async (id) => {
    setCancelLoading(true);
    const response = await axios.post(
      `${BASE_URL}/api/get_all_events`,
      {
        id,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, DELETE, OPTIONS",
        },
      }
    );

    console.log(response);

    if (!response.data.success) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Something went wrong, please try again later.",
        showConfirmButton: true,
        // timer: 5000,
      });
    }

    if (response.data.data.length === 0) {
      setIsEmpty(true);
    }

    if (response && response.data && response.data.data) {
      setData(response.data.data);
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Event canceled.",
        showConfirmButton: true,
        // timer: 5000,
      });
    }

    setCancelLoading(false);

    return response;
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
            <h2>Events Reservations</h2>
          </div>
          <div className={styles.containerWrapper}>
            <Container fluid="lg">
              {data.length > 0 && (
                <div className={styles.dateResults}>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Type of event</th>
                        <th>Event date</th>
                        <th>Event description</th>
                        <th>Start at</th>
                        <th>End at</th>
                        <th>Cancel reservation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((x) => (
                        <tr key={x._id}>
                          <td>{x.event}</td>
                          <td>{x.event_date}</td>
                          <td>{x.event_desc}</td>
                          <td>{x.startat}</td>
                          <td>{x.endat}</td>
                          <td>
                            {!cancelLoading && (
                              <button
                                onClick={() => handleCancelReservation(x._id)}
                                className={styles.CANCEL_BTN}
                              >
                                Cancel
                              </button>
                            )}

                            {cancelLoading && (
                              <button className={styles.CANCEL_BTN}>
                                <Spinner animation="border" size="sm" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}

              {isEmpty && (
                <div className={styles.NO_RESULTS_FOUND}>
                  <h1>No reservation found.</h1>
                  <Link href="/">Book now</Link>
                </div>
              )}

              {loading && (
                <div className="text-center" style={{ overflow: "hidden" }}>
                  <Spinner
                    animation="border"
                    role="status"
                    style={{ color: "black" }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}

              {isError && (
                <div className={styles.NO_RESULTS_FOUND}>
                  <h1>Something went wrong, please try again later.</h1>
                </div>
              )}
            </Container>
          </div>
          <Footer />
          <Copyright />
        </>
      )}
    </>
  );
};

export default EventsReservations;
