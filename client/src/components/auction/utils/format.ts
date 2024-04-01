//************************************
// Description: Hàm định dạng lại thời gian theo format "yyyy/mm/dd hh:mm:ss"
//************************************

export function formatDate(date: Date) {
    date = new Date(date);
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('/') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }

function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}


export function formatMoney(price: number) {

  // Convert number to string and split into parts
  const parts = price.toString().split('.');

  // Add comma as thousand separator
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Return formatted string with 'đ' symbol
  return parts.join('.') + ' đ';
}


export function endTimeCalc(start: Date, time: number) {
  start = new Date (start)

  let hour = start.getHours()
  let min = start.getMinutes()


  min = min + time % 60
  hour = hour + time / 60
  if (min >= 60) {
    min = min % 60
    hour = hour + min / 60
  }

  let end = new Date(start)
  if (hour >= 24) {
    hour = hour % 24
    end.setDate(end.getDate() + 1)
  }

  end.setHours(hour, min, end.getSeconds())

  return end
}

export function calcTime(start: Date) {
  start = new Date (start)
  let now = new Date()

  let difference = now.getTime() - start.getTime()
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Return an object containing the time difference in days, hours, minutes, and seconds
    return {
        days,
        hours,
        minutes,
        seconds
    }; 
}

