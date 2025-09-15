/**
 * PUBLIC_INTERFACE
 * Initializes NotesList event bindings (search/select/delete) on a given root element.
 */
export function initNotesList(root: HTMLElement) {
  const search = root.querySelector("#search") as HTMLInputElement | null;
  if (search) {
    search.addEventListener("input", () => {
      const q = search.value;
      const ev = new CustomEvent("notes:search", { detail: { query: q } });
      window.dispatchEvent(ev);
    });
  }

  root.querySelectorAll(".row").forEach((row) => {
    row.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const id = (row as HTMLElement).dataset.id!;
      if (!id) return;
      if (target?.dataset?.action === "delete") {
        e.stopPropagation();
        const ev = new CustomEvent("notes:delete", { detail: { id } });
        window.dispatchEvent(ev);
        return;
      }
      const ev = new CustomEvent("notes:select", { detail: { id } });
      window.dispatchEvent(ev);
    });
  });
}

/**
 * PUBLIC_INTERFACE
 * Auto-initialize when this module is loaded, targeting the first NotesList section.
 */
export function autoInitNotesList() {
  const root = document.querySelector("section.list.card") as HTMLElement | null;
  if (root) initNotesList(root);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => autoInitNotesList());
} else {
  autoInitNotesList();
}
