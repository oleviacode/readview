export interface UserState {
  id: number ;
  username: string ;
  email:string ;
  gender: string ;
  birthday: Date | null;
  profile_picture:string;
  info: string;
  level: number;
}
