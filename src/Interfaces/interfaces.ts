export interface IAllUsersData {
  allUsersData: {
    password: string;
    email: string;
    
  }[];
}

export interface IUserData {
  password: string; email: string; category?: string, name?:string, 
}

export interface IAuthenicatedUserData{
  password?: string; email?: string; category?: string, name?:string, time?: number, exp?: number

}
