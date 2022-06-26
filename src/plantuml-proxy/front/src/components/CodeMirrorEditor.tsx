import React from "react";
import * as codemirror from "codemirror";
import { codeMirrorOptions } from "../codemirror";

interface Props {
  text: string;
  errorLine: number | null;
  hoveredLine: number | null;
  onTextChange: (text: string) => void;
}

/**
 * Inspired by react wrapper of code mirror
 * https://github.com/scniro/react-codemirror2
 */
export class CodeMirrorEditor extends React.Component<Props> {
  private ref: HTMLElement | null;
  private editor: codemirror.Editor;

  componentDidMount() {
    if (!this.ref) {
      return;
    }

    this.editor = codemirror(this.ref, codeMirrorOptions);

    this.editor.on("change", (cm, data) => {
      // Ignores events coming from setValue as we use this function in componendDidUpdate
      if (data.origin === "setValue") {
        return;
      }

      this.props.onTextChange(this.editor.getValue());
    });
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.text !== this.editor.getValue()) {
      this.editor.setValue(this.props.text);
    }

    if (prevProps.errorLine !== this.props.errorLine) {
      if (this.props.errorLine) {
        this.editor.addLineClass(
          this.props.errorLine - 1,
          "background",
          "bg-warning"
        );
      }

      if (prevProps.errorLine) {
        this.editor.removeLineClass(
          prevProps.errorLine - 1,
          "background",
          "bg-warning"
        );
      }

      // Do not go further
      return;
    }

    if (
      this.props.hoveredLine &&
      prevProps.hoveredLine !== this.props.hoveredLine
    ) {
      const lineNumber = this.props.hoveredLine - 1;
      this.editor.focus();
      const line = this.editor.getLine(lineNumber);
      this.editor.setCursor({
        line: this.props.hoveredLine - 1,
        ch: line.length,
      });
    }
  }

  render() {
    return <div className="border" ref={(self) => (this.ref = self)} />;
  }
}
