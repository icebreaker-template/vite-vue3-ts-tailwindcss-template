/* eslint-disable antfu/top-level-function */
/**
 *
 * @type {import('postcss').PluginCreator}
 */
const creator = () => {
  console.log('--------------')
  return {
    postcssPlugin: 'xx',
  }
}

creator.postcss = true

export default creator
