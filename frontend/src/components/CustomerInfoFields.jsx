import { InputField, TextareaField } from "./FormControls";

function CustomerInfoFields({ form, errors, onChange }) {
  return (
    <div className="grid-2">
      <InputField
        label="Customer Name *"
        name="customerName"
        value={form.customerName}
        onChange={onChange}
        error={errors.customerName}
      />
      <InputField
        label="Customer Email *"
        type="email"
        name="customerEmail"
        value={form.customerEmail}
        onChange={onChange}
        error={errors.customerEmail}
      />
      <InputField
        label="Customer Phone *"
        name="customerPhone"
        value={form.customerPhone}
        onChange={onChange}
        error={errors.customerPhone}
      />
      <InputField
        label="Company *"
        name="company"
        value={form.company}
        onChange={onChange}
        error={errors.company}
      />
      <div className="grid-full">
        <TextareaField
          label="Additional Notes"
          name="notes"
          value={form.notes}
          onChange={onChange}
          rows={3}
        />
      </div>
    </div>
  );
}

export default CustomerInfoFields;
