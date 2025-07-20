import throttle from "lodash.throttle";
import { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import { Cursor } from "./components/Cursor";

const renderCursors = (users) => {
  return Object.keys(users).map((uuid) => {
    const user = users[uuid];

    return <Cursor key={uuid} point={[user.state.x, user.state.y]} />;
  });
};

const renderUsersList = (users) => {
  return (
    <ul>
      <h2>Connected users:</h2>
      {Object.keys(users).map((uuid) => {
        return <li key={uuid}>{JSON.stringify(users[uuid])}</li>;
      })}
    </ul>
  );
};

export function Home({ username }) {
  const WS_URL = "ws://127.0.0.1:8000";
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    queryParams: { userName: username },
  });
  const THROTTLE = 50;
  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE));

  useEffect(() => {
    sendJsonMessage({
      x: 0,
      y: 0,
    });

    window.addEventListener("mousemove", (e) => {
      const cursorPosition = {
        x: e.clientX,
        y: e.clientY,
      };

      sendJsonMessageThrottled.current(cursorPosition);
    });
  }, []);

  if (lastJsonMessage) {
    return (
      <>
        {renderCursors(lastJsonMessage)}
        {renderUsersList(lastJsonMessage)}
      </>
    );
  }

  return <h1>{username}'s Home</h1>;
}
