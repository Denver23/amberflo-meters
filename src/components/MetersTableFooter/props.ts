import { IMeter } from "../../utils/types";

export interface IMetersTableFooterProps {
  addNewMeterToList: (meter: IMeter) => void;
  setLoading: (value: boolean) => void;
}
