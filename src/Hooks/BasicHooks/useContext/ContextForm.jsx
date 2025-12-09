import React, { useContext, useRef, useState } from "react";
import { UserContext } from "./UserContext";

const resetForm = () => {
  setFormData({
    name: "",
    email: "",
    password: "",
    age: "",
    dob: "",
    bio: "",
    terms: false,
    profilePics: [],
    country: "",
    gender: "",
  });
  setIsEditing(false);
  setEditIndex(null);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};

const SendApi = async (data, setIsLoading, setIsError) => {
  setIsLoading(true);
  try {
    const url = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await url.json();
    console.log("Grouped Data Sent Successfully", result);
  } catch (e) {
    setIsError(true);
    console.log("Error While Sending  Group Data", e);
  } finally {
    setIsLoading(false);
  }
};

const ContextForm = () => {
  // getting provider values from UserContext file
  const { users, addUser, deleteUser, updateUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    dob: "",
    bio: "",
    terms: false,
    profilePics: [],
    country: "",
    gender: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const fileInputRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  // Handle Input change Function
  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    let newValue;
    if (type === "file") newValue = Array.from(files);
    else if (type === "checkbox") newValue = checked;
    else if (type === "number") newValue = Number(value);
    else newValue = value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  // Handle Submit Function
  const handleSubmit = (e) => {
    e.preventDefault();
    const groupedData = {
      profileMeta: {
        name: formData.name,
        dob: formData.dob,
        age: formData.age,
        email: formData.email,
        gender: formData.gender,
      },
      profileInfo: {
        password: formData.password,
        terms: formData.terms,
        country: formData.country,
        bio: formData.bio,
        profilePics: formData.profilePics,
      },
    };

    // Edit and Add User Logic
    if (isEditing && editIndex !== null && editIndex !== undefined) {
      updateUser(groupedData, editIndex);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      addUser(groupedData);
    }

    // Reset Form
    setFormData({
      name: "",
      email: "",
      password: "",
      age: "",
      dob: "",
      bio: "",
      terms: false,
      profilePics: [],
      country: "",
      gender: "",
    });

    if (fileInputRef.current) fileInputRef.current.value = "";

    // Sending GroupedData to API or Backend
    SendApi(groupedData, setIsLoading, setIsError);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error While Sending Data</div>;
  }

  // Edit Handler
  const handleEdit = (index) => {
    const user = users[index];

    setFormData({
      name: user.profileMeta.name || "",
      email: user.profileMeta.email || "",
      password: user.profileInfo.password || "",
      age: user.profileMeta.age || "",
      gender: user.profileMeta.gender || "",
      terms: user.profileInfo.terms || false,
      country: user.profileInfo.country || "",
      bio: user.profileInfo.bio || "",
      dob: user.profileMeta.dob || "",
      profilePics: user.profileInfo.profilePics || [],
    });

    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div style={{ padding: "20px" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
        }}
      >
        <h2> {isEditing ? "Edit User" : "Add User"}</h2>

        {/* Text Input */}
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* email Input */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
        />

        {/* Number Input */}
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter your age"
          required
        />

        {/* Date Input */}
        <input
          type="date"
          placeholder="Enter your DOB"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />

        {/* TextArea Input */}
        <textarea
          name="bio"
          placeholder="Tell us about yourself"
          value={formData.bio}
          onChange={handleChange}
          required
          rows={10}
          columns={30}
        ></textarea>

        {/* CheckBox Input */}
        <label>
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            required
          />
          Accept Terms and Conditions
        </label>

        {/* File Input */}
        <label>
          Upload Profile Pictures
          <input
            type="file"
            name="profilePics"
            onChange={handleChange}
            required
            ref={fileInputRef}
            multiple
          />
        </label>
        {/* Select Input */}
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="">Select Country</option>
          <option value="india">India</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
          <option value="australia">Australia</option>
        </select>

        {/* Radio Input */}
        <div>
          <label>
            <input
              name="gender"
              value="male"
              onChange={handleChange}
              type="radio"
              required
              checked={formData.gender === "male"}
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
          <label>
            <input
              type="radio"
              name="gender"
              value="others"
              checked={formData.gender === "others"}
              onChange={handleChange}
              required
            />
            others
          </label>
        </div>
        <button type="submit">{isEditing ? "Update" : "Submit"}</button>
      </form>

      <div>
        <h2>Submitted Users</h2>
        {users.length === 0 ? (
          <p>No User Submitted</p>
        ) : (
          users.map((user, index) => (
            <div
              key={index}
              style={{
                border: "1px solid gray",
                margin: "10px",
                padding: "10px",
              }}
            >
              <p>
                <b>Name:</b> {user.profileMeta.name}
              </p>
              <p>
                <b>Email:</b> {user.profileMeta.email}
              </p>
              <p>
                <b>Age:</b> {user.profileMeta.age}
              </p>
              <p>
                <b>DOB:</b> {user.profileMeta.dob}
              </p>
              <p>
                <b>Gender:</b> {user.profileMeta.gender}
              </p>
              <p>
                <b>Country:</b> {user.profileInfo.country}
              </p>
              <p>
                <b>Terms:</b> {user.profileInfo.terms ? "Agreed" : "Not Agreed"}
              </p>
              <p>
                <b>Password:</b>{" "}
                {showPassword
                  ? user.profileInfo.password
                  : "*".repeat(user.profileInfo.password.length)}
                <button onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </p>
              <p>
                <b>Bio:</b> {user.profileInfo.bio}
              </p>
              <p>
                <b>Profile Pics:</b> {user.profileInfo.profilePics.length} files
              </p>
              <button
                style={{ marginLeft: "10px", color: "red" }}
                onClick={() => deleteUser(index)}
              >
                Delete User
              </button>
              <button onClick={() => handleEdit(index)}>Edit User</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContextForm;
