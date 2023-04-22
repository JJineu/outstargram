import { AiFillHeart } from "react-icons/ai";

type Props = {
  className?: string;
};
export default function HeartFillIcon({ className }: Props) {
  return <AiFillHeart className={className || "w-7 h-7 fill-red-500"} />;
}
