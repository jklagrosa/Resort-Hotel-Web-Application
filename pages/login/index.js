import styles from "../../styles/Login.module.scss";
import { Container, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState("Demo User");
  const [password, setPassword] = useState("demopassword");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [has_token, setHas_Token] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (isAuth) {
      setHas_Token(true);
      router.push("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { username, password };
    const response = await axios.post(`${BASE_URL}/api/login`, payload, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      },
    });

    if (!response.data.isAuth) {
      setError(true);
    } else if (response && response.data && response.data.isAuth) {
      setError(false);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      router.push("/");
      setLoading(false);
    }

    return response.data;
  };

  return (
    <>
      <div className={styles.containerWrapper}>
        <Container fluid="lg">
          {!has_token && (
            <div className={styles.LOGIN_WRAPPER}>
              <h1>
                Re<span>+</span>Tel<span>z</span>
              </h1>
              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  placeholder="Username"
                  disabled
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  disabled
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <button className={styles.LOGIN_BTN}>Login</button>

              <hr className={styles.divider} /> */}

                {!loading && !has_token && (
                  <button type="submit" className={styles.LOGIN_BTN}>
                    Login as Demo User
                  </button>
                )}

                {has_token && (
                  <button
                    style={{ background: "gray" }}
                    disabled
                    className={styles.LOGIN_BTN}
                  >
                    Already logged in
                  </button>
                )}

                {loading && (
                  <button className={styles.LOGIN_BTN}>
                    <Spinner animation="border" role="status" size="sm">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </button>
                )}

                {error && (
                  <p className={styles.HAS_ERROR}>
                    *Something went wrong, User not found.
                  </p>
                )}
              </form>
            </div>
          )}

          {has_token && (
            <>
              <Spinner animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <span className="ms-2">Loading...</span>
            </>
          )}
        </Container>
      </div>
    </>
  );
};

export default Login;
