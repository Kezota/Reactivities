import { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { TActivity } from "../models/activity";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<TActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<TActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then((response) => {
      const activities: TActivity[] = [];

      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });

      setActivities(activities);
      setLoading(false);
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

  if (loading) return <LoadingComponent content="Loading app" />;

  function handleCreateOrEditActivity(activity: TActivity) {
    setSubmitting(true);

    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((a) => a.id !== id)]);
      setSubmitting(false);
    });
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
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default App;
