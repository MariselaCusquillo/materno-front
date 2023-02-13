export interface IChangeDataUser{
  user:string | any,
  tipologia: string | any,
  tipo_usuario:string | any,
  tipo_atencion:string | any,
  establecimiento:string | any,
  provincia:string | any,
  distrito:string | any
}

export interface IChangePassword{
  oldPassword: any,
  newPassword: any
}

export interface INewUSer{
  user:string | any,
  password: string | any,
  tipologia: string | any,
  tipo_usuario:string | any,
  tipo_atencion:string | any,
  establecimiento:string | any,
  provincia:string | any,
  distrito:string | any,
  role:string | any
 
}
