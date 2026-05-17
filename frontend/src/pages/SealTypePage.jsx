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
      <section
        className="card"
        style={{ maxWidth: "845px", height: "929px", minHeight: "929px", maxHeight: "929px" }}
      >
        <BackButton />
        <h1 style={{ margin: "200px 0 60px", width: "845px" }}>Seal Type</h1>
        <div
          className="action-grid"
          style={{ height: "929px", width: "845px", justifyContent: "center", position: "relative" }}
        >
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
