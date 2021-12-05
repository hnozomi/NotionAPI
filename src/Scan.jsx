import React, { useState, useEffect } from "react";
import Quagga from "quagga";
import axios from "axios";
import { Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const Scan = (props) => {
  const [barcode, setBarcode] = useState("");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState(false);
  const [startStatus, setStartStatus] = useState(false);
  const [stopStatus, setStopStatus] = useState(true);
  const URL =
    "https://554r4a0j8g.execute-api.ap-northeast-1.amazonaws.com/default/Notion-API";

  // useEffect(() => {
  //   const config = {
  //     inputStream: {
  //       name: "Live",
  //       type: "LiveStream",
  //       target: "#preview",
  //       size: 1000,
  //       singleChannel: false
  //     },
  //     locator: {
  //       patchSize: "medium",
  //       halfSample: true
  //     },
  //     decoder: {
  //       readers: [
  //         {
  //           format: "ean_reader",
  //           config: {}
  //         }
  //       ]
  //     },
  //     numOfWorker: navigator.hardwareConcurrency || 4,
  //     locate: true,
  //     src: null
  //   };

  //   Quagga.init(config, function (err) {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     Quagga.start();
  //   });
  // }, []);

  useEffect(() => {
    status && getBookInformation(barcode);
  }, [status]);

  Quagga.onDetected((result) => {
    if (result !== undefined) {
      const init = result.codeResult.code.substr(0, 3);
      if (init === "978" && status === false) {
        Quagga.stop();
        setBarcode(result.codeResult.code);
        setStatus(true);
      }
    }
  });

  const getBookInformation = (isbn) => {
    const param = {
      isbn: isbn,
      db_id: value,
      code: ""
    };

    if (status) {
      axios
        .get(URL, { params: param })
        .then((res) => {
          console.log(res.data);
          setStatus(true);
        })
        .catch((err) => {
          console.log(err);
          setStatus(true);
        });
    }
  };

  const onStart = () => {
    const config = {
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: "#preview",
        size: 1000,
        singleChannel: false
      },
      locator: {
        patchSize: "medium",
        halfSample: true
      },
      decoder: {
        readers: [
          {
            format: "ean_reader",
            config: {}
          }
        ]
      },
      numOfWorker: navigator.hardwareConcurrency || 4,
      locate: true,
      src: null
    };

    console.log(Quagga.start, "START");
    Quagga.init(config, function (err) {
      if (err) {
        console.log(err);
        return;
      }
      Quagga.start();
    });
    setStartStatus(true);
    setStopStatus(false);
  };

  const onStop = () => {
    setStartStatus(false);
    setStopStatus(true);
    setStatus(false);
    setBarcode("");
    Quagga.stop();
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <input value={value} onChange={onChange} />
      <h2>バーコードスキャナ</h2>
      <Button disabled={startStatus} onClick={onStart}>
        START
      </Button>
      <Button disabled={stopStatus} onClick={onStop}>
        STOP
      </Button>
      <hr />
      {barcode !== "" ? `バーコード：${barcode}` : "スキャン中"}
      <hr />
      {status ? <div>登録が完了しました</div> : <div id="preview"></div>}
    </>
  );
};

export default Scan;
