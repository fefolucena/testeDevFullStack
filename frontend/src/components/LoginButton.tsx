interface LoginButtonProps {
  text: string;
  onClick: () => void;
}

export function LoginButton({ text, onClick }: LoginButtonProps) {
  return (
    <button
      className="btn btn-dark w-75 d-flex justify-content-center mx-auto rounded-5"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
