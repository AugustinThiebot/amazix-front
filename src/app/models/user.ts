export interface User {
  userGuid: string;
  email: string;
}

export interface LoginPayload {
    email: string;
    password: string;
  }
  
export interface SignupPayload {
  email: string;
  password: string;
}