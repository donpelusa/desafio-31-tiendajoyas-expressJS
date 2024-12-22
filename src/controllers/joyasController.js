const { fetchJoyas, fetchJoyasFiltros } = require('../models/joyasModel');

const getJoyas = async (req, res, next) => {
  try {
    const { limits, page, order_by } = req.query;
    const joyas = await fetchJoyas(limits, page, order_by);
    res.json(joyas);
  } catch (error) {
    next(error);
  }
};

const getJoyasFiltros = async (req, res, next) => {
  try {
    const { precio_min, precio_max, categoria, metal } = req.query;
    const joyas = await fetchJoyasFiltros(precio_min, precio_max, categoria, metal);
    res.json(joyas);
  } catch (error) {
    next(error);
  }
};

module.exports = { getJoyas, getJoyasFiltros };
