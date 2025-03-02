/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
  name: string;
  id: string;
  password: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  role: 'admin' | 'customer';
  status: 'active' | 'blocked';
  isDeleted?: boolean;
  profileImage?: string;
  passwordChangedAt?: Date;
};

export interface IUser extends Model<TUser> {
  isUserExists(email: string): Promise<TUser>;
  isPasswordMatched(
    myPlaintextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
