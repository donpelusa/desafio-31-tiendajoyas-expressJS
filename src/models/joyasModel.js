const { DB } = require('../config/db');

const fetchJoyas = async (limits, page, order_by) => {
  const limit = limits ? parseInt(limits) : 10;
  const offset = page ? (parseInt(page) - 1) * limit : 0;

  let field = 'id';
  let direction = 'ASC';

  if (order_by) {
    const [campo, sentido] = order_by.split('_');
    const validFields = ['id', 'nombre', 'categoria', 'metal', 'precio', 'stock'];
    const validDirections = ['ASC', 'DESC'];

    if (validFields.includes(campo)) field = campo;
    if (validDirections.includes(sentido)) direction = sentido;
  }

  const query = `
    SELECT *
    FROM inventario
    ORDER BY ${field} ${direction}
    LIMIT $1 OFFSET $2;
  `;

  const result = await DB.query(query, [limit, offset]);
  const stockTotal = result.rows.reduce((acc, joya) => acc + joya.stock, 0);

  return {
    totalJoyas: result.rows.length,
    stockTotal: stockTotal,
    data: result.rows,
    links: {
      self: `/joyas?limits=${limit}&page=${page || 1}&order_by=${order_by || `${field}_${direction}`}`,
      next: `/joyas?limits=${limit}&page=${(page ? parseInt(page) : 1) + 1}&order_by=${order_by || `${field}_${direction}`}`,
      prev: `/joyas?limits=${limit}&page=${(page ? parseInt(page) : 1) - 1}&order_by=${order_by || `${field}_${direction}`}`,
    },
  };
};

const fetchJoyasFiltros = async (precio_min, precio_max, categoria, metal) => {
  const query = `
    SELECT * FROM inventario
    WHERE
      ($1::INT IS NULL OR precio >= $1)
      AND ($2::INT IS NULL OR precio <= $2)
      AND ($3::TEXT IS NULL OR categoria = $3)
      AND ($4::TEXT IS NULL OR metal = $4)
  `;
  const values = [
    precio_min ? parseInt(precio_min) : null,
    precio_max ? parseInt(precio_max) : null,
    categoria || null,
    metal || null,
  ];

  const result = await DB.query(query, values);
  return result.rows;
};

module.exports = { fetchJoyas, fetchJoyasFiltros };
