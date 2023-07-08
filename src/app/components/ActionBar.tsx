'use client';
import { parseDate } from '@/util/date';
import { Comment, SimplePost } from '@/types/post';
import usePosts from '@/hooks/posts';
import HeartIcon from './ui/icons/HeartIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import ToggleButton from './ui/ToggleButton';
import HeartFillIcon from './ui/icons/HeartFillIcon';
import BookmarkFillIcon from './ui/icons/BookmarkFillIcon';
import { useMe } from '@/hooks/me';
import CommentForm from './CommentForm';
import CommentIcon from './ui/icons/CommentIcon';
import ShareIcon from './ui/icons/ShareIcon';

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
};
export default function ActionBar({ post, children, onComment }: Props) {
  const { id, likes, createdAt } = post;
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(id) ?? false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };
  const handleBookmarked = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };

  const handleComment = (comment: string) => {
    user && onComment({ comment, username: user.username, image: user.image });
  };
  return (
    <>
      <div className="flex justify-between items-center m-2">
        <div className="flex flex-row gap-2">
          <ToggleButton
            title={liked ? 'unliked' : 'liked'}
            toggled={liked}
            onToggle={handleLike}
            onIcon={<HeartFillIcon />}
            offIcon={<HeartIcon />}
          />
          {/* <CommentIcon />
          <ShareIcon /> */}
        </div>
        <div>
          <ToggleButton
            title={bookmarked ? 'unbookmarked' : 'bookmarked'}
            toggled={bookmarked}
            onToggle={handleBookmarked}
            onIcon={<BookmarkFillIcon />}
            offIcon={<BookmarkIcon />}
          />
        </div>
      </div>
      <div className="px-3 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
        {children}
        <p className="text-xs text-neutral-500 uppercase my-1">{parseDate(createdAt)}</p>
      </div>
      <CommentForm onPostComment={handleComment} />
    </>
  );
}
