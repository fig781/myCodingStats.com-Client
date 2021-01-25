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
  convertNumberToTotalTime: (number) => {
    if (number == null) {
      return '--';
    }
    let hours, minutes;
    hours = Math.floor(number / 60);
    minutes = number % 60;
    return `${hours}hr ${minutes}min`;
  },
  findPercentageOfTotal: (total, value) => {
    let x = Number.parseFloat(value / total).toPrecision(2);
    return Number(x);
  },

  //analytics
  generateCompleteChartData: (month, year, fetchedEntries) => {
    let totalValues = [];
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let x = 1; x <= daysInMonth; x++) {
      let entryAdded = false;
      if (fetchedEntries.length !== 0) {
        for (let entry of fetchedEntries) {
          if (entry.in_app_day == x) {
            entry.in_app_day = Number(entry.in_app_day);
            totalValues.push(entry);
            entryAdded = true;
            fetchedEntries.splice(fetchedEntries.indexOf(entry), 1);
            break;
          }
        }
      }

      if (entryAdded == false) {
        totalValues.push({
          in_app_day: x,
          active_time: 0,
          passive_time: 0,
          coding_problems_time: 0,
        });
      }
    }
    return totalValues;
  },
  generateChartLabels: (month, year) => {
    let labels = [];
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let x = 1; x <= daysInMonth; x++) {
      labels.push(`${month}/${x}`);
    }
    return labels;
  },
  generateChartDataArray: (dataSubject, compiledData) => {
    let data = [];

    for (let entry of compiledData) {
      data.push(entry[dataSubject]);
    }
    return data;
  },
};
