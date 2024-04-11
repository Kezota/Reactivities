import { Dimmer, Loader } from "semantic-ui-react";

type TProps = {
  inverted?: boolean;
  content: string;
};

export default function LoadingComponent({ inverted = true, content }: TProps) {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
}
