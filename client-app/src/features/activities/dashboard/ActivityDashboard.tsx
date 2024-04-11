import { Grid } from "semantic-ui-react";
import { TActivity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

type TProps = {
  activities: TActivity[];
  selectedActivity: TActivity | null;
  onSelectActivity: (id: string) => void;
  onCancelSelectActivity: () => void;
  editMode: boolean;
  onFormOpen: (id?: string) => void;
  onFormClose: () => void;
  onCreateOrEditActivity: (activity: TActivity) => void;
  onDeleteActivity: (id: string) => void;
  submitting: boolean;
};

export default function ActivityDashboard({
  activities,
  selectedActivity,
  onSelectActivity,
  onCancelSelectActivity,
  editMode,
  onFormOpen,
  onFormClose,
  onCreateOrEditActivity,
  onDeleteActivity,
  submitting,
}: TProps) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          activities={activities}
          onSelectActivity={onSelectActivity}
          onDeleteActivity={onDeleteActivity}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            onCancelSelectActivity={onCancelSelectActivity}
            onFormOpen={onFormOpen}
          />
        )}
        {editMode && (
          <ActivityForm
            activity={selectedActivity}
            onFormClose={onFormClose}
            onCreateOrEditActivity={onCreateOrEditActivity}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
