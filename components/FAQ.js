import styles from "../styles/Faq.module.scss";
import { Container, Accordion } from "react-bootstrap";

const FAQ = () => {
  return (
    <>
      <div className={styles.containerWrapper} id="faq">
        <Container fluid="lg">
          <h2>Frequently Asked Questions</h2>
          <Accordion className={styles.accordionContainer}>
            <Accordion.Item eventKey="0">
              <Accordion.Header className={styles.accordionHeader}>
                <h3>Do you have a policy on filming & photoshoot?</h3>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Guests may shoot non-commercial photography or video for their
                  personal use (with no professional equipment, lighting, etc.)
                  in their guest room or on the property but must respect the
                  privacy of other guests within the area.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <h3>Are guest allowed in the hotel room?</h3>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Guests are allowed to visit the room. However, for overnight
                  stays beyond the capacity of each room, there will be an extra
                  person surcharge of Php1,900.00 inclusive of breakfast.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <h3>Do you have onsite laundry service?</h3>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Yes, we do. Laundry services are chargeable by the article of
                  clothing. Simply dial 1 for more information and assistance on
                  this matter. If you have opted to live in a suite room, we
                  have washing and drying facilities included within the room
                  for your convenience.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <h3>Are there minibars in the room?</h3>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  Yes, we offer complimentary welcome snacks and refreshments
                  when you follow us on social media upon check-in.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>
    </>
  );
};

export default FAQ;
