function getArray(arr) {
  let st = 0;
  let array = [];
  for (let i = 1; i <= 5; i++) {
    let sliceArr = arr.slice(st, 24 * i);
    let result = Math.floor(sliceArr.reduce((acc, no) => acc + no) / 24);
    array.push(result);
    st = 24 * i;
  }
  return array;
}
function getDateArray(arr) {
  let st = 0;
  let array = [];
  for (let i = 1; i <= 5; i++) {
    let sliceArr = arr.slice(st, 24 * i);
    let date = new Date(sliceArr[0]);
    let formatedDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    array.push(formatedDate);
    st = 24 * i;
  }
  return array;
}
function getIssRainArray(arr) {
  let st = 0;
  let array = [];
  for (let i = 1; i <= 5; i++) {
    let sliceArr = arr.slice(st, 24 * i);
    let a = sliceArr.reduce((acc, no) => acc + no);
    if (a > 0) {
      array.push(true);
    } else {
      array.push(false);
    }

    st = 24 * i;
  }
  return array;
}

export { getArray, getDateArray, getIssRainArray };

/*
    for (let i = 0; i < 7; i++) {
  let date = new Date(Date.now());
      console.log(new Date().toLocaleTimeString());
    console.log(new Date().getHours()," : ", new Date().getMinutes())
}


*/
