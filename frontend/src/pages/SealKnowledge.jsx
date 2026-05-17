import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

function SealKnowledge() {
  const navigate = useNavigate();

  return (
    <main className="page-shell internal-page-shell seal-knowledge-shell">
      <div className="internal-page-back">
        <BackButton />
      </div>
      <section className="card">
        <div className="split-actions seal-knowledge-actions">
          <button
            className="secondary-btn seal-knowledge-btn"
            type="button"
            onClick={() => navigate("/know-info")}
          >
            I Know Seal Information
          </button>
          <button
            className="secondary-btn seal-knowledge-btn"
            type="button"
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
