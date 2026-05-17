import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import CustomerInfoFields from "../components/CustomerInfoFields";
import { InputField } from "../components/FormControls";
import { useRequestContext } from "../state/RequestContext";

function KnowInfoPage() {
  const navigate = useNavigate();
  const { quoteData, setQuoteData } = useRequestContext();
  const [form, setForm] = useState({ ...quoteData, quotePath: "know" });
  const [errors, setErrors] = useState({});

  const required = useMemo(
    () => ["sealType", "materialCode", "drawingNumber", "customerName", "customerEmail", "customerPhone", "company"],
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
    navigate("/confirm", { state: { mode: "know" } });
  };

  return (
    <main className="page-shell internal-page-shell">
      <section className="card">
        <BackButton />
        <h1>I Know Seal Information</h1>
        <form onSubmit={onSubmit} className="form-wrap">
          {errors.sealType ? <p className="error-banner">Please select a seal type first.</p> : null}
          <div className="grid-2">
            <InputField
              label="Material Code *"
              name="materialCode"
              value={form.materialCode}
              onChange={onChange}
              error={errors.materialCode}
            />
            <InputField
              label="Drawing Number *"
              name="drawingNumber"
              value={form.drawingNumber}
              onChange={onChange}
              error={errors.drawingNumber}
            />
          </div>
          <CustomerInfoFields form={form} errors={errors} onChange={onChange} />
          <button className="cta" type="submit">
            Review Details
          </button>
        </form>
      </section>
    </main>
  );
}

export default KnowInfoPage;
