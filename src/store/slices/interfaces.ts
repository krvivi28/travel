export type IImage = {
  public_id: string;
  url: string;
};

export interface IUser {
  agency_name: string;
  contact_person: string;
  contact_number: string;
  email: string;
  address?: string;
  ref_by?: string;
  profileImg?: IImage;
  document?: IImage;
  isVerified?: boolean;
  gst_number?: string;
  pan_numner?: string;
  role?: "user" | "admin" | "agent" | "customer" | "super-admin";
}
