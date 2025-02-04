import moment from 'moment'


const createCalender =(month)=>{
    const calendar = [];
    const today = moment(month);
    const startDay = today.clone().startOf('month').startOf('week');
    const endDay = today.clone().endOf('month').endOf('week');
    let date = startDay.clone().subtract(1, 'day');
    const dateDefaultValue = []
    while (date.isBefore(endDay, 'day'))
      calendar.push({
        days: Array(7).fill(0).map(() => {
          const returnValue = date.add(1, 'day').clone()
          console.log('returnValue', moment(returnValue).format('DD-MM-YYYY'))
          dateDefaultValue.push({[moment(returnValue).format('DD-MM-YYYY')]:0})
          return returnValue
      })
      });
      
   return   {createCalendar:calendar,dateDefaultValue}
}

export default createCalender