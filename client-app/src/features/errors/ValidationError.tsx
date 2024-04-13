import { Message } from "semantic-ui-react";

type TProps = {
  errors: string[];
};

export default function ValidationError({ errors }: TProps) {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((err, i) => (
            <Message.Item key={i}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
}
