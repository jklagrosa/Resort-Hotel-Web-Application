import styles from "../../styles/C_A_pages.module.scss";
import { Container, Table, Spinner } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Copyright from "../../components/Copyright";
// import dbConnection from "../../mongodb/Dbconnection";
// import ReserveRooms from "../../models/reservedRooms";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { BASE_URL } from "../../config/config";

export async function getServerSideProps(context) {
  const { query } = context;

  return {
    props: {
      q: JSON.stringify(query),
      // data: JSON.stringify(isAvailable),
    },
  };
}

const Check_Availablity = ({ q }) => {
  const [parsed_q, setParsed_Q] = useState(JSON.parse(q));

  const [allDates, setAllDates] = useState(null);

  const [isError, setIsError] = useState(null);

  const router = useRouter();
  const query = router.query;

  console.log(query.children);

  useEffect(() => {
    const availableDates = async () => {
      const response = await axios.get(
        `${BASE_URL}/api/fetchroom?checkin=${parsed_q.checkin}&checkout=${parsed_q.checkout}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          },
        }
      );

      console.log(response.data.data);

      // GOOD
      if (response && response.data && response.data.success) {
        console.log(response.data.data);
        setAllDates(response.data.data);
      } else if (response || response.data || !response.data.success) {
        setIsError(true);
      } else {
        setAllDates(null);
      }
    };
    availableDates();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.PAGES_HEADER}>
        <h2>Availability</h2>
      </div>

      {isError && (
        <div
          style={{
            padding: "4rem",
            margin: "0 auto",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <h3
            style={{
              overflow: "hidden",
              color: "#080A52",
              fontStyle: "italic",
            }}
          >
            Something went wrong, cannot display the results. please try again
            later.
          </h3>
        </div>
      )}

      {!allDates && (
        <div style={{ textAlign: "center", padding: "6rem" }}>
          <Spinner animation="border" role="status" style={{ color: "black" }}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {allDates && (
        <div className={styles.containerWrapper}>
          <Container fluid="lg">
            <div className={styles.dateWrapper}>
              <span>CheckIn: {parsed_q.checkin}</span> <sup>____</sup>{" "}
              <span>CheckOut: {parsed_q.checkout}</span>
              <br />
              <span>Adult: {parsed_q.adult}</span> <sup>____</sup>{" "}
              <span>
                Children: {parsed_q.children === "" ? "0" : query.children}
              </span>
              {allDates.length > 0 && (
                <h5 className={styles.resultsh5}>Results</h5>
              )}
            </div>

            {allDates.length > 0 && (
              <div className={styles.dateResults}>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>CheckIn</th>
                      <th>CheckOut</th>
                      <th>Adult</th>
                      <th>Children</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allDates.map((x) => (
                      <tr key={x._id}>
                        <td>{x.checkin}</td>
                        <td>{x.checkout}</td>
                        <td>{x.adult === "" ? "1" : x.adult}</td>
                        <td>{x.children === "" ? "0" : x.children}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}

            {allDates.length == 0 && (
              <div className={styles.NO_RESULTS_FOUND}>
                <h1>No results found.</h1>
              </div>
            )}
          </Container>
        </div>
      )}

      <Footer />
      <Copyright />
    </>
  );
};

export default Check_Availablity;
