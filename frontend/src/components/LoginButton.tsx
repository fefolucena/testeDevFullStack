interface LoginButtonProps {
  text: string;
  onClick: () => void;
}

export function LoginButton({ text, onClick }: LoginButtonProps) {
  return (
    <button
      className="btn btn-dark w-100"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
