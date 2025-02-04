function generateAttendanceData(attDate, attendanceArray) {
    const date = new Date(attDate);
  const year = date.getFullYear();
  const month = date.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthData = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return { date: formattedDate, workingHours: attendanceArray[day]?attendanceArray[day]:0 };
  });

  return monthData;
  }

  export default generateAttendanceData

