import {
  Home,
  Tv,
  UserSquare,
  User,
  BarChart3,
  PlaySquare,
  ListVideo,
  ThumbsUp,
  History,
  PlayCircle,
} from "lucide-react";

const menuItems = [
  { key: "home", label: "Trang chủ", icon: Home },
  { key: "subscriptions", label: "Kênh đã theo dõi", icon: Tv },
  { key: "channel", label: "Kênh cá nhân", icon: UserSquare },
  { key: "profile", label: "Hồ sơ", icon: User, child: true },
  { key: "statistics", label: "Thống kê", icon: BarChart3, child: true },
  { key: "manageVideos", label: "Quản lý video", icon: PlaySquare, child: true },
  { key: "playlists", label: "Danh sách phát", icon: ListVideo },
  { key: "likedVideos", label: "Video đã thích", icon: ThumbsUp },
  { key: "history", label: "Video đã xem", icon: History },
];

export default function Sidebar({ activeItem = "manageVideos", onNavigate }) {
  return (
    <aside className="fixed top-0 left-0 z-20 h-screen w-[172px] bg-[#272727] text-[#d6d6d6] max-md:hidden">
      <div className="flex h-[72px] items-center gap-[18px] border-b border-[#3a3a3a] pl-[30px] text-sm font-bold text-white">
        <PlayCircle size={18} fill="white" />
        <span>PERTERSON</span>
      </div>

      <nav className="flex flex-col pt-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.key === activeItem;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate?.(item.key)}
              className={`flex h-[60px] items-center gap-3 border-0 bg-transparent text-left text-[13px] hover:bg-[#303030] hover:text-white ${
                item.child ? "pl-12" : "pl-4"
              } ${isActive ? "font-semibold text-white" : "text-[#cfcfcf]"}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
