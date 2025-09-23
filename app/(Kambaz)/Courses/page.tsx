"use client";

import KambazNavigation from "../Navigation";
import Link from "next/link";
import Image from "next/image";

export default function Courses() {
  const courses = [
    {
      id: "1234",
      name: "CS1234 React JS",
      desc: "Full Stack Software Developer",
      img: "/images/reactjs.jpg",
    },
    {
      id: "2345",
      name: "CS2345 Python",
      desc: "Python Programming Essentials",
      img: "/images/python.jpg",
    },
    {
      id: "3456",
      name: "CS3456 JavaScript",
      desc: "Modern JavaScript Development",
      img: "/images/javascript.jpg",
    },
    {
      id: "4567",
      name: "CS4567 Node JS",
      desc: "Backend Development with Node.js",
      img: "/images/nodejs.jpg",
    },
    {
      id: "5678",
      name: "CS5678 Angular",
      desc: "Frontend Development with Angular",
      img: "/images/angular.jpg",
    },
    {
      id: "6789",
      name: "CS6789 Java",
      desc: "Core Java Programming",
      img: "/images/java.jpg",
    },
    {
      id: "7890",
      name: "CS7890 C++",
      desc: "Advanced C++ Programming",
      img: "/images/cpp.jpg",
    },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left Sidebar */}
      <KambazNavigation />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Courses</h1>
        <hr />
        <h2>Published Courses ({courses.length})</h2>
        <hr />

        {/* Grid layout like Dashboard */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {courses.map((course) => (
            <div
              key={course.id}
              style={{
                width: "200px",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <Link href={`/Courses/${course.id}/Home`}>
                <Image
                  src={course.img}
                  width={200}
                  height={150}
                  alt={course.name}
                />
                <h5>{course.name}</h5>
                <p>{course.desc}</p>
                <button>Go</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
