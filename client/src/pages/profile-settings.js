import React, { useState, useContext, useCallback, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";
import Loader from "../components/loader";
import ProfileForm from "../components/pofile-form";

const ProfileSetting = () => {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchUser = useCallback(async () => {
    try {
      const fetched = await request("/api/user", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setUser(fetched);
    } catch (e) {}
  }, [token, request]);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return <Loader />;
  }

  return <div>{!loading && user && <ProfileForm user={user} tests={links} />}</div>;
};

export default ProfileSetting;
