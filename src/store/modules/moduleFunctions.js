export default {
  convertDates: (rowsArray) => {
    let convertedDays = [];
    let slicedString;
    for (let x = 0; x < rowsArray.length; x++) {
      slicedString = rowsArray[x].in_app_date.slice(3, 5);
      parseInt(slicedString);
      convertedDays.push(slicedString);
    }
    return convertedDays;
  },
  convertNumberToTime: (time) => {
    let hours = Math.floor(time / 60);
    let minutes = time % 60;
    if (minutes == 0) {
      minutes = '00';
    } else if (minutes < 10) {
      minutes = '0' + minutes.toString();
    }
    return `${hours}:${minutes}`;
  },
};
