import React, { useState, useEffect, useRef } from "react";
import { useUser } from "../User/UserContext";
import "../Css/Survey.css";

const DOMAINS = [
  {
    key: "healthcare",
    label: "Healthcare",
    questions: [
      "How easy is it to get an appointment with a doctor?",
      "How affordable are healthcare services in your country?",
      "How would you rate the quality of medical care?",
      "Are hospitals and clinics well-equipped?",
      "Do emergency services respond quickly and effectively?",
      "Are medications easily accessible and affordable?",
      "Do you trust the healthcare system in your country?",
      "Is mental health support accessible and effective?",
      "Is healthcare available equally to all regions/populations?",
      "Are health insurance options effective and affordable?",
    ],
  },
  {
    key: "education",
    label: "Education",
    questions: [
      "Are public schools in your area high quality?",
      "Are teachers well-trained and competent?",
      "Is higher education (college/university) accessible?",
      "Is education affordable at all levels?",
      "Is there access to digital learning resources?",
      "Are schools safe and inclusive for all students?",
      "Does the curriculum prepare students for the real world?",
      "Are there enough schools in your area?",
      "Do schools support students with special needs?",
      "Are vocational and alternative learning options available?",
    ],
  },
  {
    key: "publicSafety",
    label: "Public Safety & Law Enforcement",
    questions: [
      "Do you feel safe walking in your neighborhood at night?",
      "Are police responsive and helpful when needed?",
      "Is crime well-controlled in your area?",
      "Do you trust the police and justice system?",
      "Are laws enforced fairly for all people?",
      "Is road safety well managed (e.g., traffic, accidents)?",
      "Are emergency services (fire, rescue) reliable?",
      "Are violent crimes rare in your city?",
      "Do you feel protected in public spaces (parks, transit)?",
      "Are there efforts to reduce domestic or gender-based violence?",
    ],
  },
  {
    key: "transportation",
    label: "Transportation & Infrastructure",
    questions: [
      "Is public transportation reliable and safe?",
      "Are roads and highways in good condition?",
      "Are traffic rules enforced and effective?",
      "Is the cost of public transport affordable?",
      "Is your area well-connected by transit options?",
      "Are airports, train stations, and bus stations efficient?",
      "Are alternative transport modes supported (bikes, walking)?",
      "Is transportation accessible for the elderly and disabled?",
      "Are there frequent traffic jams or transport delays?",
      "Is infrastructure maintained and updated regularly?",
    ],
  },
  {
    key: "employment",
    label: "Employment & Social Support",
    questions: [
      "Are there enough job opportunities in your region?",
      "Is it easy to find work in your field or skill area?",
      "Are wages fair and adequate for living expenses?",
      "Is unemployment support available and effective?",
      "Is there government support during economic hardship?",
      "Do social services help the most vulnerable people?",
      "Is housing assistance available if needed?",
      "Are job training or upskilling programs accessible?",
      "Do pensions and retirement systems work well?",
      "Is discrimination (gender, race, disability) low in hiring?",
    ],
  },
];

const OPTIONS = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Somewhat" },
  { value: 2, label: "Yes/Very satisfied" },
];

function formatCountdown(seconds) {
  if (seconds <= 0) return "Now!";
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${d}d ${h}h ${m}m ${s}s`;
}

export default function Survey() {
  const { state } = useUser();
  const user = state?.user;
  const [step, setStep] = useState(-1); // -1 = info, 0 = first domain
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [popup, setPopup] = useState(""); // For error/info popups
  const [nextAllowedDate, setNextAllowedDate] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const countdownInterval = useRef(null);

  // Pre-fill answers object
  useEffect(() => {
    if (Object.keys(answers).length === 0) {
      const initial = {};
      DOMAINS.forEach((domain) => {
        initial[domain.key] = Array(domain.questions.length).fill(null);
      });
      setAnswers(initial);
    }
  }, [answers]);

  // On mount: check if user can submit survey
  useEffect(() => {
    if (!user) return;
    async function checkSurvey() {
      try {
        // Dummy scores for check
        const dummyScores = {};
        DOMAINS.forEach((d) => (dummyScores[d.key] = 1));
        const res = await fetch("/api/survey", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: user.username,
            country: user.country || "",
            scores: dummyScores,
            totalScore: 5,
          }),
        });
        if (!res.ok) {
          const data = await res.json();
          if (data.nextAllowed) {
            setNextAllowedDate(data.nextAllowed);
            const seconds =
              Math.floor(
                (new Date(data.nextAllowed).getTime() - Date.now()) / 1000
              ) + 1;
            setCountdown(seconds > 0 ? seconds : 0);
            setPopup(
              "You have already submitted a survey recently. You can submit again after the countdown."
            );
          }
        }
      } catch (e) {
        // ignore
      }
    }
    checkSurvey();
    // eslint-disable-next-line
  }, [user]);

  // Countdown timer logic
  useEffect(() => {
    if (countdown === null) return;
    if (countdown <= 0) {
      setCountdown(null);
      setNextAllowedDate(null);
      setPopup("");
      return;
    }
    countdownInterval.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(countdownInterval.current);
          setNextAllowedDate(null);
          setPopup("");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(countdownInterval.current);
  }, [countdown]);

  const handleChange = (domainKey, qIdx, value) => {
    setAnswers((prev) => ({
      ...prev,
      [domainKey]: prev[domainKey].map((v, i) => (i === qIdx ? value : v)),
    }));
  };

  const handleNext = () => {
    const currentDomain = DOMAINS[step];
    const missing = answers[currentDomain.key].findIndex((v) => v === null);
    if (missing !== -1) {
      setPopup(
        `You missed question #${missing + 1} in "${currentDomain.label}". Please answer all questions before continuing.`
      );
      return;
    }
    setStep((s) => s + 1);
  };

  const handlePrev = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    const currentDomain = DOMAINS[step];
    const missing = answers[currentDomain.key].findIndex((v) => v === null);
    if (missing !== -1) {
      setPopup(
        `You missed question #${missing + 1} in "${currentDomain.label}". Please answer all questions before submitting.`
      );
      return;
    }
    setSubmitting(true);
    // Calculate scores
    const scores = {};
    let totalScore = 0;
    DOMAINS.forEach((domain) => {
      const sum = answers[domain.key].reduce((a, b) => a + (b ?? 0), 0);
      scores[domain.key] = sum;
      totalScore += sum;
    });

    // Save to backend
    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          country: user.country || "",
          scores,
          totalScore,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        if (data.error && data.error.includes("30 days")) {
          if (data.nextAllowed) {
            setNextAllowedDate(data.nextAllowed);
            const seconds =
              Math.floor(
                (new Date(data.nextAllowed).getTime() - Date.now()) / 1000
              ) + 1;
            setCountdown(seconds > 0 ? seconds : 0);
            setPopup(
              `You have already submitted a survey recently. You can submit again after: ${new Date(
                data.nextAllowed
              ).toLocaleString()}`
            );
          } else {
            setPopup(
              "You have already submitted a survey recently. You can submit again after 30 days."
            );
          }
        } else {
          setPopup(data.error || "Failed to submit survey.");
        }
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch (e) {
      setPopup("Failed to submit survey. Please try again.");
    }
    setSubmitting(false);
  };

  // Progress calculation
  const domainProgress = (domainKey) => {
    const arr = answers[domainKey];
    if (!arr) return 0;
    return (arr.filter((v) => v !== null).length / arr.length) * 100;
  };
  const overallProgress =
    (Object.values(answers)
      .flat()
      .filter((v) => v !== null).length /
      (DOMAINS.length * 10)) *
    100;

  // Scoring for summary
  const domainScores = DOMAINS.map((d) => ({
    label: d.label,
    score: answers[d.key]?.reduce((a, b) => a + (b ?? 0), 0) ?? 0,
  }));
  const totalScore = domainScores.reduce((a, b) => a + b.score, 0);

  if (!user)
    return (
      <div className="survey-tab-container">
        <div className="survey-info-card">Please log in to take the survey.</div>
      </div>
    );

  if (submitted)
    return (
      <div className="survey-tab-container">
        <div className="survey-info-card animate-fadein">
          <h2>Thank you for completing the survey!</h2>
          <p>
            Your feedback helps us understand and improve quality of life in your country.
          </p>
          <div className="survey-summary">
            <h3>Your Scores</h3>
            {domainScores.map((d) => (
              <div key={d.label} className="survey-summary-row">
                <span>{d.label}:</span>
                <span>
                  {d.score} / 20 ({((d.score / 20) * 100).toFixed(0)}%)
                </span>
              </div>
            ))}
            <div className="survey-summary-row survey-summary-total">
              <span>Total Satisfaction:</span>
              <span>
                {totalScore} / 100 ({totalScore}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    );

  if (countdown !== null && countdown > 0)
    return (
      <div className="survey-tab-container">
        <div className="survey-info-card animate-fadein">
          <h2>Survey Already Submitted</h2>
          <p>
            You can submit the survey again after:
            <br />
            <span style={{ color: "red", fontWeight: "bold", fontSize: 22 }}>
              {formatCountdown(countdown)}
            </span>
          </p>
        </div>
      </div>
    );

  return (
    <div className="survey-tab-container">
      {/* Popup for errors or info */}
      {popup && (
        <div className="survey-popup-overlay" onClick={() => setPopup("")}>
          <div className="survey-popup" onClick={e => e.stopPropagation()}>
            <div className="survey-popup-message">{popup}</div>
            {nextAllowedDate && (
              <div style={{ margin: "10px 0", color: "#888" }}>
                Next allowed: {new Date(nextAllowedDate).toLocaleString()}
              </div>
            )}
            <button className="survey-btn survey-btn-primary" onClick={() => setPopup("")}>
              OK
            </button>
          </div>
        </div>
      )}

      {step === -1 ? (
        <div className="survey-info-card animate-fadein">
          <h2>Welcome to the National Quality of Life Survey</h2>
          <p>
            This professional survey helps us assess satisfaction across key areas of life in your country.
            <br />
            <strong>Instructions:</strong>
            <ul>
              <li>Answer each question honestly based on your experience.</li>
              <li>
                Each question is scored: <b>0</b> (Not at all), <b>1</b> (Somewhat), <b>2</b> (Yes/Very satisfied).
              </li>
              <li>
                Each domain is worth <b>20 points</b>. Your total satisfaction score is out of <b>100</b>.
              </li>
              <li>
                Progress is saved as you go. You can review answers before submitting.
              </li>
            </ul>
          </p>
          <button className="survey-btn survey-btn-primary" onClick={() => setStep(0)}>
            Start Survey
          </button>
        </div>
      ) : (
        <div className="survey-form-card animate-slidein">
          <div className="survey-progress-bar">
            <div
              className="survey-progress-bar-inner"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <h2>
            {DOMAINS[step].label} <span className="survey-step">{step + 1} / {DOMAINS.length}</span>
          </h2>
          <div className="survey-domain-progress">
            <div className="survey-domain-progress-bar">
              <div
                className="survey-domain-progress-bar-inner"
                style={{ width: `${domainProgress(DOMAINS[step].key)}%` }}
              />
            </div>
            <span>
              {answers[DOMAINS[step].key].filter((v) => v !== null).length} / 10 answered
            </span>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (step < DOMAINS.length - 1) handleNext();
              else handleSubmit();
            }}
          >
            <div className="survey-questions-list">
              {DOMAINS[step].questions.map((q, idx) => (
                <div
                  className={`survey-question animate-fadein ${
                    answers[DOMAINS[step].key][idx] === null && popup
                      ? "survey-question-missing"
                      : ""
                  }`}
                  key={q}
                >
                  <div className="survey-question-label">
                    {idx + 1}. {q}
                  </div>
                  <div className="survey-options">
                    {OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className={`survey-option ${
                          answers[DOMAINS[step].key][idx] === opt.value
                            ? "selected"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q${idx}`}
                          value={opt.value}
                          checked={answers[DOMAINS[step].key][idx] === opt.value}
                          onChange={() =>
                            handleChange(DOMAINS[step].key, idx, opt.value)
                          }
                          required
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="survey-form-actions">
              {step > 0 && (
                <button
                  type="button"
                  className="survey-btn survey-btn-secondary"
                  onClick={handlePrev}
                  disabled={submitting}
                >
                  Previous
                </button>
              )}
              <button
                type="submit"
                className="survey-btn survey-btn-primary"
                disabled={
                  answers[DOMAINS[step].key].some((v) => v === null) || submitting
                }
              >
                {step === DOMAINS.length - 1 ? "Submit Survey" : "Next"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}