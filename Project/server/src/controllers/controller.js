// Admin-panel Controllers

//Admin Controllers

const { createAdmin,
    adminLogin,
    updateAdmin,
    genrateOtp,
    updateCreadintials } = require("./admin-panel/admin");

//Color Controllers

const { Addcolor,
    readcolors,
    deletecolor,
    updatecolorStatus,
    deletecolors,
    readcolor,
    updatecolor,
    activeColors } = require("./admin-panel/color");

//Parent Category Controllers

const { createParentCategory,
    readcategories,
    updatecategoryStatus,
    deleteparentcategory,
    deleteparentcategories,
    readParentcategory,
    updateParentcategory,
    Activeparentcategory } = require("./admin-panel/parentCategory");

// Products

const { createProduct,
    getProducts,
    updateProductStatus, 
    deleteProduct} = require("./admin-panel/product");

//Product Category Controllers

const { createProductCategory,
    getproductCategories,
    updatePcategoryStatus,
    updatePcategoryFeatured,
    deletePcategory,
    deleteproductcategories,
    activeproductCategoriesbyParent } = require("./admin-panel/productCategory");

//size Controllers

const { createsize,
    readsize,
    deletesize,
    updatesizeStatus,
    deletesizes,
    readupdatesize,
    updatesize,
    Activesize } = require("./admin-panel/size");


//Website Controllers

//Parent category controller

const { activeParentCategoryWeb } = require("./website/parentCategory");

//products controller

const { productByParentCategory } = require("./website/product");

//user controller

const { genrateOtpUser, registerUser, verifyUserAuth } = require("./website/user");

//cart controller

const { creatCart, readCart } = require("./website/cart");

//Export All Controllers

module.exports = {
    createParentCategory,
    readcategories,
    updatecategoryStatus,
    deleteparentcategory,
    deleteparentcategories,
    readParentcategory,
    updateParentcategory,
    Activeparentcategory,
    createsize,
    readsize,
    updatesizeStatus,
    deletesize,
    deletesizes,
    readupdatesize,
    updatesize,
    Addcolor,
    readcolors,
    updatecolorStatus,
    deletecolor,
    deletecolors,
    readcolor,
    updatecolor,
    createProductCategory,
    getproductCategories,
    updatePcategoryStatus,
    updatePcategoryFeatured,
    deletePcategory,
    deleteproductcategories,
    createAdmin,
    adminLogin,
    updateAdmin,
    genrateOtp,
    updateCreadintials,
    activeproductCategoriesbyParent,
    Activesize,
    activeColors,
    createProduct,
    getProducts,
    updateProductStatus,
    deleteProduct,
    activeParentCategoryWeb,
    productByParentCategory,
    genrateOtpUser,
    registerUser,
    verifyUserAuth,
    creatCart,
    readCart
};
