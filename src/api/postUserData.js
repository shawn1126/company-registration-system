//    "https://script.google.com/macros/s/AKfycbzjUxokJQqZRmcrvmQprWaAQ6mE_brmuSpIzlAHD6sYEiKC2-NctUJthIsBbTC8_GfdPQ/exec";
//https://script.google.com/macros/s/AKfycbzjUxokJQqZRmcrvmQprWaAQ6mE_brmuSpIzlAHD6sYEiKC2-NctUJthIsBbTC8_GfdPQ/exec
/**
 *
 * @param {*} _body
 * @returns
 */
export function fetchData(_body) {
  const REQUERY_URL =
    "https://script.google.com/macros/s/AKfycbzjUxokJQqZRmcrvmQprWaAQ6mE_brmuSpIzlAHD6sYEiKC2-NctUJthIsBbTC8_GfdPQ/exec";
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
      .then((res) => res.json())
      .then((responseData) => {
        // 使用者資訊寫入全域 redux
        console.log(responseData);
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