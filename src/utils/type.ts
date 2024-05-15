import { Dayjs } from "dayjs";
import { Path } from "react-hook-form";

export interface IProps {
  title: string;
  error: string;
  label: Path<IData>;
  control: any;
  required: boolean;
  check?: boolean
}

export interface IData {
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  fromTime: string;
  toTime: string;
}
