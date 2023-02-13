export interface IEstablecimientos {
  codigo: string,
  posicion?: number,
  establecimiento:string,
  provincia:string,
  distrito: string,
  tipo_atencion: string,
  eod:string,
  tipologia:string
}

export interface INewEstablecimientos {

  establecimiento:string  | any,
  provincia:string  | any,
  distrito: string  | any,
  tipo_atencion: string  | any,
  eod:string  | any,
  tipologia:string  | any
}


export interface IEditEstablecimientos {
  establecimiento:string | any,
  provincia:string  | any,
  distrito: string  | any,
  tipo_atencion: string  | any,
  eod:string  | any,
  tipologia:string  | any
}
