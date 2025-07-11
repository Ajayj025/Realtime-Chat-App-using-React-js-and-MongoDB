import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUsername = () => {
      try {
        const storedUser = localStorage.getItem("chat-app-user");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          if (parsed.username) {
            setUserName(parsed.username);
          }
        }
      } catch (err) {
        console.error("Error reading username from localStorage:", err);
      }
    };

    fetchUsername();
  }, []);

  return (
    <Container>
      <img src={Robot} alt="Welcome Bot" />
      <h1>
        Welcome, <span>{userName || "Guest"}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  text-align: center;
  padding: 2rem;

  img {
    height: 20rem;
  }

  span {
    color: #4e0eff;
  }
`;
