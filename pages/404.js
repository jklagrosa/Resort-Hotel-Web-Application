import { Container } from "react-bootstrap";
import styles from "../styles/404.module.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import { useRouter } from "next/router";

const PageNotFound = () => {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <div className={styles.containerWrapper}>
        <Container fluid="lg">
          <div className={styles.NOT_FOUND_WRAPPER}>
            <h1>404: Page Not Found</h1>
            <p>We cannot find what you are looking for.</p>

            <button onClick={() => router.push("/")}>Back To Home</button>
          </div>
        </Container>
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

export default PageNotFound;
