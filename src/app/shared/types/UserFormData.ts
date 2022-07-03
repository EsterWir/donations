export interface UserFormData {
  title?: string;
  fullName: string;
  address?: string;
  country: string;
  email: string;
  phone: string;
  giftAmount:number;
  currency: string;
  designateSupport?:string ;
  donationDetails?:string;
  anonymous?:boolean;
  nameOf?:string;
  consent?:boolean;
}