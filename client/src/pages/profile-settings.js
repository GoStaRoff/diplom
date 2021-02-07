import React, { useState, useContext, useCallback, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth-context";
import Loader from "../components/loader";
import ProfileForm from "../components/pofile-form";
import { useParams } from "react-router-dom";

const ProfileSetting = ({ isMe, isAdmin, isPcych }) => {
  const [user, setUser] = useState(null);
  const [tests, setTests] = useState([]);
  const { loading, request } = useHttp();
  const { token, userId } = useContext(AuthContext);
  const userIds = useParams().id;

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
      const fetched = await request(`/api/user/${userIds}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setUser(fetched);
    } catch (e) {
    }
  }, [token, request, userIds]);

  const fetchTests = useCallback(
    async (id = userIds) => {
      try {
        const fetched = await request(`/api/answers/of/${id}`, "GET", null, {
          Authorization: `Bearer ${token}`,
        });
        setTests(fetched);
      } catch (e) {}
    },
    [token, request, userIds]
  );

  useEffect(() => {
    if (isMe) {
      fetchTests(userId);
    } else {
      fetchTests();
    }
  }, [fetchTests, isMe, userId]);

  useEffect(() => {
    if (isMe) {
      fetchMe();
    } else {
      fetchUser();
    }
  }, [fetchUser, fetchMe, isMe]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {!loading && user && (
        <ProfileForm
          user={user}
          isMe={isMe}
          tests={tests}
          isPcych={isPcych}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};

export default ProfileSetting;
