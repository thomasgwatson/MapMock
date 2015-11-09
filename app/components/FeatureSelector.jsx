var React = require('react')
const RaisedButton = require('material-ui/lib/raised-button')
const DropDownMenu = require('material-ui/lib/drop-down-menu')
const Paper = require('material-ui/lib/paper')
const List = require('material-ui/lib/lists/list')
const ListItem = require('material-ui/lib/lists/list-item')
const CheckBox = require('material-ui/lib/checkbox')

var FeatureSelector = React.createClass({
  featureCheckbox: function (feature) {
    return <CheckBox
            iconStyle={{fill: this.props.theme.accent1}}
            defaultChecked={this.props.parentState.checked.has(feature)}
            onCheck={this.props.featureCheckToggle.bind(null, feature)}
            name={feature}
            value={feature} />
  },
  featureListItem: function (feature) {
    // return ListItem based on feature lookup in the assetLibrary
    return <ListItem
            primaryText={feature}
            key={feature}
            leftCheckbox={this.featureCheckbox(feature)}
            style={{lineHeight: 1, fontSize: '12px'}}/>
  },
  categoryList: function (category) {
    return <ListItem
            primaryText={category}
            key={category}
            onClick={this.props.selectCategory.bind(null, category)}/>
  },
  getCurrentSurveyIndex: function (currentSurvey, surveyOptions) {
    for (var i = 0; i < surveyOptions.length; i++) {
      if (surveyOptions[i].text === currentSurvey) return i
    }
    return 0
  },
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
    const surveyOptions = []
    const categories = []
    for (let surveyType of this.props.assetLibrary.get('survey_types')) {
      surveyOptions.push({payload: surveyType, text: surveyType})
    }

    for (let category of this.props.assetLibrary.get('asset_categories')) {
      categories.push(category)
    }
    var currentCategory = this.props.parentState.currentCategory
    const categoryMembers = [...this.props.assetLibrary.get(currentCategory)] || []

    return <div style={featureSelectorStyling} className='interaction-panel heighty'>
      <div style={{top: 30, position: 'absolute', height: '100%', width: '100%', color: this.props.theme.primary}}>
        <div className='row'>
          <div className='col-xs-2'></div>
          <div className='col-xs-2' style={{color: this.props.theme.accent1, textAlign: 'center', fontFamily: 'roboto'}}>Select Survey Type</div>
          <div className='col-xs-4'>
            <Paper zDepth={2} style={{backgroundColor: this.props.theme.accent1, width: 'auto', textAlign: 'center'}} >
              <DropDownMenu
                selectedIndex={this.getCurrentSurveyIndex(this.props.parentState.currentSurvey, surveyOptions)}
                menuItems={surveyOptions}
                iconStyle={{fill: this.props.theme.secondary}}
                onChange={this.props.updateCurrentSurvey}
                underlineStyle={{borderTop: `solid 1px ${this.props.theme.accent1}`}}/>
            </Paper>
          </div>
          <div className='col-xs-4'></div>
        </div>
        <div style={{height: 30}}></div>
        <div style={{height: '70%', width: '100%', position: 'relative', display: 'block'}}>
          <div className='row' style={{overflowY: 'scroll', maxHeight: '90%'}}>
            <div className='col-xs-1'></div>
            <div className='col-xs-5'>
              <List subheader='Select Category'>
                {categories.map((category) => this.categoryList(category))}
              </List>
            </div>
            <div className='col-xs-5' style={{overflowY: 'auto'}}>
              <List>
                {categoryMembers.map((feature) => this.featureListItem(feature))}
              </List>
            </div>
          </div>
        </div>
        <div style={{height: '10%', width: '100%', position: 'relative', display: 'block'}}>
          <div className='row'>
            <div className='col-xs-4'></div>
            <div className='col-xs-4' style={{textAlign: 'center'}}>
              <RaisedButton label='Generate Estimate' backgroundColor={this.props.theme.accent1} onClick={this.props.fourthStep}/>
            </div>
            <div className='col-xs-4'></div>
          </div>
        </div>
      </div>
    </div>
  },
})

module.exports = FeatureSelector
