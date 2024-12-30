export interface User {
    id: string;
    email: string;
}
export interface LoginResponse {
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