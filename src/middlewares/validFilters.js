const validPriceRange = (req, res, next) => {
  const { precio_min, precio_max } = req.query;

  if (precio_min && precio_max && parseInt(precio_min) > parseInt(precio_max)) {
    return res.status(400).json({
      error: 'El precio mínimo no puede ser mayor que el precio máximo.',
    });
  }

  next();
};

module.exports = { validPriceRange };
