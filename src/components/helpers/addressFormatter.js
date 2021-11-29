export const fotmatAddress = (address) => {
    if(address.length > 20){
        return address.slice(0,6) + '**' + address.slice(address.length - 4,address.length)
    }
    return address
}


export const sortList = (list) => {
    let sortedList = list.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    return sortedList
}