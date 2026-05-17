import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTechnicianRequest } from "../api/client";
import BackButton from "../components/BackButton";
import CustomerInfoFields from "../components/CustomerInfoFields";
import { InputField, TextareaField } from "../components/FormControls";

function BookTechnicianPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    date: "",
    time: "",
    serviceDescription: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    company: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const required = ["date", "time", "serviceDescription", "customerName", "customerEmail", "customerPhone", "company"];
    const next = {};
    required.forEach((field) => {
      if (!String(form[field] || "").trim()) next[field] = "This field is required.";
    });
    return next;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setServerError("");
    try {
      await createTechnicianRequest(form);
      navigate("/dashboard");
    } catch (apiError) {
      setServerError(apiError.response?.data?.message || "Could not submit booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell internal-page-shell">
      <section className="card">
        <BackButton />
        <h1>Book Technician</h1>
        <form className="form-wrap" onSubmit={onSubmit}>
          <div className="grid-2">
            <InputField
              label="Select Date *"
              type="date"
              name="date"
              value={form.date}
              onChange={onChange}
              error={errors.date}
            />
            <InputField
              label="Select Time *"
              type="time"
              name="time"
              value={form.time}
              onChange={onChange}
              error={errors.time}
            />
            <div className="grid-full">
              <TextareaField
                label="Service Description *"
                name="serviceDescription"
                rows={4}
                value={form.serviceDescription}
                onChange={onChange}
                error={errors.serviceDescription}
              />
            </div>
          </div>
          <CustomerInfoFields form={form} errors={errors} onChange={onChange} />
          {serverError ? <p className="error-banner">{serverError}</p> : null}
          <button className="cta" type="submit" disabled={loading}>
            {loading ? "Booking..." : "Book Technician"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default BookTechnicianPage;
