import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/Contact.module.scss";

const Contact = () => {
  return (
    <>
      <div className={styles.containerWrapper} id="contact">
        <Container fluid="lg">
          <Row className="gy-0 gx-4">
            <Col xs={12} md={4}>
              <div className={styles.contactWrapper}>
                <h2>Contact Us</h2>
                <form>
                  <input type="text" required placeholder="Your name" />
                  <input type="email" required placeholder="Your email" />
                  <textarea
                    rows="10"
                    cols="30"
                    placeholder="Your message"
                    minLength="3"
                  ></textarea>
                  <button type="submit">Send message</button>
                </form>
              </div>
            </Col>
            <Col xs={12} md={8}>
              <Row className="gy-0 gx-3">
                <Col xs={6}>
                  <div className={styles.imageWrapper}>
                    <img
                      src="/images/contact1.jpg"
                      alt="About Us Image"
                      className={styles.aboutImage}
                    />
                  </div>
                </Col>
                <Col xs={6}>
                  <div className={styles.imageWrapper}>
                    <img
                      src="/images/contact2.jpg"
                      alt="About Us Image"
                      className={styles.aboutImage}
                    />
                  </div>
                </Col>
                <Col xs={6}>
                  <div className={styles.imageWrapper}>
                    <img
                      src="/images/contact3.jpg"
                      alt="About Us Image"
                      className={styles.aboutImage}
                    />
                  </div>
                </Col>
                <Col xs={6}>
                  <div className={styles.imageWrapper}>
                    <img
                      src="/images/contact4.jpg"
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

export default Contact;
