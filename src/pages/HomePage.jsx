import { UserCircle } from "lucide-react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

const videos = [
  { id: 1, artClass: "art-home-room", duration: "19:34" },
  { id: 2, artClass: "art-home-cosmos", duration: "19:34" },
  { id: 3, artClass: "art-home-traffic", duration: "19:34" },
  { id: 4, artClass: "art-home-city", duration: "19:34" },
  { id: 5, artClass: "art-home-mountain", duration: "19:34" },
  { id: 6, artClass: "art-home-cathedral", duration: "19:34" },
  { id: 7, artClass: "art-home-autumn", duration: "19:34" },
  { id: 8, artClass: "art-home-temple", duration: "19:34" },
  { id: 9, artClass: "art-home-anime-city", duration: "19:34" },
  { id: 10, artClass: "art-home-shipwreck", duration: "19:34" },
  { id: 11, artClass: "art-sakura-thumb", duration: "19:34" },
  { id: 12, artClass: "art-home-mecha", duration: "19:34" },
  { id: 13, artClass: "art-home-fantasy", duration: "19:34" },
  { id: 14, artClass: "art-home-runway", duration: "19:34" },
  { id: 15, artClass: "art-home-sky", duration: "19:34" },
  { id: 16, artClass: "art-home-sunset-city", duration: "19:34" },
];

export default function HomePage({ activeItem = "home", onNavigate }) {
  return (
    <div className="min-h-screen bg-[#1f1f1f] text-[#f4f4f4]">
      <Sidebar activeItem={activeItem} onNavigate={onNavigate} />
      <Header />

      <main className="ml-[172px] min-h-screen px-10 pt-[122px] pb-12 max-md:ml-0 max-md:px-4 max-md:pt-[92px]">
        <section className="grid grid-cols-4 gap-x-12 gap-y-6 max-2xl:grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1" aria-label="Video trang chủ">
          {videos.map((video) => (
            <button
              key={video.id}
              type="button"
              className="group min-w-0 border-0 bg-transparent p-0 text-left text-[#f1f1f1]"
              onClick={() => onNavigate?.("watchVideo")}
              aria-label="Mở video TOI STREAMER NÓI LOẠNNN"
            >
              <span className={`relative block aspect-[16/5.65] w-full overflow-hidden rounded-[28px] ${video.artClass}`}>
                <span className="absolute right-2 bottom-2 rounded-[5px] bg-black/80 px-1.5 py-0.5 text-[11px] font-bold text-white">
                  {video.duration}
                </span>
              </span>

              <span className="mt-3 flex gap-3">
                <UserCircle className="mt-0.5 size-10 shrink-0 text-[#d8dde6]" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-[17px] leading-[1.12] font-black text-white uppercase group-hover:text-[#dedede]">
                    TOI STREAMER
                    <br />
                    NÓI LOẠNNN
                  </span>
                  <span className="mt-2 block text-sm font-medium text-[#d1d1d1] uppercase">TUI TÊN BỘ</span>
                  <span className="mt-0.5 block text-sm text-[#a7a7a7]">8,8 N người đang xem</span>
                </span>
              </span>
            </button>
          ))}
        </section>
      </main>
    </div>
  );
}
