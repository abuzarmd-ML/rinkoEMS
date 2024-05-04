const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const returnDate  = `${year}-${month < 10 ? '0' + month : month}-01`;
    return `${returnDate}`
  };

  export default formatDate