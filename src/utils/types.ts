export enum MeterTypeEnum {
  "Sum" = "sum",
  "Max" = "max",
  "UniqueCount" = "unique_count",
}

export interface IMeter {
  id: string;
  api_name: string;
  display_name: string;
  active: boolean;
  used_for_billing: boolean;
  updated_time: string;
  created_time: string;
  type: MeterTypeEnum;
}

export interface IMeterForm {
  display_name: string;
  api_name: string;
  active: string;
  type: MeterTypeEnum;
  used_for_billing: string;
}

export interface IMeterRequest {
  api_name: string;
  display_name: string;
  active: boolean;
  used_for_billing: boolean;
  type: MeterTypeEnum;
}
