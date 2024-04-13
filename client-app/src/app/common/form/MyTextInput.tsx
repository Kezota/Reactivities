import { useField } from "formik";
import { Form } from "semantic-ui-react";

type TProps = {
  placeholder: string;
  name: string;
  label?: string;
};

export default function MyTextInput(props: TProps) {
  const [field, meta] = useField(props.name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <label color="red">{meta.error}</label>
      ) : null}
    </Form.Field>
  );
}
