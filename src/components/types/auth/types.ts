export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  name: string;
  email: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  token: string;
  newPassword: string;
};
