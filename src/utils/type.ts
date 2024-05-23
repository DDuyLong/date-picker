import { Dayjs } from "dayjs";
import { Path } from "react-hook-form";

export interface IProps {
  title: string;
  label: Path<IData>;
  control: any;
  handleChange: () => void
}

export interface IData {
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  fromTime: string;
  toTime: string;
}
