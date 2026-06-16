import { Trash2, X } from "lucide-react";

const overlayClass = "fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 max-sm:items-end max-sm:p-3";
const actionButtonClass = "inline-flex min-h-7 items-center justify-center rounded-full px-[18px] text-[11px] font-bold max-sm:w-full";

export default function DeletePlaylistModal({
  isOpen,
  onClose,
  onConfirm,
  playlistName = "Drafts & Tests - 2024",
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
        className="relative w-[min(332px,100%)] border border-[#313131] bg-[#121212] px-[23px] pt-7 pb-[21px] text-center text-[#f4f4f4] shadow-[0_22px_80px_rgba(0,0,0,0.58)]"
        role="dialog"
        aria-modal="true"
        aria-label="Xác nhận xóa danh sách phát"
      >
        <button
          type="button"
          className="absolute top-3 right-3 inline-flex size-6 items-center justify-center rounded-full border-0 bg-transparent text-[#d0d0d0] hover:bg-[#222] hover:text-white"
          onClick={onClose}
          aria-label="Đóng modal"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="mb-3 inline-flex size-[34px] items-center justify-center rounded-full bg-red-800/40 text-[#f5a0a0]">
          <Trash2 size={18} aria-hidden="true" />
        </div>

        <h3 className="m-0 text-[15px] font-extrabold tracking-normal">Xác nhận xóa danh sách phát</h3>

        <p className="mx-auto mt-[18px] max-w-[276px] text-[11px] leading-[1.55] text-[#a9a9a9]">
          Bạn có chắc chắn muốn xóa danh sách phát <strong>“{playlistName}”</strong> không?
          Hành động này không thể hoàn tác và sẽ gỡ bỏ nhóm video này khỏi kênh của bạn.
        </p>

        <div className="mt-[30px] flex gap-3 border-t border-[#242424] pt-4 max-sm:flex-col-reverse">
          <button
            type="button"
            className={`${actionButtonClass} min-w-[70px] border border-zinc-700 bg-transparent text-[#f3f3f3] hover:bg-white/10`}
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            type="button"
            className={`${actionButtonClass} border-0 bg-[#c70e19] text-white shadow-[0_8px_22px_rgba(199,14,25,0.28)] hover:bg-[#a90c15]`}
            onClick={onConfirm}
          >
            Xác nhận xóa
          </button>
        </div>
      </section>
    </div>
  );
}
