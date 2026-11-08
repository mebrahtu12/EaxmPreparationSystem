
import { useNavigate } from "react-router-dom";
import "./splash.css";
import studyImage from "../assets/images/studysmarter.jpg";
import applogo from "../assets/images/Study Smarter Not Harder.png"

function Splash() {
   const navigate = useNavigate();
  return (
    <main className="splash-page">
      <section className="splash-visual">
        <img
          className="splash-image"
          src={studyImage}
          alt="Student studying with books and notes"
        />
      </section>

      <section className="splash-content">
        <div className="brand">
           <img src={applogo} />
           <p>
            <span>Study smarter </span>Not harder!!
           </p>
            <button  onClick={() => navigate("/login")} className="get-started" >
          Get Started <span>→</span>
        </button>
        </div>
      </section>
    </main>
  );
}

export default Splash;



