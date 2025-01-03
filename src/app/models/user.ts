export interface User {
  userGuid: string;
  email: User;
}

export interface LoginPayload {
    email: string;
    password: string;
  }
  
export interface SignupPayload {
  email: string;
  password: string;
}