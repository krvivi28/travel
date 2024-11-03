interface ISelectProps {
  label: string;
  name: string;
  value: number | string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ label: string; value: string | number }>;
}

export const Select: React.FC<ISelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
}) => (
  <div>
    <label className="label">
      <span className="label-text text-xl">{label}</span>
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="select select-bordered w-full"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
