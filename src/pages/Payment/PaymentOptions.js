import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Button,
  ThemeConsumer,
} from 'former-kit'
import {
  concat,
  contains,
  not,
  reduce,
} from 'ramda'

import BoletoIcon from '../../images/boleto.svg'
import CreditCardIcon from '../../images/credit-card.svg'
import TwoCreditCards from '../../images/two-credit-cards.svg'
import CradiCardMoreBoleto from '../../images/credit-card-more-boleto.svg'
import NavigateBack from '../../images/navigate_back.svg'
import NavigateNext from '../../images/navigate_next.svg'

const consumeTheme = ThemeConsumer('UIPaymentOptionsPage')

const allowedOptions = [
  {
    paymentType: ['creditcard', 'creditcard'],
    title: '2 Cartões',
    icon: <TwoCreditCards />,
    transitionTo: 'MULTIPLE_CREDITCARDS',
  },
  {
    paymentType: ['creditcard', 'boleto'],
    title: 'Cartão + Boleto',
    icon: <CradiCardMoreBoleto />,
    transitionTo: 'CREDITCARD_AND_BOLETO',
  },
]

class PaymentOptionsPage extends React.Component {
  state = {
    transitionTo: '',
  }

  handleSelectOption = option => () => {
    this.setState({
      transitionTo: option,
    })
  }

  render () {
    const {
      theme,
      transaction,
      handlePageTransition,
      handlePreviousButton,
    } = this.props
    const { paymentMethods } = this.props.transaction

    const multipaymentButtons = reduce(
      (buttons, option) => {
        const {
          paymentType,
          title,
          icon,
          transitionTo,
        } = option

        if (not(contains(paymentType, paymentMethods))) {
          return buttons
        }

        const key = paymentType.toString()

        return concat(
          buttons,
          [
            (
              <Button
                key={key}
                className={theme.paymentOption}
                icon={icon}
                onClick={this.handleSelectOption(transitionTo)}
              >
                <div className={theme.paymentOptionText}>
                  <p className={theme.paymentTitle}>
                    {title}
                  </p>
                </div>
              </Button>
            ),
          ]
        )
      },
      [],
      allowedOptions
    )

    const { paymentConfig } = transaction
    const { creditcard, boleto } = paymentConfig
    const optionsClasses = classNames(
      theme.optionsContainer,
      {
        [theme.multipayments]: multipaymentButtons.length,
      }
    )

    return (
      <div className={theme.page}>
        <h2 className={theme.title}>
          Como quer pagar?
        </h2>
        <div className={optionsClasses} >
          <Button
            className={theme.paymentOption}
            onClick={this.handleSelectOption('SINGLE_CREDITCARD')}
            icon={<CreditCardIcon />}
          >
            <div className={theme.paymentOptionText}>
              <p className={theme.paymentTitle}>
                Cartão de crédito
              </p>
              <p className={theme.paymentSubtitle}>
                {creditcard.subtitle}
              </p>
            </div>
          </Button>
          { multipaymentButtons }
          <Button
            className={theme.paymentOption}
            onClick={this.handleSelectOption('SINGLE_BOLETO')}
            icon={<BoletoIcon />}
          >
            <div className={theme.paymentOptionText}>
              <p className={theme.paymentTitle}>
                Boleto
              </p>
              <p className={theme.paymentSubtitle}>
                {boleto.subtitle}
              </p>
            </div>
          </Button>
        </div>
        <div className={theme.buttonContainer}>
          {
            handlePreviousButton ?
              <Button
                fill="outline"
                onClick={handlePreviousButton}
                icon={<NavigateBack />}
              >
                  Ops, Voltar
              </Button> :
              <div />
          }
          <Button
            type="submit"
            iconAlignment="end"
            icon={<NavigateNext />}
            disabled={!this.state.transitionTo}
            onClick={handlePageTransition(this.state.transitionTo)}
          >
            Pagar
          </Button>
        </div>
      </div>
    )
  }
}

PaymentOptionsPage.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
  }),
  handlePageTransition: PropTypes.func.isRequired,
  handlePreviousButton: PropTypes.func,
  transaction: PropTypes.shape({
    amount: PropTypes.number,
    defaultMethod: PropTypes.string,
    finalAmount: PropTypes.number,
    paymentConfig: PropTypes.shape({
      creditcard: PropTypes.shape({
        installments: PropTypes.arrayOf(PropTypes.object),
        invoiceDescriptor: PropTypes.string,
      }),
    }),
    paymentMethods: PropTypes.arrayOf(PropTypes.array),
  }).isRequired,
}

PaymentOptionsPage.defaultProps = {
  theme: {},
  handlePreviousButton: null,
}

export default consumeTheme(PaymentOptionsPage)