export interface AppUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  password: string;
  creationDate: Date;
  updateDate: Date;
  roles: UserRole[];
}

export interface UserRole {
  id: number;
  role: Role;
}

export interface Role {
  id: number;
  name: string;
}