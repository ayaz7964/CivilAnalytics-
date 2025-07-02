import React from "react";
import Stat from "./Stat"; // adjust the path if needed
import "../Css/StatsSection.css";

const statsData = [
  { label: "People Joined", target: 10000, suffix: "K+" },
  { label: "Countries", target: 50, suffix: "+" },
  { label: "Categories", target: 100, suffix: "+" },
  { label: "Total Surveys", target: 5000, suffix: "K+" },
  { label: "Team Members", target: 500, suffix: "+" },
];

const StatsSection = () => {
  return (
    <div className="stats-section">
      <h2>Platform Statistics</h2>
      <div className="stats-container">
        {statsData.map((stat, index) => (
          <Stat
            key={index}
            label={stat.label}
            target={stat.target}
            suffix={stat.suffix}
          />
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
