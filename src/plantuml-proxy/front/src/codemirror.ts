import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/selection/active-line";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/eclipse.css";

export const codeMirrorOptions = {
  lineNumbers: true,
  styleActiveLine: true,
  matchBrackets: true,
  theme: "eclipse",
  styleSelectedText: true
};
