const formatDate = (date) => {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    const returnDate  = `${year}-${month < 10 ? '0' + month : month}-01`;
    return `${returnDate}`
  };

  export default formatDate