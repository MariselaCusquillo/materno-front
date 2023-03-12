
//
export type Roles = 'Medico' | 'Admin';

export interface IResultAuth {
    success: boolean;
    message: string;
    accessToken?: string;
    user?: any;
    accessDate?: any;
    uid: string;
    //
    role: Roles
    
  }
  
  export interface IResultData {
    success: boolean;
    message: string;
    data?: any;
  }
  