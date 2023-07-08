import ActionBar from './ActionBar';
import Avatar from './Avatar';
import Image from 'next/image';
import { SimplePost } from '@/types/post';
import PostUserAvatar from './PostUserAvatar';
import useFullPosts from '@/hooks/post';

type Props = {
  post: SimplePost;
};
export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image } = post;
  const { post: data, postComment } = useFullPosts(id);
  const comments = data?.comments;

  return (
    <section className="flex w-full h-full flex-col md:flex-row">
      <div className="relative basis-3/5 md:basis-3/5">
        <Image
          className="object-contain bg-black"
          src={image}
          alt={`photo by ${username}`}
          priority
          fill // relative
          sizes="650px"
        />
      </div>
      <div className="basis-2/5 overflow-auto md:w-full md:basis-2/5 flex flex-col">
        <PostUserAvatar image={userImage} username={username} />
        <ul className="border-t border-gray-200 h-full overflow-y-auto p-2">
          {comments &&
            comments.map(({ image, username: commentUsername, comment }, index) => (
              <li key={index} className="flex items-center mb-1">
                <Avatar image={image} size="small" highlight={commentUsername === username} />
                <div className="ml-2">
                  <span className="font-bold mr-1">{commentUsername}</span>
                  <span>{comment}</span>
                </div>
              </li>
            ))}
        </ul>
        <ActionBar post={post} onComment={postComment} />
      </div>
    </section>
  );
}
