import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
const sealTypes = ["Request Quote", "Request Technician", "View Requests"];

function RequestQuotePage() {
  const navigate = useNavigate();
  const getRouteForAction = (sealType) => {
    if (sealType === "Request Technician") return "/book-technician";
    if (sealType === "View Requests") return "/dashboard";
    return "/seal-type";
  };

  return (
    <main className="page-shell internal-page-shell">
      <section className="card internal-form-card">
        <BackButton />
        <h1 className="internal-form-title">Request Form</h1>
        <div className="action-grid internal-form-actions">
          {sealTypes.map((sealType) => (
            <button key={sealType} type="button" className="cta" onClick={() => navigate(getRouteForAction(sealType))}>
              {sealType}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default RequestQuotePage;
