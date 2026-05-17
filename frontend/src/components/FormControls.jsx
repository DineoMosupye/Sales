export function InputField({ label, error, ...props }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input {...props} />
      {error ? <small className="error">{error}</small> : null}
    </label>
  );
}

export function SelectField({ label, error, children, ...props }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select {...props}>{children}</select>
      {error ? <small className="error">{error}</small> : null}
    </label>
  );
}

export function TextareaField({ label, error, ...props }) {
  return (
    <label className="field">
      <span>{label}</span>
      <textarea {...props} />
      {error ? <small className="error">{error}</small> : null}
    </label>
  );
}
