import { Input, Space, Typography } from "antd";
import React from "react";
import colors from "../../utils/colors";

export interface FormInputInterface {
  title: string;
  input: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
}

const errorStyle = {
  borderWidth: 1,
  borderColor: colors.error,
};

export const FormInput = ({
  title,
  input,
  onChange,
  error,
  hint,
  ...props
}: FormInputInterface) => {
  return (
    <Space direction={"vertical"} align={"baseline"}>
      <Typography.Text>{title}</Typography.Text>
      <Input
        size={"large"}
        placeholder={hint}
        onChange={(event) => onChange(event.target.value)}
        value={input}
        style={error ? errorStyle : {}}
        {...props}
      />
      {error && (
        <Typography.Text style={{ color: colors.error }}>
          {error}
        </Typography.Text>
      )}
    </Space>
  );
};
