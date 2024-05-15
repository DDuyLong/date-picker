import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";
import { IProps } from "../../utils/type";
import "./style.css";

const TimeCustom = (props: IProps) => {
  return (
    <div className="from-time-custom">
      <p className="title">{props.title}</p>
      <Controller
        name={props.label}
        control={props.control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              onChange={onChange}
              slotProps={{
                textField: {
                  variant: "outlined",
                  error: !!error,
                  helperText: error?.message,
                },
              }}
            />
          </LocalizationProvider>
        )}
      />
    </div>
  );
};

export default TimeCustom;
