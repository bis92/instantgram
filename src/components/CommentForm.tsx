
'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import SmileIcon from './ui/icons/SmileIcon';
import { addComment } from '@/service/posts';
import { useSession } from 'next-auth/react';

type Props = {
  onPostComment: (comment: string) => void;
}

export default function CommentForm({ onPostComment }: Props) {

  const [comment, setComment] = useState('');
  const buttonDisabled = comment.length === 0;
  const { data: session } = useSession();
  const user = session?.user

  const handleSubmit = (event: FormEvent) => {
    if(event) {
      event.preventDefault();
    }
    if(!user) return;
    onPostComment(comment);
    setComment('');
  }

  return (
    <form className='flex items-center px-3 border-t border-neutral-300' onSubmit={handleSubmit}>
    <SmileIcon />
    <input 
      className='w-full ml-2 border-none outline p-3' 
      type='text' 
      placeholder='Add a comment...'
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      required
    />
    <button 
      className={`font-bold ml-2 ${
        buttonDisabled ? 'text-sky-300':'text-sky-500'
      }`} 
      disabled={buttonDisabled}
    >Post</button>
  </form>
  );
}

