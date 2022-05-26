import { Container } from "react-bootstrap";
import styles from "../styles/Copyright.module.scss";

const Copyright = () => {
  return (
    <>
      <div className={styles.containerWrapper}>
        <Container fluid="lg">
          <p>
            Copyright &copy; {new Date().getFullYear()} JK Lagrosa. All Rights
            Reserved.
          </p>
        </Container>
      </div>
    </>
  );
};

export default Copyright;
