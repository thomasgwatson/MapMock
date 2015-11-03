const React = require('react')

const EstimateInfo = React.createClass({
  render: function () {
    const currentStyling = {
      color: (this.props.theme ? this.props.theme.accent1 : '#F5A623'),
      fontSize: 12,
      fontFamily: 'Helvetica',
      lineHeight: '14px',
      zIndex: 5,
      position: 'absolute',
      textAlign: 'right',
      width: 200,
      height: 70,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    }

    return <div style={Object.assign(currentStyling, this.props.componentPosition)} >
      <div className='row'>
        <div style={{paddingLeft: 5, paddingRight: 5, color: this.props.theme.accent2}} className='col-xs-6'>Total Map Area: </div>
        <div style={{paddingLeft: 5, paddingRight: 5}} className='col-xs-6 text-left'>30.00 <span style={{color: this.props.theme.primary}}>sq.km</span></div>
      </div>
      <div className='row'>
        <div style={{paddingLeft: 5, paddingRight: 5, color: this.props.theme.accent2}} className='col-xs-6'>Survery Days: </div>
        <div style={{paddingLeft: 5, paddingRight: 5}} className='col-xs-6 text-left' >70 <span style={{color: this.props.theme.primary}}>Days</span></div>
      </div>
      <div className='row'>
        <div style={{paddingLeft: 5, paddingRight: 5, color: this.props.theme.accent2}} className='col-xs-6'>Cost Estimate: </div>
        <div style={{paddingLeft: 5, paddingRight: 5}} className='col-xs-6 text-left'>$80,000</div>
      </div>
    </div>
  },
})

module.exports = EstimateInfo
