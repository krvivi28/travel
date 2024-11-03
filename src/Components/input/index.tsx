interface IInputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<IInputProps> = ({
  label,
  name,
  value,
  onChange,
}) => (
  <div>
    <label className="label">
      <span className="label-text text-xl">{label}</span>
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="input input-bordered w-full"
    />
  </div>
);
