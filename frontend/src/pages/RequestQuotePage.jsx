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
      <section
        className="card"
        style={{ maxWidth: "845px", height: "929px", minHeight: "929px", maxHeight: "929px" }}
      >
        <BackButton />
        <h1 style={{ margin: "200px 0 30px", width: "845px" }}>Request Form</h1>
        <div
          className="action-grid"
          style={{ height: "929px", width: "845px", justifyContent: "center", position: "relative" }}
        >
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
