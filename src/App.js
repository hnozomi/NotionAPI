import Scan from "./Scan";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UUID from "uuidjs";

export default function App() {
  const [db_id, setDb_id] = useState("");
  const [value, setValue] = useState("");
  const [oauthState, setOauthState] = useState(UUID.generate());
  const navigate = useNavigate();
  const search = useLocation().search;
  const TOKEN_URL =
    "https://p0lpnwmz81.execute-api.ap-northeast-1.amazonaws.com/default/NotionTokenGet";

  useEffect(() => {
    const id = localStorage.getItem("Key");
    setDb_id(id);
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
  }, [search]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onClick = (e) => {
    e.preventDefault();
    localStorage.setItem("Key", value);
    setDb_id(value);
  };

  return (
    <>
      {db_id ? (
        <>
          <div className="App">
            <h1>バーコードリーダー</h1>
            <p>書籍読み取り完了後、Notionに自動入力</p>
            <Scan value={value} />
          </div>
          <a
            href={`https://api.notion.com/v1/oauth/authorize?owner=user&client_id=ec5d0801-be69-4e50-a552-e91280369ed4&redirect_uri=https://1060b.csb.app/&response_type=code&state=${oauthState}`}
          >
            TokenGET
          </a>
        </>
      ) : (
        <>
          <div>db_idの登録</div>
          <input value={value} onChange={onChange} />
          <button onClick={onClick}>登録する</button>
        </>
      )}
    </>
  );
}
