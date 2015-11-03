const React = require('react')

const SelectorCircle = React.createClass({
  getDefaultProps: function () {
    return {
      elementTitle: 'No text given',
      styling: {},
    }
  },
  render: function () {
    let defaultStyling = {
      height: 19,
      width: 19,
      top: 14,
      zIndex: 5,
      background: this.props.theme.accent2,
      border: `4px solid ${this.props.theme.accent2}`,
      position: 'absolute',
      borderRadius: '50%',
    }

    const activeStyling = {
      height: 22,
      width: 22,
      zIndex: 5,
      top: 13,
      background: this.props.theme.secondary,
      border: `4px solid ${this.props.theme.accent1}`,
      position: 'absolute',
      borderRadius: '50%',
    }
    let currentStyling = this.props.step === this.props.activeStep ? activeStyling : defaultStyling
    let textStyling = this.props.step === this.props.activeStep ? {color: this.props.theme.primary} : {}

    const elementTitle = {
      height: 14,
      width: 120,
      fontSize: 12,
      fontFamily: 'Helvetica',
      lineHeight: '12px',
      zIndex: 4,
      position: 'relative',
      top: 24,
      color: this.props.theme.accent2,
      left: -51,
      textAlign: 'center',
    }

    return <div style={Object.assign(currentStyling, this.props.positioning)}><div style={Object.assign(elementTitle, textStyling)}>{this.props.elementTitle}</div></div>
  },

})

module.exports = SelectorCircle
