"use client";
import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("SUCCESS");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("FAILED");
      }
    } catch (error) {
      setStatus("FAILED");
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white ">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Let's Start a New Project
        </h2>
        {status === "SUCCESS" && (
          <p className="text-green-500 text-center mb-4">
            Your message has been sent successfully!
          </p>
        )}
        {status === "FAILED" && (
          <p className="text-red-500 text-center mb-4">
            Failed to send the message. Please try again.
          </p>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md outline-none transition-all ease-in-out duration-300 delay-80 hover:outline-2 hover:outline-blue-400 bg-gray-100 text-gray-900 "
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md outline-none transition-all ease-in-out duration-300 delay-80 hover:outline-2 hover:outline-blue-400 bg-gray-100 text-gray-900"
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md  outline-none transition-all ease-in-out duration-300 delay-80 hover:outline-2 hover:outline-blue-400 bg-gray-100 text-gray-900"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md  outline-none transition-all ease-in-out duration-300 delay-80 hover:outline-2 hover:outline-blue-400 bg-gray-100 text-gray-800 h-32"></textarea>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 rounded-md text-white hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
