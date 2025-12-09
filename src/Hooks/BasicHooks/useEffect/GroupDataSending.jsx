import  { useRef, useState, useEffect } from "react";

const sendToApi = async (data) => {
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
    console.log("Error While Sending Grouped Data", e);
  }
};

const GroupDataSending = () => {
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

    // grouping data
    const groupedData = {
      personalInfo: {
        name: formData.name,
        dob: formData.dob,
        age: formData.age,
        profilePic: formData.profilePic,
      },
      personalMeta: {
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        agreeTerms: formData.agreeTerms,
        country: formData.country,
        bio: formData.bio,
      },
    };

    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = groupedData; // save grouped data
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      setUsers([...users, groupedData]); // save grouped data
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

    // send grouped data to backend or process it as needed
    sendToApi(groupedData);
  };

  const handleEdit = (index) => {
    const user = users[index];
    setFormData({
      name: user.personalInfo.name,
      email: user.personalMeta.email,
      password: user.personalMeta.password,
      age: user.personalInfo.age,
      gender: user.personalMeta.gender,
      agreeTerms: user.personalMeta.agreeTerms,
      country: user.personalMeta.country,
      bio: user.personalMeta.bio,
      dob: user.personalInfo.dob,
      profilePic: user.personalInfo.profilePic,
    });
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filtered = users.filter((_,i) => i !== index);
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
            <div key={index}>
              <p>
                <b>Name:</b> {user.personalInfo.name}
              </p>
              <p>
                <b>Email:</b> {user.personalMeta.email}
              </p>
              <p>
                <b>Country:</b> {user.personalMeta.country}
              </p>
              <p>
                <b>Gender:</b> {user.personalMeta.gender}
              </p>
              <p>
                <b>Bio:</b> {user.personalMeta.bio}
              </p>
              <p>
                <b>Age:</b> {user.personalInfo.age}
              </p>
              <p>
                <b>DOB:</b> {user.personalInfo.dob}
              </p>
              <p>
                <b>Password:</b>{" "}
                {showPassword
                  ? user.personalMeta.password
                  : "•".repeat(user.personalMeta.password.length)}
                <button onClick={() => setShowPassword((prev) => !prev)}>
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

export default GroupDataSending;
