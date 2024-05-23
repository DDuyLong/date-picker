import { Box } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";
import { IProps } from "../../utils/type";

const TimeCustom = (props: IProps) => {
  const onTimeChange = () => {
    props.handleChange();
  };
  return (
    <Box sx={{ paddingTop: "16px" }}>
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
            <TimePicker
              onChange={(e) => {
                onChange(e)
                onTimeChange()
              }}
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
    </Box>
  );
};

export default TimeCustom;
