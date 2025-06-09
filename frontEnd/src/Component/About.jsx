import React from 'react';
import '../Css/About.css';

export default function About() {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About <span className="brand">CiviAnalytics</span></h1>
        <p className="about-tagline">
          Empowering citizens. Inspiring progress. Building a better tomorrow.
        </p>
      </div>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          CiviAnalytics is dedicated to providing a transparent, data-driven platform where citizens can share their experiences and satisfaction with national services. Our mission is to amplify the voice of the people, foster accountability, and drive continuous improvement in public services worldwide.
        </p>
      </section>

      <section className="about-section about-features">
        <h2>What We Do</h2>
        <div className="about-features-list">
          <div className="about-feature">
            <span role="img" aria-label="feedback" className="about-icon">📝</span>
            <h3>Collect Feedback</h3>
            <p>
              We gather real-time, anonymous feedback from users about key domains such as healthcare, education, employment, transportation, and public safety.
            </p>
          </div>
          <div className="about-feature">
            <span role="img" aria-label="analyze" className="about-icon">📊</span>
            <h3>Analyze Data</h3>
            <p>
              Our platform processes and visualizes satisfaction scores, enabling governments, organizations, and citizens to identify strengths and areas for improvement.
            </p>
          </div>
          <div className="about-feature">
            <span role="img" aria-label="transparency" className="about-icon">🌐</span>
            <h3>Promote Transparency</h3>
            <p>
              By making satisfaction data public, we encourage open dialogue and informed decision-making.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section about-benefits">
        <h2>Why CiviAnalytics?</h2>
        <ul>
          <li><strong>Data-Driven Insights:</strong> Access up-to-date satisfaction scores and trends for countries and domains worldwide.</li>
          <li><strong>Community Impact:</strong> Your participation helps shape national priorities and improve public services.</li>
          <li><strong>Global Reach:</strong> Join a growing community of users from over 50 countries, all working towards a better future.</li>
        </ul>
      </section>

      <section className="about-section about-team">
        <h2>Meet the Team</h2>
        <div className="about-team-list">
          <div className="about-team-member">
            <img
              src="https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg?semt=ais_hybrid&w=740"
              alt="Alex Kim"
            />
            <h4>Alex Kim</h4>
            <p>Lead Developer</p>
          </div>
          <div className="about-team-member">
            <img
              src="https://facultyimages.iba-suk.edu.pk/INS-0515.jpg"
              alt="Dr. Sara Ahmed"
            />
            <h4>Dr. Sara Ahmed</h4>
            <p>Data Scientist</p>
          </div>
          <div className="about-team-member">
            <img
              src="https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3BsYXlcLzBiN2Y0ZTliLWY1OWMtNDAyNC05ZjA2LWIzZGMxMjg1MGFiNy0xOTIwLTEwODAuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9fX0="
              alt="Maria Lopez"
            />
            <h4>Maria Lopez</h4>
            <p>UI/UX Designer</p>
          </div>
        </div>
      </section>

      <section className="about-section about-contact">
        <h2>Contact Us</h2>
        <p>
          Have questions, suggestions, or want to collaborate? Reach out at <a href="mailto:info@civianalytics.com">info@civianalytics.com</a>
        </p>
      </section>

      <div className="about-quote">
        <blockquote>
          "Together, we can create a world where every voice matters and every service improves."
        </blockquote>
      </div>
    </div>
  );
}