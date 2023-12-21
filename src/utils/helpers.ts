import { AxiosError } from "axios";
import { IMeter, IMeterForm, MeterTypeEnum } from "./types";

export function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError)
    return error.response?.data.error ?? error.message;
  if (error instanceof Error) return error.message;
  return String(error);
}

export function convertMeterToFormValues(meter: IMeter | undefined): IMeterForm {
  const { active, api_name, type, used_for_billing, display_name } = meter ?? {};
  return {
    active: active ? active.toString() : "true",
    api_name: api_name ?? "",
    type: type ?? MeterTypeEnum.Sum,
    used_for_billing: used_for_billing ? used_for_billing.toString() : "true",
    display_name: display_name ?? "",
  };
}
