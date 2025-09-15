/**
 * PUBLIC_INTERFACE
 * Initializes NoteEditor event bindings on a given editor root element.
 */
export function initNoteEditor(root: HTMLElement) {
  const saveBtn = root.querySelector("#save-btn") as HTMLButtonElement | null;
  const newBtn = root.querySelector("#new-btn") as HTMLButtonElement | null;
  const title = root.querySelector("#note-title") as HTMLInputElement | null;
  const content = root.querySelector("#note-content") as HTMLTextAreaElement | null;

  if (newBtn) {
    newBtn.addEventListener("click", () => {
      const ev = new CustomEvent("notes:new");
      window.dispatchEvent(ev);
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const ev = new CustomEvent("notes:save", {
        detail: { title: title?.value ?? "", content: content?.value ?? "" },
      });
      window.dispatchEvent(ev);
    });
  }

  // Autosave on input pause (debounced)
  let t: number | undefined;
  const emitChanged = () => {
    const ev = new CustomEvent("notes:changed", {
      detail: { title: title?.value ?? "", content: content?.value ?? "" },
    });
    window.dispatchEvent(ev);
  };
  const onEdit = () => {
    window.clearTimeout(t);
    t = window.setTimeout(emitChanged, 500);
  };
  title?.addEventListener("input", onEdit);
  content?.addEventListener("input", onEdit);
}

/**
 * PUBLIC_INTERFACE
 * Auto-initialize when this module is loaded, targeting the first editor section.
 */
export function autoInitNoteEditor() {
  const root = document.querySelector("section.editor.card") as HTMLElement | null;
  if (root) initNoteEditor(root);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => autoInitNoteEditor());
} else {
  autoInitNoteEditor();
}
