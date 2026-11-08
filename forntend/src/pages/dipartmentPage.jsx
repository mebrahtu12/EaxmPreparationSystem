
import { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./departmentPage.css";
import applogo from "../assets/images/Study Smarter Not Harder.png";
import software from "../assets/images/softwareimage.jpg";
import electrical from "../assets/images/elecimg.jpg";
import logistics from "../assets/images/logisticsimage.jpg";
import economis from "../assets/images/Economicimage.jpg";
import camera from "../assets/icons/camera-regular-full.svg";

const depts = {
  computing: {
    name: "Computing",
    description: "Explore computing fields and prepare for your exams.",
    image: software,
    programs: [
      { name: "Software Engineering", icon: "SE", description: "Programming, software design and development." },
      { name: "Information Technology", icon: "IT", description: "Networks, systems and IT infrastructure." },
      { name: "Computer Science", icon: "CS", description: "Algorithms, computation and theory." },
    ],
  },
  electrical: {
    name: "Electrical Eng.",
    description: "Explore electrical engineering fields and study resources.",
    image: electrical,
    programs: [
      { name: "Power Engineering", icon: "🔌", description: "Power systems and electrical machines." },
      { name: "Electronics", icon: "🔋", description: "Electronic circuits and devices." },
      { name: "Communication Engineering", icon: "📡", description: "Signals and communication systems." },
    ],
  },

  economics: {
    name: "Economics",
    description: "Explore electrical engineering fields and study resources.",
    image: economis,
    programs: [
      { name: "Power Engineering", icon: "🔌", description: "Power systems and electrical machines." },
      { name: "Electronics", icon: "🔋", description: "Electronic circuits and devices." },
      { name: "Communication Engineering", icon: "📡", description: "Signals and communication systems." },
    ],
  },
  logistics: {
    name: "Logistics",
    description: "Explore electrical engineering fields and study resources.",
    image: logistics,
    programs: [
      { name: "Power Engineering", icon: "🔌", description: "Power systems and electrical machines." },
      { name: "Electronics", icon: "🔋", description: "Electronic circuits and devices." },
      { name: "Communication Engineering", icon: "📡", description: "Signals and communication systems." },
    ],
  },
};

function DepartmentPage() {
  const { departmentSlug } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [search] = useState("");
  const [setShowSettings] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState("");

  const department = depts[departmentSlug];



  if (!department) {
    return (
      <main className="department-not-found">
        <h1>Department not found</h1>
        <p>Please choose a department from the home page.</p>
        <Link to="/naturalHome">Back to departments</Link>
      </main>
    );
  }

  const filteredPrograms = department.programs.filter((program) =>
    program.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage("Please choose an image smaller than 10 MB.");
      return;
    }

    setSelectedImage(URL.createObjectURL(file));
    setMessage("Image selected. Connect your question-solving backend to analyze it.");
    event.target.value = "";
  };


  const openProgram = (program) => {
    navigate(
      `/department/${departmentSlug}/program/${encodeURIComponent(program.name)}`
    );
  };
   
  return (
    <div className="department-layout">
      <aside className="department-sidebar">
        <Link to="/naturalHome" className="department-brand">
          <img className="department-brand-icon" src={applogo} />
          <span>UniExam</span>
        </Link>

        <p className="sidebar-label">WORKSPACE</p>

        <Link to="/naturalHome" className="sidebar-link">
          <span>⌂</span> Dashboard
        </Link>

        <div className="sidebar-link active">
          <span>{department.icon}</span> {department.name}
        </div>

        <button
          className="sidebar-link sidebar-button"
          onClick={() => setShowSettings(true)}
        >
          <span>⚙</span> Settings
        </button>

        <div className="sidebar-bottom">
          <div className="sidebar-avatar">S</div>
          <div>
            <strong>Student</strong>
            <p>Exam preparation</p>
          </div>
        </div>
      </aside>

      <main className="department-main">

        <section className="department-welcome"
          style=
          {{ backgroundImage: `url("${department.image}")` }} >

        </section>
        <p className="department-breadcrumb">
          Shcool of {department.name}
        </p>
        <section className="program-section">
          <div className="section-heading">
            <div>
              <h2>Choose your program</h2>
              <p>Select a field to explore its courses.</p>
            </div>
            <span className="program-count">
              {filteredPrograms.length} programs
            </span>
          </div>

          <div className="program-grid">
            {filteredPrograms.map((program) => (
              <button
                key={program.name}
                className="program-card"
                onClick={() => openProgram(program)}
              >
                <span className="program-icon">{program.icon}</span>
                <span className="program-card-title">{program.name}</span>
                <span className="program-card-description">
                  {program.description}
                </span>
                <span className="program-card-action">Explore program →</span>
              </button>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <p className="empty-search">No programs match your search.</p>
          )}
        </section>

        <section className="question-upload">
          <div>
            <span className="section-eyebrow">NEED HELP WITH A QUESTION?</span>
            <h2>Bring your exam question</h2>
            <p>Take a photo or upload an image of a question to get started.</p>
          </div>

          <input
            ref={fileInputRef}
            className="visually-hidden"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImage}
          />

          <div className="upload-actions">
            <button
              className="primary-button"
              onClick={() => fileInputRef.current?.click()}
            >
              <img src={camera} />Scan Qestion
            </button>
            <button
              className="secondary-button"
              onClick={() => fileInputRef.current?.click()}
            >
              ↑ Upload image
            </button>
          </div>

          {message && <p className="upload-message">{message}</p>}

          {selectedImage && (
            <div className="image-preview">
              <img src={selectedImage} alt="Selected exam question" />
              <button
                className="secondary-button"
                onClick={() => {
                  URL.revokeObjectURL(selectedImage);
                  setSelectedImage(null);
                  setMessage("");
                }}
              >
                Remove image
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default DepartmentPage;
