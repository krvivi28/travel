import { Select } from "@components/select";
import { Date } from "@components/date";
import { IInfoProps } from "..";

export const TransportInfo: React.FC<IInfoProps> = ({ formData, handleChange }) => (
  <div className="grid grid-cols-3 gap-4">
    <Select label="City:" name="transportCity" value={formData.transportCity} onChange={handleChange} options={[{ label: 'All', value: 'All' }, { label: 'Bangkok', value: 'Bangkok' }, { label: 'Phuket', value: 'Phuket' }, { label: 'Chiang Mai', value: 'Chiang Mai' }]} />
    <Select label="Transport:" name="transport" value={formData.transport} onChange={handleChange} options={[{ label: '01 Way Taxi From Bangkok Hotel to Airport', value: '01 Way Taxi From Bangkok Hotel to Airport' }, { label: '02 Way Taxi For Safari World Private Car', value: '02 Way Taxi For Safari World Private Car' }]} />
    <Select label="No Of Person:" name="transportPersonCount" value={formData.transportPersonCount} onChange={handleChange} options={[{ label: '1-4 PAX', value: '1-4 PAX' }, { label: '5-10 PAX', value: '5-10 PAX' }]} />
    <Date label="Date:" name="transportDate" value={formData.transportDate} onChange={handleChange} />
  </div>
);