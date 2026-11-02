import "./App.css";

function BaitCard({
  species,
  rank,
  name,
  type,
  description,
  specialInstruction,
  showDesc = true,
  showInstructions = true,
}) {
  return (
    <article className="bait-card">
      {/* Top Header Row: Species (Left), Rank (Right) */}
      <header className="card-header">
        <span className="card-species">{species}</span>
        <span className="card-rank">Rank #{rank}</span>
      </header>

      {/* Content Rows */}
      <div className="card-body">
        <h2 className="card-name">{name}</h2>

        {type && (
          <p className="card-row">
            <strong>Type:</strong> {type}
          </p>
        )}

        {showDesc && description && (
          <p className="card-row">
            <strong>Description:</strong> {description}
          </p>
        )}

        {showInstructions && specialInstruction && (
          <p className="card-row">
            <strong>Instructions:</strong> {specialInstruction}
          </p>
        )}
      </div>
    </article>
  );
}

export default BaitCard;
