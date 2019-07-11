function addTotal( cart ) {
  let total = 0;
  for (var item of cart) {
    total += item.price * item.quantity;
  }
  return (total / 100).toFixed(2);
}

function addTax( total ){
  return (parseFloat( total ) * .08).toFixed(2);
}

function addTotalAmount( total ) {
  return (parseFloat( total ) * (1.08) + 10 ).toFixed(2);
}

function formatPrice( itemPrice ){
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

function getPrices( cart ) {
  let cartSummaryPrice = {};
  cartSummaryPrice.totalBeforeTax = addTotal( cart );
  cartSummaryPrice.tax = addTax( cartSummaryPrice.totalBeforeTax );
  cartSummaryPrice.totalAmount = formatPrice(addTotalAmount( cartSummaryPrice.totalBeforeTax ));
  cartSummaryPrice.totalBeforeTax = formatPrice( cartSummaryPrice.totalBeforeTax );
  cartSummaryPrice.tax = formatPrice( cartSummaryPrice.tax );
  return cartSummaryPrice;
}

export { addTotal, formatPrice, addTax, addTotalAmount, getPrices };



