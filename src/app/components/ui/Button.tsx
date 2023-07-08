type Props = {
  text: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
};
export default function Button({ text, onClick, active, disabled = false }: Props) {
  return (
    <button
      className={`border-none rounded-md m-1 p-2 px-6 min-w-[120px] font-bold leading-4 hover:opacity-60 ${
        active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
      } ${disabled && 'opacity-80'}`}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
