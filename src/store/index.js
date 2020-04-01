import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

/**
 * 
 * @param {String} directory-读取文件的路径
 * @param {Boolean} useSubdirectories-是否遍历文件的子目录
 * @param {RegExp} regExp-匹配文件的正则
 */
const modulesReducers = require.context('./reducers', false, /\.js$/)
const reducers = modulesReducers.keys().reduce((modules, modulePath) => {
  // set app.js => app
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesReducers(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = createStore(
  combineReducers(reducers),
  composeWithDevTools(applyMiddleware(logger, thunk))
)

export default store