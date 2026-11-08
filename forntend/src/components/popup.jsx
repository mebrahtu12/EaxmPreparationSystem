
import DepartmentPage from "../pages/dipartmentPage";
import "./Popup.css";


function Popup({ message, onClose, darkMode = false }) {
  if(!DepartmentPage)return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className={`popup-box ${darkMode ? "popup-dark" : "popup-light"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="popup-x" onClick={onClose}>
          &times;
        </button>
        <h3>{DepartmentPage.computing}</h3>
        <p>{message}</p>

        <button className="popup-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Popup;
