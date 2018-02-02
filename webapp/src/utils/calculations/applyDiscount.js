const discounts = {
  percentage: {
    calc: (amount, discount) => (amount - (amount * (discount / 100))),
  },
  amount: {
    calc: (amount, discount) => (amount - discount),
  },
}

const applyDiscount = (discountType, discountValue, amount) => {
  const calcAmount = discounts[discountType].calc

  return calcAmount(amount, discountValue)
}

export default applyDiscount