import { X } from "lucide-react";

const overlayClass = "fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 max-sm:items-end max-sm:p-3";
const compactButtonClass = "inline-flex min-h-[26px] items-center justify-center rounded-full px-4 text-[8px] font-extrabold max-sm:w-full";

export default function DeleteCommentModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  function handleOverlayMouseDown(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={overlayClass} onMouseDown={handleOverlayMouseDown}>
      <section
        className="w-[min(223px,100%)] overflow-hidden rounded-[22px] border border-[#3c3c3c] bg-[#292929] text-[#f3f3f3] shadow-[0_24px_80px_rgba(0,0,0,0.58)]"
        role="dialog"
        aria-modal="true"
        aria-label="Xác nhận xóa bình luận"
      >
        <header className="flex min-h-11 items-center justify-between gap-3 px-3.5">
          <h3 className="m-0 text-xs font-extrabold tracking-normal">Xác nhận xóa bình luận</h3>
          <button type="button" className="inline-flex items-center justify-center border-0 bg-transparent text-[#d7d7d7] hover:text-white" onClick={onClose} aria-label="Đóng modal">
            <X size={15} aria-hidden="true" />
          </button>
        </header>

        <p className="mx-3.5 mt-[17px] mb-6 text-[9px] leading-normal text-[#d2d2d2]">
          Bạn có chắc muốn xóa bình luận này? Bình luận và toàn bộ phần trả lời quan sẽ
          bị xóa. Hành động này không thể hoàn tác.
        </p>

        <div className="flex justify-end gap-2 px-3.5 pb-3.5 max-sm:flex-col-reverse">
          <button
            type="button"
            className={`${compactButtonClass} border border-[#555] bg-transparent text-[#f2f2f2] hover:bg-white/10`}
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            type="button"
            className={`${compactButtonClass} border-0 bg-[#d10f19] text-white shadow-[0_8px_20px_rgba(209,15,25,0.24)] hover:bg-[#ad0d15]`}
            onClick={onConfirm}
          >
            Xác nhận xóa
          </button>
        </div>
      </section>
    </div>
  );
}
