import { IMeterForm } from "./types";

export function meterFormValidator({
  display_name,
  api_name,
}: IMeterForm) {
  const errors: Record<string, string | undefined> = {};
  if (!display_name.length) errors.display_name = "Please fill name field";
  if (!api_name.length) errors.api_name = "Please fill api name field";
  return errors;
}
