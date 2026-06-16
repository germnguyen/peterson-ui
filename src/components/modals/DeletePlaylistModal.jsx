import { AlignHorizontalJustifyEnd, Trash2, X } from "lucide-react";

export default function DeletePlaylistModal({ playlist, onClose, onConfirm }) {
  const playlistName = playlist?.title || "Danh sách phát";

  function handleOverlayMouseDown(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="modal-overlay delete-playlist-overlay" onMouseDown={handleOverlayMouseDown}>
      <section
        className="delete-playlist-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Xác nhận xóa danh sách phát"
      >
        <button type="button" className="delete-playlist-close" onClick={onClose} aria-label="Đóng modal">
          <X size={18} aria-hidden="true" />
        </button>

        <div className="delete-playlist-icon">
          <Trash2 size={18} aria-hidden="true" />
        </div>

        <h3>Xác nhận xóa danh sách phát</h3>

        <p>
          Bạn có chắc chắn muốn xóa danh sách phát <strong>"{playlistName}"</strong> không?
          Hành động này không thể hoàn tác và sẽ gỡ bỏ nhóm video này khỏi kênh của bạn.
        </p>

        <div className="delete-playlist-actions"  >
          <button type="button" className="playlist-outline-button" onClick={onClose}>
            Hủy
          </button>
          <button type="button" className="playlist-red-button" onClick={onConfirm}>
            Xác nhận xóa
          </button>
        </div>
      </section>
    </div>
  );
}