import { useField } from "formik";
import { Form, Select } from "semantic-ui-react";

type TProps = {
  placeholder: string;
  name: string;
  options: { text: string; value: string }[];
  label?: string;
};

export default function MySelectInput(props: TProps) {
  const [field, meta, helpers] = useField(props.name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Select
        clearable
        options={props.options}
        value={field.value || null}
        onChange={(_, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      ></Select>
      {meta.touched && meta.error ? (
        <label color="red">{meta.error}</label>
      ) : null}
    </Form.Field>
  );
}
