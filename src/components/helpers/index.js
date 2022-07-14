export const sortList = (list) => {
  let sortedList = list.sort(function(a,b) {
    // eslint-disable-next-line 
    if(a.balance == b.balance)
    {
      return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
    }
    else
    {
      return (a.balance < b.balance) ? 1 : -1;
    }
  })
  return sortedList
}

