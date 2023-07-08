import { BiBookmark } from 'react-icons/bi';

type Props = {
  className?: string;
};
export default function BookmarkIcon({ className }: Props) {
  return <BiBookmark className={className || 'w-6 h-6'} />;
}
