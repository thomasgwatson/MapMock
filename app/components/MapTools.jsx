var React = require('react')

var MapTools = React.createClass({
  getDefaultProps: function () {
    return {
      theme: {primary: '#f2f2f2'},
    }
  },
  stopDefault: function (evt) {
    evt.preventDefault()
  },
  handleZoomInClick: function (event) {
    this.props.map.zoomIn(1)
  },
  handleZoomOutClick: function (event) {
    this.props.map.zoomOut(1)
  },
  render: function () {
    return (
        <div className='toolbox click-thru' style={this.props.mapStyling}>
          <div className='toolbox' id='zoom-buttons' style={{top: 0, right: 10, position: 'absolute', fontSize: '24px', color: this.props.theme.primary, cursor: 'pointer'}}>
            <span onClick={this.handleZoomInClick} className='glyphicon glyphicon-plus button-buddy clickable' id='' ></span>
            <span onClick={this.handleZoomOutClick} className='glyphicon glyphicon-minus button-buddy clickable' id='' ></span>
          </div>
          <div className='toolbox' id='zoom-buttons' style={{bottom: 15, right: 5, position: 'absolute', fontSize: '54px', color: this.props.theme.primary}}>
          </div>
          <div className='toolbox' style={{top: 0, left: 10, position: 'absolute', fontSize: '54px', color: this.props.theme.primary, zIndex: 3, textShadow: '0px 2px 4px #222'}}>
            <span>put icon here</span>
          </div>
          <div className='toolbox' style={{bottom: 26, right: 120, position: 'absolute', fontSize: '54px', color: this.props.theme.primary}}>
          </div>
        </div>
      )
  },
})

module.exports = MapTools
