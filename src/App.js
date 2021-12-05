import Scan from "./Scan";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [token, setToken] = useState("");
  const search = useLocation().search;
  // const URL =
  //   "https://554r4a0j8g.execute-api.ap-northeast-1.amazonaws.com/default/Notion-API";
  const TOKEN_URL =
    "https://p0lpnwmz81.execute-api.ap-northeast-1.amazonaws.com/default/NotionTokenGet";

  const onGetToken = () => {
    axios
      .get(TOKEN_URL)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const query2 = new URLSearchParams(search);
    const code = query2.get("code");
    const param = {
      code: code
    };

    // const token = "AAA";

    // if (code && !token) {
    if (code) {
      console.log(code);
      axios
        .get(TOKEN_URL, { params: param })
        .then((res) => {
          navigate("/");
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(code);
  }, [search]);

  const onRegisterToken = () => {
    axios
      .get(URL)
      .then((res) => {
        history.push("/");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className="App">
        <h1>バーコードリーダー</h1>
        <h2>読み取り完了後、Notionに自動入力</h2>
        <Scan />
      </div>
      <div>トークンを取得</div>
      <p>{value}</p>
      <button onClick={onGetToken}>GET</button>
      <p>DB_ID</p>
      <input value={value} onChange={onChange} />
      {/* <a href="https://api.notion.com/v1/oauth/authorize?owner=user&client_id=ec5d0801-be69-4e50-a552-e91280369ed4&redirect_uri=https://q0vmn.csb.app/&response_type=code"> */}
      <a href="https://api.notion.com/v1/oauth/authorize?owner=user&client_id=ec5d0801-be69-4e50-a552-e91280369ed4&redirect_uri=https://q0vmn.csb.app/&response_type=code">
        TokenGET
      </a>
    </>
  );
}
