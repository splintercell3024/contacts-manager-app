import { object, string} from 'yup';

export const contactSchema = object({
  fullname: string().required("نام و نام خانوادگی الزامی می باشد"),
  mobile: string().required("شماره موبایل الزامی می باشد"),
  // .min("شماره موبایل می بایستی  11 رقم  باشد")
  // .max("شماره موبایل می بایستی  11 رقم  باشد"),
  job:string().nullable(),
  email: string().email("ایمیل معتبر نیست").required("ایمیل الزامی می باشد"),
  photo: string().url().required("آدرس اینترنتی عکس الزامی می باشد"),
  group: string().required("انتخاب گروه الزامی می باشد") 
});