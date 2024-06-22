'use client';
import React, { useState } from 'react';
import { ProfileUser } from '@/model/user';
import PostIcon from './ui/icons/PostIcon';
import BookMarkIcon from './ui/icons/BookmarkIcon';
import HeartIcon from './ui/icons/HeartIcon';
import PostGrid from './PostGrid';
import { CacheKeysContext } from '@/context/CacheKeysContext';

type Props = {
  user: ProfileUser;
}

const tabs = [
  { type: 'posts', title: 'User posts', icon: <PostIcon /> },
  { type: 'saved', title: 'Saved posts', icon: <BookMarkIcon className='w-3 h-3' /> },
  { type: 'liked', title: 'Linked posts', icon: <HeartIcon className='w-3 h-3'/> }
]

export default function UserPosts({ user: { username } }: Props) {
  const [query, setQuery] = useState(tabs[0].type); 
  return (
    <section>
      <ul className='flex justify-center uppercase'>
        {tabs.map(({ type, icon, title }) => (
          <li 
            key={type} 
            onClick={() => setQuery(type)}
            className={`mx-12 p-4 cursor-pointer border-black ${type === query && 'font-bold border-t'}`}
          >
            <button className='scale-150 md:scale-100' aria-label={title}>{icon}</button>
            <span className='hidden md:inline'>{type}</span>
          </li>
        ))}
      </ul>
      <CacheKeysContext.Provider value={{ postsKey: `/api/users/${username}/${query}`}}>
        <PostGrid />
      </CacheKeysContext.Provider>
    </section>
  )
}

