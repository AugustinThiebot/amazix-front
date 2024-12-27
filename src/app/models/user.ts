interface BaseUser {
    firstName: string;
    lastName: string;
    email: string;
}

export interface User extends BaseUser {
    id: number;
}

export interface UserForRegistration extends BaseUser {
    password: string;
}