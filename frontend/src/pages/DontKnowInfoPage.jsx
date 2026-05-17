import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import CustomerInfoFields from "../components/CustomerInfoFields";
import { InputField } from "../components/FormControls";
import { useRequestContext } from "../state/RequestContext";

const pumpFields = [
  { name: "pumpManufacturer", label: "Pump Manufacturer *" },
  { name: "pumpModel", label: "Pump Model *" },
  { name: "serialNumber", label: "Serial Number *" },
  { name: "fluid", label: "Process Fluid *" },
  { name: "pressure", label: "Pressure *" },
  { name: "temperature", label: "Temperature *" },
  { name: "shaftSize", label: "Shaft Size *" },
  { name: "sealArrangement", label: "Seal Arrangement *" },
];

function DontKnowInfoPage() {
  const navigate = useNavigate();
  const { quoteData, setQuoteData } = useRequestContext();
  const [form, setForm] = useState({ ...quoteData, quotePath: "dontKnow" });
  const [errors, setErrors] = useState({});

  const required = useMemo(
    () => [
      "sealType",
      ...pumpFields.map((field) => field.name),
      "customerName",
      "customerEmail",
      "customerPhone",
      "company",
    ],
    []
  );

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    required.forEach((field) => {
      if (!String(form[field] || "").trim()) {
        nextErrors[field] = "This field is required.";
      }
    });
    return nextErrors;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setQuoteData(form);
    navigate("/confirm", { state: { mode: "dontKnow" } });
  };

  return (
    <main className="page-shell internal-page-shell">
      <section className="card">
        <BackButton />
        <h1>I Don&apos;t Know Seal Information</h1>
        <form onSubmit={onSubmit} className="form-wrap">
          {errors.sealType ? <p className="error-banner">Please select a seal type first.</p> : null}
          <div className="grid-2">
            {pumpFields.map((field) => (
              <InputField
                key={field.name}
                label={field.label}
                name={field.name}
                value={form[field.name]}
                onChange={onChange}
                error={errors[field.name]}
              />
            ))}
          </div>
          <CustomerInfoFields form={form} errors={errors} onChange={onChange} />
          <button className="cta" type="submit">
            Review Details
          </button>
        </form>
        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
          <button className="secondary-btn" type="button" onClick={() => navigate("/request-quote")}>
            Request Quote
          </button>
        </div>
      </section>
    </main>
  );
}

export default DontKnowInfoPage;
