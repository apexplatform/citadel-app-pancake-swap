export const sortList = (list) => {
  let sortedList = list.sort(function(a,b) {
    if(a.balance === '~0') return 1
    if(b.balance === '~0') return 1
    if(a.balance === b.balance)
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

