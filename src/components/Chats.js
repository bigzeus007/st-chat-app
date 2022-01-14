import React, { useRef, useState, useEffect } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";

import { useAuth } from "../contexts/AuthContext";

import { auth } from "../firebase";

export default function Chats() {
  const didMountRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  console.log("First console.log " + user);

  const history = useNavigate();

  async function handleLogout() {
    await auth.signOut();
    history("/");
  }

  const getFile = async (url) => {
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      if (!user || user === null) {
        history("/");
        return;
      }

      axios
        .get("https://api.chatengine.io/users/me/", {
          headers: {
            "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
            "user-name": user.email,
            "user-secret": user.uid,
          },
        })

        .then(() => {
          setLoading(false);
        })

        .catch((e) => {
          let formdata = new FormData();
          formdata.append("email", user.email);
          formdata.append("username", user.email);
          formdata.append("secret", user.uid);

          getFile(user.photoURL).then((avatar) => {
            formdata.append("avatar", avatar, avatar.name);

            axios
              .post("https://api.chatengine.io/users", formdata, {
                headers: {
                  "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
                },
              })
              .then(() => setLoading(false))
              .catch((e) => console.log("e", e.response));
          });
        });
    }
  }, [user, history]);

  if (!user || loading) return "Loading ...";

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Chat APP</div>

        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh -66px)"
        userName={user.email}
        userSecret={user.uid}
        projectID='7ad26904-84d4-447b-9b4d-ee5bf1690008'
        onNewMessage={() =>
          new Audio(
            "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
          ).play()
        }
      />
    </div>
  );
}
