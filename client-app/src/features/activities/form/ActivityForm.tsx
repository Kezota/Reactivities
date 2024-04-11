import { Button, Form, Segment } from "semantic-ui-react";
import { TActivity } from "../../../app/models/activity";
import { ChangeEvent, useState } from "react";

type TProps = {
  activity: TActivity | null;
  onFormClose: () => void;
  onCreateOrEditActivity: (activity: TActivity) => void;
};

export default function ActivityForm({
  activity: selectedActivity,
  onFormClose,
  onCreateOrEditActivity,
}: TProps) {
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  function handleSubmit() {
    onCreateOrEditActivity(activity);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Avenue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />

        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={() => onFormClose()}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
