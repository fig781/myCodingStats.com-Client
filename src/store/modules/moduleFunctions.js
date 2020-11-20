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
  setDayOfWeekId: (dayOfWeek) => {
    if (dayOfWeek == 'Monday') {
      return 0;
    } else if (dayOfWeek == 'Tuesday') {
      return 1;
    } else if (dayOfWeek == 'Wednesday') {
      return 2;
    } else if (dayOfWeek == 'Thursday') {
      return 3;
    } else if (dayOfWeek == 'Friday') {
      return 4;
    } else if (dayOfWeek == 'Saturday') {
      return 5;
    } else if (dayOfWeek == 'Sunday') {
      return 6;
    }
  },
  totalTimesToTime: (active, passive, coding) => {
    let convert = function convertTimetoNumber(time) {
      if (time.length == 4) {
        return 60 * parseInt(time.slice(0, 1)) + parseInt(time.slice(2, 4));
      } else if (time.length == 5) {
        return 60 * parseInt(time.slice(0, 2)) + parseInt(time.slice(3, 5));
      } else {
        return 0;
      }
    };

    const convertedActiveTime = convert(active);
    const convertedPassiveTime = convert(passive);
    const convertedCodingTime = convert(coding);

    const total =
      convertedActiveTime + convertedPassiveTime + convertedCodingTime;

    if (total == 0) {
      return '0:00';
    } else {
      const minutes = total % 60;
      const hours = Math.floor(total / 60);
      if (minutes < 10) {
        return `${hours}:0${minutes}`;
      } else {
        return `${hours}:${minutes}`;
      }
    }
  },
  totalTimesToNumber: (active, passive, coding) => {
    let convert = function convertTimetoNumber(time) {
      if (time.length == 4) {
        return 60 * parseInt(time.slice(0, 1)) + parseInt(time.slice(2, 4));
      } else if (time.length == 5) {
        return 60 * parseInt(time.slice(0, 2)) + parseInt(time.slice(3, 5));
      } else {
        return 0;
      }
    };

    const convertedActiveTime = convert(active);
    const convertedPassiveTime = convert(passive);
    const convertedCodingTime = convert(coding);

    return convertedActiveTime + convertedPassiveTime + convertedCodingTime;
  },
  convertTimeToNumber: (time) => {
    if (time.length == 4) {
      return 60 * parseInt(time.slice(0, 1)) + parseInt(time.slice(2, 4));
    } else if (time.length == 5) {
      return 60 * parseInt(time.slice(0, 2)) + parseInt(time.slice(3, 5));
    } else {
      return 0;
    }
  },
};
