export default function productPrice( itemPrice ){
  let price = String(itemPrice)
  let firstSlice;
  let secondSlice;
  if ( price.length > 9 ) {
    firstSlice = price.slice(0, price.length - 9 );
    secondSlice = price.slice( price.length - 9 );
    price = firstSlice + ',' + secondSlice;
  } 
  if ( price.length > 6 ){
    firstSlice = price.slice(0 , price.length - 6 );
    secondSlice = price.slice( price.length - 6 );
    price = firstSlice + ',' + secondSlice;
  }
  return price;
}