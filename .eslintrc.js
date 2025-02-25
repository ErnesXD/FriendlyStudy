module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-undef": "off",
    //Quiero quitar el error de la coma
  },
};
