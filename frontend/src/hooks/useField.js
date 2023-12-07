import { useState } from "react";

export default function useField(type) {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const clear = () => {
    setValue("");
  }

  return { inputProps: { type, value, onChange }, clear };
};