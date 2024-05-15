import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";
import { IProps } from "../../utils/type";
import "./style.css";
import * as yup from 'yup';

const DateCustom = (props: IProps) => {
  const schema = yup.object().shape({
    fromDate: yup.date().required('Start date is required'),
    toDate: yup.date()
      .required('End date is required')
      .min(
        yup.ref('startDate'),
        'End date must be later than start date'
      ),
  });
  return (
    <div className="from-date-custom">
      <p className="title">{props.title}</p>
      <Controller
        name={props.label}
        control={props.control}
        rules={{
          required: true,
          // validate: (startDate) => startDate < props.watchFields.toDate
        }}
        render={({ field: { onChange}, fieldState: { error } }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={onChange}
              disableFuture
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  error: !!error,
                  helperText: error?.message
                },
              }}
            />
          </LocalizationProvider>
        )}
      />
    </div>
  );
};

export default DateCustom;
