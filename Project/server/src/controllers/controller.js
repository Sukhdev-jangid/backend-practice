// Admin-panel Controllers

//Admin Controllers

const { createAdmin, 
    adminLogin, 
    updateAdmin,
    genrateOtp,
    updateCreadintials} = require("./admin-panel/admin");

//Color Controllers

const { Addcolor,
    readcolors,
    deletecolor,
    updatecolorStatus,
    deletecolors,
    readcolor,
    updatecolor } = require("./admin-panel/color");

//Parent Category Controllers

const { createParentCategory,
    readcategories,
    updatecategoryStatus,
    deleteparentcategory,
    deleteparentcategories,
    readParentcategory,
    updateParentcategory,
    Activeparentcategory } = require("./admin-panel/parentCategory");

//Product Category Controllers

const { createProductCategory,
    getproductCategories,
    updatePcategoryStatus,
    updatePcategoryFeatured,
    deletePcategory,
    deleteproductcategories, 
    activeproductCategoriesbyParent} = require("./admin-panel/productCategory");

//size Controllers

const { createsize,
    readsize,
    deletesize,
    updatesizeStatus,
    deletesizes,
    readupdatesize,
    updatesize } = require("./admin-panel/size");

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
    activeproductCategoriesbyParent
};
