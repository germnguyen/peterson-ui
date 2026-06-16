import { Trash2 } from "lucide-react";

const overlayClass = "fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 max-sm:items-end max-sm:p-3";
const smallButtonClass = "inline-flex min-h-7 items-center justify-center rounded-full px-[18px] text-[11px] font-bold";

export default function DeleteVideoModal({
  isOpen,
  onClose,
  onConfirm,
  videoTitle = "Ultimate 2024 UI Setup",
}) {
  if (!isOpen) return null;

  function handleOverlayMouseDown(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={overlayClass} onMouseDown={handleOverlayMouseDown}>
      <section
        className="w-[min(314px,100%)] rounded-[22px] border border-[#404040] bg-[#2b2b2b] px-8 py-6 text-center text-[#f4f4f4] shadow-[0_26px_90px_rgba(0,0,0,0.58)]"
        role="dialog"
        aria-modal="true"
        aria-label="Xác nhận xóa video"
      >
        <div className="mb-[25px] inline-flex size-12 items-center justify-center rounded-full bg-[#232323] text-[#e8e8e8]">
          <Trash2 size={20} aria-hidden="true" />
        </div>

        <h3 className="m-0 text-[15px] font-extrabold tracking-normal">Xác nhận xóa video</h3>

        <p className="my-[22px] mb-[30px] text-[13px] leading-normal text-[#d5d5d5]">
          Bạn có chắc chắn muốn xóa video <strong>“{videoTitle}”</strong> khỏi danh sách phát
          không? Hành động này không thể hoàn tác.
        </p>

        <div className="flex justify-center gap-2.5 max-sm:flex-col-reverse">
          <button
            type="button"
            className={`${smallButtonClass} min-w-[72px] border border-zinc-700 bg-transparent text-[#f3f3f3] hover:bg-white/10`}
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            type="button"
            className={`${smallButtonClass} min-w-[72px] border-0 bg-[#f4f4f4] text-[#151515] hover:bg-[#dedede]`}
            onClick={onConfirm}
          >
            Xác nhận
          </button>
        </div>
      </section>
    </div>
  );
}
