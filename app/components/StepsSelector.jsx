const React = require('react')
const SelectorCircle = require('./SelectorCircle')

const StepsSelector = React.createClass({
  // propTypes: {},
  // mixins: [],

  // getInitialState: function () { return {} },
  getDefaultProps: function () { return {activeStep: 'third'} },
  // componentWillMount: function () {},
  // componentWillReceiveProps: function () {},
  // componentWillUnmount: function () {},
  // _parseData: function () {},
  // _onSelect: function () {},
  render: function () {
    const selectorContainerStyling = {
      height: 50,
      width: 591,
      fontSize: 16,
      fontFamily: 'Helvetica',
      lineHeight: '18px',
      zIndex: 4,
      bottom: 20,
      position: 'absolute',
      left: 350,
    }

    const lineStyling = {
      height: 4,
      width: 503,
      zIndex: 4,
      top: 22,
      background: this.props.theme.accent2,
      position: 'absolute',
      left: 22,
    }

    return <div style={selectorContainerStyling}>
      <div style={lineStyling}></div>
      <SelectorCircle {...this.props} step='first' elementTitle='Select Area' activeStep={this.props.activeStep} positioning={{left: 20}} />
      <SelectorCircle {...this.props} step='second' elementTitle='Select Features' activeStep={this.props.activeStep} positioning={{left: 180}} />
      <SelectorCircle {...this.props} step='third' elementTitle='Generate Estimate' activeStep={this.props.activeStep} positioning={{left: 360}} />
      <SelectorCircle {...this.props} step='fourth' elementTitle='Current Estimate' activeStep={this.props.activeStep} positioning={{left: 520}} />
    </div>
  },
})

module.exports = StepsSelector
