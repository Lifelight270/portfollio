"use client";

import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"SUCCESS" | "FAILED" | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

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
      console.error("Submission error:", error);
      setStatus("FAILED");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Let&apos;s Start a New Project
        </h2>

        {status === "SUCCESS" && (
          <p className="text-green-500 text-center mb-4">
            ✅ Your message has been sent successfully!
          </p>
        )}
        {status === "FAILED" && (
          <p className="text-red-500 text-center mb-4">
            ❌ Failed to send the message. Please try again.
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className="w-full p-3 rounded-md bg-gray-100 text-gray-900 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full p-3 rounded-md bg-gray-100 text-gray-900 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-gray-100 text-gray-900 outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md bg-gray-100 text-gray-900 outline-none focus:ring-2 focus:ring-blue-400 h-32"></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 bg-blue-600 rounded-md text-white transition hover:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}>
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
