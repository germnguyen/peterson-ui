import { Search, UserCircle, PlayCircle } from "lucide-react";
import "./PlaylistDetailHeader.css";

export default function PlaylistDetailHeader() {
  return (
    <header className="pdh">
      <div className="pdh-logo">
        <PlayCircle size={18} fill="white" />
        <span>PERTERSON</span>
      </div>

      <div className="pdh-search">
        <Search size={18} />
        <input type="text" placeholder="Tìm kiếm" />
      </div>

      <button className="pdh-avatar">
        <UserCircle size={32} />
      </button>
    </header>
  );
}