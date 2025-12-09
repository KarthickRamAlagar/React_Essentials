// SearchUser.jsx
import React, { useState, useEffect } from "react";
import useDebounce from "./useDebounce";

const SearchUser = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // use our custom hook
  const debouncedQuery = useDebounce(query, 800); // wait 800ms after user stops typing

  useEffect(() => {
    if (!debouncedQuery) return; // skip empty input

    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.github.com/search/users?q=${debouncedQuery}`
        );
        const data = await res.json();
        setResults(data.items || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedQuery]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🔍 GitHub User Search</h2>
      <input
        type="text"
        placeholder="Search GitHub username..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "10px", width: "300px", marginBottom: "20px" }}
      />

      {isLoading && <p>Loading...</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {results.map((user) => (
          <li
            key={user.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              width="40"
              height="40"
              style={{ borderRadius: "50%" }}
            />
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#0366d6" }}
            >
              {user.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchUser;
