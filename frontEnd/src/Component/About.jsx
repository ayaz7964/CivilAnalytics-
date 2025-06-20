import React from 'react';
import '../Css/About.css';

export default function About(){
  return (
    <div className="about-container">
      <div className="about-wrapper">
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="main-title">About SatisNation</h1>
          <p className="hero-subtitle">Empowering Citizens, Improving Governance</p>
        </section>

        {/* Main Content */}
        <section className="content-section">
          <p className="intro-text">
            SatisNation is a comprehensive platform that bridges the gap between citizens and their governments by collecting valuable feedback on public services. We believe that every citizen's voice matters in shaping better governance and improved public service delivery.
          </p>

          {/* Mission Section */}
          <div className="section-block">
            <h2 className="section-heading">Our Mission</h2>
            <p className="content-text">
              To create transparency and accountability in government services by providing citizens worldwide with a platform to share their experiences, rate services, and contribute to meaningful change in their communities.
            </p>
          </div>

          {/* What We Do Section */}
          <div className="section-block">
            <h2 className="section-heading">What We Do</h2>
            
            <div className="subsection">
              <h3 className="subsection-heading">Citizen Surveys</h3>
              <p className="content-text">
                We conduct detailed surveys across multiple countries, gathering citizen feedback on essential government services including healthcare, education, transportation, public safety, digital services, and infrastructure.
              </p>
            </div>

            <div className="subsection">
              <h3 className="subsection-heading">Country Rankings</h3>
              <p className="content-text">
                Based on citizen responses, we generate comprehensive rankings that highlight which countries excel in different service areas, creating healthy competition for improvement.
              </p>
            </div>

            <div className="subsection">
              <h3 className="subsection-heading">Data-Driven Insights</h3>
              <p className="content-text">
                Our platform transforms citizen feedback into actionable insights that governments can use to identify areas for improvement and track progress over time.
              </p>
            </div>

            <div className="subsection">
              <h3 className="subsection-heading">Global Comparison</h3>
              <p className="content-text">
                Citizens can compare their country's performance with others, fostering awareness and encouraging civic engagement for positive change.
              </p>
            </div>
          </div>

          {/* Why SatisNation Matters Section */}
          <div className="section-block">
            <h2 className="section-heading">Why SatisNation Matters</h2>
            
            <div className="two-column-section">
              <div className="column">
                <h3 className="subsection-heading">For Citizens</h3>
                <ul className="benefits-list">
                  <li><strong>Voice Your Opinion:</strong> Share your real experiences with government services</li>
                  <li><strong>Drive Change:</strong> Your feedback directly influences government awareness and policy decisions</li>
                  <li><strong>Stay Informed:</strong> Access comparative data about service quality across countries</li>
                  <li><strong>Civic Engagement:</strong> Participate actively in improving your community</li>
                </ul>
              </div>

              <div className="column">
                <h3 className="subsection-heading">For Governments</h3>
                <ul className="benefits-list">
                  <li><strong>Real Feedback:</strong> Receive unfiltered citizen perspectives on service delivery</li>
                  <li><strong>Identify Gaps:</strong> Discover areas needing immediate attention and improvement</li>
                  <li><strong>Benchmark Performance:</strong> Compare your country's performance with global standards</li>
                  <li><strong>Evidence-Based Planning:</strong> Use citizen data to make informed policy decisions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Our Approach Section */}
          <div className="section-block">
            <h2 className="section-heading">Our Approach</h2>
            <p className="content-text">
              We maintain strict anonymity and data protection standards while ensuring survey authenticity. Our methodology focuses on:
            </p>
            <ul className="approach-list">
              <li><strong>Comprehensive Coverage:</strong> Surveys across all major government service categories</li>
              <li><strong>Demographic Representation:</strong> Ensuring diverse citizen participation</li>
              <li><strong>Regular Updates:</strong> Continuous data collection for up-to-date insights</li>
              <li><strong>Transparent Methodology:</strong> Clear criteria for rankings and evaluations</li>
            </ul>
          </div>

          {/* Closing Section */}
          <div className="section-block">
            <h2 className="section-heading">Building Better Governance Together</h2>
            <p className="content-text">
              SatisNation represents more than just surveys and rankings—it's a movement toward more responsive, citizen-centered governance. By participating, you're contributing to a global effort to improve public services and strengthen the relationship between citizens and their governments.
            </p>
            <p className="content-text">
              Join thousands of citizens worldwide who are already making their voices heard. Together, we're building a future where government services truly serve the people.
            </p>
          </div>

          {/* Call to Action */}
          <div className="cta-section">
            <p className="cta-text">
              Ready to share your experience? Take our survey and help your country improve its services for everyone.
            </p>
            <button className="cta-button">Take Survey Now</button>
          </div>
        </section>
      </div>
    </div>
  );
};