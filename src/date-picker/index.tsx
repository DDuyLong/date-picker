import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import DateCustom from "../component/date";
import TimeCustom from "../component/time";
import { IData } from "../utils/type";
import "./style.css";

const DatePickerCustom = () => {
  const schema: any = yup.object<IData>().shape({
    fromTime: yup.string().required("this fromTime is required"),
    toTime: yup
      .string()
      .required("this toTime is required")
      .min(yup.ref("fromTime"), "toTime must be later than toTime"),
    fromDate: yup.date().required("this fromDate is required"),
    toDate: yup
      .date()
      .required("this toDate is required")
      .min(yup.ref("fromDate"), "toDate must be later than fromDate"),
  });
  // khởi tạo useFrom
  const {
    handleSubmit,
    // formState: { errors },
    control,
  } = useForm<IData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fromDate: null,
      toDate: null,
      fromTime: "",
      toTime: "",
    },
  });

  const onSubmit: SubmitHandler<IData> = (data) => console.log(data);

  return (
    <div className="from-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="from-date">
          <div>
            <DateCustom
              title="From date"
              error="From is required"
              label="fromDate"
              control={control}
              required
            />
          </div>
          <div>
            <DateCustom
              title="To date"
              error="From is required"
              label="toDate"
              control={control}
              required
            />
          </div>
        </div>
        <div className="from-time">
          <div>
            <TimeCustom
              title="From time"
              error="From is required"
              label="fromTime"
              control={control}
              required
            />
          </div>
          <div>
            <TimeCustom
              title="To time"
              error="From is required"
              label="toTime"
              control={control}
              required
            />
          </div>
        </div>
        <div className="button-container">
          <button className="button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default DatePickerCustom;
