import { X } from "lucide-react";
import { useState } from "react";

const overlayClass = "fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 max-sm:items-end max-sm:p-3";

export default function EditCommentModal({
  isOpen,
  onClose,
  onSave,
  initialComment = "Video rất hữu ích cho sinh viên CNTT.",
}) {
  const [comment, setComment] = useState(initialComment);

  if (!isOpen) return null;

  function handleOverlayMouseDown(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave?.(comment);
    onClose();
  }

  return (
    <div className={overlayClass} onMouseDown={handleOverlayMouseDown}>
      <form
        className="w-[min(313px,100%)] overflow-hidden rounded-2xl border border-[#3f3f3f] bg-[#151515] text-[#f4f4f4] shadow-[0_24px_80px_rgba(0,0,0,0.58)]"
        onSubmit={handleSubmit}
        role="dialog"
        aria-modal="true"
        aria-label="Popup sửa bình luận"
      >
        <header className="flex min-h-[41px] items-center justify-between gap-3 border-b border-[#333] px-4">
          <h3 className="m-0 text-xs font-extrabold tracking-normal">Popup sửa bình luận (modal popup)</h3>
          <button type="button" className="inline-flex items-center justify-center border-0 bg-transparent text-[#d7d7d7] hover:text-white" onClick={onClose} aria-label="Đóng modal">
            <X size={16} aria-hidden="true" />
          </button>
        </header>

        <div className="px-4 py-[19px]">
          <p className="m-0 mb-3 text-[9px] leading-[1.55] text-[#a8a8a8]">Chỉ chủ bình luận mới được chỉnh sửa. Sau khi lưu sẽ gắn nhãn “đã chỉnh sửa”.</p>
          <label htmlFor="edit-comment" className="mb-[7px] block text-[8px] font-extrabold text-[#7f7f7f]">NỘI DUNG BÌNH LUẬN CŨ</label>
          <textarea
            id="edit-comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            aria-label="Nội dung bình luận cũ"
            className="h-[72px] w-full resize-none rounded-lg border border-[#303030] bg-[#202020] p-[13px] text-[10px] leading-[1.45] text-[#f3f3f3] outline-none"
          />
        </div>

        <footer className="flex items-center justify-end gap-[18px] border-t border-[#272727] px-4 py-[11px]">
          <button type="button" className="border-0 bg-transparent text-[10px] font-extrabold text-[#f2f2f2] hover:text-[#cfcfcf]" onClick={onClose}>
            Hủy
          </button>
          <button type="submit" className="inline-flex min-h-7 min-w-[43px] items-center justify-center rounded-full border-0 bg-[#f5f5f5] px-4 text-[10px] font-extrabold text-[#171717] hover:bg-[#dedede]">
            Lưu
          </button>
        </footer>
      </form>
    </div>
  );
}
