const React = require('react')
const StepsSelector = require('./StepsSelector')
const EstimateInfo = require('./EstimateInfo')

const MapFooter = React.createClass({
  getDefaultProps: function () {
    return {
      estimateTitle: 'College Ave. Bike Path',
    }
  },
  render: function () {
    const defaultTitleStyling = {
      color: (this.props.theme ? this.props.theme.accent1 : '#F5A623'),
      fontSize: 22,
      fontFamily: 'Helvetica',
      lineHeight: '22px',
      zIndex: 5,
      bottom: 12,
      position: 'absolute',
      left: 18,
      width: 154,
      margin: 4,
      height: 48,
      overflow: 'hidden',
    }

    const infoPosition = {
      right: 20,
      top: 18,
    }

    return <div className='map-footer' style={this.props.componentStyling}>
              <div className='' style={defaultTitleStyling}>{this.props.estimateTitle}</div>
              <StepsSelector {...this.props} />
              <EstimateInfo {...this.props} componentPosition={infoPosition} />
    </div>
  },
})

module.exports = MapFooter
