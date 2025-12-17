export type CreateUserBody = {
  email: string;
  password: string;
  nickname: string;
  dateOfBirth: number | string;
};

export type UpdateUserBody = {
  email?: string;
  nickname?: string;
  dateOfBirth?: string;
};

export type UserByIdParams = {
  userId: string;
};
