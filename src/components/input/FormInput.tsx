import { Input, Space, Typography } from "antd"
import React from "react"
import colors from "../../utils/colors"

export interface FormInputInterface {
  title: string
  input: string
  onChange: (value: string) => void
  error?: string
}

const errorStyle = {
  borderWidth: 1,
  borderColor: colors.error
}

export const FormInput = ({ title, input, onChange, error }: FormInputInterface) => {
  return (
    <Space direction={ "vertical" } align={ "baseline" }>
      <Typography.Text>{ title }</Typography.Text>
      <Input size={ "large" }
             onChange={ event => onChange(event.target.value) }
             value={ input } style={ error ? errorStyle : {} }/>
      { error && <Typography.Text style={ { color: colors.error } }>{ error }</Typography.Text> }
    </Space>
  )
}