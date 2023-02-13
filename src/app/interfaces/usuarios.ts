export interface IUser {
  codigo: string,
  posicion?: number,
  user:string,
  password:string,
  tipologia:string,
  tipo_usuario:string,
  tipo_atencion:string,
  establecimiento:string,
  provincia:string,
  distrito:string,
  role:string
}

export interface INewUser {
  user:string | any,
  password:string | any,
  tipologia:string | any,
  tipo_usuario:string | any,
  tipo_atencion:string | any,
  establecimiento:string | any,
  provincia:string | any,
  distrito:string | any,
  role:string | any
}

export interface IUpdateUser {
  user:string | any,
  tipologia:string | any,
  tipo_usuario:string | any,
  tipo_atencion:string | any,
  establecimiento:string | any,
  provincia:string | any,
  distrito:string | any,
  role:string |any 
}

