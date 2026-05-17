import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createQuoteRequest } from "../api/client";
import BackButton from "../components/BackButton";
import { SelectField } from "../components/FormControls";
import { useRequestContext } from "../state/RequestContext";

const adminEmails = [
  "Nadia.Beens@eagleburgmann.com",
  "Sandra.Loock@eagleburgmann.com",
  "Dineo.Mosupye@eagleburgmann.com",
];

const engineerEmails = [
  "Linda.Nhlengetwa@eagleburgmann.com",
  "Rolly.Mubobo@eagleburgmann.com",
];

function ConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quoteData, resetQuote } = useRequestContext();
  const [selectedEmail, setSelectedEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const mode = location.state?.mode || quoteData.quotePath;
  const isKnowPath = mode === "know";
  const emailOptions = useMemo(() => (isKnowPath ? adminEmails : engineerEmails), [isKnowPath]);

  const details = isKnowPath
    ? {
        materialCode: quoteData.materialCode,
        drawingNumber: quoteData.drawingNumber,
      }
    : {
        pumpManufacturer: quoteData.pumpManufacturer,
        pumpModel: quoteData.pumpModel,
        serialNumber: quoteData.serialNumber,
        fluid: quoteData.fluid,
        pressure: quoteData.pressure,
        temperature: quoteData.temperature,
        shaftSize: quoteData.shaftSize,
        sealArrangement: quoteData.sealArrangement,
      };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!selectedEmail) {
      setError("Please select a recipient.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await createQuoteRequest({
        ...quoteData,
        quotePath: isKnowPath ? "know" : "dontKnow",
        submittedTo: selectedEmail,
        details,
      });
      resetQuote();
      navigate("/dashboard");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!quoteData.customerName) {
    return (
      <main className="page-shell internal-page-shell">
        <section className="card">
          <BackButton />
          <h1>No Data to Confirm</h1>
          <button className="cta" type="button" onClick={() => navigate("/request-quote")}>
            Start Request
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell internal-page-shell">
      <section className="card">
        <BackButton />
        <h1>Confirm Request Details</h1>
        <div className="confirm-box">
          {Object.entries({
            sealType: quoteData.sealType,
            customerName: quoteData.customerName,
            customerEmail: quoteData.customerEmail,
            customerPhone: quoteData.customerPhone,
            company: quoteData.company,
            ...details,
            notes: quoteData.notes || "N/A",
          }).map(([key, value]) => (
            <p key={key}>
              <strong>{key}</strong>: {String(value || "N/A")}
            </p>
          ))}
        </div>
        <form onSubmit={onSubmit} className="form-wrap">
          <SelectField
            label={isKnowPath ? "Select Branch Administrator *" : "Select Engineer *"}
            value={selectedEmail}
            onChange={(event) => setSelectedEmail(event.target.value)}
            error={error}
          >
            <option value="">Select recipient</option>
            {emailOptions.map((email) => (
              <option key={email} value={email}>
                {email}
              </option>
            ))}
          </SelectField>
          <button className="cta" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Request"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default ConfirmPage;
