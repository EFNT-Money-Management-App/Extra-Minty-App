import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';

export interface IProfile {
  id?: number;
  birthdate?: string | null;
  peppermintPoints?: number | null;
  securityQuestion?: string | null;
  securityAnswer?: string | null;
  profilePictureContentType?: string | null;
  profilePicture?: string | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<IProfile> = {};
