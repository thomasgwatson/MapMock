var React = require('react')

var FeatureSelector = React.createClass({
  render: function () {
    const featureSelectorStyling = {
      right: 0,
      top: 0,
      position: 'absolute',
      overflow: 'hidden',
      zIndex: 3,
      width: '50%',
      height: this.props.viewportHeight - 80,
      backgroundColor: this.props.theme.secondary,
    }

    return <div style={featureSelectorStyling} className='interaction-panel heighty'>
      <div style={{top: 30, position: 'absolute', height: '100%', width: '100%', color: this.props.theme.primary}}>
        <div className='row'>
          <div className='col-xs-4'></div>
          <div className='col-xs-4'>
            Survey_type selector goes here: four options.
          </div>
          <div className='col-xs-4'></div>
        </div>
        <div style={{height: 30}}></div>
        <div style={{height: '60%', width: '100%', position: 'relative', display: 'block'}}>
          <div className='row'>
            <div className='col-xs-1'></div>
            <div className='col-xs-4'>
            Feature type list of checkboxes goes here. On hover, changes feature type description and image in adjacent panel
            </div>
            <div className='col-xs-6'> Feature type description and image goes here</div>
          </div>
        </div>
        <div style={{height: '20%', width: '100%', position: 'relative', display: 'block'}}>
          <div className='row'>
            <div className='col-xs-4'></div>
            <div className='col-xs-4'>
              Button to continue goes here
            </div>
            <div className='col-xs-4'></div>
          </div>
        </div>
      </div>
    </div>
  },
})

module.exports = FeatureSelector
