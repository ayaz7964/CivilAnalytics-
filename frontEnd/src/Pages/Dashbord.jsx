import React from 'react';
import '../Css/Dashboard.css'; // Make sure this path is correct

export default function Dashbord() {
  // Example data (replace with real data from your backend)
  const user = {
    name: "Alex",
    surveysCompleted: 12,
    satisfactionScore: 87,
    country: "USA",
    satisfactionByField: [
      { field: "Healthcare", score: 82 },
      { field: "Education", score: 90 },
      { field: "Employment", score: 75 },
      { field: "Transport", score: 80 },
      { field: "Law & Order", score: 85 },
      { field: "Environment", score: 78 },
    ],
    topCountries: [
      { name: "Norway", score: 92 },
      { name: "Canada", score: 89 },
      { name: "USA", score: 87 },
    ],
    surveyGoal: 20, // For progress bar
  };

  const progressPercent = Math.min(
    Math.round((user.surveysCompleted / user.surveyGoal) * 100),
    100
  );

  return (
    <div className="dashboardContainer">
      <div className="header">
        <h2>Welcome back, {user.name}!</h2>
        <p className="motivation">
          Your voice shapes the future. Keep sharing your experiences and help improve national services for everyone!
        </p>
      </div>

      {/* Progress Overview */}
      <div className="progressSection">
        <h3>Survey Completion Progress</h3>
        <div className="progressBarBackground">
          <div
            className="progressBarFill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <span className="progressText">
          {user.surveysCompleted} of {user.surveyGoal} surveys completed ({progressPercent}%)
        </span>
      </div>

      <div className="statsSection">
        <div className="statCard">
          <h3>Surveys Completed</h3>
          <span className="statNumber">{user.surveysCompleted}</span>
        </div>
        <div className="statCard">
          <h3>Your Satisfaction Score</h3>
          <span className="statNumber">{user.satisfactionScore}%</span>
        </div>
        <div className="statCard">
          <h3>Your Country</h3>
          <span className="statNumber">{user.country}</span>
        </div>
      </div>

      <div className="mainContent">
        <div className="leftPanel">
          <h3>Quick Actions</h3>
          <button className="surveyButton">Take New Survey</button>
          <button className="surveyButton">View My Results</button>
        </div>
        <div className="centerPanel">
          <h3>Satisfaction by Field</h3>
          <ul className="fieldList">
            {user.satisfactionByField.map((item, idx) => (
              <li key={idx}>
                <span className="fieldName">{item.field}</span>
                <span className="fieldScore">{item.score}%</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rightPanel">
          <h3>Top Countries</h3>
          <ol className="countryList">
            {user.topCountries.map((country, idx) => (
              <li key={idx}>
                <span className="countryName">{country.name}</span>
                <span className="countryScore">{country.score}%</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="quoteSection">
        <blockquote>
          "Small actions by many people can change the world. Thank you for making a difference!"
        </blockquote>
      </div>
    </div>
  );
}