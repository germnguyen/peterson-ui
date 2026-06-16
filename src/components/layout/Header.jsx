import { Search, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-[172px] z-10 flex h-[72px] items-center justify-center border-b border-[#3a3a3a] bg-[#232323] max-md:left-0">
      <div className="flex h-[34px] w-[min(510px,calc(100vw-260px))] items-center gap-3 rounded-full border border-[#444] bg-[#0f0f0f] px-3.5 text-[#cfcfcf] max-md:w-[min(420px,calc(100vw-90px))]">
        <Search size={18} />
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="min-w-0 flex-1 border-0 bg-transparent text-sm text-white outline-none placeholder:text-[#aaa]"
        />
      </div>

      <button
        type="button"
        className="absolute right-4 flex items-center justify-center border-0 bg-transparent text-[#d8dde6] hover:text-white"
        aria-label="Tài khoản"
      >
        <UserCircle size={32} />
      </button>
    </header>
  );
}
