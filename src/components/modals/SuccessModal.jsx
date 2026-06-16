import { AlertTriangle, Check } from "lucide-react";
import BaseModal from "./BaseModal";

export default function SuccessModal({
  isOpen,
  onClose,
  title = "THÔNG BÁO",
  message,
  description,
  variant = "success",
}) {
  const Icon = variant === "warning" ? AlertTriangle : Check;
  const statusClass =
    variant === "warning"
      ? "bg-amber-500/15 [&>div]:bg-amber-500 [&>div]:text-[#111]"
      : "bg-zinc-700 [&>div]:bg-white [&>div]:text-[#111]";

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center px-8 py-8 text-center">
        <div className={`mb-5 flex size-[52px] items-center justify-center rounded-full ${statusClass}`}>
          <div className="flex size-[30px] items-center justify-center rounded-full">
            <Icon size={18} strokeWidth={3} aria-hidden="true" />
          </div>
        </div>

        <p className="m-0 mb-3 text-[15px] leading-[1.45] font-bold">{message}</p>

        {description && (
          <p className="m-0 mb-7 max-w-[280px] text-[13px] leading-[1.6] text-neutral-400">{description}</p>
        )}

        <button
          type="button"
          onClick={onClose}
          className="min-h-[42px] w-full rounded-full border-0 bg-white px-[22px] text-sm font-extrabold text-[#111] hover:bg-neutral-200"
        >
          ĐÓNG
        </button>
      </div>
    </BaseModal>
  );
}
