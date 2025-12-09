import React, { useState, useEffect } from "react";

const UseStateCrud = () => {
  const [users, setUsers] = useState([]); // store GitHub users
  const [search, setSearch] = useState(""); // for filtering users

  // Fetch GitHub users on mount
  useEffect(() => {
    fetch("https://api.github.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("https://api.github.com/users");
  //     const data = await response.json();
  //     setUsers(data);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);


  // Filter users based on search
  const filteredUsers = users.filter((user) =>
    user.login.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        margin: "0",
        padding: "10px",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5px",
        }}
      >
        UseState CRUD with GitHub Users
      </h1>

      {/* Search Filter */}
      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        <input
          type="text"
          placeholder="Search GitHub User..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* User Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <h3 style={{ margin: "10px 0" }}>{user.login}</h3>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "white",
                backgroundColor: "#007bff",
                padding: "8px 12px",
                borderRadius: "5px",
              }}
            >
              View Profile
            </a>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default UseStateCrud;
