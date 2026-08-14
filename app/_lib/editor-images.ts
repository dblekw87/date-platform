/**
 * Backspace/Delete handling for image blocks in the contenteditable editors.
 *
 * Images are `<figure contenteditable="false">`, which the browser will not
 * remove on a plain Backspace — the caret sits in the paragraph beside it and
 * nothing happens. Clicking the image to select it first works but is not what
 * anyone expects from a text editor.
 *
 * This removes the single image block adjacent to the caret: the one before it
 * on Backspace, the one after it on Delete. Never more than one, so an editor
 * holding several captures loses only the one being deleted.
 */

const imageBlockSelector = "[data-image-block='true']";

function isImageBlock(node: Node | null): node is HTMLElement {
  return node instanceof HTMLElement && node.matches(imageBlockSelector);
}

/** The editor's direct child that contains the caret. */
function blockAncestor(editor: HTMLElement, node: Node) {
  let current: Node | null = node;

  while (current && current.parentNode && current.parentNode !== editor) {
    current = current.parentNode;
  }

  return current?.parentNode === editor && current instanceof HTMLElement ? current : null;
}

// Caret is at the block edge only when nothing — text or image — lies between
// the edge and the caret. Otherwise Backspace should delete a character.
function isAtEdge(block: HTMLElement, range: Range, edge: "start" | "end") {
  const probe = document.createRange();

  probe.selectNodeContents(block);

  if (edge === "start") {
    probe.setEnd(range.startContainer, range.startOffset);
  } else {
    probe.setStart(range.startContainer, range.startOffset);
  }

  return probe.toString().length === 0 && probe.cloneContents().querySelector("img") === null;
}

/**
 * Removes the image block next to the caret, if there is one.
 * Returns the removed element so the caller can clear any selection state.
 */
export function removeAdjacentImageBlock(editor: HTMLElement, key: string): HTMLElement | null {
  if (key !== "Backspace" && key !== "Delete") return null;

  const selection = window.getSelection();
  const range = selection?.rangeCount ? selection.getRangeAt(0) : null;

  if (!range || !range.collapsed || !editor.contains(range.startContainer)) return null;

  const backward = key === "Backspace";

  // The caret can sit directly between two of the editor's children.
  if (range.startContainer === editor) {
    const target = editor.childNodes[backward ? range.startOffset - 1 : range.startOffset];

    if (!isImageBlock(target)) return null;

    target.remove();

    return target;
  }

  const block = blockAncestor(editor, range.startContainer);

  if (!block || !isAtEdge(block, range, backward ? "start" : "end")) return null;

  const target = backward ? block.previousElementSibling : block.nextElementSibling;

  if (!isImageBlock(target)) return null;

  target.remove();

  return target;
}
