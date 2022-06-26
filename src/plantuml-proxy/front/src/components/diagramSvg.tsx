import React from "react";

interface Props {
  svg: string;
  onSvgEntityHovered: (entityType: string, entityName: string) => void;
}

// A regex to grab entity type & name from plantUml SVG
const plantUMLRegexpEntity = new RegExp("(cluster|entity) (.+)$", "gm");
function extractEntityFromComment(text: string) {
  const matches = plantUMLRegexpEntity.exec(text);
  if (!matches) {
    return;
  }

  return {
    type: matches[1],
    name: matches[2],
  };
}

/**
 * Crawl siblgings until we find a comment node
 * @param node
 */
function findCommentUpward(node: Node): Node | null {
  if (node.nodeType === Node.COMMENT_NODE) {
    return node;
  }

  const prev = node.previousSibling;

  // no more previous sibling when we reach the top of the container (svg, div, ...)
  if (!prev) {
    return null;
  }

  return findCommentUpward(prev);
}

export function DiagramSvg(props: Props) {
  /**
   * On mouse over on SVG:
   * - find closest upward comment
   * - extract entity name from it
   * - tell container component
   * @param event
   */
  function handleMouseOver(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    // Consider only element having a good target
    const hoveredNode = event.target as HTMLDivElement;
    if (!hoveredNode) {
      return;
    }

    // Do not bother with containers elements
    if (["DIV", "div", "SVG", "svg"].includes(hoveredNode.tagName)) {
      return;
    }

    // Find a comment related to our target
    const relatedComment = findCommentUpward(hoveredNode);
    if (!relatedComment || !relatedComment.textContent) {
      return;
    }

    // Extract entity name using PlantUml notation
    const plantUmlEntity = extractEntityFromComment(relatedComment.textContent);

    if (plantUmlEntity) {
      props.onSvgEntityHovered(plantUmlEntity.type, plantUmlEntity.name);
    }
  }

  return (
    <div
      onMouseOver={handleMouseOver}
      dangerouslySetInnerHTML={{ __html: props.svg }}
    ></div>
  );
}
