import { Button, Container, Menu } from "semantic-ui-react";

type TProps = {
  onFormOpen: () => void;
};

export default function Navbar({ onFormOpen }: TProps) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          Reactivites
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button onClick={onFormOpen} positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}