import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ListPlus,
  MessageCircleReply,
  MessageSquareText,
  Pencil,
  Trash2,
  Upload,
} from "lucide-react";
import CreatePlaylistModal from "../components/modals/CreatePlaylistModal";
import DeleteCommentModal from "../components/modals/DeleteCommentModal";
import DeletePlaylistModal from "../components/modals/DeletePlaylistModal";
import EditCommentModal from "../components/modals/EditCommentModal";
import ReplyCommentModal from "../components/modals/ReplyCommentModal";
import SaveVideoModal from "../components/modals/SaveVideoModal";
import SuccessUploadModal from "../components/modals/SuccessUploadModal";
import SuccessEditVideoModal from "../components/modals/SuccessEditVideoModal";
import SuccessDeleteVideoModal from "../components/modals/SuccessDeleteVideoModal";
import ValidationErrorModal from "../components/modals/ValidationErrorModal";
import DeleteVideoModal from "../components/modals/DeleteVideoModal";

const modalActions = [
  { id: "upload", label: "Upload thành công", icon: Upload },
  { id: "edit", label: "Sửa thành công", icon: Pencil },
  { id: "deleteSuccess", label: "Xóa thành công", icon: CheckCircle2 },
  { id: "validation", label: "Thiếu thông tin", icon: AlertCircle },
  { id: "createPlaylist", label: "Tạo danh sách phát", icon: ListPlus },
  { id: "saveVideo", label: "Lưu video", icon: CheckCircle2 },
  { id: "replyComment", label: "Trả lời bình luận", icon: MessageCircleReply },
  { id: "editComment", label: "Sửa bình luận", icon: MessageSquareText },
  { id: "deleteComment", label: "Xóa bình luận", icon: Trash2, danger: true },
  { id: "deletePlaylist", label: "Xóa danh sách phát", icon: Trash2, danger: true },
  { id: "delete", label: "Xóa video khỏi playlist", icon: Trash2, danger: true },
];
const actionButtonClass =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg border border-[#343434] bg-[#1b1b1b] px-4 text-sm font-bold text-[#f5f5f5] transition hover:-translate-y-px hover:border-[#5a5a5a] hover:bg-[#252525]";

export default function DemoModalPage() {
  const [modal, setModal] = useState(null);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(229,9,20,0.18),transparent_32rem),#101010] p-12 text-[#f7f7f7] max-sm:p-7 max-sm:px-[18px]">
      <div className="mx-auto max-w-[920px]">
        <div className="mb-7">
          <span className="mb-2 block text-[13px] font-bold tracking-normal text-[#b6b6b6] uppercase">Peterson UI</span>
          <h1 className="m-0 text-[32px] leading-tight max-sm:text-[26px]">Kiểm thử modal</h1>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-3" aria-label="Danh sách modal">
          {modalActions.map(({ id, label, icon: Icon, danger }) => (
            <button
              key={id}
              type="button"
              className={danger ? `${actionButtonClass} border-red-500/45 text-red-200` : actionButtonClass}
              onClick={() => setModal(id)}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <SuccessUploadModal
        isOpen={modal === "upload"}
        onClose={() => setModal(null)}
      />

      <SuccessEditVideoModal
        isOpen={modal === "edit"}
        onClose={() => setModal(null)}
      />

      <SuccessDeleteVideoModal
        isOpen={modal === "deleteSuccess"}
        onClose={() => setModal(null)}
      />

      <ValidationErrorModal
        isOpen={modal === "validation"}
        onClose={() => setModal(null)}
      />

      <DeleteVideoModal
        isOpen={modal === "delete"}
        onClose={() => setModal(null)}
        onConfirm={() => setModal("deleteSuccess")}
      />

      <CreatePlaylistModal
        isOpen={modal === "createPlaylist"}
        onClose={() => setModal(null)}
        onCreate={() => setModal(null)}
      />

      <DeletePlaylistModal
        isOpen={modal === "deletePlaylist"}
        onClose={() => setModal(null)}
        onConfirm={() => setModal("deleteSuccess")}
      />

      <SaveVideoModal
        isOpen={modal === "saveVideo"}
        onClose={() => setModal(null)}
        onSave={() => setModal(null)}
      />

      <ReplyCommentModal
        isOpen={modal === "replyComment"}
        onClose={() => setModal(null)}
        onSubmit={() => setModal(null)}
      />

      <DeleteCommentModal
        isOpen={modal === "deleteComment"}
        onClose={() => setModal(null)}
        onConfirm={() => setModal("deleteSuccess")}
      />

      <EditCommentModal
        isOpen={modal === "editComment"}
        onClose={() => setModal(null)}
        onSave={() => setModal(null)}
      />
    </div>
  );
}
