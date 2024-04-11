import { Button, Item, Label, Segment } from "semantic-ui-react";
import { TActivity } from "../../../app/models/activity";

type TProps = {
  activities: TActivity[];
  onSelectActivity: (id: string) => void;
  onDeleteActivity: (id: string) => void;
};

export default function ActivityList({
  activities,
  onSelectActivity,
  onDeleteActivity,
}: TProps) {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity: TActivity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => onSelectActivity(activity.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={() => onDeleteActivity(activity.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
