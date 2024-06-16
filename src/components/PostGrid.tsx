import GridSpinner from './ui/GridSpinner';
import PostGridCard from './PostGridCard';
import usePosts from '@/hook/posts';
import { useCacheKeys } from '@/context/CacheKeysContext';

export default function PostGrid() {
  const { postsKey } = useCacheKeys();;
  const { posts, isLoading } = usePosts();
  return (
    <div className='w-full text-center'>
      {isLoading && <GridSpinner />}
      <ul className='grid grid-cols-3 gap-4 py-4 px-8'>
        {posts && posts.map((post, index) => <li key={post.id}>
          <PostGridCard priority={index < 6}  post={post}/>
        </li>)}
      </ul>
    </div>
  );
}

