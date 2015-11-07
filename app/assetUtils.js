const assetsJSON = require('./public/assets/assets')

const generateAssetLibrary = () => {
  const assetLibrary = new Map()
  assetLibrary.set('checked', new Set()) // To hold the list of desired features
  assetLibrary.set('asset_categories', new Set()) // Track a set of all known categories
  assetLibrary.set('survey_types', new Set()) // Track a set of all known survey_types

  const updateAssetCategories = (library, asset) => {
    if (library.has(asset['asset_category'])) { // track all possible categories
      console.log()
      library.get(asset['asset_category']).add(asset['asset_name'])
    } else {
      library.get('asset_categories').add(asset['asset_category']) // update set of asset categories
      library.set(asset['asset_category'], new Set([asset['asset_name']])) // update category membership
    }
  }

  const updateSurveryTypes = (library, asset) => {
    for (let surveyType of asset['survey_type']) {
      if (library.has(surveyType)) { // track all survey types
        library.get(surveyType).add(asset['asset_name'])
      } else {
        library.get('survey_types').add(surveyType) // update set of survey_types
        library.set(surveyType, new Set([asset['asset_name']])) // update survey_type membership
      }
    }
  }

  for (let asset of assetsJSON['report_spec']) {
    assetLibrary.set(asset['asset_name'], asset) // keep an easily referenced record of the asset
    updateAssetCategories(assetLibrary, asset)
    updateSurveryTypes(assetLibrary, asset)
  }

  return assetLibrary
}

module.exports = generateAssetLibrary
