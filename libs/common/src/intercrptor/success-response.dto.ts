import { ResponseToGateWayType, StatusHttpServiceEnum } from "./global.type";


export const successToHttpResponse = <T>(data: T = undefined, name: string, message: string): ResponseToGateWayType<T> => {
  return {
    code: 200,
    status: StatusHttpServiceEnum.Success,
    comment: '',
    name,
    text: message,
    value: data,
  };
};
