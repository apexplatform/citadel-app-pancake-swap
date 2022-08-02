export const fotmatAddress = (address) => {
    if (address?.length > 20) {
      return (
        address.slice(0, 6) +
        "****" +
        address.slice(address.length - 4, address.length)
      );
    }
    return address;
  };
  