import styles from "./Header.module.css";

function Header({ showCourses, onToggleCourses, showGoals, onToggleGoals }) {
  return (
    <header>
      <p className="eyebrow">WEBD 172 • Week 5</p>
      <h1>Course Dashboard</h1>
      <div className={styles["app-description"]}>
        <p>
          A simple React dashboard built with components, props, state, and
          map().
        </p>
      </div>
      <div style={{ display: "flex", gap: "25px", justifyContent: "center" }}>
        <button onClick={onToggleCourses}>
          {showCourses ? "Hide Courses" : "Show Courses"}
        </button>

        <button onClick={onToggleGoals}>
          {showGoals ? "Hide Goals" : "Show Goals"}
        </button>
      </div>
    </header>
  );
}

export default Header;
