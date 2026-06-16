import { useState } from "react";

const overlayClass = "fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 max-sm:items-end max-sm:p-3";
const inputClass = "w-full border border-[#303030] bg-[#1f1f1f] px-3 text-[11px] text-[#f1f1f1] outline-none placeholder:text-[#777] focus:border-[#696969]";
const pillButtonClass = "inline-flex min-h-7 items-center justify-center rounded-full px-[18px] text-[11px] font-bold";

export default function CreatePlaylistModal({ isOpen, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("private");

  if (!isOpen) return null;

  function handleOverlayMouseDown(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    onCreate?.({ title, description, visibility });
    onClose();
  }

  return (
    <div className={overlayClass} onMouseDown={handleOverlayMouseDown}>
      <form
        className="w-[min(312px,100%)] rounded-[14px] border border-white/5 bg-[#363634] p-[18px] text-[#f4f4f4] shadow-[0_24px_80px_rgba(0,0,0,0.54)]"
        onSubmit={handleSubmit}
      >
        <h3 className="m-0 mb-[22px] text-sm font-extrabold tracking-normal">Danh sách phát mới</h3>

        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="chọn một tiêu đề"
          aria-label="Tiêu đề danh sách phát"
          className={`${inputClass} mb-2.5 h-8`}
        />

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="nhập mô tả"
          aria-label="Mô tả danh sách phát"
          className={`${inputClass} mb-[15px] h-[59px] resize-none py-3`}
        />

        <label htmlFor="playlist-visibility" className="mb-1.5 block text-[10px] font-bold text-[#c7c7c7]">
          Chế độ hiển thị
        </label>
        <select
          id="playlist-visibility"
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)}
          className="h-8 w-full rounded-none border border-[#303030] bg-[#1f1f1f] px-2.5 text-[11px] text-[#f4f4f4] outline-none focus:border-[#696969]"
        >
          <option value="private">Riêng tư</option>
          <option value="unlisted">Không công khai</option>
          <option value="public">Công khai</option>
        </select>

        <div className="mt-7 flex justify-end gap-2">
          <button
            type="button"
            className={`${pillButtonClass} border border-[#484848] bg-transparent text-[#e2e2e2] hover:bg-white/10`}
            onClick={onClose}
          >
            Hủy
          </button>
          <button type="submit" className={`${pillButtonClass} border-0 bg-[#f4f4f4] text-[#151515] hover:bg-[#dedede]`}>
            Tạo
          </button>
        </div>
      </form>
    </div>
  );
}
