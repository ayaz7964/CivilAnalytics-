import React, { useEffect, useState } from 'react';
import '../Css/Home.css';
import StatsSection from './StatsSection';

const satisfiedCountries = [
  { name: "Pakistan", image: "https://cdn.pixabay.com/photo/2022/11/18/14/27/flag-7600240_1280.jpg" },
  { name: "France", image: "https://cdn.pixabay.com/photo/2017/08/25/20/04/international-2681245_1280.jpg" },
  { name: "China", image: "https://cdn.pixabay.com/photo/2017/08/29/22/10/germany-2695058_1280.jpg" },
  { name: "UK", image: "https://cdn.pixabay.com/photo/2017/08/28/18/51/international-2690850_1280.jpg" },
  { name: "USA", image: "https://cdn.pixabay.com/photo/2017/08/29/12/47/international-2693231_1280.jpg" },
];

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Sort all countries for global ranking
  const rankedCountries = [...countries].sort(
    (a, b) => countrySatisfaction(b) - countrySatisfaction(a)
  );
  // Top 5 for display
  const sortedCountries = rankedCountries.slice(0, 5);

  // Global averages for insights
  const globalStats = (() => {
    if (!countries.length) return {};
    const domains = ['Healthcare', 'Education', 'Employment', 'Transportation', 'PublicSafety'];
    const totalUsers = countries.reduce((sum, c) => sum + c.TotalUser, 0);
    const avg = {};
    domains.forEach(domain => {
      const sum = countries.reduce((acc, c) => acc + (c[domain] || 0), 0);
      avg[domain] = totalUsers > 0 ? ((sum / (totalUsers * 20)) * 100).toFixed(1) : 'N/A';
    });
    const totalScore = countries.reduce((acc, c) => acc + (c.TotalScore || 0), 0);
    avg.Overall = totalUsers > 0 ? ((totalScore / (totalUsers * 100)) * 100).toFixed(1) : 'N/A';
    return avg;
  })();

  // Featured country (the #1 ranked)
  const featured = rankedCountries[0];

  return (
    <div className="dashboardContainer">
      {/* Welcome Section */}
      <div className="header">
        <h2>🌍 Global Country Satisfaction Dashboard</h2>
        <p className="motivation">
          Explore the top 5 countries by citizen satisfaction. Your feedback shapes a better world!
        </p>
      </div>

      {/* Featured Country Section */}
      {featured && (
        <div className="featured-country-section">
          <div className="featured-img-wrap">
            <img
              src={getCountryImage(featured.CountryName)}
              alt={featured.CountryName}
              className="featured-country-image"
              onError={e => { e.target.src = "https://via.placeholder.com/320x120?text=No+Image"; }}
            />
          </div>
          <div className="featured-country-info">
            <div className="featured-rank">#1</div>
            <h2>{featured.CountryName} <span className="featured-badge">Top Ranked</span></h2>
            <div className="progressBarBackground main-bar">
              <div
                className="progressBarFill"
                style={{
                  width: `${countrySatisfaction(featured)}%`,
                  background: 'linear-gradient(90deg, #ff9800 0%, #43a047 100%)',
                }}
              ></div>
            </div>
            <div className="progressText">
              <strong>Overall Satisfaction:</strong>
              <span className="country-score">{countrySatisfaction(featured)}%</span>
            </div>
            <div className="featured-country-users">
              <span>👥 {featured.TotalUser} users</span>
            </div>
          </div>
        </div>
      )}

      {/* Horizontal Scrollable Countries */}
      <div className="country-scroll-section">
        {loading ? (
          <div style={{ width: '100%', textAlign: 'center' }}>
            <h3>Loading countries...</h3>
          </div>
        ) : sortedCountries.length === 0 ? (
          <div style={{ width: '100%', textAlign: 'center' }}>
            <h3>No country data available.</h3>
          </div>
        ) : (
          <div className="country-row">
            {sortedCountries.map((country, idx) => {
              const satisfaction = countrySatisfaction(country);
              const domains = [
                { label: "Healthcare", value: avgDomain(country, 'Healthcare') },
                { label: "Education", value: avgDomain(country, 'Education') },
                { label: "Employment", value: avgDomain(country, 'Employment') },
                { label: "Transportation", value: avgDomain(country, 'Transportation') },
                { label: "Public Safety", value: avgDomain(country, 'PublicSafety') },
              ];
              // Find global ranking
              const globalRank = rankedCountries.findIndex(
                c => c.CountryName === country.CountryName
              ) + 1;
              return (
                <div className="country-card" key={country._id || idx}>
                  <div className="country-rank-badge">#{globalRank}</div>
                  <div className="country-flag-wrap">
                    <img
                      src={getCountryImage(country.CountryName)}
                      alt={country.CountryName}
                      className="country-image"
                      onError={e => { e.target.src = "https://via.placeholder.com/320x120?text=No+Image"; }}
                    />
                  </div>
                  <h3 className="country-title">{country.CountryName}</h3>
                  <div className="progressBarBackground main-bar">
                    <div
                      className="progressBarFill"
                      style={{
                        width: `${satisfaction}%`,
                        background: 'linear-gradient(90deg, #ff9800 0%, #43a047 100%)',
                      }}
                    ></div>
                  </div>
                  <div className="progressText">
                    <strong>Overall Satisfaction:</strong>
                    <span className="country-score">{satisfaction}%</span>
                  </div>
                  <ul className="fieldList">
                    {domains.map((domain, i) => (
                      <li key={i}>
                        <span className="fieldName">{domain.label}</span>
                        <span className="fieldScore">{domain.value}%</span>
                        <div className="progressBarBackground domain-bar">
                          <div
                            className="progressBarFill"
                            style={{
                              width: `${domain.value}%`,
                              background: 'linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)',
                              height: 18,
                            }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="country-users">
                    <span>👥 {country.TotalUser} users</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Global Insights Section */}
      <div className="global-insights">
        <h2>🌟 Global Insights</h2>
        <div className="global-avg-row">
          <div className="global-avg-card">
            <span className="global-label">Overall</span>
            <span className="global-value">{globalStats.Overall}%</span>
          </div>
          <div className="global-avg-card">
            <span className="global-label">Healthcare</span>
            <span className="global-value">{globalStats.Healthcare}%</span>
          </div>
          <div className="global-avg-card">
            <span className="global-label">Education</span>
            <span className="global-value">{globalStats.Education}%</span>
          </div>
          <div className="global-avg-card">
            <span className="global-label">Employment</span>
            <span className="global-value">{globalStats.Employment}%</span>
          </div>
          <div className="global-avg-card">
            <span className="global-label">Transport</span>
            <span className="global-value">{globalStats.Transportation}%</span>
          </div>
          <div className="global-avg-card">
            <span className="global-label">Safety</span>
            <span className="global-value">{globalStats.PublicSafety}%</span>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <h2>Ready to Make a Difference?</h2>
        <p>Share your experience and help your country climb the satisfaction ranks!</p>
        <button className="cta-btn">Take a Survey</button>
      </div>

      {/* Statistics Section */}

      <StatsSection/>
      
      {/* <div className="stats-section">
        <h2>Platform Statistics</h2>
        <div className="stats-container">
          <div className="stat">
            <div className="circle">10K+</div>
            <p>People Joined</p>
          </div>
          <div className="stat">
            <div className="circle">50+</div>
            <p>Countries</p>
          </div>
          <div className="stat">
            <div className="circle">100+</div>
            <p>Categories</p>
          </div>
          <div className="stat">
            <div className="circle">5K+</div>
            <p>Total Surveys</p>
          </div>
          <div className="stat">
            <div className="circle">500+</div>
            <p>Team Members</p>
          </div>
        </div>
      </div> */}

      {/* Motivational Quote */}
      <div className="quoteSection">
        <blockquote>
          "Every voice counts. See how your country is performing and inspire positive change!"
        </blockquote>
      </div>
    </div>
  );
}