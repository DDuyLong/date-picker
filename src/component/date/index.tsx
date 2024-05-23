import { Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";
import { IProps } from "../../utils/type";

const DateCustom = (props: IProps) => {
  const handleChange = () => {
    props.handleChange();
  };
  return (
    <Box sx={{ paddingBottom: "16px", borderBottom: "1px solid #000" }}>
      <Box
        sx={{
          textAlign: "start",
          fontWeight: "500",
          paddingLeft: "16px",
          paddingBottom: "8px",
        }}
      >
        {props.title}
      </Box>
      <Controller
        name={props.label}
        control={props.control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(e) => {
                onChange(e ? e.toDate() : undefined);
                handleChange();
              }}
              disableFuture
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  error: !!error,
                  helperText: error?.message,
                },
              }}
            />
          </LocalizationProvider>
        )}
      />
    </Box>
  );
};

export default DateCustom;
