module.exports = (app, allModels) => {


  // Require controller functions
  const accountsControllerCallbacks = require('./controllers/accounts')(allModels);
  const shopsControllerCallbacks = require('./controllers/shops')(allModels);
  const categoriesControllerCallbacks = require('./controllers/categories')(allModels);
  const listingsControllerCallbacks = require('./controllers/listings')(allModels);
  const enquiriesControllerCallbacks = require('./controllers/enquiries')(allModels);

    //Routes
    // app.post('/test', accountsControllerCallbacks.test);
    app.get('/shops/:id', shopsControllerCallbacks.getShop);
    app.post('/shops/register', accountsControllerCallbacks.register);
    app.get('/categories', categoriesControllerCallbacks.getAllCategories);
    app.get('/results/:query', listingsControllerCallbacks.listings);
    app.post('/login', accountsControllerCallbacks.login);
    app.get('/shops/:id/listings', listingsControllerCallbacks.shopListings);
    app.get('/seller/:sellerID/shops', shopsControllerCallbacks.sellerShops);
    app.get('/allshops', shopsControllerCallbacks.allShops);
    app.put('/shops/:id',shopsControllerCallbacks.editShop);
    app.delete('/shops/:id',shopsControllerCallbacks.deleteShop);
    app.post('/enquire', enquiriesControllerCallbacks.sendEnquiry);
    app.get('/enquiries/:id', enquiriesControllerCallbacks.displayEnquiries);
    app.delete('/deleteEnquiry/:id', enquiriesControllerCallbacks.deleteEnquiry);
};