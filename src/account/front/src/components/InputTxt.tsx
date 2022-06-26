import * as React from "react";
import { FieldRenderProps } from "react-final-form";

interface Props extends FieldRenderProps<string, HTMLElement> {
  label: string;
  placeholder: string;
}

export const InputTxt = ({ input, meta, label, placeholder }: Props) => {
  let className = "form-control";
  if (!meta.pristine && !meta.valid) {
    className += " is-invalid";
  }

  return (
    <div className="form-group">
      <label htmlFor={input.id}>{label}</label>

      <input {...input} placeholder={placeholder} className={className} />

      <div className="invalid-feedback">{meta.error}</div>
    </div>
  );
};
