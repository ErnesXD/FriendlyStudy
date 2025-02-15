const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Agrega "csv" a la lista de extensiones de assets
config.resolver.assetExts.push("csv");

module.exports = config;
