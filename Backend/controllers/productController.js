const Product = require('../models/productModel')
const ErrorHander = require('../utils/ErrorHander')
const asyncErrors = require('../middleware/asyncErrors')
const ApiFeatures = require('../utils/ApiFeatures')
const cloudinary = require('cloudinary')



//Create Product -- Admin
exports.createProduct = asyncErrors(async (req, res, next) => {

  let images = []

  if (typeof req.body.images === 'string') {
    images.push(req.body.images)
  } else {
    images = req.body.images
  }



  let imageLinks = []

  for (let index = 0; index < images.length; index++) {
    const result = await cloudinary.v2.uploader.upload(images[index], {
      folder: 'Ecommerce',


    })

    imageLinks.push({
      product_id: result.public_id,
      url: result.secure_url
    })
  }



  req.body.images = imageLinks

  req.body.user = req.user.id

  const product = await Product.create(req.body)
  res.status(201).json({
    success: true,
    product
  })
})


//Get All products
exports.getAllproducts = asyncErrors(async (req, res, next) => {

  const productCount = await Product.countDocuments()
  const resultPerPage = 10;
  const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter()

  let product = await apiFeatures.query;
  let filteredProductCount = product.length
  apiFeatures.pagination(resultPerPage)

  product = await apiFeatures.query.clone();


  res.status(200).json({
    success: true,
    product,
    productCount,
    resultPerPage,
    filteredProductCount

  })
})

//Get All products for checing stock in cart
exports.getAllproductsForcart = asyncErrors(async (req, res, next) => {

  const products = await Product.find()

  res.status(200).json({
    success: true,
    products,
  })
})
//Get All products(Admin)
exports.getAllproductsAdmin = asyncErrors(async (req, res, next) => {

  const products = await Product.find()

  res.status(200).json({
    success: true,
    products,
  })
})




//Update Products
exports.updateProduct = asyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHander('Product not found', 404))
  }

  // Images start here

  let images = []

  if (typeof req.body.images === 'string') {
    images.push(req.body.images)
  } else {
    images = req.body.images
  }

  if (images != undefined) {

    // Delete from cloudinary
    for (let index = 0; index < product.images.length; index++) {

      await cloudinary.v2.uploader.destroy(product.images[index].product_id)

    }

    let imageLinks = []

    //Upload to Cloudinary
    for (let index = 0; index < images.length; index++) {
      const result = await cloudinary.v2.uploader.upload(images[index], {
        folder: 'Ecommerce',
      })

      imageLinks.push({
        product_id: result.public_id,
        url: result.secure_url
      })
    }

    req.body.images = imageLinks
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false
  })
  res.status(200).json({
    success: true,
    product
  })


})

//Delete Products
exports.deleteProduct = asyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHander('Product not found', 404))
  }
  // Delete from cloudinary
  for (let index = 0; index < product.images.length; index++) {

    await cloudinary.v2.uploader.destroy(product.images[index].product_id)

  }

  await product.remove()

  res.status(200).json({
    success: true,
    message: 'Product has been deleted'
  })

})

// Get Product Details
exports.productDetails = asyncErrors(async (req, res, next) => {

  let product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHander('Product not found', 404))
  }
  else {


    res.status(200).json({
      success: true,
      product
    })
  }
})

// Create and Update Reviews

exports.createReviews = asyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = await product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    await product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    product
  });
});

// Get all Reviews of a product
exports.getAllReviews = asyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander('Product not found', 404))
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews
  })
})

//Delete a review
exports.deleteReview = asyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.query.productId)

  const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id)

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0

  if (reviews.length === 0) {
    ratings = 0
  } else {

    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    ratings,
    numOfReviews
  }, {
    new: true,
    useValidators: true
  })

  res.status(200).json({
    success: true
  })

})