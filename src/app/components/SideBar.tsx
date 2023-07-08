import { AuthUser } from '@/types/user';
import Avatar from './Avatar';

type Props = {
  user: AuthUser;
};
export default function SideBar({ user: { name, username, image } }: Props) {
  return (
    <div>
      <div className="flex items-center">
        {image && <Avatar image={image} />}
        <div className="ml-4">
          <p className="font-bold">{username}</p>
          <p className="text-sm text-neutral-500 leading-4">{name}</p>
        </div>
      </div>
      <p className="text-sm text-neutral-400 mt-8">
        About Help Press API Jobs Privacy Terms Locations Language English (UK) Meta Verified
      </p>
      <p className="text-sm text-neutral-400 mt-8">© 2023 OUTSTAGRAM FROM META</p>
    </div>
  );
}
