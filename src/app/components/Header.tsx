'use client';

import Link from 'next/link';
import HomeIcon from './ui/icons/HomeIcon';
import HomeFillIcon from './ui/icons/HomeFillIcon';
import SearchIcon from './ui/icons/SearchIcon';
import SearchFillIcon from './ui/icons/SearchFillIcon';
import NewIcon from './ui/icons/NewIcon';
import NewFillIcon from './ui/icons/NewFillIcon';
import { usePathname } from 'next/navigation';
import ColorButton from './ui/icons/ColorButton';
import { useSession, signIn } from 'next-auth/react';
import Avatar from './Avatar';
import MessageIcon from './ui/icons/MessageIcon';
import MessageFillIcon from './ui/icons/MessageFillIcon';

const menu = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
    title: 'Home',
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
    title: 'Search users',
  },
  {
    href: '/new',
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
    title: 'New post',
  },
  {
    /* TODO: namespace 분리 */
    href: '/message/a',
    icon: <MessageIcon />,
    clickedIcon: <MessageFillIcon />,
    title: 'New post',
  },
];
export default function Header() {
  const pathName = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex justify-between items-center p-6">
      <Link href="/" aria-label="Home">
        <h1 className="text-2xl font-serif">{'Outstargram'}</h1>
      </Link>
      <nav>
        <ul className="flex gap-4 items-center p-4">
          {menu.map((item) => (
            <li key={item.href}>
              <Link href={item.href} aria-label={item.title}>
                {pathName === item.href ? item.clickedIcon : item.icon}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} size="small" highlight />
              </Link>
            </li>
          )}
          <li>{session ? '' : <ColorButton text="Sign in" onClick={() => signIn()} />}</li>
        </ul>
      </nav>
    </div>
  );
}
