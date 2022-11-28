const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories

  try {
    const categoriesData = await Category.findAll({
      include: [Product],
    });
    return res.status(200).json(categoriesData);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const data = await Category.findByPk(req.params.id, {
      include: [Product],
    });

    return res.json(data);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category

  try {
    const { category_name } = req.body;
    const newCategory = await Category.bulkCreate([{ category_name }]);

    return res.status(200).json(newCategory);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const requestedId = req.params.id;
  const { categoryName } = req.body;
  try {
    const updatedData = await Category.update(
      {
        categoryName,
      },
      {
        where: {
          id: requestedId,
        },
      },
    );
    return res.status(200).json(updatedData);
  } catch (err) {
    return res.json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const delId = req.params.id;
  try {
    const deletedData = await Category.destroy({
      where: {
        id: delId,
      },
    });
    return res.status(200).json(deletedData);
  } catch (err) {
    return res.json({ error: err.message });
  }
});

module.exports = router;
