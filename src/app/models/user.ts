interface BaseUser {
    firstName: string;
    lastName: string;
    email: string;
}

export interface User extends BaseUser {
    id: number;
}

export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface SignupPayload {
    email: string;
    password: string;
  }