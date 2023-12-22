import { IMeter } from "../../utils/types";

export interface IMeterDetailsForm {
  meter: IMeter | undefined;
  setLoading: (value: boolean) => void;
  updateMeter: (meterId: string, data: IMeter) => void;
}
