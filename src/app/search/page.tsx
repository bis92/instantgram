'use client';
import UserSearch from '@/components/UserSearch';
import { useState } from 'react';

export default function SearchPage() {
  const [typing, setTyping] = useState('');
  const [search, setSearch] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTyping(value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if(e) {
      e.preventDefault();
    }
    setSearch(typing)
  }

  
  return (
    <UserSearch />
  );
}

