interface ITextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea: React.FC<ITextAreaProps> = ({ label, name, value, onChange }) => (
  <div>
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    <textarea name={name} value={value} onChange={onChange} className="textarea textarea-bordered w-full" rows={3}></textarea>
  </div>
);