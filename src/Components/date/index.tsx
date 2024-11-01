interface IDateProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Date: React.FC<IDateProps> = ({ label, name, value, onChange }) => (
  <div>
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    <input type="date" name={name} value={value} onChange={onChange} className="input input-bordered w-full" />
  </div>
);