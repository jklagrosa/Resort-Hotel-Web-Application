import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/About.module.scss";

const About = () => {
  const [show, setShow] = useState(false);

  const showMore = () => {
    setShow((prev) => (prev = !prev));
  };

  return (
    <>
      <div className={styles.containerWrapper} id="about">
        <Container fluid="lg">
          <Row className="gy-0 gx-4">
            <Col
              xs={12}
              md={6}
              className="order-2 order-md-1"
              style={{ textAlign: "center" }}
            >
              <img
                src="/images/aboutbg.jpg"
                alt="About Us Image"
                className={styles.aboutImage}
              />
            </Col>
            <Col
              xs={12}
              md={6}
              className="order-1 order-md-2"
              id={styles.ABOUT_COLUMN}
            >
              <h2>About Us</h2>

              <p>
                A unique place where perfect blend of sea and forest landscape
                welcomes bald contemporary design engraving new paragraph in the
                history of fabled Georgian hospitality. Chic and sophisticated,
                the exotically inspired retreat creates profound feeling of
                divine harmony and seamless relaxation by the Black Sea Coast.
              </p>

              <div id={styles.ID_SHOW_ON_DESK_DEVICE}>
                <p>
                  Feeling of serenity will slowly follow, as you drive further
                  through the ancient pine tree forest to our state of the art
                  retreat. Upon entering, you are bound to be allured by the
                  striking element of design, the one of its kind walkthrough
                  aquarium. When you cross the threshold of reality, its exotic
                  marine inhabitants shall lead you towards the inner falls,
                  which guides you down into the majestic winter garden, indoor
                  aqua park and the jewel of our property — 115m long filtered
                  seawater pool built into mindfully designed panoramic deck.
                </p>

                <div className={styles.buttonWrapper}>
                  <button className={styles.mainButton}>Get in touch</button>
                </div>
              </div>

              <div id={styles.ID_HIDE_ON_DESK_DEVICE}>
                {!show && (
                  <button onClick={showMore} className={styles.seeMoreBtn}>
                    See more
                  </button>
                )}

                {show && (
                  <button
                    onClick={showMore}
                    className={styles.seeMoreBtn}
                    style={{ color: "orangered" }}
                  >
                    See less
                  </button>
                )}

                <div
                  className={
                    show
                      ? styles.showOnSmallDevices_PARAGRAPH
                      : styles.hideOnSmallDevices_PARAGRAPH
                  }
                >
                  <p>
                    Feeling of serenity will slowly follow, as you drive further
                    through the ancient pine tree forest to our state of the art
                    retreat. Upon entering, you are bound to be allured by the
                    striking element of design, the one of its kind walkthrough
                    aquarium. When you cross the threshold of reality, its
                    exotic marine inhabitants shall lead you towards the inner
                    falls, which guides you down into the majestic winter
                    garden, indoor aqua park and the jewel of our property —
                    115m long filtered seawater pool built into mindfully
                    designed panoramic deck.
                  </p>
                </div>

                <div className={styles.buttonWrapper}>
                  <button className={styles.mainButton}>Get in touch</button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default About;
