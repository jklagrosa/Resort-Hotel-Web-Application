import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/Footer.module.scss";

const Footer = () => {
  return (
    <>
      <div className={styles.containerWrapper}>
        <Container fluid="lg">
          <Row className="gy-0 gx-4">
            <Col xs={12} md={6} lg={4} className={styles.columnWrapper}>
              <h1>
                Re<span>+</span>tel<span>z</span>
              </h1>
              <p>
                If you want to try this web application, you can login as Demo
                user. Click the login button to redirect to login page and then
                click the <code>"Login as demo user"</code> button.
              </p>
            </Col>
            <Col xs={12} md={6} lg={4} className={styles.columnWrapper}>
              <h3>Contact the dev.</h3>
              <a
                href="https://www.linkedin.com/in/jklagrosa/"
                target="_blank"
                className={styles.contactLinks}
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/jklagrosa"
                target="_blank"
                className={styles.contactLinks}
              >
                Github
              </a>
              <a
                href="mailto:jklagrosa.dev@gmail.com"
                target="_blank"
                className={styles.contactLinks}
              >
                Gmail
              </a>
            </Col>
            <Col xs={12} md={6} lg={4} className={styles.columnWrapper}>
              <h3>Tools used</h3>
              <a>HTML5</a>
              <a>CSS3</a>
              <a>Sass</a>
              <a>Bootstrap</a>
              <a>JavaScript</a>
              <a>React JS</a>
              <a>Next JS</a>
              <a>Redux Toolkit</a>
              <a>MongoDB</a>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Footer;
