'use client';

import { ProfileUser } from '@/types/user';
import Button from './ui/Button';
import { useMe } from '@/hooks/me';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { PulseLoader } from 'react-spinners';

type Props = {
  user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { user: loggedInUser, isLoading, toggleFollow } = useMe();
  const router = useRouter();
  const showButton = loggedInUser && loggedInUser.username !== username;
  const following = loggedInUser && loggedInUser.following.find((item) => item.username === username);
  const text = following ? 'Unfollow' : 'Follow';

  const handleFollow = async () => {
    await toggleFollow(user.id, !following);
    router.refresh();
  };
  return (
    <>
      {showButton && (
        <div className="relative">
          {isLoading && (
            <div className="absolute z-20 inset-0 flex justify-center items-center">
              <PulseLoader size={6} />
            </div>
          )}
          <Button disabled={isLoading} text={text} onClick={handleFollow} active={text === 'Follow'} />
        </div>
      )}
    </>
  );
}
