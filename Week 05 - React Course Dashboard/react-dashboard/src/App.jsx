import "./App.css";
import { useState } from "react";
import Header from "./Header.jsx";
import CourseCard from "./CourseCard.jsx";

function App() {
  // State owned by App, passed down as props to Header.jsx
  const [showCourses, setShowCourses] = useState(false); // Props to Header.jsx
  const [showGoals, setShowGoals] = useState(true);

  const courses = [
    {
      id: 1,
      title: "Full Stack JavaScript",
      description: "Build modern web applications with JavaScript.",
      goal: "Learn the full stack to write better applications.",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      description: "Explore advanced JavaScript concepts and frameworks.",
      goal: "Originally to learn about Vue, but now build a better foundation.",
    },
    {
      id: 3,
      title: "Build a Game Plaform with Vue",
      description: "Build a game development platform and engine.",
      goal: "Latest in the prove Reno is capable campaign.",
    },
    {
      id: 4,
      title: "Machine Learning and Large Language Models",
      description: "Discover how neural networks learn.",
      goal: "Wanted to build an agent for my website.",
    },
    {
      id: 5,
      title: "Pickleball For Old People",
      description: "Forced to play with people better than me.",
      goal: "Maybe to beat back the encroaching years.",
    },
  ];

  const handleToggleCourses = () => {
    setShowCourses((prev) => !prev);
  };

  const handleToggleGoals = () => {
    setShowGoals((prev) => !prev);
  };

  return (
    <main className="container">
      {/* Header component receiving state and toggle handler as props */}
      <Header
        showCourses={showCourses}
        onToggleCourses={handleToggleCourses}
        showGoals={showGoals}
        onToggleGoals={handleToggleGoals}
      />
      <p>showCourses: {String(showCourses)}</p>
      <p>showGoals: {String(showGoals)}</p>
      {/* Render courses conditionally when showCourses is true */}
      {showCourses && (
        <section className="course-list">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              goal={course.goal}
              showGoals={showGoals}
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default App;
