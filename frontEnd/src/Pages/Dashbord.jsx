import React, { useEffect, useState } from "react";
import "../Css/Dashboard.css";
import { useUser } from "../User/UserContext";
import { Link } from "react-router-dom";

export default function Dashbord() {
  const { state } = useUser();
  const [country, setCountry] = useState("");
  const [topCountries, setTopCountries] = useState([]);
  const [countrySatisfaction, setCountrySatisfaction] = useState(0);
  const [satisfactionByField, setSatisfactionByField] = useState([]);
  const [satisfactionScore, setSatisfactionScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      try {
        // 1. Fetch user profile for country
        const profileRes = await fetch(
          `/api/profile/username/${state.user.username}`
        );
        if (!profileRes.ok) throw new Error("Failed to load profile");
        const profile = await profileRes.json();
        setCountry(profile.country);

        // 2. Fetch all countries and calculate satisfaction rates
        const countriesRes = await fetch("/api/");
        let countriesData = [];
        if (countriesRes.ok) {
          const countriesJson = await countriesRes.json();
          // If backend already returns [{name, score}], use as is

          console.log("Countries data:", countriesJson);
          if (Array.isArray(countriesJson)) {
            countriesData = countriesJson.map((country) => ({
              name: country.CountryName,
              score: Math.round(
                (country.TotalScore / (country.TotalUser * 100)) * 100
              ), // percent
            }));
          } else {
            // If not, transform the data
            countriesData = Object.entries(countriesJson).map(
              ([name, score]) => ({
                name,
                score: Math.round((score / 20) * 100), // percent
              })
            );
          }
        }
        // Sort countries by satisfaction descending
        countriesData.sort((a, b) => (b.score || 0) - (a.score || 0));
        setTopCountries(countriesData);

        // Find user's country satisfaction rate
        const userCountryObj = countriesData.find(
          (c) => c.name === profile.country
        );
        setCountrySatisfaction(userCountryObj ? userCountryObj.score : 0);

        const surveyRes = await fetch(
          `/api/survey?username=${state.user.username}&country=${profile.country}`
        );
        if (surveyRes.ok) {
          const survey = await surveyRes.json();
          if (survey.scores) {
            setSatisfactionByField(
              Object.entries(survey.scores).map(([field, score]) => ({
                field,
                score: Math.round((score / 20) * 100), // percent
              }))
            );
          } else {
            setSatisfactionByField([]);
          }
          setSatisfactionScore(
            survey.totalScore ? Math.round((survey.totalScore / 100) * 100) : 0
          );
        } else {
          console.error("Failed to load survey scores");
          setSatisfactionByField([]);
          setSatisfactionScore(0);
        }
      } catch (e) {
        setCountry("");
        setTopCountries([]);
        setCountrySatisfaction(0);
        setSatisfactionByField([]);
        setSatisfactionScore(0);
      }
      setLoading(false);
    }
    if (state.user?.username) fetchDashboardData();
  }, [state.user?.username]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboardContainer">
      <div className="header">
        <h2>Welcome back, {state.user.username}!</h2>
        <p className="motivation">
          Your voice shapes the future. Keep sharing your experiences and help
          improve national services for everyone!
        </p>
      </div>

      {/* Progress Overview */}
      <div className="progressSection">
        <h3>Your Country Satisfaction Rate</h3>
        <div className="progressBarBackground">
          <div
            className="progressBarFill"
            style={{ width: `${countrySatisfaction}%` }}
          ></div>
        </div>
        <span className="progressText">
          {country}: {countrySatisfaction}% satisfaction
        </span>
      </div>

      <div className="statsSection">
        <div className="statCard">
          <h3>Your Satisfaction Score</h3>
          <span className="statNumber">{satisfactionScore}%</span>
        </div>
        <div className="statCard">
          <h3>Your Country</h3>
          <span className="statNumber">{country}</span>
        </div>
      </div>

      <div className="mainContent">
        <div className="leftPanel">
          <h3>Quick Actions</h3>
          <p>Take a new survey to share your feedback and help improve services.</p>
          <Link to="/survey" className="surveyButton">Take New Survey</Link>
         
        </div>
        <div className="centerPanel">
          <h3>Satisfaction by Field</h3>
          <ul className="fieldList">
            {satisfactionByField.length === 0 && <li>No data available.</li>}
            {satisfactionByField.map((item, idx) => (
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
            {topCountries.length === 0 && <li>No data available.</li>}
            {topCountries.map((country, idx) => (
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
          "Small actions by many people can change the world. Thank you for
          making a difference!"
        </blockquote>
      </div>
    </div>
  );
}
