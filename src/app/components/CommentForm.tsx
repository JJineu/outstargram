'use client';
import { FormEvent, useState } from 'react';
import SmileIcon from './ui/icons/SmileIcon';
import useSWR from 'swr';

type Props = {
  onPostComment: (comment: string) => void;
};
export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState('');
  const buttonDisabled = comment.length === 0;
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment('');
  };

  return (
    <form className="flex px-2 items-center border-t border-neutral-300" onSubmit={handleSubmit}>
      <SmileIcon />
      <input
        className="w-full border-none outline-none p-3"
        type="text"
        placeholder="Add a comment..."
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className={`font-bold mr-2 ${buttonDisabled ? 'text-sky-300' : 'text-sky-500'}`}
        disabled={buttonDisabled}
      >
        Post
      </button>
    </form>
  );
}
