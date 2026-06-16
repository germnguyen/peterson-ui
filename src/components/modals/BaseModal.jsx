import { X } from "lucide-react";

const overlayClass =
  "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 max-sm:items-end max-sm:p-3";
const panelClass =
  "w-[min(430px,100%)] overflow-hidden rounded-2xl border border-zinc-700 bg-[#1f1f1f] text-white shadow-[0_24px_80px_rgba(0,0,0,0.52)] max-sm:rounded-[14px]";

export default function BaseModal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;

  function handleOverlayMouseDown(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={overlayClass} onMouseDown={handleOverlayMouseDown}>
      <div className={panelClass} role="dialog" aria-modal="true" aria-label={title}>
        <div className="flex items-center justify-between gap-4 border-b border-zinc-700 px-5 py-4">
          <h3 className="m-0 text-sm font-extrabold tracking-normal uppercase">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-8 items-center justify-center rounded-full border-0 bg-transparent text-neutral-400 hover:bg-[#2c2c2c] hover:text-white"
            aria-label="Đóng modal"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
