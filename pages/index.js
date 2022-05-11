import NavBar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Available from "../components/CheckAvailability";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import Rooms from "../components/Rooms";
import Events from "../components/Events";

import Dbconnection from "../mongodb/Dbconnection";
import RoomsModel from "../models/rooms";
import { useDispatch } from "react-redux";
import { GET_ALL_ROOMS_REDUCER } from "../store/rooms";

import Head from "next/head";

export default function Home({ rooms_data }) {
  const dispatch = useDispatch();
  const NO_ROOMS = null;
  if (rooms_data) {
    const parseData = JSON.parse(rooms_data);
    dispatch(GET_ALL_ROOMS_REDUCER(parseData));
  } else {
    dispatch(GET_ALL_ROOMS_REDUCER(NO_ROOMS));
    console.log("Cannot fetch rooms data.");
  }
  return (
    <>
      <Head>
        <title>Resort Hotel Web Application</title>
        <meta content="This resort hotel web application was designed and developed by JK Lagrosa. A frontend web developer and HTML email developer based from The Philippines." />
      </Head>

      <NavBar />
      <Hero />
      <Available />
      <About />
      <Rooms />
      <Events />
      <Contact />
      <FAQ />
      <Footer />
      <Copyright />
    </>
  );
}

export async function getStaticProps() {
  await Dbconnection();
  const getRooms = await RoomsModel.find({});
  if (getRooms) {
    console.log(`Fetch success: ${getRooms}`);
    return {
      props: {
        rooms_data: JSON.stringify(getRooms),
      },
    };
  } else {
    return {
      props: {
        rooms_data: null,
      },
    };
  }
}
