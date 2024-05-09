
export interface LoginPayload {
  username: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface SignupPayload extends LoginPayload {
  name: string,
  email: string,
  role: string,
  address: string,
  phone: string,
  password: string,
  confirmPassword: string,
  state: Boolean
}

