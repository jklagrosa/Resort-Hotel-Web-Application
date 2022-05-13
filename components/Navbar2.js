import { useState, useEffect } from "react";
import { Navbar, Container, Nav, Offcanvas, Badge } from "react-bootstrap";
import styles from "../styles/Navbar2.module.scss";
import { IoMenu, IoBedSharp, IoCalendarClearSharp } from "react-icons/io5";
import { useRouter } from "next/router";
import Tooltip from "@mui/material/Tooltip";

const Navigation2 = () => {
  const [colorChange, setColorChange] = useState(false);
  const [show, setShow] = useState(false);

  const [isLoggedin, setIsLoggedin] = useState(false);

  const router = useRouter();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const isAuth = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (isAuth) {
      setIsLoggedin(true);
    }
  }, []);

  useEffect(() => {
    const changeNavbarOnScroll = () => {
      if (window.scrollY >= 50) {
        setColorChange(true);
      } else {
        setColorChange(false);
      }
    };
    changeNavbarOnScroll();
    window.addEventListener("scroll", changeNavbarOnScroll);
  }, []);

  const handlePages = (path) => {
    return router.replace(path);
  };

  const handleUserLogOut = () => {
    const user_logout = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    if (user_logout) {
      localStorage.removeItem("user");
      router.push("/login");
      return;
    }
  };

  return (
    <>
      <Navbar
        expand="md"
        className={styles.navbar}
        id={colorChange ? styles.changeNavColor : ""}
      >
        <Container fluid>
          <Navbar.Brand className={styles.brand}>
            <Nav.Link
              onClick={() => handlePages("/")}
              style={{ color: "#fbeaeb" }}
            >
              Re
              <span
                style={{ color: "#080A52" }}
                id={colorChange ? styles.changeLogoPlus : ""}
              >
                +
              </span>
              tel
              <span
                style={{ color: "#080A52" }}
                id={colorChange ? styles.changeLogoPlus : ""}
              >
                z
              </span>
            </Nav.Link>
          </Navbar.Brand>

          {/* HAMBURGER ICON */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleShow}>
            <IoMenu className={styles.hambugerIcon} />
          </Navbar.Toggle>
          {/* END */}

          <Navbar.Collapse
            id="basic-navbar-nav"
            className={styles.hideNavbarLinks}
          >
            <Nav
              className="ms-auto"
              id={colorChange ? styles.navLinksChangeOnScroll : styles.navLinks}
            >
              <Nav.Link onClick={() => handlePages("/")}>Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#rooms">Rooms</Nav.Link>
              <Nav.Link href="#events">Events</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
              <Nav.Link href="#faq">FAQ</Nav.Link>

              {/* IF NOT LOGGED IN */}
              {!isLoggedin && (
                <Nav.Link
                  id={styles.LOGIN_BTN}
                  onClick={() => handlePages("/login")}
                >
                  Login
                </Nav.Link>
              )}
              {/* END */}

              {/* IF USER IS LOGGED IN */}

              {isLoggedin && (
                <>
                  <Tooltip title="View rooms reservations">
                    <Nav.Link
                      onClick={() => handlePages("/all-rooms-reservations")}
                      className="ms-3"
                    >
                      <IoBedSharp className={styles.BookNReservedIcons} />
                    </Nav.Link>
                  </Tooltip>
                  <span className="mx-2"></span>

                  <Tooltip title="View events reservations">
                    <Nav.Link
                      onClick={() => handlePages("/all-events-reservations")}
                    >
                      <IoCalendarClearSharp
                        className={styles.BookNReservedIcons}
                      />
                    </Nav.Link>
                  </Tooltip>

                  <Nav.Link id={styles.LOGOUT_BTN} onClick={handleUserLogOut}>
                    Logout
                  </Nav.Link>
                </>
              )}
              {/* END */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* NAVIGATION DRAWER */}
      <Offcanvas show={show} onHide={handleClose} className={styles.offcanvas}>
        <Offcanvas.Header closeButton className={styles.offcanvasHeader}>
          <Offcanvas.Title
            style={{ color: "white", textTransform: "uppercase" }}
          >
            Re<span style={{ color: "#fbeaeb" }}>+</span>tel
            <span style={{ color: "#fbeaeb", textTransform: "lowercase" }}>
              z
            </span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={styles.drawerLinks}>
          <a onClick={() => handlePages("/")}>Home</a>
          <a href="#about" style={{ color: "black", textDecoration: "none" }}>
            About
          </a>
          <a href="#rooms" style={{ color: "black", textDecoration: "none" }}>
            Rooms
          </a>
          <a href="#events" style={{ color: "black", textDecoration: "none" }}>
            Events
          </a>
          <a href="#contact" style={{ color: "black", textDecoration: "none" }}>
            Contact
          </a>
          <a href="#faq" style={{ color: "black", textDecoration: "none" }}>
            FAQ
          </a>

          {/* IF USER IS NOT LOGGED IN */}
          {!isLoggedin && <a onClick={() => handlePages("/login")}>Login</a>}
          {/* END */}

          {/* IF USER IS LOGGED IN */}
          {isLoggedin && (
            <>
              <a onClick={() => handlePages("/all-rooms-reservations")}>
                Room Reservation
              </a>
              <a onClick={() => handlePages("/all-events-reservations")}>
                Event Reservation
              </a>
              <a
                onClick={handleUserLogOut}
                style={{
                  marginTop: "4rem",
                  color: "red",
                  textDecoration: "underline",
                }}
              >
                Logout
              </a>
            </>
          )}
          {/* END */}
        </Offcanvas.Body>
      </Offcanvas>
      {/* END */}
    </>
  );
};

export default Navigation2;
