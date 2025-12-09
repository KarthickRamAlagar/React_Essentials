// now my idea for usage of useEffect in Real time Application is  for data fetching, data sending to backend
import { useState, useEffect } from "react";
const UseEffectExample = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetching Data

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setUsers(data);
      } catch (e) {
        console.log("Error occured While Fetching Data", e);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UseEffectExample;
