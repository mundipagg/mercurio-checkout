const applyCustomMethods = require('../../utils/applyCustomMethods')

module.exports = (wd, init, next, catchError) => {
  applyCustomMethods(wd)

  const browser = init('mobile/allFlow-Boleto')

  const paymentType = 'boleto'
  const footerBtn = 'footer-confirm-btn'

  browser
    .saveScreenshot('1_initializing.png')
    .fillCustomerForm(2)
    .buttonClick(footerBtn)
    .fillBillingForm(3)
    .buttonClick(footerBtn)
    .fillShippingForm(4)
    .buttonClick(footerBtn)
    .fillPaymentForm(5, paymentType)
    .buttonClick(footerBtn)
    .saveScreenshot('6_waiting-payment.png')
    .waitForElementById('confirmation-page')
    .saveScreenshot('7_confirmation_page__done.png')
    .catch(catchError)
    .fin(() => browser.quit(next))
    .done()
}