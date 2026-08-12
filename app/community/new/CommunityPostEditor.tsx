"use client";

import { useRef, useState } from "react";
import styles from "./page.module.scss";

type SelectedImage = {
  node: HTMLElement;
};

function imageFiles(files: FileList | File[]) {
  return Array.from(files).filter((file) => file.type.startsWith("image/"));
}

function createImageNode(src: string, name: string) {
  const figure = document.createElement("figure");
  figure.contentEditable = "false";
  figure.className = styles.editorImage;
  figure.dataset.imageBlock = "true";

  const image = document.createElement("img");
  image.alt = name;
  image.src = src;

  const caption = document.createElement("figcaption");
  caption.textContent = name;

  figure.append(image, caption);

  return figure;
}

function setCaretFromPoint(event: React.DragEvent<HTMLElement>, editor: HTMLElement) {
  const documentWithCaret = document as Document & {
    caretRangeFromPoint?: (x: number, y: number) => Range | null;
    caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null;
  };
  const range = documentWithCaret.caretRangeFromPoint?.(event.clientX, event.clientY);
  const position = documentWithCaret.caretPositionFromPoint?.(event.clientX, event.clientY);
  const selection = window.getSelection();

  if (!selection) return;

  if (range && editor.contains(range.commonAncestorContainer)) {
    selection.removeAllRanges();
    selection.addRange(range);
    return;
  }

  if (position && editor.contains(position.offsetNode)) {
    const nextRange = document.createRange();

    nextRange.setStart(position.offsetNode, position.offset);
    nextRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(nextRange);
  }
}

function insertNodeAtSelection(editor: HTMLElement, node: HTMLElement) {
  const selection = window.getSelection();
  const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
  const spacer = document.createElement("p");

  spacer.innerHTML = "<br>";

  if (!range || !editor.contains(range.commonAncestorContainer)) {
    editor.append(node, spacer);
    return;
  }

  range.deleteContents();
  range.insertNode(spacer);
  range.insertNode(node);
  range.setStartAfter(spacer);
  range.collapse(true);
  selection?.removeAllRanges();
  selection?.addRange(range);
}

export function CommunityPostEditor({ initialContent }: { initialContent?: string }) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  function clearImageSelection() {
    editorRef.current?.querySelectorAll("[data-selected='true']").forEach((node) => {
      delete (node as HTMLElement).dataset.selected;
    });
    setSelectedImage(null);
  }

  function selectImage(node: HTMLElement) {
    clearImageSelection();
    node.dataset.selected = "true";
    setSelectedImage({ node });
  }

  function deleteSelectedImage() {
    selectedImage?.node.remove();
    setSelectedImage(null);
  }

  function insertImages(files: FileList | File[]) {
    const editor = editorRef.current;
    const images = imageFiles(files);

    if (!editor || images.length === 0) return;

    clearImageSelection();
    editor.focus();

    images.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result !== "string") return;
        insertNodeAtSelection(editor, createImageNode(reader.result, file.name));
      };
      reader.readAsDataURL(file);
    });
  }

  return (
    <section className={styles.editorSection}>
      <header>
        <label htmlFor="community-post-editor">내용</label>
        <div>
          <button type="button" onClick={() => fileInputRef.current?.click()}>
            이미지 추가
          </button>
          {selectedImage ? (
            <button type="button" onClick={deleteSelectedImage}>
              선택 이미지 삭제
            </button>
          ) : null}
        </div>
      </header>
      <input
        ref={fileInputRef}
        className={styles.fileInput}
        type="file"
        accept="image/*"
        multiple
        onChange={(event) => {
          if (event.target.files) {
            insertImages(event.target.files);
          }
          event.target.value = "";
        }}
      />
      <div
        id="community-post-editor"
        ref={editorRef}
        className={styles.notionEditor}
        contentEditable
        data-placeholder="공유하고 싶은 시장 이야기나 질문을 작성하세요"
        role="textbox"
        aria-label="내용"
        suppressContentEditableWarning
        dangerouslySetInnerHTML={initialContent ? { __html: initialContent } : undefined}
        onClick={(event) => {
          const imageNode = (event.target as HTMLElement).closest("[data-image-block='true']");

          if (imageNode instanceof HTMLElement) {
            selectImage(imageNode);
            return;
          }

          clearImageSelection();
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          const editor = editorRef.current;

          if (editor) {
            setCaretFromPoint(event, editor);
          }
          insertImages(event.dataTransfer.files);
        }}
        onPaste={(event) => {
          const images = imageFiles(event.clipboardData.files);

          if (images.length === 0) return;
          event.preventDefault();
          insertImages(images);
        }}
        onKeyDown={(event) => {
          if ((event.key === "Backspace" || event.key === "Delete") && selectedImage) {
            event.preventDefault();
            deleteSelectedImage();
          }
        }}
      />
    </section>
  );
}
