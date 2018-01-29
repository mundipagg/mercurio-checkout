import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import shortid from 'shortid'
import { Col } from '../../components/Grid'

const largeColSize = 12
const mediumColSize = 6

const applyThemr = themr('UIAddressOptions')

class AddressOptions extends React.Component {
  constructor () {
    super()

    this.state = {
      selected: 0,
    }
  }

  handleClick (index, address) {
    this.setState({ selected: index })
    this.props.onChange(address)
  }

  joinAddressData (address) {
    const { theme } = this.props

    const addressInfo = `${address.street},
        ${address.number},
        ${address.complement},
        ${address.neighborhood},
        ${address.zipcode},
        ${address.city},
        ${address.state}
      `

    return (
      <p className={
        classNames(
          theme.text,
          theme.textTruncate
        )
      }
      >
        {addressInfo}
      </p>
    )
  }
  render () {
    const { theme, addresses } = this.props

    return addresses.map((address, index) => (
      <Col
        key={address.name || shortid.generate()}
        tv={mediumColSize}
        desk={mediumColSize}
        tablet={mediumColSize}
        palm={largeColSize}
      >
        <div
          role="button"
          tabIndex={index}
          onClick={this.handleClick.bind(this, index, address)}
          className={
            classNames(
              theme.optionBox,
              {
                [theme.selected]: this.state.selected === index,
              }
            )
          }
        >
          <div className={theme.addressName}>
            {address.name || `Endereço ${index + 1}`}
          </div>
          <div className={theme.addressData}>
            {this.joinAddressData(address)}
          </div>
        </div>
      </Col>
    ))
  }
}

AddressOptions.propTypes = {
  theme: PropTypes.shape({
    field: PropTypes.string,
    value: PropTypes.string,
    addressData: PropTypes.string,
    addressName: PropTypes.string,
    selected: PropTypes.string,
    optionBox: PropTypes.string,
  }),
  addresses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      street: PropTypes.string,
      number: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      state: PropTypes.string,
      city: PropTypes.string,
      neighborhood: PropTypes.string,
      complement: PropTypes.string,
      zipcode: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
}

AddressOptions.defaultProps = {
  theme: {},
}

export default applyThemr(AddressOptions)
