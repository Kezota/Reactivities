import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { TActivity } from "../models/activity";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";

function App() {
  const [activities, setActivities] = useState<TActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<TActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<TActivity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((a) => a.id === id) || null);
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(null);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: TActivity) {
    activity.id
      ? setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }]);

    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter((a) => a.id !== id)]);
  }

  return (
    <Fragment>
      <Navbar onFormOpen={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          onSelectActivity={handleSelectActivity}
          onCancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          onFormOpen={handleFormOpen}
          onFormClose={handleFormClose}
          onCreateOrEditActivity={handleCreateOrEditActivity}
          onDeleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
