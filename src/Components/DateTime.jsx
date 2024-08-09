import * as React from "react";
import {
  LocalizationProvider,
  DatePicker,
  DateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, TextField } from "@mui/material";

export default function BasicDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          "& .MuiInputLabel-root": {
            color: "white", // Set the label color
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white", // Set the label color when focused
          },
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white !important", // Ensure border is white in all states
          },
          "& .MuiInputBase-input": {
            color: "white", // Set the input text and placeholder color to white
          },
          "& .MuiSvgIcon-root": {
            color: "white", // Set the calendar icon color to white
          },
        }}
      >
        <DateTimePicker
          label="Basic date picker"
          viewRenderers={{
            hours: null,
            minutes: null,
            seconds: null,
          }}
          ToolbarComponent={null}
          actionBar={false}
          className="hello"
          slotProps={{ textField: { size: "small" } }}
        />
      </Box>
    </LocalizationProvider>
  );
}
