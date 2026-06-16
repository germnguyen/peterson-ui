import { Link2 } from "lucide-react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

const videos = [
  {
    title: "Arsenal và PSG đang che giấu à lÊM YÊU gì?",
    meta: "5,1 N lượt xem • 4 giờ trước",
    duration: "9:57",
    theme: "field",
  },
  {
    title: "Xabi Alonso sẽ GIẢI CLU Chelsea nhWthQ nào?",
    meta: "19 N lượt xem • 1 ngày trước",
    duration: "10:26",
    theme: "mountain",
  },
  {
    title: "De Zerbi đã giúp Tottenham TRp HẠNG nhWthQ nào?",
    meta: "17 N lượt xem • 7 ngày trước",
    duration: "9:27",
    theme: "cosmos",
  },
  {
    title: "Một ngày làm việc cùng đội phân tích chiến thuật",
    meta: "8,7 N lượt xem • 2 tuần trước",
    duration: "12:08",
    theme: "studio",
  },
  {
    title: "Điều gì khiến bóng đá hiện đại thay đổi nhanh?",
    meta: "11 N lượt xem • 3 tuần trước",
    duration: "14:12",
    theme: "city",
  },
  {
    title: "Nhìn lại mùa giải qua những con số",
    meta: "6,4 N lượt xem • 1 tháng trước",
    duration: "8:45",
    theme: "skyline",
  },
];
const themeClass = {
  field: "art-field-thumb",
  mountain: "art-mountain-thumb",
  cosmos: "art-cosmos-thumb",
  studio: "art-studio-thumb",
  city: "art-city-thumb",
  skyline: "art-skyline-thumb",
};

export default function ChannelProfilePage({ activeItem = "profile", onNavigate }) {
  return (
    <div className="min-h-screen bg-[#1f1f1f] text-[#f4f4f4]">
      <Sidebar activeItem={activeItem} onNavigate={onNavigate} />
      <Header />

      <main className="ml-[172px] min-h-screen px-11 pt-[94px] pb-12 max-md:ml-0 max-md:px-4 max-md:pt-[92px] max-md:pb-8">
        <h1 className="m-0 mb-6 text-center text-4xl font-black tracking-normal max-md:text-3xl">HỒ SƠ KÊNH</h1>

        <section className="art-stadium-hero h-[232px] overflow-hidden rounded-[14px] border border-[#303a3d] max-md:h-[170px]" aria-label="Ảnh bìa kênh" />

        <section className="my-7 mb-8 flex items-center gap-6 max-md:items-start max-md:flex-col">
          <div className="art-profile-avatar size-[126px] shrink-0 rounded-full border-4 border-[#101010]" aria-label="Ảnh đại diện kênh" />
          <div>
            <h2 className="m-0 mb-1 text-[28px] font-black">Cúp Học Xem Bóng</h2>
            <p className="m-0 mb-[9px] text-base text-[#c8c8c8]">@CupHocXemBong</p>
            <p className="m-0 mb-[9px] text-base text-[#c8c8c8]">13,6 N người đăng ký • 85 video</p>
          </div>
        </section>

        <section className="mb-11 ml-3.5">
          <h3 className="m-0 mb-2.5 text-[23px] font-black">Mô tả:</h3>
          <p className="m-0 flex items-center gap-2 text-base text-[#f2f2f2]">
            <Link2 size={16} aria-hidden="true" />
            Đây là kênh chuyên phân tích bóng đá
          </p>
        </section>

        <section className="grid grid-cols-3 gap-x-[18px] gap-y-9 max-xl:grid-cols-2 max-md:grid-cols-1" aria-label="Video của kênh">
          {videos.map((video) => (
            <article key={video.title} className="min-w-0">
              <div className={`relative aspect-[16/5.25] w-full overflow-hidden rounded-[28px] shadow-[inset_0_-40px_50px_rgba(0,0,0,0.45)] ${themeClass[video.theme]}`}>
                <span className="absolute right-2 bottom-[7px] rounded-[3px] bg-black/70 px-1.5 py-0.5 text-[11px] text-white">{video.duration}</span>
              </div>
              <h3 className="mt-3 mb-1 text-base leading-snug font-medium text-[#f4f4f4]">{video.title}</h3>
              <p className="m-0 text-sm text-[#b9b9b9]">{video.meta}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
