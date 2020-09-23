const pg = require('pg');
const url = require('url');

var configs;

if (process.env.DATABASE_URL) {

  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: {
      rejectUnauthorized: false
    }
  };

} else {
  configs = {
    user: 'jarryl',
    host: '127.0.0.1',
    database: 'hbb',
    port: 5432
  };
}


const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});


const allAccountsModelsFunction = require('./models/accounts');
const allShopsModelsFunction = require('./models/shops');
const allCategoriesModelsFunction = require('./models/categories');
const allListingsModelsFunction = require('./models/listings');
const allEnquiriesModelsFunction = require('./models/enquiries');
const allReviewsModelsFunction = require('./models/reviews');
const allFavouritesModelsFunction = require('./models/favourites');
const allResponsesModelsFunction = require('./models/responses');


const accountsModelsObject = allAccountsModelsFunction(pool);
const shopsModelsObjects = allShopsModelsFunction(pool);
const categoriesModelsObject = allCategoriesModelsFunction(pool);
const listingsModelsObject = allListingsModelsFunction(pool);
const enquiriesModelsObject = allEnquiriesModelsFunction(pool);
const reviewsModelsObject = allReviewsModelsFunction(pool);
const favouritesModelsObject = allFavouritesModelsFunction(pool);
const responsesModelsObject = allResponsesModelsFunction(pool);



module.exports = {
  //make queries directly from here
  queryInterface: (text, params, callback) => {
    return pool.query(text, params, callback);
  },

  // get a reference to end the connection pool at server end
  pool: pool,

  // users: userModelsObject,

  accounts: accountsModelsObject,
  shops: shopsModelsObjects,
  categories: categoriesModelsObject,
  listings: listingsModelsObject,
  enquiries: enquiriesModelsObject,
  reviews: reviewsModelsObject,
  favourites: favouritesModelsObject,
  responses: responsesModelsObject
};


