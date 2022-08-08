import React, { useState } from "react";
import "./index.sass";
import onUrlSubmit from "../../utils/browser";

export const Autocomplete = () => {
  const [value, setState] = useState("");

  const handleChange = (event: any) => {
    setState(event?.target?.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const searchEngine = "DuckDuckGo";
    const sanitizedInput = onUrlSubmit(value, searchEngine);
    window.location.href = sanitizedInput;
  };

  return (
    <form className={"autocomplete"} onSubmit={handleSubmit}>
      <input
        autoCapitalize="none"
        type={"text"}
        placeholder={"Search or type web address"}
        className={"autocomplete-input"}
        value={value}
        onChange={handleChange}
      />
    </form>
  );
};
