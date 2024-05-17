import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";
import { IProps } from "../../utils/type";
import "./style.css";

const DateCustom = (props: IProps) => {

  return (
    <div className="from-date-custom">
      <p className="title">{props.title}</p>
      <Controller
        name={props.label}
        control={props.control}
        rules={{
          required: true,
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
