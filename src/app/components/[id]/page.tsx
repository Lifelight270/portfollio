interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
}

const blogs: Blog[] = [
  {
    id: 1,
    title: "Mastering React in 2025",
    content: "Full content of React in 2025...",
    image: "/blog1.jpg",
  },
  {
    id: 2,
    title: "10 Tips for Effective Web Design",
    content: "Detailed tips for web design...",
    image: "/blog2.jpg",
  },
  {
    id: 3,
    title: "The Future of JavaScript",
    content: "Insights into the future of JS...",
    image: "/blog3.jpg",
  },
];

export async function generateStaticParams() {
  return blogs.map((blog) => ({ id: blog.id.toString() }));
}

export default function BlogDetail({ params }: { params: { id: string } }) {
  const blog = blogs.find((b) => b.id.toString() === params.id);

  if (!blog) return <div className="p-6 text-center">Blog not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded shadow-md overflow-hidden">
        <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-700 text-lg">{blog.content}</p>
        </div>
      </div>
    </div>
  );
}
