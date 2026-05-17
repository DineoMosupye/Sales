import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useRequestContext } from "../state/RequestContext";

const sealTypes = ["REJ/FEJ/MEJ", "MECHANICAL SEAL", "PACKING"];

function SealTypePage() {
  const navigate = useNavigate();
  const { quoteData, setQuoteData } = useRequestContext();

  const onSelect = (sealType) => {
    setQuoteData((prev) => ({ ...prev, sealType }));
  };

  return (
    <main className="page-shell internal-page-shell">
      <section className="card internal-form-card">
        <BackButton />
        <h1 className="internal-form-title">Seal Type</h1>
        <div className="action-grid internal-form-actions">
          {sealTypes.map((sealType) => (
            <button
              key={sealType}
              type="button"
              className={`cta ${quoteData.sealType === sealType ? "selected" : ""}`}
              onClick={() => {
                onSelect(sealType);
                navigate("/seal-knowledge");
              }}
            >
              {sealType}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default SealTypePage;
