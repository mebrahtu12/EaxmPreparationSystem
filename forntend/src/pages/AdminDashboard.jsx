import { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
import applogo from "../assets/images/Study Smarter Not Harder.png";
import moonico from "../assets/icons/moon-regular-full.svg";
import sunico from "../assets/icons/sun-solid-full.svg";
import homeico from "../assets/icons/home.svg";
import bookico from "../assets/icons/book-open.svg";
import fileico from "../assets/icons/file.svg";
import departmentico from "../assets/icons/department.svg";
import questionico from "../assets/icons/question.svg";
import plus from "../assets/icons/pus-icon.svg";

const initialDepartments = [
  {
    id: 1,
    name: "Computing",
    programs: ["Software Engineering", "Information Technology"],
  },
  {
    id: 2,
    name: "Electrical Engineering",
    programs: ["Power Engineering", "Electronics"],
  },
];

const initialCourses = [
  {
    id: 1,
    department: "Computing",
    program: "Software Engineering",
    semester: "First Semester",
    name: "Object-Oriented Programming",
    code: "OOP101",
  },
  {
    id: 2,
    department: "Computing",
    program: "Software Engineering",
    semester: "First Semester",
    name: "Database Systems",
    code: "DB102",
  },
];

const initialResources = [
  {
    id: 1,
    course: "Object-Oriented Programming",
    title: "Introduction to OOP",
    type: "PDF",
    fileName: "oop-introduction.pdf",
  },
  {
    id: 2,
    course: "Database Systems",
    title: "Database Short Notes",
    type: "Short Notes",
    fileName: "—",
  },
];

const initialQuestions = [
  {
    id: 1,
    course: "Object-Oriented Programming",
    question: "What is encapsulation?",
    answer:
      "Encapsulation bundles data and methods and controls access to an object's state.",
  },
];
function AdminDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("Overview");
  const [departments, setDepartments] = useState(initialDepartments);
  const [courses, setCourses] = useState(initialCourses);
  const [resources, setResources] = useState(initialResources);
  const [questions, setQuestions] = useState(initialQuestions);
  const [notice, setNotice] = useState("");

  const [departmentName, setDepartmentName] = useState("");
  const [programName, setProgramName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("Computing");

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseProgram, setCourseProgram] = useState("Software Engineering");
  const [semester, setSemester] = useState("First Semester");

  const [resourceCourse, setResourceCourse] = useState(
    "Object-Oriented Programming",
  );
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceType, setResourceType] = useState("PDF");
  const [resourceFile, setResourceFile] = useState(null);

  const [questionCourse, setQuestionCourse] = useState(
    "Object-Oriented Programming",
  );
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");

  const sections = [
    { name: "Overview", icon: homeico },
    { name: "Departments", icon: departmentico },
    { name: "Courses", icon: bookico },
    { name: "Materials & Notes", icon: fileico },
    { name: "Questions", icon: questionico },
  ];

  const allPrograms = departments.flatMap((department) =>
    department.programs.map((program) => ({
      name: program,
      department: department.name,
    })),
  );

  function showNotice(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  }

  function addDepartment(event) {
    event.preventDefault();

    const name = departmentName.trim();
    const program = programName.trim();

    if (!name || !program) return;

    const existing = departments.find(
      (item) => item.name.toLowerCase() === name.toLowerCase(),
    );

    if (existing) {
      if (
        existing.programs.some(
          (item) => item.toLowerCase() === program.toLowerCase(),
        )
      ) {
        showNotice("That program already exists in this department.");
        return;
      }

      setDepartments((current) =>
        current.map((item) =>
          item.id === existing.id
            ? { ...item, programs: [...item.programs, program] }
            : item,
        ),
      );
    } else {
      setDepartments((current) => [
        ...current,
        {
          id: Date.now(),
          name,
          programs: [program],
        },
      ]);
    }

    setDepartmentName("");
    setProgramName("");
    showNotice("Department and program added.");
  }

  function addCourse(event) {
    event.preventDefault();

    if (!courseName.trim() || !courseCode.trim()) return;

    setCourses((current) => [
      ...current,
      {
        id: Date.now(),
        department: selectedDepartment,
        program: courseProgram,
        semester,
        name: courseName.trim(),
        code: courseCode.trim(),
      },
    ]);

    setCourseName("");
    setCourseCode("");
    showNotice("Course added.");
  }

  function addResource(event) {
    event.preventDefault();

    if (!resourceTitle.trim()) return;

    setResources((current) => [
      ...current,
      {
        id: Date.now(),
        course: resourceCourse,
        title: resourceTitle.trim(),
        type: resourceType,
        fileName:
          resourceType === "PDF"
            ? resourceFile?.name || "No file selected"
            : "—",
      },
    ]);

    setResourceTitle("");
    setResourceFile(null);
    event.currentTarget.reset();
    showNotice("Resource added to the list.");
  }

  function addQuestion(event) {
    event.preventDefault();

    if (!questionText.trim() || !answerText.trim()) return;

    setQuestions((current) => [
      ...current,
      {
        id: Date.now(),
        course: questionCourse,
        question: questionText.trim(),
        answer: answerText.trim(),
      },
    ]);

    setQuestionText("");
    setAnswerText("");
    showNotice("Practice question added.");
  }

  function deleteItem(section, id) {
    const config = {
      Departments: [departments, setDepartments],
      Courses: [courses, setCourses],
      "Materials & Notes": [resources, setResources],
      Questions: [questions, setQuestions],
    };

    const entry = config[section];
    if (!entry) return;

    entry[1](entry[0].filter((item) => item.id !== id));
    showNotice("Item removed from this demo.");
  }

  return (
    <div className={`admin-layout ${darkMode ? "dark-mode" : "light-mode"}`}>
      <aside className="admin-sidebar">
        <Link to="/" className="admin-brand">
          <img className="admin-brand-icon" src={applogo} />
          <span>
            UniExam<small>ADMIN PANEL</small>
          </span>
        </Link>

        <p className="admin-nav-label">WORKSPACE</p>

        <nav className="admin-nav">
          {sections.map((section) => (
            <button
              key={section.name}
              className={
                activeSection === section.name
                  ? "admin-nav-item active"
                  : "admin-nav-item"
              }
              onClick={() => setActiveSection(section.name)}
            >
              <span className="admin-nav-icon">
                <img src={section.icon} alt="sidebar icons" />
              </span>
              {section.name}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="sidebar-footer admin-nav-item">
            <div>
              {" "}
              <span className="admin-avatar">A</span>
            </div>
            <div>
              <strong>Administrator</strong>
              <small>Content management</small>
            </div>
          </div>
          <div className="admin-nav-item">
            <span>-&gt;Logout</span>
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-breadcrumb">UniExam / Admin</p>
            <h1>{activeSection}</h1>
          </div>
          <div className="top-buttons">
            <div>
              <button
                type="button"
                className="theme-toggle"
                onClick={() => setDarkMode((current) => !current)}
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                <img className="darkmode" src={darkMode ? sunico : moonico} />
              </button>
            </div>

            <div>
              <Link to="/naturalHome" className="admin-home-link">
                View Users Page
              </Link>
            </div>
          </div>
        </header>

        {notice && <div className="admin-notice">{notice}</div>}

        {activeSection === "Overview" && (
          <>
            <section className="admin-welcome">
              <div>
                <p>CONTENT MANAGEMENT</p>
                <h2>Manage your learning platform</h2>
                <span>
                  Organize academic content for students in one place.
                </span>
              </div>
            </section>

            <section className="admin-stat-grid">
              {[
                {
                  label: "Departments",
                  count: departments.length,
                  icon: homeico,
                },
                {
                  label: "Programs",
                  count: allPrograms.length,
                  icon: departmentico,
                },
                { label: "Courses", count: courses.length, icon: bookico },
                { label: "Resources", count: resources.length, icon: fileico },
                {
                  label: "Questions",
                  count: questions.length,
                  icon: questionico,
                },
              ].map((stat) => (
                <article
                  className="admin-stat-card stat-card-flex"
                  key={stat.label}
                >
                  <div className="admin-stat-icon">
                    <img src={stat.icon} alt="icons of stat card" />
                  </div>
                  <div>
                    <p>{stat.label}</p>
                    <strong>{stat.count}</strong>
                  </div>
                </article>
              ))}
            </section>

            <section className="admin-panel">
              <div className="admin-panel-heading">
                <div>
                  <h2>Quick actions</h2>
                  <p>Choose what you want to manage.</p>
                </div>
              </div>

              <div className="admin-quick-grid">
                {[
                  ["Departments", "Add departments and programs", plus],
                  ["Courses", "Create courses by semester", bookico],
                  ["Materials & Notes", "Organize PDFs and notes", fileico],
                  ["Questions", "Prepare practice questions", questionico],
                ].map(([name, description, icon]) => (
                  <button
                    className="admin-quick-card"
                    key={name}
                    onClick={() => setActiveSection(name)}
                  >
                    <div className="admin-quick-icons">
                      <img src={icon} alt="icon images" />
                    </div>
                    <strong>{name}</strong>
                    <small>{description}</small>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {activeSection === "Departments" && (
          <>
            <section className="admin-panel">
              <h2>Add a department or program</h2>
              <p className="admin-muted">
                Add a new department with its first program, or add a program to
                an existing department.
              </p>

              <form className="admin-form" onSubmit={addDepartment}>
                <label>
                  Department name
                  <input
                    value={departmentName}
                    onChange={(event) => setDepartmentName(event.target.value)}
                    placeholder="e.g. Computing"
                    required
                  />
                </label>
                <label>
                  Program name
                  <input
                    value={programName}
                    onChange={(event) => setProgramName(event.target.value)}
                    placeholder="e.g. Software Engineering"
                    required
                  />
                </label>

                <label>
                  Background Image
                  <input
                    value={programName}
                    onChange={(event) => setProgramName(event.target.value)}
                    placeholder="e.g. image of a department"
                    required
                  />
                </label>

                <label htmlFor="status">
                  Department Status
                  <select id="status" name="status" required>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </label>
                <button className="admin-primary-button">Add Department</button>
              </form>
            </section>

            <section className="admin-panel">
              <h2>Departments and programs</h2>
              {departments.map((department) => (
                <article className="admin-list-card" key={department.id}>
                  <div>
                    <strong>{department.name}</strong>
                    <p>{department.programs.join(" · ")}</p>
                  </div>
                  <button
                    className="admin-delete-button"
                    onClick={() => deleteItem("Departments", department.id)}
                  >
                    Remove
                  </button>
                </article>
              ))}
            </section>
          </>
        )}

        {activeSection === "Courses" && (
          <>
            <section className="admin-panel">
              <h2>Add a course</h2>
              <form className="admin-form" onSubmit={addCourse}>
                <label>
                  Department
                  <select
                    value={selectedDepartment}
                    onChange={(event) => {
                      const name = event.target.value;
                      setSelectedDepartment(name);
                      const item = departments.find((d) => d.name === name);
                      setCourseProgram(item?.programs[0] || "");
                    }}
                  >
                    {departments.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Program
                  <select
                    value={courseProgram}
                    onChange={(event) => setCourseProgram(event.target.value)}
                    required
                  >
                    {(
                      departments.find((d) => d.name === selectedDepartment)
                        ?.programs || []
                    ).map((program) => (
                      <option key={program} value={program}>
                        {program}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Semester
                  <select
                    value={semester}
                    onChange={(event) => setSemester(event.target.value)}
                  >
                    <option>First Semester</option>
                    <option>Second Semester</option>
                  </select>
                </label>

                <label>
                  Course name
                  <input
                    value={courseName}
                    onChange={(event) => setCourseName(event.target.value)}
                    placeholder="e.g. Database Systems"
                    required
                  />
                </label>

                <label>
                  Course code
                  <input
                    value={courseCode}
                    onChange={(event) => setCourseCode(event.target.value)}
                    placeholder="e.g. DB102"
                    required
                  />
                </label>

                <button className="admin-primary-button">Add Course</button>
              </form>
            </section>

            <section className="admin-panel">
              <h2>Course list</h2>
              {courses.map((course) => (
                <article className="admin-list-card" key={course.id}>
                  <div>
                    <strong>{course.name}</strong>
                    <p>
                      {course.code} · {course.program} · {course.semester}
                    </p>
                  </div>
                  <button
                    className="admin-delete-button"
                    onClick={() => deleteItem("Courses", course.id)}
                  >
                    Remove
                  </button>
                </article>
              ))}
            </section>
          </>
        )}

        {activeSection === "Materials & Notes" && (
          <>
            <section className="admin-panel">
              <h2>Add learning material</h2>
              <p className="admin-muted">
                Choose a course and add a PDF reference or short note.
              </p>
              <form className="admin-form" onSubmit={addResource}>
                <label>
                  Course
                  <select
                    value={resourceCourse}
                    onChange={(event) => setResourceCourse(event.target.value)}
                    required
                  >
                    {courses.map((course) => (
                      <option key={course.id} value={course.name}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Resource type
                  <select
                    value={resourceType}
                    onChange={(event) => setResourceType(event.target.value)}
                  >
                    <option>PDF</option>
                    <option>Short Notes</option>
                  </select>
                </label>

                <label>
                  Title
                  <input
                    value={resourceTitle}
                    onChange={(event) => setResourceTitle(event.target.value)}
                    placeholder="e.g. Chapter One Notes"
                    required
                  />
                </label>

                {resourceType === "PDF" ? (
                  <label>
                    Choose PDF file
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={(event) =>
                        setResourceFile(event.target.files?.[0] || null)
                      }
                    />
                  </label>
                ) : (
                  <p className="admin-muted">
                    Short-note text editing and saving will be added in the next
                    iteration.
                  </p>
                )}

                <button className="admin-primary-button">Add Resource</button>
              </form>
            </section>

            <section className="admin-panel">
              <h2>Learning resources</h2>
              {resources.map((resource) => (
                <article className="admin-list-card" key={resource.id}>
                  <div>
                    <strong>{resource.title}</strong>
                    <p>
                      {resource.course} · {resource.type} · {resource.fileName}
                    </p>
                  </div>
                  <button
                    className="admin-delete-button"
                    onClick={() => deleteItem("Materials & Notes", resource.id)}
                  >
                    Remove
                  </button>
                </article>
              ))}
            </section>
          </>
        )}

        {activeSection === "Questions" && (
          <>
            <section className="admin-panel">
              <h2>Add a practice question</h2>
              <form className="admin-form" onSubmit={addQuestion}>
                <label>
                  Course
                  <select
                    value={questionCourse}
                    onChange={(event) => setQuestionCourse(event.target.value)}
                    required
                  >
                    {courses.map((course) => (
                      <option key={course.id} value={course.name}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Question
                  <textarea
                    value={questionText}
                    onChange={(event) => setQuestionText(event.target.value)}
                    placeholder="Write the question..."
                    rows="3"
                    required
                  />
                </label>

                <label>
                  Answer or explanation
                  <textarea
                    value={answerText}
                    onChange={(event) => setAnswerText(event.target.value)}
                    placeholder="Write the correct answer..."
                    rows="4"
                    required
                  />
                </label>

                <button className="admin-primary-button">Add Question</button>
              </form>
            </section>

            <section className="admin-panel">
              <h2>Practice questions</h2>
              {questions.map((question) => (
                <article className="admin-list-card" key={question.id}>
                  <div>
                    <strong>{question.question}</strong>
                    <p>
                      {question.course} · {question.answer}
                    </p>
                  </div>
                  <button
                    className="admin-delete-button"
                    onClick={() => deleteItem("Questions", question.id)}
                  >
                    Remove
                  </button>
                </article>
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
