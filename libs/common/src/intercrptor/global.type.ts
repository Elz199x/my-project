export interface ResponseToGateWayType<T> {
  code: number;
  status: StatusHttpServiceEnum;
  name?: string;
  text?: string;
  value: T;
  comment?: string;
}

export enum StatusHttpServiceEnum {
  Error = 'Error',
  Success = 'Success',
}

export type ResponseUpdatedSqlType = {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
  changedRows: number;
};



