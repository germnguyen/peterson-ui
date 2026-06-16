import {
  Bell,
  Bookmark,
  Check,
  ListFilter,
  ThumbsDown,
  ThumbsUp,
  UserCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import DeleteCommentModal from "../components/modals/DeleteCommentModal";
import EditCommentModal from "../components/modals/EditCommentModal";
import ReplyCommentModal from "../components/modals/ReplyCommentModal";
import SaveVideoModal from "../components/modals/SaveVideoModal";

const recommendedVideos = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  title: "Obito - Hà Nội ft. VSTRA",
  channel: "Obito Official",
  meta: "Obito - Hà Nội ft. VSTRA Download.",
  duration: "2:46",
}));

const initialComments = [
  {
    id: 1,
    author: "Nguyễn H B",
    time: "1 giờ trước",
    text: "Cảm ơn tác giả đã chia sẻ kiến thức thực tế.",
    likes: 12,
    dislikes: 0,
    liked: false,
    disliked: false,
    replies: [],
    edited: false,
  },
  {
    id: 2,
    author: "Nguyễn Văn A",
    time: "2 giờ trước",
    text: "Video rất hữu ích cho sinh viên CNTT.",
    likes: 25,
    dislikes: 0,
    liked: false,
    disliked: false,
    replies: [],
    edited: false,
  },
];

const actionButtonBase =
  "inline-flex min-h-9 items-center justify-center gap-2 rounded-full border border-[#3f3f3f] px-4 text-sm transition hover:bg-[#333]";
const commentTextButton =
  "inline-flex min-h-7 items-center justify-center rounded-full px-3 text-xs font-bold text-[#d8d8d8] hover:bg-[#303030] hover:text-white";

function formatCommentCount(comments) {
  const replyCount = comments.reduce((total, comment) => total + comment.replies.length, 0);
  return comments.length + replyCount;
}

function updateCommentReaction(comments, commentId, reaction) {
  return comments.map((comment) => {
    if (comment.id !== commentId) return comment;

    const wasLiked = comment.liked;
    const wasDisliked = comment.disliked;
    const nextLiked = reaction === "like" ? !wasLiked : false;
    const nextDisliked = reaction === "dislike" ? !wasDisliked : false;

    return {
      ...comment,
      liked: nextLiked,
      disliked: nextDisliked,
      likes: comment.likes + (nextLiked ? 1 : 0) - (wasLiked ? 1 : 0),
      dislikes: comment.dislikes + (nextDisliked ? 1 : 0) - (wasDisliked ? 1 : 0),
    };
  });
}

function CommentItem({ comment, onReact, onReply, onEdit, onDelete }) {
  return (
    <article className="flex gap-3">
      <UserCircle className="mt-0.5 shrink-0 text-[#d8dde6]" size={34} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <strong className="text-sm font-extrabold text-white">{comment.author}</strong>
          <span className="text-xs text-[#a8a8a8]">{comment.time}</span>
          {comment.edited && <span className="text-xs text-[#9f9f9f]">đã chỉnh sửa</span>}
        </div>
        <p className="m-0 text-sm leading-relaxed text-[#ededed]">{comment.text}</p>

        <div className="mt-2 flex flex-wrap items-center gap-1">
          <button
            type="button"
            className={`inline-flex min-h-7 items-center gap-1 rounded-full px-2 text-xs hover:bg-[#303030] ${
              comment.liked ? "font-black text-white" : "text-[#d8d8d8]"
            }`}
            onClick={() => onReact(comment.id, "like")}
            aria-label="Thích bình luận"
          >
            <ThumbsUp size={14} fill={comment.liked ? "currentColor" : "none"} aria-hidden="true" />
            <span>{comment.likes}</span>
          </button>
          <button
            type="button"
            className={`inline-flex min-h-7 items-center gap-1 rounded-full px-2 text-xs hover:bg-[#303030] ${
              comment.disliked ? "font-black text-white" : "text-[#d8d8d8]"
            }`}
            onClick={() => onReact(comment.id, "dislike")}
            aria-label="Không thích bình luận"
          >
            <ThumbsDown size={14} fill={comment.disliked ? "currentColor" : "none"} aria-hidden="true" />
          </button>
          <button type="button" className={commentTextButton} onClick={() => onReply(comment)}>
            Trả lời
          </button>
          <button type="button" className={commentTextButton} onClick={() => onEdit(comment)}>
            Sửa
          </button>
          <button type="button" className={commentTextButton} onClick={() => onDelete(comment)}>
            Xóa
          </button>
        </div>

        {comment.replies.length > 0 && (
          <div className="mt-3 space-y-3 border-l border-[#363636] pl-4">
            {comment.replies.map((reply) => (
              <div key={reply.id} className="flex gap-2">
                <UserCircle className="mt-0.5 shrink-0 text-[#d8dde6]" size={26} aria-hidden="true" />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <strong className="text-xs font-extrabold text-white">{reply.author}</strong>
                    <span className="text-[11px] text-[#a8a8a8]">{reply.time}</span>
                  </div>
                  <p className="m-0 mt-1 text-sm leading-relaxed text-[#e5e5e5]">{reply.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function WatchVideoPage({ activeItem = "home", onNavigate }) {
  const [videoReaction, setVideoReaction] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(initialComments);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [replyingComment, setReplyingComment] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [deletingComment, setDeletingComment] = useState(null);

  const commentCount = useMemo(() => formatCommentCount(comments), [comments]);

  function handlePublishComment(event) {
    event.preventDefault();
    const trimmedComment = commentText.trim();
    if (!trimmedComment) return;

    setComments((currentComments) => [
      {
        id: Date.now(),
        author: "Bạn",
        time: "vừa xong",
        text: trimmedComment,
        likes: 0,
        dislikes: 0,
        liked: false,
        disliked: false,
        replies: [],
        edited: false,
      },
      ...currentComments,
    ]);
    setCommentText("");
  }

  function handleReplySubmit(replyText) {
    const trimmedReply = replyText.trim();
    if (!trimmedReply || !replyingComment) return;

    setComments((currentComments) =>
      currentComments.map((comment) =>
        comment.id === replyingComment.id
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: Date.now(),
                  author: "Bạn",
                  time: "vừa xong",
                  text: trimmedReply,
                },
              ],
            }
          : comment,
      ),
    );
    setReplyingComment(null);
  }

  function handleEditComment(nextText) {
    const trimmedText = nextText.trim();
    if (!trimmedText || !editingComment) return;

    setComments((currentComments) =>
      currentComments.map((comment) =>
        comment.id === editingComment.id
          ? {
              ...comment,
              text: trimmedText,
              edited: true,
            }
          : comment,
      ),
    );
    setEditingComment(null);
  }

  function handleDeleteComment() {
    if (!deletingComment) return;
    setComments((currentComments) => currentComments.filter((comment) => comment.id !== deletingComment.id));
    setDeletingComment(null);
  }

  function handleVideoReaction(nextReaction) {
    setVideoReaction((currentReaction) => (currentReaction === nextReaction ? null : nextReaction));
  }

  return (
    <div className="min-h-screen bg-[#1f1f1f] text-[#f4f4f4]">
      <Sidebar activeItem={activeItem} onNavigate={onNavigate} />
      <Header />

      <main className="ml-[172px] min-h-screen px-6 pt-[88px] pb-12 max-md:ml-0 max-md:px-4 max-md:pt-[92px]">
        <div className="grid grid-cols-[minmax(0,1fr)_330px] gap-8 max-xl:grid-cols-1">
          <section className="min-w-0">
            <div className="art-code-player aspect-video w-full overflow-hidden rounded-[26px] border border-[#3b4447]" aria-label="Trình phát video Học Java Spring Boot cơ bản" />

            <h1 className="mt-5 mb-4 text-2xl leading-tight font-black text-[#f5f5f5] max-md:text-xl">
              Học Java Spring Boot cơ bản
            </h1>

            <section className="flex flex-wrap items-center gap-3 border-b border-[#303030] pb-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="art-channel-avatar size-10 shrink-0 rounded-full border border-[#465053]" aria-hidden="true" />
                <div className="min-w-0">
                  <h2 className="truncate text-base font-extrabold text-white">Công Nghệ Việt Nam</h2>
                  <p className="m-0 text-xs text-[#b7b7b7]">1.2M subscribers</p>
                </div>
              </div>

              <button
                type="button"
                className={`inline-flex min-h-9 items-center justify-center gap-2 rounded-full px-5 text-sm font-extrabold transition ${
                  isSubscribed
                    ? "bg-[#303030] text-[#f1f1f1] hover:bg-[#3b3b3b]"
                    : "bg-[#f5f5f5] text-[#111] hover:bg-[#dedede]"
                }`}
                onClick={() => setIsSubscribed((currentValue) => !currentValue)}
              >
                {isSubscribed ? <Bell size={16} aria-hidden="true" /> : null}
                <span>{isSubscribed ? "Đã đăng ký" : "Subscribe"}</span>
              </button>

              <div className="ml-auto flex flex-wrap items-center gap-2 max-md:ml-0">
                <div className="inline-flex min-h-9 overflow-hidden rounded-full border border-[#3f3f3f] bg-[#282828]">
                  <button
                    type="button"
                    className={`inline-flex items-center gap-2 border-r border-[#454545] px-4 text-sm hover:bg-[#333] ${
                      videoReaction === "like" ? "font-black text-white" : "text-[#e2e2e2]"
                    }`}
                    onClick={() => handleVideoReaction("like")}
                    aria-label="Thích video"
                  >
                    <ThumbsUp size={16} fill={videoReaction === "like" ? "currentColor" : "none"} aria-hidden="true" />
                    <span>12.4K</span>
                  </button>
                  <button
                    type="button"
                    className={`inline-flex items-center px-3 hover:bg-[#333] ${
                      videoReaction === "dislike" ? "font-black text-white" : "text-[#e2e2e2]"
                    }`}
                    onClick={() => handleVideoReaction("dislike")}
                    aria-label="Không thích video"
                  >
                    <ThumbsDown size={16} fill={videoReaction === "dislike" ? "currentColor" : "none"} aria-hidden="true" />
                  </button>
                </div>

                <button
                  type="button"
                  className={`${actionButtonBase} ${isSaved ? "bg-[#f5f5f5] font-black text-[#111]" : "bg-[#282828] text-[#e2e2e2]"}`}
                  onClick={() => setShowSaveModal(true)}
                >
                  {isSaved ? <Check size={16} aria-hidden="true" /> : <Bookmark size={16} aria-hidden="true" />}
                  <span>{isSaved ? "Đã lưu" : "Lưu"}</span>
                </button>
              </div>
            </section>

            <section className="mt-4 rounded-[28px] border border-[#303030] bg-[#222] px-5 py-4">
              <div className="mb-2 flex flex-wrap gap-5 text-sm font-extrabold text-white">
                <span>245.6K lượt xem</span>
                <span>2 giờ trước</span>
              </div>
              <p className="m-0 text-sm leading-relaxed text-[#d4d4d4]">
                Khám phá sức mạnh của framework Java Spring Boot thông qua lộ trình học cơ bản
                dành cho người mới bắt đầu. Video bao gồm cài đặt môi trường, tạo project đầu tiên
                và xử lý REST API cơ bản.
              </p>
              <button type="button" className="mt-2 border-0 bg-transparent p-0 text-sm font-extrabold text-white hover:text-[#d0d0d0]">
                Hiện thêm
              </button>
            </section>

            <section className="mt-5">
              <div className="mb-6 flex flex-wrap items-center gap-5">
                <h2 className="m-0 text-xl font-black">{commentCount} Bình luận</h2>
                <button type="button" className="inline-flex min-h-8 items-center gap-2 rounded-full px-3 text-sm font-bold text-[#e2e2e2] hover:bg-[#303030]">
                  <ListFilter size={17} aria-hidden="true" />
                  <span>Sắp xếp theo</span>
                </button>
              </div>

              <form className="mb-8 flex gap-3" onSubmit={handlePublishComment}>
                <UserCircle className="mt-0.5 shrink-0 text-[#d8dde6]" size={38} aria-hidden="true" />
                <div className="flex min-w-0 flex-1 gap-3 max-sm:flex-col">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                    placeholder="Viết bình luận của bạn..."
                    className="h-10 min-w-0 flex-1 border border-[#444] bg-[#222] px-3 text-sm text-white outline-none placeholder:text-[#8c8c8c] focus:border-[#777]"
                    aria-label="Viết bình luận của bạn"
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="inline-flex h-10 min-w-[88px] items-center justify-center rounded-full border border-[#d7d7d7] bg-transparent px-5 text-lg font-black text-white hover:bg-white/10 disabled:opacity-45"
                  >
                    Đăng
                  </button>
                </div>
              </form>

              <div className="space-y-7">
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onReact={(commentId, reaction) => setComments((currentComments) => updateCommentReaction(currentComments, commentId, reaction))}
                    onReply={setReplyingComment}
                    onEdit={setEditingComment}
                    onDelete={setDeletingComment}
                  />
                ))}
              </div>
            </section>
          </section>

          <aside className="min-w-0" aria-label="Video đề xuất">
            <h2 className="mb-6 text-3xl font-black text-white max-xl:text-2xl">Dành cho bạn</h2>
            <div className="space-y-5">
              {recommendedVideos.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  className="grid w-full grid-cols-[128px_minmax(0,1fr)] gap-3 border-0 bg-transparent p-0 text-left text-[#f1f1f1] hover:opacity-90 max-sm:grid-cols-[112px_minmax(0,1fr)]"
                  onClick={() => onNavigate?.("watchVideo")}
                >
                  <span className="art-sakura-thumb relative aspect-video overflow-hidden rounded-[10px]">
                    <span className="absolute right-1 bottom-1 rounded-[3px] bg-black/80 px-1.5 py-0.5 text-[11px] text-white">
                      {video.duration}
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="line-clamp-2 text-base leading-snug font-extrabold text-white">{video.title}</span>
                    <span className="mt-1 block truncate text-xs text-[#b9b9b9]">{video.meta}</span>
                    <span className="mt-1 inline-flex min-h-5 items-center rounded-full border border-[#4c4c4c] px-2 text-xs text-[#f0f0f0]">
                      {video.channel}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </main>

      <SaveVideoModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={() => setIsSaved(true)}
      />
      <ReplyCommentModal
        key={replyingComment?.id ?? "reply-comment"}
        isOpen={Boolean(replyingComment)}
        commenterName={replyingComment?.author}
        onClose={() => setReplyingComment(null)}
        onSubmit={handleReplySubmit}
      />
      <EditCommentModal
        key={editingComment?.id ?? "edit-comment"}
        isOpen={Boolean(editingComment)}
        initialComment={editingComment?.text}
        onClose={() => setEditingComment(null)}
        onSave={handleEditComment}
      />
      <DeleteCommentModal
        isOpen={Boolean(deletingComment)}
        onClose={() => setDeletingComment(null)}
        onConfirm={handleDeleteComment}
      />
    </div>
  );
}
