import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import "./index.css";
import { MoralisDappProvider } from "./providers/MoralisDappProvider/MoralisDappProvider";

window.process = { env: { NODE_ENV: "development" } };

const APP_ID =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImRhMjliNjg4LTQ4YzAtNDYwYi1hNjkzLTc0OThmNmQ3YjY0MiIsIm9yZ0lkIjoiNTExNzcwIiwidXNlcklkIjoiNTI2NjAwIiwidHlwZUlkIjoiMGJmNWJmMDYtODg1My00ZjEzLTkwYjItZWFkZDJjNDk0ZjA3IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NzY4NzI0NjAsImV4cCI6NDkzMjYzMjQ2MH0.AFYbNjogi1PsPz0vy5VblDotVZKUCpiDvZEYpq2SDNA";
const SERVER_URL = "https://dummy.grandmoralis.com:2053/server";

const Application = () => {
  const isServerInfo = true;

  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <MoralisDappProvider>
        <App isServerInfo={isServerInfo} />
      </MoralisDappProvider>
    </MoralisProvider>
  );
};

ReactDOM.render(<Application />, document.getElementById("root"));
