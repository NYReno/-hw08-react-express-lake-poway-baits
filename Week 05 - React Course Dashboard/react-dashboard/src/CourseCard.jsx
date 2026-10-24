import "./App.css";

function CourseCard({ id, title, description, goal, showGoals }) {
  // Organize couse data into a card
  return (
    <div className="course-card">
      <div className="course-card-title">
        <h3>{title}</h3>
      </div>
      <div className="course-card-desc">{description}</div>

      {/* Render the goal row conditionally using the global prop */}
      {showGoals && (
        <div className="goal-row">
          <label htmlFor={`goal-${id}`}>Goal:</label>
          <textarea
            id={`goal-${id}`}
            value={goal}
            readOnly
            rows={2}
            className="readonly-control"
          />
        </div>
      )}
    </div>
  );
}

export default CourseCard;
