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
    <main className="w-full min-h-screen bg-white text-gray-900">
      <div className="w-full space-y-16">
        <section>
          <Header />
        </section>
        <section>
          <About />
        </section>
        <section>
          <Education />
        </section>
        <section>
          <Experience />
        </section>
        <section>
          <Portfolio />
        </section>
        {/* <section><Blog /></section> */}
        <section>
          <Service />
        </section>
        <section>
          <ContactForm />
        </section>
      </div>
    </main>
  );
};

export default Home;
