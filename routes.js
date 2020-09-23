module.exports = (app, allModels) => {

  // Require controller functions
  const accountsControllerCallbacks = require('./controllers/accounts')(allModels);
  const shopsControllerCallbacks = require('./controllers/shops')(allModels);
  const categoriesControllerCallbacks = require('./controllers/categories')(allModels);
  const listingsControllerCallbacks = require('./controllers/listings')(allModels);
  const enquiriesControllerCallbacks = require('./controllers/enquiries')(allModels);
  const favouritesControllerCallbacks = require('./controllers/favourites')(allModels);
  const reviewsControllerCallbacks = require('./controllers/reviews')(allModels);
  const responsesControllerCallbacks = require('./controllers/responses')(allModels);

  //Routes
  app.get('/shops/:id', shopsControllerCallbacks.getShop);
  app.post('/seller/register', accountsControllerCallbacks.registerSeller);
  app.post('/user/register', accountsControllerCallbacks.registerUser);
  app.get('/categories', categoriesControllerCallbacks.getAllCategories);
  app.get('/results/:query', listingsControllerCallbacks.listings);
  app.post('/seller/login', accountsControllerCallbacks.loginSeller);
  app.post('/user/login', accountsControllerCallbacks.loginUser);
  app.get('/shops/:id/listings', listingsControllerCallbacks.shopListings);
  app.get('/seller/:sellerID/shops', shopsControllerCallbacks.sellerShops);
  app.get('/allshops', shopsControllerCallbacks.allShops);
  app.put('/shops/:id', shopsControllerCallbacks.editShop);
  app.delete('/shops/:id', shopsControllerCallbacks.deleteShop);
  app.post('/enquire', enquiriesControllerCallbacks.sendEnquiry);
  app.post('/shops/create', shopsControllerCallbacks.createShop);
  app.post('/listings/create', listingsControllerCallbacks.createListing);
  app.put('/listings/edit', listingsControllerCallbacks.editListing);
  app.delete('/listings/delete/:id', listingsControllerCallbacks.deleteListing);
  app.get('/category/:id', categoriesControllerCallbacks.categoryShops);
  app.get('/enquiries/:id', enquiriesControllerCallbacks.displayEnquiries);
  app.delete('/deleteEnquiry/:id', enquiriesControllerCallbacks.deleteEnquiry);
  app.get('/shops/:id/reviews', reviewsControllerCallbacks.reviews);
  app.post('/review/new', reviewsControllerCallbacks.newReview);
  app.put('/review/edit', reviewsControllerCallbacks.editReview);
  app.delete('/review/delete/:id', reviewsControllerCallbacks.deleteReview);
  app.get('/shop/:id/average_rating', reviewsControllerCallbacks.avgRating);
  app.get('/favourites/seller/', favouritesControllerCallbacks.fetchSellerFavouritesStatus);
  app.get('/favourites/user/', favouritesControllerCallbacks.fetchUserFavouritesStatus);
  app.get('/favourites/seller/:id', favouritesControllerCallbacks.sellerFavourites);
  app.get('/favourites/user/:id', favouritesControllerCallbacks.userFavourites);
  app.post('/favourites/addSellerFavourites', favouritesControllerCallbacks.addSellerFavourites);
  app.post('/favourites/addUserFavourites', favouritesControllerCallbacks.addUserFavourites);
  app.delete('/favourites/sellerUnfavourite', favouritesControllerCallbacks.deleteSellerFavourites);
  app.delete('/favourites/userUnfavourite', favouritesControllerCallbacks.deleteUserFavourites);
  app.get('/responses/:id', responsesControllerCallbacks.getResponses);
  app.post('/seller/reply',responsesControllerCallbacks.replyEnquiry)
  app.post('/user/reply',responsesControllerCallbacks.userReplyEnquiry)
  app.get('/userqueries/:id', responsesControllerCallbacks.sellerPullResponses);
};
