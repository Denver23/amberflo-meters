import { AxiosError } from "axios";
import { IMeter, IMeterForm, MeterTypeEnum } from "./types";
import {AnyObject} from "antd/es/_util/type";

export function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError)
    return error.response?.data.error ?? error.message;
  if (error instanceof Error) return error.message;
  return String(error);
}

export function convertMeterToFormValues(meter: IMeter | undefined): IMeterForm {
  const { active, api_name, type, used_for_billing, display_name } = meter ?? {};
  return {
    active: Number(active),
    api_name: api_name ?? "",
    type: type ?? MeterTypeEnum.Sum,
    used_for_billing: Number(used_for_billing),
    display_name: display_name ?? "",
  };
}

export function sorter(key: string) {
  return (a: AnyObject, b: AnyObject) => a[key] > b[key] ? -1 : 1;
}