import { useEffect, useState } from "react";
import axios from "axios";
import { Header, List } from "semantic-ui-react";
import "./App.css";

type TActivity = {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  city: string;
  venue: string;
};

function App() {
  const [activities, setActivities] = useState<TActivity[] | []>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Hello</h1>
      <Header as="h2" icon="users" content="Reactivities" />
      <List>
        {activities.map((activity: TActivity) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
