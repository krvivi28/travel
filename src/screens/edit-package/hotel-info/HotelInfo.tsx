import { Select } from "@components/select";
import { Date } from "@components/date";
import { IInfoProps } from "..";

export const HotelInfo: React.FC<IInfoProps> = ({ formData, handleChange }) => (
  <div className="grid grid-cols-3 gap-4">
    <Select label="City:" name="city" value={formData.city} onChange={handleChange} options={[{ label: 'Bangkok', value: 'Bangkok' }, { label: 'Phuket', value: 'Phuket' }, { label: 'Chiang Mai', value: 'Chiang Mai' }]} />
    <Select label="Hotels:" name="hotel" value={formData.hotel} onChange={handleChange} options={[{ label: 'Grand Alpine Hotel 3*', value: 'Grand Alpine Hotel 3*' }, { label: 'Bangkok City Hotel', value: 'Bangkok City Hotel' }, { label: 'Phuket Beach Resort', value: 'Phuket Beach Resort' }]} />
    <Select label="Room Category:" name="roomCategory" value={formData.roomCategory} onChange={handleChange} options={[{ label: 'Standard', value: 'Standard' }, { label: 'Superior Room', value: 'Superior Room' }, { label: 'Deluxe Room', value: 'Deluxe Room' }]} />
    <Date label="Check In Date:" name="checkInDate" value={formData.checkInDate} onChange={handleChange} />
    <Select label="Nights:" name="nights" value={formData.nights} onChange={handleChange} options={Array.from({ length: 5 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }))} />
    <Select label="Extra Adult:" name="exAdult" value={formData.exAdult} onChange={handleChange} options={Array.from({ length: 5 }, (_, i) => ({ label: `${i}`, value: i }))} />
    <Select label="Extra Child:" name="exChild" value={formData.exChild} onChange={handleChange} options={Array.from({ length: 5 }, (_, i) => ({ label: `${i}`, value: i }))} />
  </div>
);