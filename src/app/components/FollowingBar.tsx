'use client';

import Link from 'next/link';
import { PulseLoader } from 'react-spinners';
import Avatar from './Avatar';
import Scrollablebar from './Scrollablebar';
import { useMe } from '@/hooks/me';

export default function FollowingBar() {
  const { user, isLoading, error } = useMe();
  // const users = user?.following;
  // const users = undefined;
  const users = user?.following && [...user?.following, ...user?.following, ...user?.following, ...user?.following];

  return (
    <section
      className="shadow-md shadow-neutral-300 rounded-lg min-h-[120px] 
    w-full flex justify-center items-center p-4 mb-4 z-0 relative"
    >
      {isLoading ? (
        <PulseLoader size={8} color="skyblue" />
      ) : (
        (!users || users.length === 0) && <p className="text-xl">{`People you follow`}</p>
      )}
      {users && users.length > 0 && (
        <Scrollablebar>
          {users.map(({ image, username }) => (
            <Link key={username} className="flex flex-col items-center w-20" href={`/user/${username}`}>
              <Avatar image={image} highlight />
              <p className="w-full text-sm text-center text-ellipsis overflow-hidden">{username}</p>
            </Link>
          ))}
        </Scrollablebar>
      )}
    </section>
  );
}
