import React from "react";
import useLocalStorage from "./useLocalStorage";

const UserInfo = () => {
  const [name, setName] = useLocalStorage("username", "");
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>
        Welcome
        {name ? name : " Guest"}
      </h1>

      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "8px", fontSize: "16px" }}
      />
      {name && (
        <p style={{ marginTop: "10px", color: "gray" }}>
          (Your name is saved in localStorage)
        </p>
      )}
    </div>
  );
};

export default UserInfo;
