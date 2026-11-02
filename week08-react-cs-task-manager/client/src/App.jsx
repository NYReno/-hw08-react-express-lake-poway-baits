import "./App.css";

import { useState, useEffect } from "react";
import BaitCard from "./BaitCard.jsx";

// React State Hook initialization
// useState([]): Calls React's built-in useState hook and initializes state
// with an empty array ([]) as the starting value.
//
// baits: The state variable that holds current array of lure data (fetched from Express server)
// setBaits: The setter function used to update the baits variable
// function App(): The main React functional component where
// this state is scoped and tracked across re-renders.
function App() {
  const [baits, setBaits] = useState([]);

  // Controls States
  const [troutChecked, setTroutChecked] = useState(true);
  const [bassChecked, setBassChecked] = useState(true);
  const [rank, setRank] = useState("top");
  const [limit, setLimit] = useState(5);

  // Display URL state
  const [generatedUrl, setGeneratedUrl] = useState("");

  // Helper to generate the URL based on current form controls
  const buildFetchUrl = () => {
    // Built-in browser API utility that builds and
    // formats query string parameters for URLs
    // Replaces this syntax:
    // const url = "http://localhost:3000/api/catchFish?species=" + species + "&limit=" + limit;
    const params = new URLSearchParams();

    // Determine species query parameter
    if (troutChecked && !bassChecked) {
      params.append("species", "trout");
    } else if (bassChecked && !troutChecked) {
      params.append("species", "bass");
    }
    // else If both or neither are checked, omit species to get all

    if (rank) {
      params.append("rank", rank);
    }
    // else omit

    // Need limit check and a value for number
    if (limit && Number(limit) > 0) {
      params.append("limit", String(limit));
    }

    return `http://localhost:3000/api/catchFish?${params.toString()}`;
  };

  // Fetch baits from Express API
  const fetchBaits = async () => {
    const url = buildFetchUrl();
    setGeneratedUrl(url); // Also sets display URL

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Unable to load baits.");
      }
      const data = await response.json();
      setBaits(data);
    } catch (error) {
      console.error("Lake Poway Baits error", error);
    }
  };

  // Handler for check button
  const handleCheckUrl = (e) => {
    e.preventDefault();
    setGeneratedUrl(buildFetchUrl());
  };

  // Handler for send button
  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchBaits();
  };

  // Initial Load (will probably commit out layter)
  useEffect(() => {
    fetchBaits();
  }, []);

  return (
    <main className="container">
      <div className="app-header">
        <h1>Lake Poway Fishing Baits</h1>
      </div>

      {/* Query Builder Form */}
      <form onSubmit={handleFormSubmit} className="controls-form">
        <div className="data-filters">
          <div className="species-group">
            <label>
              <input
                type="checkbox"
                checked={troutChecked}
                onChange={(e) => setTroutChecked(e.target.checked)}
              />
              Trout
            </label>
            <label>
              <input
                type="checkbox"
                checked={bassChecked}
                onChange={(e) => setBassChecked(e.target.checked)}
              />
              Bass
            </label>
          </div>

          <div className="rank-set">
            <div className="control-group">
              <label htmlFor="rank-select">Limit:</label>
              <select
                id="rank-select"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>

            <div className="control-group">
              <label htmlFor="limit-input"></label>
              <input
                id="limit-input"
                type="number"
                min="1"
                max="10"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className="url-section">
          <div className="button-group">
            <button type="button" onClick={handleCheckUrl}>
              Check URL
            </button>
            <button type="submit">Send Request</button>
          </div>

          {/* Read-Only URL Preview Field */}
          <div className="url-preview-group">
            <input
              id="generated-url"
              type="text"
              value={generatedUrl}
              readOnly
              className="readonly-control url-display"
            />
          </div>
        </div>
      </form>

      {/* Bait Cards Display */}
      <div className="bait-list">
        {baits.map((fish) => (
          <BaitCard
            key={`${fish.species}-${fish.rank}`}
            species={fish.species}
            rank={fish.rank}
            name={fish.name}
            type={fish.type}
            description={fish.description}
            specialInstruction={fish.specialInstruction}
            showDesc={true}
            showInstructions={true}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
