var React = require('react')

var EstimatePage = React.createClass({
  render: function () {
    const estimatePageStyling = {
      right: 0,
      top: 0,
      position: 'absolute',
      overflow: 'hidden',
      zIndex: 3,
      width: '50%',
      height: this.props.viewportHeight - 80,
      backgroundColor: this.props.theme.secondary,
    }

    return <div style={estimatePageStyling} className='interaction-panel'></div>
  },
})

module.exports = EstimatePage
