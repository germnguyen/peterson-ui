import { FileSpreadsheet, FileText, TrendingDown, TrendingUp } from "lucide-react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

const summaryStats = [
  { label: "Lượt xem", value: "1.24M", trend: "12%", tone: "up" },
  { label: "Thời gian xem", value: "1.24M giờ", trend: "8%", tone: "up" },
  { label: "Đăng ký mới", value: "+2,340", trend: "3%", tone: "down" },
  { label: "Video mới", value: "+12", trend: "0%", tone: "flat" },
];

const chartData = [
  { day: "Mon", value: 17 },
  { day: "Tue", value: 29 },
  { day: "Wed", value: 46, active: true },
  { day: "Thu", value: 26 },
  { day: "Fri", value: 37 },
  { day: "Sat", value: 20 },
  { day: "Sun", value: 32 },
];

const topVideos = [
  { title: "Hướng dẫn Docker", views: "98.4K views", variant: "blue" },
  { title: "Review MacBook Air M4", views: "67.2K views", variant: "silver" },
];
const exportButtonClass =
  "inline-flex min-h-8 min-w-[124px] items-center justify-center gap-2 rounded-full text-[13px] font-extrabold max-md:w-full";
const thumbVariantClass = {
  blue: "art-top-thumb-blue",
  silver: "art-top-thumb-silver",
};

export default function StatisticsPage({ activeItem = "statistics", onNavigate }) {
  function exportExcel() {
    const rows = [
      ["Metric", "Value", "Trend"],
      ...summaryStats.map((item) => [item.label, item.value, item.trend]),
      [],
      ["Top Video", "Views"],
      ...topVideos.map((video) => [video.title, video.views]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "thong-ke-kenh.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  function exportPdf() {
    window.print();
  }

  return (
    <div className="min-h-screen bg-[#1f1f1f] text-[#f4f4f4]">
      <Sidebar activeItem={activeItem} onNavigate={onNavigate} />
      <Header />

      <main className="ml-[172px] min-h-screen px-[52px] pt-24 pb-[58px] max-md:ml-0 max-md:px-4 max-md:pt-[92px] max-md:pb-8 print:m-0 print:p-6">
        <div className="flex items-start justify-between gap-6 border-b border-[#3f3f3f] pb-[18px] max-md:flex-col">
          <div>
            <h1 className="m-0 mb-2 text-xl font-extrabold tracking-normal">THỐNG KÊ KÊNH</h1>
            <p className="m-0 text-sm text-[#b9b9b9]">Overview of your channel&apos;s performance.</p>
          </div>

          <label className="flex items-center gap-3 text-[13px] font-bold text-[#cfcfcf] max-md:w-full">
            <span>Thời gian:</span>
            <select
              defaultValue="30"
              className="h-[34px] min-w-32 rounded-full border border-[#454545] bg-[#2a2a2a] px-3.5 text-[#d8d8d8] outline-none max-md:flex-1"
            >
              <option value="7">7 ngày qua</option>
              <option value="30">30 ngày qua</option>
              <option value="90">90 ngày qua</option>
            </select>
          </label>
        </div>

        <section className="my-[30px] grid grid-cols-4 gap-3.5 max-xl:grid-cols-2 max-md:grid-cols-1" aria-label="Số liệu tổng quan">
          {summaryStats.map((item) => (
            <article key={item.label} className="relative min-h-[86px] rounded-[44px] border border-[#363636] bg-[#1f1f1f] py-5 pr-[72px] pl-5">
              <span className="mb-2 block text-[13px] text-[#bdbdbd]">{item.label}</span>
              <strong className="block text-xl leading-none text-[#f8f8f8]">{item.value}</strong>
              <em
                className={`absolute top-1/2 right-5 inline-flex h-[18px] min-w-[50px] -translate-y-1/2 items-center justify-center gap-[3px] rounded-full text-[11px] font-extrabold not-italic ${
                  item.tone === "up"
                    ? "bg-green-600/25 text-green-400"
                    : item.tone === "down"
                      ? "bg-red-700/25 text-red-400"
                      : "bg-[#3a3a3a] text-[#d1d1d1]"
                }`}
              >
                {item.tone === "down" ? (
                  <TrendingDown size={13} aria-hidden="true" />
                ) : (
                  <TrendingUp size={13} aria-hidden="true" />
                )}
                {item.trend}
              </em>
            </article>
          ))}
        </section>

        <section className="rounded-[42px] border border-[#363636] bg-[#1f1f1f] px-[22px] pt-6 pb-[22px] max-md:rounded-[20px]">
          <h2 className="m-0 text-base font-extrabold">Biểu đồ lượt xem theo thời gian</h2>
          <div className="mt-6 grid min-h-[275px] grid-cols-[36px_1fr] max-md:overflow-x-auto">
            <div className="flex flex-col justify-between pb-[29px] text-xs text-[#b8b8b8]">
              <span>50k</span>
              <span>40k</span>
              <span>30k</span>
              <span>20k</span>
              <span>10k</span>
              <span>0</span>
            </div>
            <div className="art-chart-bg grid grid-cols-7 items-end gap-[34px] px-[18px] max-xl:gap-[18px] max-md:min-w-[620px]">
              {chartData.map((item) => (
                <div key={item.day} className="flex h-[235px] min-w-[54px] flex-col items-center justify-end gap-4 text-xs text-[#bdbdbd]">
                  <div
                    className={`max-h-[190px] min-h-[70px] w-11 rounded-t-[3px] ${item.active ? "bg-[#f3f3f3]" : "bg-[#2b2b2b]"}`}
                    style={{ height: `${item.value * 4}px` }}
                    title={`${item.day}: ${item.value}k views`}
                  />
                  <span>{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-[30px] overflow-hidden rounded-[42px] border border-[#363636] bg-[#1f1f1f] max-md:rounded-[20px]">
          <h2 className="m-0 p-[18px] text-base font-extrabold">Top Video</h2>
          <ol className="m-0 list-none p-0">
            {topVideos.map((video, index) => (
              <li
                key={video.title}
                className="grid min-h-[63px] grid-cols-[24px_56px_1fr_auto] items-center gap-4 border-t border-[#2c2c2c] py-0 pr-9 pl-4 max-md:grid-cols-[24px_56px_1fr] max-md:pr-4"
              >
                <span className="text-xs text-[#c4c4c4]">{index + 1}.</span>
                <span className={`h-8 w-14 rounded-[13px] border border-[#343434] shadow-[inset_0_0_22px_rgba(255,255,255,0.08)] ${thumbVariantClass[video.variant]}`} />
                <span className="text-sm text-[#f2f2f2]">{video.title}</span>
                <span className="text-xs text-[#c4c4c4] max-md:col-start-3">{video.views}</span>
              </li>
            ))}
          </ol>
        </section>

        <footer className="mt-[30px] flex justify-end gap-3.5 border-t border-[#343434] pt-4 max-md:flex-col print:hidden">
          <button
            type="button"
            className={`${exportButtonClass} border border-[#4a4a4a] bg-[#222] text-[#f2f2f2] hover:bg-[#2d2d2d]`}
            onClick={exportExcel}
          >
            <FileSpreadsheet size={16} aria-hidden="true" />
            Xuất Excel
          </button>
          <button
            type="button"
            className={`${exportButtonClass} border border-[#f4f4f4] bg-[#f4f4f4] text-[#171717] hover:bg-[#dedede]`}
            onClick={exportPdf}
          >
            <FileText size={16} aria-hidden="true" />
            Xuất PDF
          </button>
        </footer>
      </main>
    </div>
  );
}
