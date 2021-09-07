export const  timeForMat = (count)=> {
  let time1 = new Date()

  time1.setTime(time1.getTime())

  let Y1 = time1.getFullYear()

  let M1 = ((time1.getMonth() + 1) > 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))

  let D1 = (time1.getDate() > 10 ? time1.getDate() : '0' + time1.getDate())

  let timer1 = Y1 + M1 + + D1 // 当前时间

  let time2 = new Date()

  time2.setTime(time2.getTime() + (24 * 60 * 60 * 1000 * count))

  let Y2 = time2.getFullYear()

  let M2 = ((time2.getMonth() + 1) > 9 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))

  let D2 = (time2.getDate() > 9 ? time2.getDate() : '0' + time2.getDate())

  let timer2 = Y2 + M2 + D2 // 之后的七天或者一个月

  return {
    t1: timer1,

    t2: timer2

  }

}

// 格式化时间 type 0:日期 1：时间
export const formatDate = (data,type) =>{
	let time = data;
	// if(time.indexOf('T')!=-1){
	// 	time = time.replace('T',' ');
	// }
	const date = new Date(time);
	const yy = date.getFullYear();
	const mm = date.getMonth()+1;
	const dd = date.getDate();
	const hour = date.getHours();
	const min = date.getMinutes();
	const ss = date.getSeconds();
	if(type==0){
		time = `${yy}-${mm}-${dd}`;
	}else if(type==1){
		time = `${yy}-${mm}-${dd} ${hour}:${min}:${ss}`;
	}
	return time; 
}

/**
 * [isDuringDate 比较当前时间是否在指定时间段内]
 * @author dongsir
 * @DateTime 2021-09-06
 * @version  1.0
 * @param    dateRange   [beginDateStr] [开始时间]
 * @param    dateRange   [endDateStr]   [结束时间]
 * @return   Boolean
 */
// 当前时间是否在某个时间段范围内
export const dateRange = {
    isDuringDate: function (beginDateStr, endDateStr) {
        var curDate = new Date(),
            beginDate = new Date(beginDateStr),
            endDate = new Date(endDateStr);
        if (curDate >= beginDate && curDate <= endDate) {
            return true;
        }
        return false;
    }
}
