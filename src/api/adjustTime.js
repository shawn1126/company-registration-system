export function adjustTime(dateTimeString) {
  console.log("test dateTimeString", dateTimeString);
  var date = new Date(dateTimeString);

  // Time calculation
  var hours = (date.getUTCHours()) + 8;
  var minutes = (date.getUTCMinutes() )- 23;
  var seconds = (date.getUTCSeconds()) - 18;
  console.log("test 1122 hrs",hours);
  var timeFraction = hours / 24 + minutes / 1440 + seconds / 86400;

  // Excel serial number for date '1899-12-30' is 0
  var excelSerialNumber = 0;

  // Excel timestamp is the sum of the date serial number and time fraction
  var excelTimestamp = excelSerialNumber + timeFraction;
  let convertedTime = new Date((excelTimestamp - (25567 + 1)) * 86400 * 1000);
  console.log("convertedTime", convertedTime);

//   console.log(
//     "${addZero(item.getHours())}",
//     addZero(convertedTime.getUTCHours())
//   );
  return `${addZero(convertedTime.getUTCHours())}:${addZero(
    convertedTime.getMinutes()
  )}:${addZero(convertedTime.getSeconds())}`;
}

const addZero = (_num) => (_num < 10 ? "0" + _num : _num);

