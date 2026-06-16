import { ChevronLeft, ChevronRight, Pencil, Search, SlidersHorizontal, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import SuccessDeleteVideoModal from "../components/modals/SuccessDeleteVideoModal";

const videos = [
  { id: 1, title: "Top 10 VS Code Extensions 2026", visibility: "CÔNG KHAI", duration: "15:30" },
  { id: 2, title: "Top 10 VS Code Extensions 2026", visibility: "CÔNG KHAI", duration: "15:30" },
  { id: 3, title: "Top 10 VS Code Extensions 2026", visibility: "CÔNG KHAI", duration: "15:30" },
  { id: 4, title: "Top 10 VS Code Extensions 2026", visibility: "CÔNG KHAI", duration: "15:30" },
];
const toolbarButtonClass =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-[18px] text-sm font-extrabold whitespace-nowrap";
const iconButtonClass =
  "inline-flex h-[54px] w-[58px] items-center justify-center rounded-full border border-[#454545] bg-[#1d1d1d] text-[#e7e7e7] hover:bg-[#2a2a2a] hover:text-white max-xl:h-12 max-xl:w-[52px] max-md:w-full";

export default function VideoManagementPage({ activeItem = "manageVideos", onNavigate }) {
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-[#1f1f1f] text-[#f4f4f4]">
      <Sidebar activeItem={activeItem} onNavigate={onNavigate} />
      <Header />

      <main className="ml-[172px] min-h-screen px-7 pt-[90px] pb-[42px] max-md:ml-0 max-md:px-4 max-md:pt-[92px] max-md:pb-8">
        <div className="flex items-center justify-center border-b border-[#373737] py-4">
          <h1 className="m-0 text-center text-[28px] font-black tracking-[0.08em] text-[#f7f7f7] max-md:text-2xl">
            QUẢN LÝ VIDEO CÁ NHÂN
          </h1>
        </div>

        <section className="my-[22px] flex items-center gap-3 max-lg:flex-wrap" aria-label="Công cụ quản lý video">
          <div className="relative w-[min(480px,100%)] max-lg:w-full">
            <input
              type="text"
              placeholder="Tìm kiếm video..."
              aria-label="Tìm kiếm video"
              className="h-[42px] w-full rounded-full border border-[#4b4b4b] bg-[#1e1e1e] pr-[46px] pl-5 text-sm text-[#f5f5f5] outline-none placeholder:text-[#7f8794]"
            />
            <Search size={16} aria-hidden="true" className="absolute top-1/2 right-4 -translate-y-1/2 text-[#d3d3d3]" />
          </div>

          <button type="button" className={`${toolbarButtonClass} border border-[#4b4b4b] bg-[#222] text-[#d9d9d9] hover:bg-[#333] max-md:w-full`}>
            <SlidersHorizontal size={15} aria-hidden="true" />
            Lọc
          </button>

          <button type="button" className={`${toolbarButtonClass} border-0 bg-[#3a3a3a] text-white hover:bg-[#333] max-md:w-full`}>
            Tất cả
          </button>

          <button
            type="button"
            className={`${toolbarButtonClass} ml-auto min-w-[174px] border-0 bg-[#f5f5f5] text-[#111] uppercase hover:bg-[#dedede] max-lg:ml-0 max-md:w-full`}
            onClick={() => onNavigate?.("uploadVideo")}
          >
            <Upload size={15} aria-hidden="true" />
            Tải video mới
          </button>
        </section>

        <section className="overflow-hidden rounded-[28px] border border-[#3f3f3f] bg-[#1d1d1d]">
          <div className="grid min-h-11 grid-cols-[minmax(180px,240px)_minmax(260px,1fr)_minmax(120px,170px)_minmax(120px,150px)] items-center gap-x-[22px] border-b border-[#333] px-6 text-lg font-medium tracking-[0.04em] text-[#c8c8c8] uppercase max-xl:grid-cols-[minmax(160px,210px)_minmax(220px,1fr)_128px_128px] max-xl:gap-x-4 max-lg:hidden">
            <span>Thumbnail</span>
            <span>Tiêu đề</span>
            <span>Trạng thái</span>
            <span>Hành động</span>
          </div>

          {videos.map((video) => (
            <article
              key={video.id}
              className="grid min-h-[132px] grid-cols-[minmax(180px,240px)_minmax(260px,1fr)_minmax(120px,170px)_minmax(120px,150px)] items-center gap-x-[22px] border-b border-[#303030] px-6 py-2 last:border-b-0 max-xl:grid-cols-[minmax(160px,210px)_minmax(220px,1fr)_128px_128px] max-xl:gap-x-4 max-lg:grid-cols-1 max-lg:gap-[18px] max-lg:p-6"
            >
              <button
                type="button"
                className="flex items-center border-0 bg-transparent p-0 text-left"
                onClick={() => onNavigate?.("watchVideo")}
                aria-label={`Xem video ${video.title}`}
              >
                <span className="art-night-thumb h-[124px] w-[220px] max-xl:h-[108px] max-xl:w-[190px] max-md:h-auto max-md:w-full max-md:aspect-video">
                  <span className="absolute right-1.5 bottom-1.5 z-[1] rounded-[3px] bg-black/70 px-1.5 py-0.5 text-[11px] text-white">{video.duration}</span>
                </span>
              </button>
              <button
                type="button"
                className="border-0 bg-transparent p-0 text-left text-xl leading-snug font-normal text-[#e7e7e7] hover:text-white max-xl:text-[17px]"
                onClick={() => onNavigate?.("watchVideo")}
              >
                {video.title}
              </button>
              <span className="inline-flex min-h-[54px] min-w-[132px] items-center justify-center rounded-full border border-[#454545] text-base font-extrabold tracking-[0.02em] text-white max-xl:min-h-12 max-xl:min-w-[116px] max-xl:text-sm max-md:w-full">
                {video.visibility}
              </span>
              <div className="flex items-center justify-end gap-2.5 max-md:flex-col">
                <button
                  type="button"
                  className={iconButtonClass}
                  onClick={() => onNavigate?.("editVideo")}
                  aria-label="Chỉnh sửa video"
                >
                  <Pencil size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={iconButtonClass}
                  onClick={() => setShowDeleteSuccess(true)}
                  aria-label="Xóa video"
                >
                  <Trash2 size={18} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </section>

        <nav className="mt-7 flex items-center gap-[9px]" aria-label="Phân trang video">
          <button type="button" className="inline-flex size-[34px] items-center justify-center rounded-full border border-[#454545] bg-[#232323] text-sm text-[#e7e7e7]" aria-label="Trang trước">
            <ChevronLeft size={15} aria-hidden="true" />
          </button>
          <button type="button" className="inline-flex size-[34px] items-center justify-center rounded-full border border-[#f5f5f5] bg-[#343434] text-sm text-white">1</button>
          <button type="button" className="inline-flex size-[34px] items-center justify-center rounded-full border border-[#454545] bg-[#232323] text-sm text-[#e7e7e7]">2</button>
          <button type="button" className="inline-flex size-[34px] items-center justify-center rounded-full border border-[#454545] bg-[#232323] text-sm text-[#e7e7e7]">3</button>
          <span className="px-1 text-[#d4d4d4]">...</span>
          <button type="button" className="inline-flex size-[34px] items-center justify-center rounded-full border border-[#454545] bg-[#232323] text-sm text-[#e7e7e7]">15</button>
          <button type="button" className="inline-flex size-[34px] items-center justify-center rounded-full border border-[#454545] bg-[#232323] text-sm text-[#e7e7e7]" aria-label="Trang sau">
            <ChevronRight size={15} aria-hidden="true" />
          </button>
        </nav>
      </main>

      <SuccessDeleteVideoModal
        isOpen={showDeleteSuccess}
        onClose={() => setShowDeleteSuccess(false)}
      />
    </div>
  );
}
