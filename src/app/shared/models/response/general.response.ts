import { ResultResponse } from 'src/app/shared/enums/result-response.enum';

export interface GeneralResponse<T> {
  severity: ResultResponse;
  summary: string;
  object?: T;
  objects?: T;
}
