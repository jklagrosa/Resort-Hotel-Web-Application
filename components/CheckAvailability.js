import { useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import styles from "../styles/Available.module.scss";
import { useRouter } from "next/router";

const Available = () => {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [adult, setAdult] = useState("");
  const [children, setChildren] = useState("");

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  console.log(children, adult);

  const handleCheckAvailability = (e) => {
    e.preventDefault();

    if (checkin && checkout) {
      router.push({
        pathname: "/check-availability",
        query: {
          checkin,
          checkout,
          adult: adult === "" ? "1" : adult,
          children: children === "" ? "0" : children,
        },
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.containerWrapper}>
        <Container fluid="lg">
          <form onSubmit={handleCheckAvailability} className={styles.form}>
            <Row className="gy-0 gx-4">
              <Col xs={12} md={4}>
                {/* DISABLE PAST DATES */}
                <label>CheckIn</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={checkin}
                  onChange={(e) => setCheckin(e.target.value)}
                />
                {/*  */}

                <label>CheckOut</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                />
              </Col>
              <Col xs={12} md={4}>
                <label>Adult</label>
                <select
                  value={adult}
                  required
                  onChange={(e) => setAdult(e.target.value)}
                >
                  <option disabled>Maximum of 5</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                {/*  */}
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
              </Col>
              <Col xs={12} md={4}>
                {/* button for submitting */}
                <label style={{ color: "#fbeaeb", visibility: "hidden" }}>
                  .
                </label>

                {loading && <button type="submit">Check Availability</button>}
                {/* LOADING INDICATOR */}
                {!loading && (
                  <button>
                    <Spinner animation="border" size="sm" />
                  </button>
                )}
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </>
  );
};

export default Available;
