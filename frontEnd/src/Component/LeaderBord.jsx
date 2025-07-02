import React, { useEffect, useState } from 'react';
import '../Css/LeaderBord.css'; // Ensure this path is correct
import { Link } from 'react-router-dom';

const satisfiedCountries = [
 { name: "Pakistan", image: "https://cdn.pixabay.com/photo/2022/11/18/14/27/flag-7600240_1280.jpg" },
  { name: "France", image: "https://cdn.pixabay.com/photo/2017/08/25/20/04/international-2681245_1280.jpg" },
  { name: "China", image: "https://cdn.pixabay.com/photo/2017/08/29/22/10/germany-2695058_1280.jpg" },
  { name: "UK", image: "https://cdn.pixabay.com/photo/2017/08/28/18/51/international-2690850_1280.jpg" },
  { name: "USA", image: "https://cdn.pixabay.com/photo/2017/08/29/12/47/international-2693231_1280.jpg" },
  { name: "India", image: "https://cdn.pixabay.com/photo/2017/08/29/12/47/international-2693231_1280.jpg" },
  { name: "Bangladesh", image: "https://cdn.pixabay.com/photo/2017/08/29/12/47/international-2693231_1280.jpg" },
  { name: "Iran", image: "https://cdn.pixabay.com/photo/2017/08/29/12/47/international-2693231_1280.jpg" },
  { name: "Russia", image: "https://cdn.pixabay.com/photo/2017/08/29/12/47/international-2693231_1280.jpg" },
  { name: "Switzerland", image: "https://cdn.pixabay.com/photo/2017/08/29/12/47/international-2693231_1280.jpg" },
  { name: "Singapore", image: "https://cdn.pixabay.com/photo/2017/08/29/12/47/international-2693231_1280.jpg" },
  { name: "Afghanistan", image: "https://cdn.pixabay.com/photo/2017/08/29/12/47/international-2693231_1280.jpg" },
  { name: "England", image: "https://cdn.pixabay.com/photo/2017/08/29/12/47/international-2693231_1280.jpg" },
  { name: "Germany", image: "https://cdn.pixabay.com/photo/2017/08/29/12/47/international-2693231_1280.jpg" },
  { name: "Italy", image: "https://cdn.pixabay.com/photo/2017/08/29/12/47/international-2693231_1280.jpg" },
  { name: "Spain", image: "https://cdn.pixabay.com/photo/2017/08/29/12/47/international-2693231_1280.jpg" },
  { name: "Turkey", image: "https://cdn.pixabay.com/photo/2017/08/29/12/47/international-2693231_1280.jpg" },
  { name: "Japan", image: "https://cdn.pixabay.com/photo/2017/08/29/12/47/international-2693231_1280.jpg" },
  { name: "South Korea", image: "https://cdn.pixabay.com/photo/2017/08/29/12/47/international-2693231_1280.jpg" },
  { name: "Canada", image: "https://cdn.pixabay.com/photo/2017/08/29/12/47/international-2693231_1280.jpg" },
];

const domains = [
  { key: 'Overall', label: 'Overall' },
  { key: 'Healthcare', label: 'Healthcare' },
  { key: 'Education', label: 'Education' },
  { key: 'Employment', label: 'Employment' },
  { key: 'Transportation', label: 'Transportation' },
  { key: 'PublicSafety', label: 'Public Safety' },
];

export default function LeaderBord() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortDomain, setSortDomain] = useState('Overall');

  useEffect(() => {
    fetch('/api/')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const avgDomain = (country, domain) =>
    country.TotalUser > 0
      ? ((country[domain] / (country.TotalUser * 20)) * 100).toFixed(1)
      : 'N/A';

  const countrySatisfaction = (country) =>
    country.TotalUser > 0
      ? ((country.TotalScore / (country.TotalUser * 100)) * 100).toFixed(1)
      : 'N/A';

  const getCountryImage = (name) => {
    const found = satisfiedCountries.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );
    return found ? found.image : "https://via.placeholder.com/320x120?text=No+Image";
  };

  // Sorting logic
  const getSortValue = (country) => {
    if (sortDomain === 'Overall') return countrySatisfaction(country);
    return avgDomain(country, sortDomain);
  };

  const rankedCountries = [...countries]
    .sort((a, b) => getSortValue(b) - getSortValue(a));

  return (
    <div className="dashboardContainer">
      <div className="header">
        <h2>🏆 Country Leaderboard</h2>
        <p className="motivation">
          See how countries rank globally by overall or domain satisfaction. Use the buttons to filter by domain!
        </p>
      </div>

      {/* Domain Filter Buttons */}
      <div className="domain-filter-row">
        {domains.map((d) => (
          <button
            key={d.key}
            className={`domain-filter-btn${sortDomain === d.key ? ' active' : ''}`}
            onClick={() => setSortDomain(d.key)}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="leaderboard-table">
        <div className="leaderboard-header-row">
          <span className="leaderboard-rank-col">Rank</span>
          <span className="leaderboard-flag-col">Country</span>
          <span className="leaderboard-score-col">
            {sortDomain === 'Overall' ? 'Overall Satisfaction' : `${domains.find(d => d.key === sortDomain).label} Satisfaction`}
          </span>
          <span className="leaderboard-users-col">Users</span>
        </div>
        {loading ? (
          <div style={{ width: '100%', textAlign: 'center', padding: 24 }}>
            <h3>Loading countries...</h3>
          </div>
        ) : rankedCountries.length === 0 ? (
          <div style={{ width: '100%', textAlign: 'center', padding: 24 }}>
            <h3>No country data available.</h3>
          </div>
        ) : (
          rankedCountries.map((country, idx) => {
            const score = getSortValue(country);
            return (
              <div className="leaderboard-row" key={country._id || idx}>
                <span className="leaderboard-rank-col">#{idx + 1}</span>
                <span className="leaderboard-flag-col">
                  <img
                    src={getCountryImage(country.CountryName)}
                    alt={country.CountryName}
                    className="leaderboard-flag"
                    onError={e => { e.target.src = "https://via.placeholder.com/40x28?text=No+Image"; }}
                  />
                  <span className="leaderboard-country-name">{country.CountryName}</span>
                </span>
                <span className="leaderboard-score-col">
                  <div className="progressBarBackground main-bar leaderboard-bar">
                    <div
                      className="progressBarFill"
                      style={{
                        width: `${score}%`,
                        background: sortDomain === 'Overall'
                          ? 'linear-gradient(90deg, #ff9800 0%, #43a047 100%)'
                          : 'linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)',
                      }}
                    ></div>
                  </div>
                  <span className="leaderboard-score-value">{score}%</span>
                </span>
                <span className="leaderboard-users-col">{country.TotalUser}</span>
              </div>
            );
          })
        )}
      </div>

      {/* Insights Section */}
      <div className="global-insights">
        <h2>🌟 Insights</h2>
        <p>
          Track satisfaction trends across domains and countries. Use the filters above to compare countries in specific areas like Education or Healthcare.
        </p>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <h2>Want to Improve Your Country's Rank?</h2>
        <p>Participate in surveys and help your country climb the leaderboard!</p>
        <Link to = '/login' className="cta-btn">Take a Survey</Link>
      </div>
    </div>
  );
}