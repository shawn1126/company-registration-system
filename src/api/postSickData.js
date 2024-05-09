//    "https://script.google.com/macros/s/AKfycbzjUxokJQqZRmcrvmQprWaAQ6mE_brmuSpIzlAHD6sYEiKC2-NctUJthIsBbTC8_GfdPQ/exec";
//https://script.google.com/macros/s/AKfycbzjUxokJQqZRmcrvmQprWaAQ6mE_brmuSpIzlAHD6sYEiKC2-NctUJthIsBbTC8_GfdPQ/exec
/**
 *
 * @param {*} _body
 * @returns
 */
export function fetchData(_body) {
  console.log("sick _body", _body);
  const REQUERY_URL =
    "https://script.google.com/macros/s/AKfycbzR8MBCq7mcgnAb6G0xCaPmVOcZvky2raAI6A56QxTcB8HNHvaGcT5uWQKTry6wPn1q/exec";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      Account: "applicaion/json",
      followAllRedirects: true,
    },
    body: encodeURI(JSON.stringify(_body)),
  };
  console.log("options", options);
  return new Promise(function (resolve, reject) {
    fetch(REQUERY_URL, options)
      .then((res) => res.json({ limit: '1000mb' }))
      .then((responseData) => {
        // 使用者資訊寫入全域 redux
        console.log("test sick data responseData", responseData);
        if (responseData.state == "success") {
          resolve(responseData);
          console.log("success", success);
        } else {
          resolve(responseData);
          console.log("fail", responseData);
        }
      })
      .catch((err) => {
        console.log("error 是", err);
      });
  });
}

// import axios from "axios";
// export default async function handler(req, res) {
//   try {
//     const {
//       user,
//       startedselectedDate,
//       startTime,
//       endedselectedDate,
//       endTime,
//       reason,
//       selected,
//     } = req.body;
//     console.log("req.body",req.body);
//     let ProdURL =
//       "https://script.google.com/macros/s/AKfycbzJeTqMePsHsUJ-jKWwct7oUjtM9ur0QF1LVxlfegYmKClgthAEAVstHJ0_omcaVTB6/exec";

//     await axios.post(ProdURL, null, {
//       params: {
//         user: user,
//         startedselectedDate: startedselectedDate,
//         startTime: startTime,
//         endedselectedDate: endedselectedDate,
//         endTime: endTime,
//         reason: reason,
//         selected: selected,
//       },
//     });
//     res.status(201).json({ message: "Success" });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ message: "Something went wrong" });
//   }
