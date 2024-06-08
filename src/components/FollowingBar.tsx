'use client';

import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';
import Avatar from './ui/Avatar';
import ScrollableBar from './ui/ScrollableBar';
import useMe from '@/hook/me';

export default function FollowingBar() {
  const {user, isLoading: loading, error} = useMe();
  const users = user?.following;
  return <section className='w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0'>
    { loading ? <PropagateLoader size={8} color='red' /> :
    (!users || users.length === 0) && <p>{`You don't have following`}</p>}
    {
      users && users.length > 0 && (
          <ScrollableBar>
            {users.map(({image, username}) => (
              <Link
                key={username}
                className='flex flex-col items-center w-20'
                href={`/user/${username}`}
              >
                <Avatar image={image} hightlight />
                <p className='w-full text-sm text-center text-ellipsis overflow-hidden'>{username}</p>
              </Link>
            ))}
          </ScrollableBar>
      )
    }
    </section>
}

