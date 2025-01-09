const {Addcolor, readcolors, deletecolor, updatecolorStatus} = require("./admin-panel/color");
const { createParentCategory, readcategories, updatecategoryStatus, deleteparentcategory, deleteparentcategories } = require("./admin-panel/parentCategory");
const {createsize, readsize, deletesize, updatesizeStatus} = require("./admin-panel/size");

module.exports = {
    createParentCategory,
    readcategories,
    updatecategoryStatus,
    deleteparentcategory,
    deleteparentcategories,
    createsize,
    readsize,
    updatesizeStatus,
    deletesize,
    Addcolor,
    readcolors,
    updatecolorStatus,
    deletecolor
};
