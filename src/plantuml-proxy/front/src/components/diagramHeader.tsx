import React, { useState } from "react";

interface Props {
  title: string;
  canSave: boolean;
  onSave: () => void;
  onTitleChange: (title: string) => void;
}

interface State {
  pristine: boolean;
}

export function DiagramHeader(props: Props) {
  const [state, setState] = useState<State>({ pristine: true });

  function handleTitleChange(event: any) {
    if (!event.target || event.target.value == null) {
      return;
    }

    props.onTitleChange(event.target.value);
  }

  function handleSave() {
    if (state.pristine) {
      setState({ pristine: false });
    }

    if (!props.title) {
      return;
    }

    props.onSave();
  }

  const inputClass =
    !state.pristine && !props.title
      ? "form-control is-invalid"
      : "form-control";

  return (
    <div className="input-group">
      <input
        type="text"
        className={inputClass}
        placeholder="title (required)"
        value={props.title}
        onChange={handleTitleChange}
      />
      <div className="input-group-append">
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSave}
          disabled={props.canSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
