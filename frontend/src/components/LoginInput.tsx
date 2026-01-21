interface LoginInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

export function LoginInput({
  label,
  type = 'text',
  value,
  onChange
}: LoginInputProps) {
  return (
    <div className="mb-3">
      <label className="form-label text-white">
        {label}
      </label>

      <input
        type={type}
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
