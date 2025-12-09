import React from "react";
import useFetch from "./useFetch";

const Users = () => {
  const [Data, isLoading, error] = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  return (
    <div>
      <h2>Users Component</h2>
      {isLoading ? (
        <p>Fetchinfg Data...</p>
      ) : error ? (
        <p>Error While Fetching Data ...</p>
      ) : (
        <ul>
          {Data &&
            Data.map((user) => (
              <li key={user.id}>
                {user.name} - {user.email}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
