import { Date } from "@components/date";
import { Select } from "@components/select";
import { IInfoProps } from "..";

export const SightseeingInfo: React.FC<IInfoProps> = ({ formData, handleChange }) => (
  <div className="grid grid-cols-3 gap-4">
    <Select label="City:" name="sightseeingCity" value={formData.sightseeingCity} onChange={handleChange} options={[{ label: 'Bangkok', value: 'Bangkok' }, { label: 'Phuket', value: 'Phuket' }, { label: 'Chiang Mai', value: 'Chiang Mai' }]} />
    <Select label="Sightseeing:" name="sightseeing" value={formData.sightseeing} onChange={handleChange} options={[{ label: 'Sky walk daytime Tickets (Bangkok)', value: 'Sky walk daytime Tickets (Bangkok)' }, { label: 'Phi Phi Island Tour (Phuket)', value: 'Phi Phi Island Tour (Phuket)' }, { label: 'Doi Suthep Temple Visit (Chiang Mai)', value: 'Doi Suthep Temple Visit (Chiang Mai)' }]} />
    <Select label="No Of Adults:" name="noOfAdultSightseeing" value={formData.noOfAdultSightseeing} onChange={handleChange} options={Array.from({ length: 5 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }))} />
    <Select label="No Of Children:" name="noOfChildSightseeing" value={formData.noOfChildSightseeing} onChange={handleChange} options={Array.from({ length: 5 }, (_, i) => ({ label: `${i}`, value: i }))} />
    <Date label="Date:" name="sightseeingDate" value={formData.sightseeingDate} onChange={handleChange} />
  </div>
);