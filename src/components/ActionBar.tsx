import { parseDate } from '@/util/date';
import BookMarkIcon from './ui/icons/BookmarkIcon';
import HeartIcon from './ui/icons/HeartIcon';
import ToggleButton from './ui/ToggleButton';
import HeartFillIcon from './ui/icons/HeartFillIcon';
import BookmarkFillIcon from './ui/icons/BookmarkFillIcon';
import { Comment, SimplePost } from '@/model/post';
import usePosts from '@/hook/posts';
import useMe from '@/hook/me';
import CommentForm from './CommentForm';
import { useCacheKeys } from '@/context/CacheKeysContext';

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
}

export default function ActionBar({ post, children, onComment }: Props) {
  const { id, likes, createdAt } = post;
  const { setBookmark, user } = useMe();
  const liked = user ? likes.includes(user.username) : false;
  const { setLike } = usePosts();
  const bookmarked = user?.bookmarks.includes(id) ?? false;
  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  }

  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  }

  const handleComment = (comment: string) => {
    user && onComment({ comment, username: user.username, image: user.image })
  }

  return (
    <>
      <div className='flex justify-between my-2 px-4'>
        <ToggleButton 
          toggled={liked} 
          onToggle={handleLike} 
          onIcon={<HeartFillIcon />} 
          offIcon={<HeartIcon />} 
        />
        <ToggleButton 
          toggled={bookmarked} 
          onToggle={handleBookmark} 
          onIcon={<BookmarkFillIcon />} 
          offIcon={<BookMarkIcon />} 
        />
      </div>
      <div className='px-4 py-1'>
        <p className='text-sm font-bold mb-2'>{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes':'like'}`}</p>
        {children}
        <p className='text-xs text-neutral-500 uppercase my-2'>
          {parseDate(createdAt)}
        </p>
      </div>
      <CommentForm 
        onPostComment={handleComment}
      />
    </>
  );
}

