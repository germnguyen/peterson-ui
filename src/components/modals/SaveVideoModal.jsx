import { CheckCircle2, X } from "lucide-react";
import { useState } from "react";

const playlists = ["Xem sau", "Học lập trình", "Video yêu thích"];
const overlayClass = "fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 max-sm:items-end max-sm:p-3";
const compactButtonClass =
  "inline-flex min-h-7 items-center justify-center gap-1 rounded-full px-4 text-[10px] font-extrabold whitespace-nowrap";
const compactHeaderClass =
  "flex min-h-11 items-center justify-between gap-3 border-b border-[#333] px-4";

export default function SaveVideoModal({ isOpen, onClose, onSave }) {
  const [selectedPlaylist, setSelectedPlaylist] = useState("Học lập trình");
  const [newPlaylistName, setNewPlaylistName] = useState("");

  if (!isOpen) return null;

  function handleOverlayMouseDown(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleSave() {
    onSave?.({ selectedPlaylist, newPlaylistName });
    onClose();
  }

  return (
    <div className={overlayClass} onMouseDown={handleOverlayMouseDown}>
      <section
        className="w-[min(223px,100%)] overflow-hidden rounded-[22px] border border-[#383838] bg-[#171717] text-[#f2f2f2] shadow-[0_24px_80px_rgba(0,0,0,0.56)]"
        role="dialog"
        aria-modal="true"
        aria-label="Popup lưu video"
      >
        <header className={compactHeaderClass}>
          <h3 className="m-0 text-xs font-extrabold tracking-normal">Popup lưu video</h3>
          <button type="button" className="inline-flex items-center justify-center border-0 bg-transparent text-[#d7d7d7] hover:text-white" onClick={onClose} aria-label="Đóng modal">
            <X size={15} aria-hidden="true" />
          </button>
        </header>

        <div className="px-3 pt-3.5 pb-3">
          <p className="m-0 mb-[18px] text-[9px] leading-[1.65] text-[#c8c8c8]">
            Người dùng nhấn nút Lưu dưới video. Hệ thống thêm video vào playlist đã chọn;
            nút Lưu cũng có thể nhận lại để bỏ lưu.
          </p>

          <span className="block text-[9px] font-extrabold tracking-[0.02em] text-[#e7e7e7]">CHỌN PLAYLIST</span>
          <div className="my-[9px] mb-[18px] flex flex-wrap gap-1.5" role="group" aria-label="Chọn playlist">
            {playlists.map((playlist) => (
              <button
                key={playlist}
                type="button"
                className={`inline-flex min-h-[29px] items-center justify-center gap-1 rounded-full border px-[11px] text-[9px] font-bold ${
                  selectedPlaylist === playlist
                    ? "border-[#f5f5f5] bg-[#f5f5f5] text-[#111]"
                    : "border-[#454545] bg-transparent text-[#e8e8e8]"
                }`}
                onClick={() => setSelectedPlaylist(playlist)}
              >
                {selectedPlaylist === playlist && <CheckCircle2 size={12} aria-hidden="true" />}
                <span>{playlist}</span>
              </button>
            ))}
          </div>

          <span className="block text-[9px] font-extrabold tracking-[0.02em] text-[#e7e7e7]">TẠO PLAYLIST MỚI</span>
          <input
            type="text"
            value={newPlaylistName}
            onChange={(event) => setNewPlaylistName(event.target.value)}
            placeholder="Nhập tên playlist mới..."
            aria-label="Tên playlist mới"
            className="my-[9px] mb-2 h-[27px] w-full rounded-full border border-[#424242] bg-[#202020] px-3 text-[10px] text-[#f2f2f2] outline-none placeholder:text-[#777]"
          />

          <div className="flex flex-wrap gap-[7px]">
            <button
              type="button"
              className={`${compactButtonClass} border border-[#555] bg-transparent text-[#f2f2f2] hover:bg-white/10`}
              onClick={handleSave}
            >
              Lưu
            </button>
            <button
              type="button"
              className={`${compactButtonClass} border-0 bg-[#f5f5f5] text-[#171717] hover:bg-[#dedede]`}
              onClick={onClose}
            >
              <CheckCircle2 size={12} aria-hidden="true" />
              <span>Đã lưu</span>
            </button>
            <button
              type="button"
              className={`${compactButtonClass} border-0 bg-[#f5f5f5] text-[#171717] hover:bg-[#dedede]`}
              onClick={handleSave}
            >
              Tạo playlist
            </button>
          </div>
        </div>

        <footer className="flex justify-end border-t border-[#292929] p-3">
          <button
            type="button"
            className={`${compactButtonClass} border border-[#555] bg-transparent text-[#f2f2f2] hover:bg-white/10`}
            onClick={onClose}
          >
            ĐÓNG
          </button>
        </footer>
      </section>
    </div>
  );
}
