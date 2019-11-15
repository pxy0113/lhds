//滚动日期选择器

const startYear = 2018;
const endYear = 2050;


export function withData(param){
  return param < 10 ? '0' + param : '' + param;
}
export function getLoopArray(start,end){
  var start = start || 0;
  var end = end || 1;
  var array = [];
  for (var i = start; i <= end; i++) {
    array.push(withData(i));
  }
  return array;
}

export function transPickerValue(value){ //将日期转化成Picker可识别的数组
      let dateTimeArr = [];
      if(value == ''){
          dateTimeArr = dateTimePicker().dateTime;
      }else{
          let str  = value.split(' ');//分成日期跟时间
          let arr = str[0].split('-');
		  
         let Array = dateTimePicker().dateTimeArray;
         arr.forEach((item,i)=>{
           dateTimeArr.push(Array[i].indexOf(item));
         });
      }

        return dateTimeArr;
}

export function getMonthDay(year,month){
  var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0), array = null;

  switch (month) {
    case '01':
    case '03':
    case '05':
    case '07':
    case '08':
    case '10':
    case '12':
      array = getLoopArray(1, 31)
      break;
    case '04':
    case '06':
    case '09':
    case '11':
      array = getLoopArray(1, 30)
      break;
    case '02':
      array = flag ? getLoopArray(1, 29) : getLoopArray(1, 28)
      break;
    default:
      array = '月份格式不正确，请重新输入！'
  }
  return array;
}

export function getNewDateArry(){
  // 当前日期的处理
  var newDate = new Date();
  var year = withData(newDate.getFullYear()),
      mont = withData(newDate.getMonth() + 1),
      date = withData(newDate.getDate());
  return [year, mont, date];
}
export function dateTimePicker(start = startYear,end = endYear,date) {
  // 返回默认显示的数组和联动数组的声明
  var dateTime = [], dateTimeArray = [[],[],[]];
  // var start = startYear || 1978;
  // var end = endYear || 2100;
  // 默认开始显示数据
  var defaultDate = date ? [...date.split(' ')[0].split('-'), ...date.split(' ')[1].split(':')] : getNewDateArry();
  // 处理联动列表数据
  /*年月日 时分秒*/
  dateTimeArray[0] = getLoopArray(start,end);
  dateTimeArray[1] = getLoopArray(1, 12);
  dateTimeArray[2] = getMonthDay(defaultDate[0], defaultDate[1]);

  dateTimeArray.forEach((current,index) => {
    dateTime.push(current.indexOf(defaultDate[index]));
  });

  return {
    dateTimeArray: dateTimeArray,
    dateTime: dateTime
  }
}