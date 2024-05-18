'use client';
import { useState } from 'react';
import useSWR from 'swr';
import { SimplePost } from '@/model/post';
import PostListCard from './PostListCard';
import GridSpinner from './ui/GridSpinner';
export default function PostList() {
  const {data: posts, isLoading: loading, error} = useSWR<SimplePost[]>('/api/posts');
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

