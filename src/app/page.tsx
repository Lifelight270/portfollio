// src/pages/index.tsx
import React from "react";
import Header from "./components/Header";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Portfolio from "./components/Portfolio";
import ContactForm from "./components/ContactForm";
import Service from "./components/Service";
// import Blog from "./components/Blogs";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <About />
      <Education />
      <Experience />
      <Portfolio />
      {/* <Blog/> */}
      <Service/>
      <ContactForm />
    </>
  );
};

export default Home;
