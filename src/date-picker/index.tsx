import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import DateCustom from "../component/date";
import TimeCustom from "../component/time";
import { IData } from "../utils/type";

const DatePickerCustom = () => {
  let schemaDayjs = yup
    .mixed<Dayjs>()
    .nullable()
    .default(null)
    .transform((value, originalValue, context) => {
      if (context.isType(value)) return value;
      const dayjsValue = dayjs(originalValue);
      return dayjsValue.isValid() ? dayjsValue : value;
    });

  const schema: any = yup
    .object<IData>()
    .shape({
      fromTime: yup.string().required("this fromTime is required"),
      toTime: yup.string().required("this toTime is required"),
      fromDate: schemaDayjs
        .required("this fromDate is required")
        .test("fromDateValid", "Do not select a future date", function (value) {
          return !value || dayjs(value).isBefore(dayjs().endOf("day"));
        })
        .test(
          "fromDateValid",
          "From Date must be earlier than To Date",
          function (value) {
            const { toDate } = this.parent;
            return (
              !toDate ||
              !value ||
              dayjs(value).isBefore(toDate) ||
              dayjs(value).isSame(toDate)
            );
          }
        ),
      toDate: schemaDayjs
        .required("this toDate is required")
        .test("toDateValid", "Do not select a future date", function (value) {
          return !value || dayjs(value).isBefore(dayjs().endOf("day"));
        })
        .test(
          "toDateValid",
          "toDate must be later than fromDate",
          function (value) {
            const { fromDate } = this.parent;
            return (
              !fromDate ||
              !value ||
              dayjs(value).isAfter(fromDate) ||
              dayjs(value).isSame(fromDate)
            );
          }
        ),
    })
    .test("timeValidation", function (values) {
      const { fromDate, toDate, fromTime, toTime } = values;
      if (fromDate && toDate && toTime && dayjs(fromDate).isSame(toDate)) {
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
      if (fromDate && toDate && fromTime && dayjs(toDate).isSame(fromDate)) {
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
  const { handleSubmit, control, trigger, getValues } = useForm<IData>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      fromDate: null,
      toDate: null,
      fromTime: "",
      toTime: "",
    },
  });

  console.log("re-render");

  const onSubmit: SubmitHandler<IData> = (data) => {
    console.log({
      from: `${dayjs(data.fromDate).format("LL")} ${dayjs(data.fromTime).format(
        "LT"
      )}`,
      to: `${dayjs(data.toDate).format("LL")} ${dayjs(data.toTime).format(
        "LT"
      )}`,
    });

    // console.log(dayjs.isDayjs(data.fromDate));
  };

  const handleChange = () => {
    const values = getValues(["fromDate", "toDate", "fromTime", "toTime"]);
    if (values[0] && values[1]) {
      trigger(["fromDate", "toDate"]);
    }
    if (values[2] && values[3]) {
      trigger(["fromTime", "toTime"]);
    }
  };

  return (
    <Box sx={{ maxWidth: "800px", margin: "auto", padding: "16px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <DateCustom
              title="From date"
              label="fromDate"
              control={control}
              handleChange={handleChange}
            />
          </div>
          <div>
            <DateCustom
              title="To date"
              label="toDate"
              control={control}
              handleChange={handleChange}
            />
          </div>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <TimeCustom
              title="From time"
              label="fromTime"
              control={control}
              handleChange={handleChange}
            />
          </div>
          <div>
            <TimeCustom
              title="To time"
              label="toTime"
              control={control}
              handleChange={handleChange}
            />
          </div>
        </Box>
        <Box
          sx={{
            textAlign: "end",
            paddingTop: "16px",
          }}
        >
          <Button type="submit" variant="contained">
            submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default DatePickerCustom;
