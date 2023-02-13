export interface IResultAuth {
    success: boolean;
    message: string;
    accessToken?: string;
    user?: any;
    accessDate?: any;
    uid: string;
    //uid: number;
  }
  
  export interface IResultData {
    success: boolean;
    message: string;
    data?: any;
  }
  