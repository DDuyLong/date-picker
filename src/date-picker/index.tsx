import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import DateCustom from "../component/date";
import TimeCustom from "../component/time";
import { IData } from "../utils/type";
import "./style.css";

const DatePickerCustom = () => {
  const today = new Date().toISOString().split("T")[0];

  const schema: any = yup
    .object<IData>()
    .shape({
      fromTime: yup.string().required("this fromTime is required"),
      toTime: yup.string().required("this toTime is required"),
      fromDate: yup
        .date()
        .required("this fromDate is required")
        .max(today, "Do not select a future date")
        .test(
          "fromDateValid",
          "From Date must be earlier than To Date",
          function (value) {
            const { toDate } = this.parent;
            return !toDate || !value || new Date(value) <= new Date(toDate);
          }
        ),
      toDate: yup
        .date()
        .required("this toDate is required")
        .min(yup.ref("fromDate"), "toDate must be later than fromDate")
        .max(today, "Do not select a future date"),
    })
    .test("timeValidation", function (values) {
      const { fromDate, toDate, fromTime, toTime } = values;
      if (
        fromDate &&
        toDate &&
        toTime &&
        new Date(fromDate).getTime() === new Date(toDate).getTime()
      ) {
        if (fromTime >= toTime) {
          return this.createError({
            path: "fromTime",
            message: "From Time must be earlier To Time",
          });
        }
      }
      return true;
    })
    .test("reverseTimeValidation", function (values) {
      const { fromDate, toDate, fromTime, toTime } = values;
      if (
        fromDate &&
        toDate &&
        fromTime &&
        new Date(fromDate).getTime() === new Date(toDate).getTime()
      ) {
        if (fromTime >= toTime) {
          return this.createError({
            path: "toTime",
            message: "To Time must be later From Time",
          });
        }
      }
      return true;
    });

  // khởi tạo useFrom
  const { handleSubmit, control, watch, trigger } = useForm<IData>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      fromDate: null,
      toDate: null,
      fromTime: "",
      toTime: "",
    },
  });

  const fromDate = watch("fromDate");
  const toDate = watch("toDate");
  const fromTime = watch("fromTime");
  const toTime = watch("toTime");

  if (fromDate && toDate && fromTime && toTime) {
    trigger("fromDate");
    trigger("toDate");
    trigger("fromTime");
    trigger("toTime");
  }

  const onSubmit: SubmitHandler<IData> = (data) => {
    console.log({
      from: `${dayjs(data.fromDate).format("LL")} ${dayjs(data.fromTime).format(
        "LT"
      )}`,
      to: `${dayjs(data.toDate).format("LL")} ${dayjs(data.toTime).format(
        "LT"
      )}`,
    });
  };

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
