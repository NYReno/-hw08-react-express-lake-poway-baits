import "./App.css";
import CourseCard from "./CourseCard.jsx";

function CourseList({ courses }) {
  // AManage data in the Course Array
  return (
    <section className="course-list">
      {courses.map(function (course) {
        return (
          <CourseCard
            key={course.id}
            title={course.title}
            description={course.description}
            goal={course.gaol}
          />
        );
      })}
    </section>
  );
}

export default CourseList;
