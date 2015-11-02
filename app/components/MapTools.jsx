var React = require('react')

var MapTools = React.createClass({
  getDefaultProps: function () {
    return {
      theme: {primary: '#f8f8f8', secondary: '#474C57'},
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
    var buttonStyling = {
      fontSize: '20px',
      color: this.props.theme.primary,
      background: this.props.theme.secondary,
    }

    return (
        <div className='toolbox click-thru' style={this.props.mapStyling}>
          <div className='toolbox btn-group-vertical btn-group-sm clickable ' role='group' id='zoom-buttons' style={{top: 16, right: 12, position: 'absolute', cursor: 'pointer'}}>
            <button onClick={this.handleZoomInClick} className='btn btn-default button-buddy button-group-buddy' type='button' style={buttonStyling} ><span className='glyphicon glyphicon-plus'></span></button>
            <button onClick={this.handleZoomOutClick} className='btn btn-default button-buddy button-group-buddy' type='button' style={buttonStyling} ><span className='glyphicon glyphicon-minus'></span></button>
          </div>
          <div className='toolbox' id='zoom-buttons' style={{bottom: 15, right: 5, position: 'absolute', fontSize: '54px', color: this.props.theme.primary}}>
          </div>
          <div className='toolbox' style={{top: 12, left: 18, position: 'absolute', fontSize: '54px', color: this.props.theme.primary, zIndex: 3, textShadow: '0px 2px 4px #222'}}>
            <img src='/app/public/images/civilBug.png'></img>
          </div>
          <div className='toolbox' style={{bottom: 26, right: 120, position: 'absolute', fontSize: '54px', color: this.props.theme.primary}}>
          </div>
        </div>
      )
  },
})

module.exports = MapTools
