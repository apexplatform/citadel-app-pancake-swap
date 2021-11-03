export const sortList = (list) => {
    let sortedList = list.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    return sortedList
}