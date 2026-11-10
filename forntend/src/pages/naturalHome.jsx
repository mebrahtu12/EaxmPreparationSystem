import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./naturalHome.css";
import applogo from "../assets/images/Study Smarter Not Harder.png";
import bell from "../assets/icons/bell-solid-full.svg";
import department from "../assets/icons/graduation.svg";
import timer from "../assets/icons/timer-clock.svg";
import checkmark from "../assets/icons/check-solid-full.svg";
import scanphoto from "../assets/icons/camera-regular-full.svg";
import bookico from "../assets/icons/book-open.svg";
import homeico from "../assets/icons/home.svg";

const depts = [
  {
    name: "Computting",
    code: "CO",
    department: "Natural Sciences",
    courses: "12 courses",
    classname: "software",
    slug: "computing",
  },
  {
    name: "Electrical Eng.",
    code: "EE",
    department: "Natural Sciences",
    courses: "10 courses",
    classname: "electrical",
    slug: "electrical",
  },
  {
    name: "Economics",
    code: "EC",
    department: "Social Sciences",
    courses: "8 courses",
    classname: "economics",
    slug: "economics",
  },
  {
    name: "Logistics",
    code: "Lg",
    department: "Social Sciences",
    courses: "9 courses",
    classname: "logistics",
    slug: "logistics",
  },
];

function Home() {
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeLink, setActiveLink] = useState("home");
  let availableCourse = 0;

  const filtereddept = depts.filter((dept) => {
    const matchesCategory =
      activeCategory === "All" || dept.department === activeCategory;

    const matchesSearch = dept.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  depts.forEach((dept) => {
    dept.code;
    availableCourse++;
  });

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
    }
  }

  function handleScan() {
    if (!selectedFile) {
      fileInput.current?.click();
      return;
    }

    alert(
      `Selected: ${selectedFile.name}. Question scanning will be connected to the backend next.`,
    );
  }

  function handleLogout() {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("user");

    navigate("/login", { replace: true });
  }

  return (
    <div className="home-layout">
      <aside className="home-sidebar">
        <Link to="/" className="home-brand">
          <div className="applogo-bgc">
            <img className="brand-icon" src={applogo} />
          </div>
          <span>UniExam</span>
        </Link>

        <p className="sidebar-label">WORKSPACE</p>

        <nav className="sidebar-nav" aria-label="Main navigation">
          <Link
            to="/home"
            className={`sidebar-link ${activeLink === "home" ? "active" : ""}`}
            onClick={() => setActiveLink("home")}
          >
            <span>
              <img src={homeico} alt="" />
            </span>{" "}
            Overview
          </Link>

          <button
            className={`sidebar-link ${activeLink === "courses" ? "active" : ""}`}
            onClick={() => {
              document.getElementById("courses")?.scrollIntoView({
                behavior: "smooth",
              });
              setActiveLink("courses");
            }}
          >
            <span>
              <img src={bookico} alt="book icon" />
            </span>{" "}
            My Courses
          </button>

          <button
            className={`sidebar-link ${activeLink === "History" ? "active" : ""}`}
            onClick={() => {
              navigate("/history");
              setActiveLink("History");
            }}
          >
            <span>◷</span> Study History
          </button>

          <button
            className={`sidebar-link ${activeLink === "Setting" ? "active" : ""}`}
            onClick={() => {
              navigate("/settings");
              setActiveLink("Setting");
            }}
          >
            <span>⚙</span> Settings
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button className="sidebar-link logout-link" onClick={handleLogout}>
            <span>↪</span> Sign out
          </button>
        </div>
      </aside>

      <main className="home-main">
        <header className="home-topbar">
          <div>
            <p className="topbar-caption">YOUR LEARNING SPACE</p>
          </div>

          <div className="topbar-actions">
            <button
              className="notification-button"
              aria-label="Notifications"
              title="Notifications"
              onClick={() => alert("Notifications will be added later.")}
            >
              <img src={bell} />
            </button>

            <button
              className="profile-button"
              onClick={() => alert("Student profile will be added later.")}
            >
              <span className="profile-avatar">SM</span>
              <span className="profile-name">Student</span>
              <span className="profile-chevron">⌄</span>
            </button>
          </div>
        </header>

        <section className="home-welcome">
          <div className="welcome-content">
            <span className="welcome-badge">
              <span>✦</span> YOUR NEXT CHAPTER STARTS HERE
            </span>

            <h2>
              Learn with purpose.
              <br />
              <span>Achieve more.</span>
            </h2>

            <p>
              Your learning journey, all in one place. Explore courses, practice
              questions, and prepare for your exams.
            </p>

            <div className="welcome-actions">
              <button
                className="primary-home-button"
                onClick={() =>
                  document.getElementById("courses")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                Explore Courses <span>→</span>
              </button>

              <button className="secondary-home-button" onClick={handleScan}>
                <img src={scanphoto} /> Scan a Question
              </button>

              <input
                ref={fileInput}
                type="file"
                accept="image/*,.pdf"
                className="home-file-input"
                onChange={handleFileChange}
              />
            </div>

            {selectedFile && (
              <p className="selected-file">Selected: {selectedFile.name}</p>
            )}
          </div>

          <div className="welcome-art" aria-hidden="true">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />

            <div className="art-book">
              <div className="book-spine" />
              <span className="book-symbol">UniExam</span>
              <span className="book-lines" />
              <span className="book-lines short" />
              <span className="book-lines" />
            </div>

            <div className="floating-note note-top">
              <span>✦</span> Keep growing
            </div>

            <div className="floating-note note-bottom">
              <span>✓</span> You've got this!
            </div>

            <span className="art-star star-one">✦</span>
            <span className="art-star star-two">✧</span>
          </div>
        </section>

        <section className="home-stats" aria-label="Study statistics">
          <article className="stat-card">
            <img className="stat-card-icon stat-violet" src={department} />
            <div>
              <p>Available departments</p>
              <h3>{availableCourse}</h3>
              <span className="stat-note">Explore your field</span>
            </div>
          </article>

          <article className="stat-card">
            <img className="stat-card-icon stat-green" src={checkmark} />
            <div>
              <p>Questions practiced</p>
              <h3>0</h3>
              <span className="stat-note">Your journey starts now</span>
            </div>
          </article>

          <article className="stat-card">
            <img className="stat-card-icon stat-or" src={timer} />
            <div>
              <p>Study time</p>
              <h3>0 hrs</h3>
              <span className="stat-note">Every minute counts</span>
            </div>
          </article>
        </section>

        <section className="courses-section" id="courses">
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">FIND YOUR PATH</p>
              <h2>Explore departments</h2>
              <p className="section-description">
                Choose your field and discover courses to study.
              </p>
            </div>
          </div>

          <div className="course-toolbar">
            <div className="course-search">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search departments..."
                aria-label="Search departments"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="category-filters" aria-label="Filter departments">
              {["All", "Natural Sciences", "Social Sciences"].map(
                (category) => (
                  <button
                    key={category}
                    className={`filter-button ${
                      activeCategory === category ? "selected" : ""
                    }`}
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={activeCategory === category}
                  >
                    {category}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="course-grid">
            {filtereddept.map((dept) => (
              <button
                key={dept.slug}
                onClick={() => navigate(`/department/${dept.slug}`)}
              >
                <article
                  className={`course-card ${dept.classname}`}
                  key={dept.code}
                >
                  <h3>{dept.name}</h3>
                  <p>{dept.courses} available to explore</p>
                </article>
              </button>
            ))}
          </div>

          {filtereddept.length === 0 && (
            <div className="empty-courses">
              <span>⌕</span>
              <h3>No departments found</h3>
              <p>Try a different search or category.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section className="home-bottom-banner">
          <div className="banner-icon">✦</div>
          <div>
            <h3>Ready to test your knowledge?</h3>
            <p>Practice quizzes and mock exams are coming to UniPrep.</p>
          </div>
          <span className="banner-arrow">→</span>
        </section>

        <footer className="home-footer">
          <span>© {new Date().getFullYear()} UniExam</span>
          <span>Built for your future.</span>
        </footer>
      </main>
    </div>
  );
}

export default Home;
