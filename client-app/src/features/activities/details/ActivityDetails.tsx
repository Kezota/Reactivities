import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Image,
} from "semantic-ui-react";
import { TActivity } from "../../../app/models/activity";

type TProps = {
  activity: TActivity;
  onCancelSelectActivity: () => void;
  onFormOpen: (id?: string) => void;
};

export default function ActivityDetails({
  activity,
  onCancelSelectActivity,
  onFormOpen,
}: TProps) {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
        wrapped
        ui={false}
      />
      <CardContent>
        <CardHeader>{activity.title}</CardHeader>
        <CardMeta>
          <span>{activity.date}</span>
        </CardMeta>
        <CardDescription>{activity.description}</CardDescription>
      </CardContent>
      <CardContent extra>
        <Button.Group widths="2">
          <Button
            onClick={() => onFormOpen(activity.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => onCancelSelectActivity()}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </CardContent>
    </Card>
  );
}
