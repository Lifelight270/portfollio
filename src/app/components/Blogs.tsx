"use client";
import Link from "next/link";
import React from "react";

const blogs = [
  {
    id: 1,
    title: "Mastering React in 2025",
    description:
      "Discover the latest trends and best practices for mastering React in 2025.",
    image: "/blog1.jpg",
  },
  {
    id: 2,
    title: "10 Tips for Effective Web Design",
    description:
      "Learn the secrets to creating stunning and user-friendly web designs.",
    image: "/blog2.jpg",
  },
  {
    id: 3,
    title: "The Future of JavaScript",
    description:
      "Explore where JavaScript is headed and what you need to know.",
    image: "/blog3.jpg",
  },
];

const Blogs = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Recent Blogs
        </h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4">{blog.description}</p>
                <Link
                  href={`/blogs/${blog.id}`}
                  className="text-blue-500 hover:underline font-medium">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
