
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProgramStudyPage.css";


const studyData = {
  computing: {
    "Software Engineering": {
      semesters: [
        {
          name: "First Semester",
          courses: [
            {
              id: 1,
              name: "Object-Oriented Programming",
              code: "OOP101",
              materials: [
                { title: "Introduction to OOP", type: "PDF", url: "#" },
                { title: "OOP Short Notes", type: "Notes", url: "#" },
              ],
              questions: [
                {
                  question: "What is encapsulation in OOP?",
                  answer:
                    "Encapsulation combines data and methods in a class and controls access to its internal state.",
                },
                {
                  question: "What is a class?",
                  answer:
                    "A class is a blueprint used to create objects.",
                },
              ],
            },
            {
              id: 2,
              name: "Database Systems",
              code: "DB102",
              materials: [
                { title: "Database Fundamentals", type: "PDF", url: "#" },
                { title: "SQL Short Notes", type: "Notes", url: "#" },
              ],
              questions: [
                {
                  question: "What is a primary key?",
                  answer:
                    "A primary key uniquely identifies each record in a table.",
                },
              ],
            },
          ],
        },
        {
          name: "Second Semester",
          courses: [
            {
              id: 3,
              name: "Data Structures and Algorithms",
              code: "DSA201",
              materials: [
                { title: "Data Structures Introduction", type: "PDF", url: "#" },
                { title: "Algorithm Short Notes", type: "Notes", url: "#" },
              ],
              questions: [
                {
                  question: "What is a stack?",
                  answer:
                    "A stack is a data structure that follows Last In, First Out (LIFO).",
                },
              ],
            },
          ],
        },
      ],
    },
  },
};

function ProgramStudyPage() {
  const { departmentSlug, programName } = useParams();
  const [activeCategory, setActiveCategory] = useState("First Year");
  const [semesterIndex, setSemesterIndex] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("materials");
  const [selectedFile, setSelectedFile] = useState(null);

  const decodedProgramName = decodeURIComponent(programName || "");
  const program = studyData[departmentSlug]?.[decodedProgramName];
  const semester = program?.semesters[semesterIndex];

  if (!program) {
    return (
      <main className="study-page">
        <h2>Program not found</h2>
        <p>This program has not been added to the sample study data yet.</p>
        <Link to={`/department/${departmentSlug}`}>
          Back to Department
        </Link>
      </main>
    );
  }

  const course = semester.courses.find(
    (item) => item.id === selectedCourse
  );

  function changeSemester(index) {
    setSemesterIndex(index);
    setSelectedCourse(null);
    setActiveTab("materials");
  }

  return (
    <main className="study-page">
      <header className="study-header">
        <div>
          <p className="study-eyebrow">UNI EXAM / STUDY CENTER</p>
          <h1>{decodedProgramName}</h1>
          <p>Study materials, notes, and exam practice in one place.</p>
        </div>

        <Link
          className="back-link"
          to={`/department/${departmentSlug}`}
        >
          Back To Department
        </Link>
      </header>

      <section className="semester-section">
        <h2>Choose Your Semester</h2>

        <div className="semester-list">
          {program.semesters.map((item, index) => (
            <button
              key={item.name}
              className={
                semesterIndex === index
                  ? "semester-button active"
                  : "semester-button"
              }
              onClick={() => changeSemester(index)}
            >
              <strong>{item.name}</strong>
              <small>{item.courses.length} courses</small>
            </button>
          ))}
        </div>
      </section>

       <div className="category-filters" aria-label="Filter departments">
              {["First Year", "Second Year", "Thrid Year","Forth Year","Fivth Year"].map((category) => (
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
              ))}
            </div>

      <div className="study-layout">
        <aside className="course-sidebar">
          <h2>Courses</h2>

          {semester.courses.map((item) => (
            <button
              key={item.id}
              className={
                selectedCourse === item.id
                  ? "course-item selected"
                  : "course-item"
              }
              onClick={() => {
                setSelectedCourse(item.id);
                setActiveTab("materials");
              }}
            >
              <span className="course-number">
                {String(item.id).padStart(2, "0")}
              </span>
              <span>
                <strong>{item.name}</strong>
                <small>{item.code}</small>
              </span>
            </button>
          ))}
        </aside>

        <section className="course-content">
          {!course ? (
            <div className="empty-course">
              <h2>Select a course</h2>
              <p>
                Choose a course to explore its materials, short
                notes, and practice questions.
              </p>
            </div>
          ) : (
            <>
              <div className="course-heading">
                <div>
                  <p>{course.code}</p>
                  <h2>{course.name}</h2>
                </div>
                <span className="course-badge">Study resources</span>
              </div>

              <nav className="resource-tabs">
                <button
                  className={activeTab === "materials" ? "tab active" : "tab"}
                  onClick={() => setActiveTab("materials")}
                >
                  Materials
                </button>
                <button
                  className={activeTab === "questions" ? "tab active" : "tab"}
                  onClick={() => setActiveTab("questions")}
                >
                  Practice Questions
                </button>
                <button
                  className={activeTab === "ai" ? "tab active" : "tab"}
                  onClick={() => setActiveTab("ai")}
                >
                  AI Study Assistant
                </button>
              </nav>

              {activeTab === "materials" && (
                <div className="resource-list">
                  {course.materials.map((material) => (
                    <article className="resource-card" key={material.title}>
                      <span className="resource-icon">
                        {material.type === "PDF" ? "📄" : "📝"}
                      </span>
                      <div className="resource-info">
                        <strong>{material.title}</strong>
                        <small>{material.type}</small>
                      </div>
                      <a
                        href={material.url}
                        onClick={(event) => {
                          if (material.url === "#") event.preventDefault();
                        }}
                        className="resource-action"
                      >
                        {material.url === "#" ? "Coming soon" : "Open"}
                      </a>
                    </article>
                  ))}
                </div>
              )}

              {activeTab === "questions" && (
                <div className="question-list">
                  {course.questions.map((item, index) => (
                    <details className="question-card" key={item.question}>
                      <summary>
                        <span>Q{index + 1}.</span> {item.question}
                      </summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              )}

              {activeTab === "ai" && (
                <div className="ai-panel">
                  <div className="ai-heading">
                    <span>✦</span>
                    <div>
                      <h3>AI Study Assistant</h3>
                      <p>
                        Upload a question or a page of your study
                        material to prepare it for AI analysis.
                      </p>
                    </div>
                  </div>

                  <label className="upload-area">
                    <span className="upload-icon">↑</span>
                    <strong>Upload or scan an image</strong>
                    <small>Choose a photo or PDF from your device</small>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      capture="environment"
                      onChange={(event) =>
                        setSelectedFile(event.target.files?.[0] || null)
                      }
                    />
                  </label>

                  {selectedFile && (
                    <div className="selected-file">
                      <span>📎 {selectedFile.name}</span>
                      <button
                        onClick={() => setSelectedFile(null)}
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  <button
                    className="analyze-button"
                    disabled={!selectedFile}
                    onClick={() =>
                      alert(
                        "Upload interface ready. Connect the AI backend to analyze this file."
                      )
                    }
                  >
                    Analyze Material
                  </button>

                  <p className="ai-notice">
                    AI analysis will be enabled when the backend and AI
                    service are connected.
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default ProgramStudyPage;
