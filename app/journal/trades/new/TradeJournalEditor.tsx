"use client";

import { useRef, useState } from "react";
import { removeAdjacentImageBlock } from "../../../_lib/editor-images";
import styles from "./page.module.scss";

type EditorSection = {
  id: string;
  label: string;
  placeholder: string;
};

const sections: EditorSection[] = [
  {
    id: "buy",
    label: "매수한 점",
    placeholder: "진입 근거, 가격, 시간, 수급/뉴스/차트 조건을 적어주세요."
  },
  {
    id: "sell",
    label: "매도한 점",
    placeholder: "청산 근거, 가격, 시간, 익절/손절 기준을 적어주세요."
  },
  {
    id: "good",
    label: "잘한 점",
    placeholder: "계획을 지킨 부분, 빠르게 판단한 부분을 남겨주세요."
  },
  {
    id: "bad",
    label: "못한 점",
    placeholder: "추격, 늦은 손절, 근거 부족처럼 다음에 피할 행동을 적어주세요."
  }
];

type SelectedImage = {
  sectionId: string;
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

export function TradeJournalEditor({ initialValues = {} }: { initialValues?: Partial<Record<string, string>> }) {
  const editorRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  function clearImageSelection() {
    Object.values(editorRefs.current).forEach((editor) => {
      editor?.querySelectorAll("[data-selected='true']").forEach((node) => {
        delete (node as HTMLElement).dataset.selected;
      });
    });
    setSelectedImage(null);
  }

  function selectImage(sectionId: string, node: HTMLElement) {
    clearImageSelection();
    node.dataset.selected = "true";
    setSelectedImage({ sectionId, node });
  }

  function deleteSelectedImage(sectionId: string) {
    if (selectedImage?.sectionId !== sectionId) return;
    selectedImage.node.remove();
    setSelectedImage(null);
  }

  function insertImages(sectionId: string, files: FileList | File[]) {
    const editor = editorRefs.current[sectionId];
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
    <div className={styles.editorGrid}>
      {sections.map((section) => (
        <section className={styles.editorSection} key={section.id}>
          <header>
            <h2>{section.label}</h2>
            <span>텍스트를 쓰다가 원하는 위치에 캡처를 놓으세요</span>
          </header>
          <div
            className={styles.notionEditor}
            contentEditable
            data-section-id={section.id}
            data-placeholder={section.placeholder}
            ref={(node) => {
              editorRefs.current[section.id] = node;
            }}
            role="textbox"
            aria-label={section.label}
            suppressContentEditableWarning
            dangerouslySetInnerHTML={initialValues[section.id] ? { __html: initialValues[section.id] as string } : undefined}
            onClick={(event) => {
              const imageNode = (event.target as HTMLElement).closest("[data-image-block='true']");

              if (imageNode instanceof HTMLElement) {
                selectImage(section.id, imageNode);
                return;
              }

              clearImageSelection();
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              const editor = editorRefs.current[section.id];

              if (editor) {
                setCaretFromPoint(event, editor);
              }
              insertImages(section.id, event.dataTransfer.files);
            }}
            onPaste={(event) => {
              const images = imageFiles(event.clipboardData.files);

              if (images.length === 0) return;
              event.preventDefault();
              insertImages(section.id, images);
            }}
            onKeyDown={(event) => {
              if (selectedImage?.sectionId === section.id) {
                if (event.key === "Backspace" || event.key === "Delete") {
                  event.preventDefault();
                  deleteSelectedImage(section.id);
                }

                return;
              }

              const editor = editorRefs.current[section.id];
              const removed = editor ? removeAdjacentImageBlock(editor, event.key) : null;

              if (removed) {
                event.preventDefault();
              }
            }}
          />
          {selectedImage?.sectionId === section.id ? (
            <button className={styles.deleteImageButton} type="button" onClick={() => deleteSelectedImage(section.id)}>
              선택한 캡처 삭제
            </button>
          ) : null}
        </section>
      ))}
    </div>
  );
}
