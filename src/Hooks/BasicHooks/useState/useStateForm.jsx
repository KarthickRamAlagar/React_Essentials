import React, { useRef, useState, useEffect } from "react";

const UseStateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    agreeTerms: false,
    country: "",
    bio: "",
    dob: "",
    profilePic: [],
  });

  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const fileInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  // Load users from localStorage on mount
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("UserData")) || [];
    setUsers(savedUsers);
  }, []);

  // Save users to localStorage whenever users Array changes
  useEffect(() => {
    localStorage.setItem("UserData", JSON.stringify(users));
  }, [users]);

  // Handle inputs
  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    let newValue;
    if (type === "checkbox") newValue = checked;
    else if (type === "file") newValue = Array.from(files);
    else newValue = value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Update existing user
      const updatedUsers = [...users];
      updatedUsers[editIndex] = formData;
      setUsers(updatedUsers);
      setEditIndex(null); // back to add mode
    } else {
      // Add new user
      setUsers([...users, formData]);
    }

    // Reset form
    setFormData({
      name: "",
      email: "",
      password: "",
      age: "",
      gender: "",
      agreeTerms: false,
      country: "",
      bio: "",
      dob: "",
      profilePic: [],
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEdit = (index) => {
    setFormData(users[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filtered = users.filter((i) => i !== index);
    setUsers(filtered);
  };

  return (
    <div style={{ padding: "20px" }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <h2>{isEditing ? "Edit User" : "Add User"}</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Enter your age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        <textarea
          name="bio"
          placeholder="Tell us about yourself"
          value={formData.bio}
          onChange={handleChange}
          required
        ></textarea>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="">Select Country</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
          <option value="india">India</option>
        </select>
        <input
          type="file"
          name="profilePic"
          onChange={handleChange}
          multiple
          ref={fileInputRef}
        />
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
              required
            />
            Female
          </label>
        </div>
        <label>
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            required
          />
          Agree to terms
        </label>
        <button type="submit">{isEditing ? "Update" : "Submit"}</button>
      </form>

      <div>
        <h2>Submitted Users</h2>
        {users.length === 0 ? (
          <p>No users yet.</p>
        ) : (
          users.map((user, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                marginTop: "10px",
                padding: "10px",
              }}
            >
              <p>
                <b>Name:</b> {user.name}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
              <p>
                <b>Country:</b> {user.country}
              </p>
              <p>
                <b>Gender:</b> {user.gender}
              </p>
              <p>
                <b>Bio:</b> {user.bio}
              </p>
              <p>
                <b>Age:</b> {user.age}
              </p>
              <p>
                <b>DOB:</b> {user.dob}
              </p>
              <p>
                <b>Password:</b>{" "}
                {showPassword
                  ? user.password
                  : "•".repeat(user.password.length)}
                <button
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    marginLeft: "10px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? "🙈 Hide" : "👁️ Show"}
                </button>
              </p>

              <button onClick={() => handleEdit(index)}>Edit</button>
              <button
                onClick={() => handleDelete(index)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UseStateForm;
