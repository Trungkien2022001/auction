const _ = require('lodash')

const defaults = {
    production: false,
    socketHost: 'http://localhost:3031',
    apiHost: 'http://localhost:3030',
    apiNodeHost: 'http://localhost:3030',
    apiSpringbootHost: 'http://localhost:8080',
    homepageWaitTime: 3500,
    productWaitTime: 1500,
    homepageMetadataWaitTime: 2500,
    isUseLazyLoading: false,
    timeout: 10000,
    maxPrice: 1000000000000

}
const custom = {
    production:
        process.env.NODE_ENV === 'production' ||
        process.env.ENV === 'production',
    socketHost: process.env.REACT_APP_SOCKET_ENDPOINT,
    apiHost: process.env.REACT_APP_API_ENDPOINT,
    apiNodeHost: process.env.REACT_APP_API_NODE_ENDPOINT,
    apiSpringbootHost: process.env.REACT_APP_API_SPRINGBOOT_ENDPOINT,
    homepageWaitTime: process.env.REACT_APP_HOMEPAGE_WAIT_TIME,
    homepageMetadataWaitTime: process.env.REACT_APP_HOMEPAGE_METADATA_WAIT_TIME,
    productWaitTime: process.env.REACT_APP_PRODUCT_WAIT_TIME,
    isUseLazyLoading: process.env.REACT_APP_IS_USE_LAZY_LOADING,
    timeout: process.env.REACT_APP_TIMEOUT,
    maxPrice: process.env.REACT_APP_MAX_PRICE,
}

const config = _.merge({}, defaults, custom);

module.exports = config
