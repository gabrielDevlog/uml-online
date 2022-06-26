import React, { useState, useEffect } from "react";

interface Props {
  error: {
    message: string;
    line: number;
  } | null;
}

export function DiagramAlert(props: Props) {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setShowError(props.error != null);
  }, [props.error]);

  function handleClose() {
    setShowError(false);
  }

  if (!showError || !props.error) {
    return null;
  }

  const message = props.error.line
    ? props.error.message + "at line " + props.error.line
    : props.error.message;

  return (
    <div className="alert alert-danger" role="alert">
      {message}
      <button type="button" className="close" onClick={handleClose}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
