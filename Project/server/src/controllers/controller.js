const { Addcolor,
    readcolors,
    deletecolor,
    updatecolorStatus,
    deletecolors,
    readcolor,
    updatecolor } = require("./admin-panel/color");

const { createParentCategory,
    readcategories,
    updatecategoryStatus,
    deleteparentcategory,
    deleteparentcategories,
    readParentcategory,
    updateParentcategory,
    Activeparentcategory } = require("./admin-panel/parentCategory");

const { createProductCategory, 
    getproductCategories,
    updatePcategoryStatus,
    updatePcategoryFeatured} = require("./admin-panel/productCategory");

const { createsize,
    readsize,
    deletesize,
    updatesizeStatus,
    deletesizes,
    readupdatesize,
    updatesize } = require("./admin-panel/size");

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
    updatePcategoryFeatured
};
