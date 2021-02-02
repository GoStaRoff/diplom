import React, { useState, useContext, useCallback, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";
import Loader from "../components/loader";
import ProfileForm from "../components/pofile-form";
import {useParams} from 'react-router-dom'

const ProfileSetting = ({isMe, isAdmin}) => {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);
  const userId = useParams().id;


  const fetchMe = useCallback(async () => {
    try {
      const fetched = await request("/api/user/me", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setUser(fetched);
    } catch (e) {}
  }, [token, request]);

  const fetchUser = useCallback(async () => {
    try {
      const fetched = await request(`/api/user/${userId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setUser(fetched);
    } catch (e) {}
  }, [token, request, userId]);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  useEffect(() => {
    if(isMe){
      fetchMe();
    }
    else{
      fetchUser();
    }
  }, [fetchUser, fetchMe, isMe]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>{!loading && user && <ProfileForm user={user} isMe={isMe} tests={links} isAdmin={isAdmin} />}</div>
  );
};

export default ProfileSetting;
