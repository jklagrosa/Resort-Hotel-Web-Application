import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/Hero.module.scss";

const Hero = () => {
  return (
    <>
      <Container fluid="lg" className={styles.containerWrapper}>
        <div className={styles.heroContents}>
          <h1>We give you everything right here, where you need it.</h1>
          <p>
            We give you more of what you want and less of what you don’t need We
            invite you to try it.
          </p>
          <div className={styles.btnWrapper}>
            <button>
              <a href="#rooms" style={{ all: "unset" }}>
                View Rooms
              </a>
            </button>
            <button>
              <a href="#events" style={{ all: "unset" }}>
                Book Events
              </a>
            </button>
          </div>
        </div>

        {/* SCROLL DOWN ANIMATION */}

        <div className={styles.mouse_scroll}>
          <div className={styles.mouse}>
            <div className={styles.wheel}></div>
          </div>
          <div>
            <span className={styles.m_scroll_arrows} id={styles.unu}></span>
            <span className={styles.m_scroll_arrows} id={styles.doi}></span>
            <span className={styles.m_scroll_arrows} id={styles.trei}></span>
          </div>
        </div>

        {/* END */}
      </Container>
    </>
  );
};

export default Hero;
