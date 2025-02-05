import React, { useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [email, setEmail] = useState("");
  const [user_type, setUser] = useState("");
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [userData, setUserData] = useState({});

  const searchUser = async (e) => {
    e.preventDefault();
    await axios
      .post("/admin/get-user", { user_type: user_type, email: email })
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const deleteUserAccount = async (userId) => {
    await axios
      .delete(`/admin/delete-user/${userId}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };
  return (
    <>
      <form onSubmit={searchUser}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="radio"
          name="user_type"
          value="employee"
          id="employee"
          onChange={(e) => setUser(e.target.value)}
        />
        <label htmlFor="employee">Employee</label>
        <input
          type="radio"
          name="user_type"
          value="employer"
          id="employer"
          onChange={(e) => setUser(e.target.value)}
        />
        <label htmlFor="employer">Employer</label>
        <input type="submit" value="Search" />
      </form>
      {userData.first_name && (
        <div>
          <div>
            Name: {userData.first_name} {userData.last_name}
          </div>
          <div>Email: {userData.email}</div>
          <div>Phone: {userData.phone}</div>
          <button onClick={() => setDeleteModal(true)}>Delete Account</button>
          {showDeleteModal && (
            <form onSubmit={() => deleteUserAccount(userData._id)}>
              <p>Are are you sure you want to delete the account?</p>
              <button onClick={() => setDeleteModal(false)}>No</button>
              <input value="YES" type="submit" />
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default ManageUsers;
