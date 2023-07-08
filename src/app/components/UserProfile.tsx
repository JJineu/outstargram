'use client';

import { ProfileUser } from '@/types/user';
import Avatar from './Avatar';
import FollowButton from './FollowButton';
import MessageButton from './MessageButton';
import ColorButton from './ui/icons/ColorButton';
import { signOut, useSession } from 'next-auth/react';

type Props = {
  user: ProfileUser;
};
export default function UserProfile({ user }: Props) {
  const { image, username, name, followers, following, posts } = user;
  const { data: session } = useSession();
  const info = [
    { title: 'posts', data: posts },
    { title: 'followers', data: followers },
    { title: 'following', data: following },
  ];

  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center py-12 border-b border-neutral-300">
      <Avatar image={image} size="xlarge" highlight />
      <div className="md:ml-10 basis-1/3">
        <div className="flex flex-col items-center md:flex-row">
          <h1 className="text-2xl my-2 md:mr-8 ">{username}</h1>
          <FollowButton user={user} />
          <MessageButton user={user} />
          {session?.user.username === username ? <ColorButton text="Log out" onClick={() => signOut()} /> : ''}
        </div>
        <ul className="my-4 flex gap-4">
          {info.map(({ title, data }, index) => (
            <li key={index}>
              <span className="font-bold mr-1">{data}</span>
              {title}
            </li>
          ))}
        </ul>
        <p className="text-xl font-bold text-center md:text-start">{name}</p>
      </div>
    </section>
  );
}
