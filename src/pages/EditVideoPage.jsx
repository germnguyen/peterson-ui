import { useRef, useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import SuccessEditVideoModal from "../components/modals/SuccessEditVideoModal";

const fieldClass =
  "w-full rounded-[5px] border border-[#404040] bg-[#202020] px-3.5 text-sm text-[#f4f4f4] outline-none focus:border-[#6a6a6a]";
const neutralButtonClass =
  "inline-flex min-h-8 items-center justify-center rounded-md border border-[#4a4a4a] bg-[#353535] px-[18px] text-[13px] font-extrabold text-[#f2f2f2] hover:bg-[#414141]";

export default function EditVideoPage({ activeItem = "manageVideos", onNavigate }) {
  const thumbnailInputRef = useRef(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function handleThumbnailChange(event) {
    const [file] = event.target.files;
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
    }
  }

  function handleCancel() {
    onNavigate?.("manageVideos");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setShowSuccessModal(true);
  }

  return (
    <div className="min-h-screen bg-[#1f1f1f] text-[#f4f4f4]">
      <Sidebar activeItem={activeItem} onNavigate={onNavigate} />
      <Header />

      <main className="ml-[172px] min-h-screen px-[68px] pt-[108px] pb-[42px] max-md:ml-0 max-md:px-4 max-md:pt-[92px] max-md:pb-8">
        <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
          <div className="flex min-h-[58px] items-center justify-center border border-[#454545] bg-[#202020]">
            <h1 className="m-0 text-xl font-extrabold tracking-normal">CHỈNH SỬA VIDEO</h1>
          </div>

          <section className="flex flex-col gap-2.5">
            <label className="text-sm font-extrabold text-[#f1f1f1]">Thumbnail</label>
            <div className="flex items-center gap-4 max-md:flex-col max-md:items-stretch">
              <button
                type="button"
                className="flex h-[100px] w-[180px] items-center justify-center overflow-hidden rounded border border-[#565656] bg-[#d8d8d8] max-md:w-full"
                onClick={() => thumbnailInputRef.current?.click()}
                aria-label="Thay đổi thumbnail"
              >
                {thumbnailPreview ? (
                  <img src={thumbnailPreview} alt="Thumbnail mới" className="h-full w-full object-cover" />
                ) : (
                  <span className="art-thumb-placeholder" />
                )}
              </button>

              <button
                type="button"
                className={`${neutralButtonClass} max-md:w-full`}
                onClick={() => thumbnailInputRef.current?.click()}
              >
                Thay đổi thumbnail
              </button>
            </div>
            <input
              ref={thumbnailInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/*"
              onChange={handleThumbnailChange}
              hidden
            />
          </section>

          <section className="flex flex-col gap-7">
            <div className="flex flex-col gap-[9px]">
              <label htmlFor="edit-title" className="text-sm font-extrabold text-[#f1f1f1]">Tiêu đề</label>
              <input id="edit-title" type="text" defaultValue="Hướng dẫn Docker từ A-Z 2026" className={`${fieldClass} h-9`} />
            </div>

            <div className="flex flex-col gap-[9px]">
              <label htmlFor="edit-description" className="text-sm font-extrabold text-[#f1f1f1]">Mô tả</label>
              <textarea id="edit-description" className={`${fieldClass} min-h-32 resize-y p-3.5`} />
            </div>

            <div className="flex flex-col gap-[9px]">
              <label htmlFor="edit-tags" className="text-sm font-extrabold text-[#f1f1f1]">Tags</label>
              <div className="relative">
                <input id="edit-tags" type="text" aria-label="Tags" className={`${fieldClass} h-9 pr-24`} />
                <button type="button" className="absolute top-[5px] right-[7px] inline-flex min-h-6 items-center justify-center rounded-[5px] border border-[#4a4a4a] bg-[#353535] px-3 text-xs font-extrabold text-[#f2f2f2] hover:bg-[#414141]">
                  + Thêm tag
                </button>
              </div>
            </div>

            <fieldset className="m-0 flex min-h-[76px] items-center gap-[22px] rounded-[5px] border border-[#404040] px-4 py-[18px]">
              <legend className="p-0 text-sm font-extrabold text-[#f1f1f1]">Chế độ</legend>
              <label className="inline-flex items-center gap-2 text-sm text-[#d7d7d7]">
                <input
                  type="radio"
                  name="edit-visibility"
                  value="public"
                  checked={visibility === "public"}
                  onChange={(event) => setVisibility(event.target.value)}
                  className="size-[17px] accent-white"
                />
                <span>Công khai</span>
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-[#d7d7d7]">
                <input
                  type="radio"
                  name="edit-visibility"
                  value="private"
                  checked={visibility === "private"}
                  onChange={(event) => setVisibility(event.target.value)}
                  className="size-[17px] accent-white"
                />
                <span>Riêng tư</span>
              </label>
            </fieldset>
          </section>

          <footer className="flex justify-end gap-3.5 pt-4 max-md:flex-col">
            <button
              type="button"
              className="inline-flex min-h-8 min-w-[74px] items-center justify-center rounded-md border border-[#4a4a4a] bg-[#202020] px-[18px] text-[13px] font-extrabold text-[#f2f2f2] hover:bg-[#303030] max-md:w-full"
              onClick={handleCancel}
            >
              HỦY
            </button>
            <button
              type="submit"
              className="inline-flex min-h-8 min-w-[136px] items-center justify-center rounded-md border-0 bg-[#f4f4f4] px-[18px] text-[13px] font-extrabold text-[#151515] hover:bg-[#dedede] max-md:w-full"
            >
              LƯU THAY ĐỔI
            </button>
          </footer>
        </form>
      </main>

      <SuccessEditVideoModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}
