export interface User {
  token: string;
  user: User;
}

export interface LoginPayload {
    email: string;
    password: string;
  }
  
export interface SignupPayload {
  email: string;
  password: string;
}