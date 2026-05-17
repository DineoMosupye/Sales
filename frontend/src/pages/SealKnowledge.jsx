import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

function SealKnowledge() {
  const navigate = useNavigate();
  const sealKnowledgeButtonStyle = { width: "400px", maxWidth: "500px" };

  return (
    <main className="page-shell internal-page-shell" style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: "20px", left: "20px" }}>
        <BackButton />
      </div>
      <section className="card">
        <div
          className="split-actions"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px" }}
        >
          <button
            className="secondary-btn"
            type="button"
            style={sealKnowledgeButtonStyle}
            onClick={() => navigate("/know-info")}
          >
            I Know Seal Information
          </button>
          <button
            className="secondary-btn"
            type="button"
            style={sealKnowledgeButtonStyle}
            onClick={() => navigate("/dont-know-info")}
          >
            I Don&apos;t Know Seal Information
          </button>
        </div>
      </section>
    </main>
  );
}

export default SealKnowledge;
