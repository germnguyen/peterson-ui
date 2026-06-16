import { X } from "lucide-react";
import { useState } from "react";

const overlayClass = "fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 max-sm:items-end max-sm:p-3";
const compactButtonClass = "inline-flex min-h-[21px] min-w-[41px] items-center justify-center rounded-full px-3.5 text-[8px] font-extrabold";

export default function ReplyCommentModal({
  isOpen,
  onClose,
  onSubmit,
  commenterName = "Nguyễn Văn A",
}) {
  const [reply, setReply] = useState("");

  if (!isOpen) return null;

  function handleOverlayMouseDown(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit?.(reply);
    onClose();
  }

  return (
    <div className={overlayClass} onMouseDown={handleOverlayMouseDown}>
      <form
        className="w-[min(238px,100%)] overflow-hidden rounded-[22px] border border-[#404040] bg-[#222] text-[#f2f2f2] shadow-[0_24px_80px_rgba(0,0,0,0.56)]"
        onSubmit={handleSubmit}
        role="dialog"
        aria-modal="true"
        aria-label="Trả lời bình luận"
      >
        <header className="flex min-h-[31px] items-center justify-between gap-3 border-b border-[#333] px-[11px]">
          <h3 className="m-0 text-[10px] font-extrabold tracking-normal">Trả lời bình luận</h3>
          <button
            type="button"
            className="inline-flex min-h-[17px] items-center justify-center gap-1 rounded-full border border-[#3d3d3d] bg-transparent px-2 text-[7px] text-[#d7d7d7] hover:text-white"
            onClick={onClose}
            aria-label="Đóng modal"
          >
            <span>Đóng</span>
            <X size={10} aria-hidden="true" />
          </button>
        </header>

        <div className="px-2 pt-[11px] pb-2">
          <p className="m-0 mb-[9px] text-[8px] text-[#c7c7c7]">Đang trả lời bình luận của {commenterName}.</p>
          <textarea
            value={reply}
            onChange={(event) => setReply(event.target.value)}
            placeholder={`@${commenterName} Nhập nội dung trả lời... (textbox)`}
            aria-label="Nội dung trả lời bình luận"
            className="h-[60px] w-full resize-none rounded-[14px] border border-[#d5d5d5] bg-[#232323] p-2.5 text-[8px] text-[#f3f3f3] outline-none placeholder:text-[#696969]"
          />
        </div>

        <footer className="flex gap-2 border-t border-[#343434] p-2 max-sm:flex-col">
          <button type="submit" className={`${compactButtonClass} border-0 bg-[#f5f5f5] text-[#171717] hover:bg-[#dedede] max-sm:w-full`}>
            Đăng
          </button>
          <button
            type="button"
            className={`${compactButtonClass} border border-[#555] bg-transparent text-[#f2f2f2] hover:bg-white/10 max-sm:w-full`}
            onClick={onClose}
          >
            Hủy
          </button>
        </footer>
      </form>
    </div>
  );
}
