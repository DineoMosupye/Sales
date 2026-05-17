import { useNavigate } from "react-router-dom";

function BackButton({ className = "back-btn", label = "< BACK" }) {
  const navigate = useNavigate();

  return (
    <button type="button" className={className} onClick={() => navigate(-1)}>
      {label}
    </button>
  );
}

export default BackButton;
