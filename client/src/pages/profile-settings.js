import React, { useState, useContext, useCallback, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";
import Loader from "../components/loader";
import ProfileForm from "../components/pofile-form";
import {useParams} from 'react-router-dom'

const ProfileSetting = ({isMe, isAdmin}) => {
  const [user, setUser] = useState(null);
  const [tests, setTests] = useState([]);
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

  const fetchTests = useCallback(async () => {
    try {
      const fetched = await request(`/api/answers/of/${userId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      console.log(fetched)
      setTests(fetched);
    } catch (e) {}
  }, [token, request, userId]);

  useEffect(() => {
    fetchTests();
  }, [fetchTests]);

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
    <div>{!loading && user && <ProfileForm user={user} isMe={isMe} tests={tests} isAdmin={isAdmin} />}</div>
  );
};

export default ProfileSetting;
