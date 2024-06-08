'use client';
import usePosts from '@/hook/posts';
import PostListCard from './PostListCard';
import GridSpinner from './ui/GridSpinner';
export default function PostList() {
  const { posts, isLoading: loading } = usePosts();
  return (
    <section>
      {loading && (
        <div className='text-center mt-32'>
          <GridSpinner color='red' />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post, index) => <li className='mb-4' key={post.id}><PostListCard post={post} priority={index < 2}/></li>)}
        </ul>
      )}
    </section>
  )
}

