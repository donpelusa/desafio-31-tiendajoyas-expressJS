const express = require('express');
const router = express.Router();
const { getJoyas, getJoyasFiltros } = require('../controllers/joyasController');
const { existJoyas } = require('../middlewares/existJoyas');
const { validPriceRange } = require('../middlewares/validFilters');

router.get('/joyas', getJoyas);
router.get('/joyas/filtros', validPriceRange, existJoyas, getJoyasFiltros);

module.exports = router;
