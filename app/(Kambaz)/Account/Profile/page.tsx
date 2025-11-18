"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

interface AccountState {
  currentUser: any;
}

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state: { accountReducer: AccountState }) => state.accountReducer);

  const fetchProfile = () => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }
    setProfile(currentUser);
  };

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const signout = async () => {
    dispatch(setCurrentUser(null));
    router.push("/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="wd-profile-screen" style={{ maxWidth: "500px" }}>
      <h3>Profile</h3>
      {profile && (
        <div>
          <Form.Control
            value={profile.username || ""}
            id="wd-username"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            placeholder="Username"
          />
          <Form.Control
            value={profile.password || ""}
            id="wd-password"
            className="mb-2"
            type="password"
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            placeholder="Password"
          />
          <Form.Control
            value={profile.firstName || ""}
            id="wd-firstname"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            placeholder="First Name"
          />
          <Form.Control
            value={profile.lastName || ""}
            id="wd-lastname"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            placeholder="Last Name"
          />
          <Form.Control
            value={profile.dob || ""}
            id="wd-dob"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            type="date"
          />
          <Form.Control
            value={profile.email || ""}
            id="wd-email"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            placeholder="Email"
          />
          <Form.Select
            value={profile.role || "USER"}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            className="mb-2"
            id="wd-role"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>
          <Button onClick={updateProfile} variant="primary" className="w-100 mb-2" id="wd-update-btn">
            Update
          </Button>
          <Button onClick={signout} variant="danger" className="w-100 mb-2" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}