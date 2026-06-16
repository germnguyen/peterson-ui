import { useRef, useState } from "react";
import { Image, UploadCloud } from "lucide-react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import SuccessUploadModal from "../components/modals/SuccessUploadModal";

const pageClass = "min-h-screen bg-[#1f1f1f] text-[#f4f4f4]";
const mainClass = "ml-[172px] min-h-screen px-6 pt-24 pb-[38px] max-md:ml-0 max-md:px-4 max-md:pt-[92px] max-md:pb-7";
const outlineButtonClass =
  "min-h-9 rounded-full border border-[#4a4a4a] bg-[#2a2a2a] px-6 text-[13px] font-extrabold text-[#f3f3f3] hover:border-[#686868] hover:bg-[#333]";
const primaryButtonClass =
  "min-h-9 rounded-full border-0 bg-[#f5f5f5] px-6 text-[13px] font-extrabold text-[#111] hover:bg-[#dedede]";
const fieldInputClass =
  "w-full rounded-full border border-[#444] bg-[#141414] px-4 text-sm text-[#f5f5f5] outline-none placeholder:text-[#a3a3a3] focus:border-[#707070]";

export default function UploadVideoPage({ activeItem = "manageVideos", onNavigate }) {
  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function handleVideoChange(event) {
    const [file] = event.target.files;
    if (file) {
      setVideoFile(file);
    }
  }

  function handleThumbnailChange(event) {
    const [file] = event.target.files;
    if (!file) return;

    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  }

  function handleDrop(event) {
    event.preventDefault();
    const [file] = event.dataTransfer.files;
    if (file?.type.startsWith("video/")) {
      setVideoFile(file);
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
    <div className={pageClass}>
      <Sidebar activeItem={activeItem} onNavigate={onNavigate} />
      <Header />

      <main className={mainClass}>
        <h1 className="m-0 mb-[18px] text-xl font-extrabold tracking-normal">TẢI VIDEO MỚI LÊN KÊNH</h1>

        <form className="flex flex-col gap-[30px]" onSubmit={handleSubmit}>
          <section
            className={`flex min-h-[324px] items-center justify-center rounded-[14px] border border-dashed bg-[#1b1b1b] max-md:min-h-[260px] ${
              videoFile ? "border-[#686868]" : "border-[#3e3e3e]"
            }`}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex size-[76px] items-center justify-center rounded-full bg-[#303030] text-[#e6e6e6]">
                <UploadCloud size={32} aria-hidden="true" />
              </div>

              <strong className="mt-2.5 text-[15px] font-extrabold">Kéo thả video vào đây</strong>
              <span className="m-0 text-xs text-[#a6a6a6]">hoặc</span>

              <button
                type="button"
                className={outlineButtonClass}
                onClick={() => videoInputRef.current?.click()}
              >
                Chọn file từ thiết bị
              </button>

              <p className="m-0 text-xs text-[#a6a6a6]">{videoFile ? videoFile.name : "MP4, MOV, AVI up to 10GB"}</p>
            </div>

            <input
              ref={videoInputRef}
              type="file"
              accept="video/mp4,video/quicktime,video/x-msvideo,video/*"
              onChange={handleVideoChange}
              hidden
            />
          </section>

          <section className="rounded-2xl border border-[#404040] bg-[#1b1b1b] p-[30px] max-md:p-5">
            <div className="mb-6 flex flex-col gap-2.5">
              <label htmlFor="video-title" className="text-sm font-bold text-[#f1f1f1]">
                Tiêu đề video <span>*</span>
              </label>
              <input
                id="video-title"
                type="text"
                placeholder="Nhập tiêu đề hấp dẫn cho video của bạn..."
                className={`${fieldInputClass} h-11`}
              />
            </div>

            <div className="mb-6 flex flex-col gap-2.5">
              <label htmlFor="video-description" className="text-sm font-bold text-[#f1f1f1]">Mô tả video</label>
              <textarea
                id="video-description"
                placeholder="Mô tả nội dung video, thêm link và thông tin liên hệ..."
                className={`${fieldInputClass} min-h-[118px] resize-y rounded-[28px] p-[18px]`}
              />
            </div>

            <div className="grid grid-cols-[minmax(280px,1fr)_minmax(360px,1fr)] gap-20 max-lg:grid-cols-1 max-lg:gap-6">
              <div>
                <label className="text-sm font-bold text-[#f1f1f1]">Thumbnail</label>
                <p className="mt-2 mb-3 text-[13px] leading-normal text-[#b2b2b2]">Chọn một hình ảnh thu hút sự chú ý của người xem.</p>

                <div className="flex items-end gap-3.5">
                  <button
                    type="button"
                    className="flex h-[90px] w-[152px] items-center justify-center overflow-hidden rounded-[28px] border border-[#444] bg-[#141414] text-[#d8d8d8]"
                    onClick={() => thumbnailInputRef.current?.click()}
                    aria-label="Chọn ảnh thumbnail"
                  >
                    {thumbnailPreview ? (
                      <img src={thumbnailPreview} alt={thumbnailFile?.name || "Thumbnail"} className="h-full w-full object-cover" />
                    ) : (
                      <Image size={24} aria-hidden="true" />
                    )}
                  </button>

                  <button
                    type="button"
                    className={outlineButtonClass}
                    onClick={() => thumbnailInputRef.current?.click()}
                  >
                    Chọn ảnh
                  </button>
                </div>

                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/*"
                  onChange={handleThumbnailChange}
                  hidden
                />
              </div>

              <div className="mb-[45px] flex flex-col gap-2.5 self-end max-lg:mb-0 max-lg:self-stretch">
                <label htmlFor="video-tags" className="text-sm font-bold text-[#f1f1f1]">Tags</label>
                <p className="mt-0 mb-0 text-[13px] leading-normal text-[#b2b2b2]">Thêm từ khóa giúp người dùng dễ dàng tìm thấy video.</p>
                <input
                  id="video-tags"
                  type="text"
                  placeholder="vd: vlog, du lịch, ẩm thực (phân cách bằng dấu phẩy)"
                  className={`${fieldInputClass} h-11`}
                />
              </div>
            </div>

            <div className="mt-0 mb-6 h-px bg-[#3f3f3f]" />

            <fieldset className="m-0 flex flex-col gap-4 border-0 p-0">
              <legend className="mb-4 text-[15px] font-extrabold">Quyền truy cập</legend>

              <label className="flex w-fit items-start gap-3 text-[#f2f2f2]">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={visibility === "public"}
                  onChange={(event) => setVisibility(event.target.value)}
                  className="mt-px size-5 accent-white"
                />
                <span className="flex flex-col gap-1">
                  <strong className="text-sm">Công khai</strong>
                  <small className="text-xs text-[#adadad]">Mọi người đều có thể xem video này</small>
                </span>
              </label>

              <label className="flex w-fit items-start gap-3 text-[#f2f2f2]">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={visibility === "private"}
                  onChange={(event) => setVisibility(event.target.value)}
                  className="mt-px size-5 accent-white"
                />
                <span className="flex flex-col gap-1">
                  <strong className="text-sm">Riêng tư</strong>
                  <small className="text-xs text-[#adadad]">Chỉ bạn và những người được chọn mới có thể xem</small>
                </span>
              </label>
            </fieldset>
          </section>

          <footer className="flex justify-end gap-3.5 border-t border-[#3f3f3f] pt-4 max-md:flex-col-reverse">
            <button type="button" className={`${outlineButtonClass} min-w-[86px] max-md:w-full`} onClick={handleCancel}>
              HỦY
            </button>
            <button type="submit" className={`${primaryButtonClass} min-w-[86px] max-md:w-full`}>
              ĐĂNG TẢI
            </button>
          </footer>
        </form>
      </main>

      <SuccessUploadModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}
