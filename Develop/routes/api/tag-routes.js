const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });
    return res.status(200).json(tagData);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const data = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });
    return res.status(200).json(data);
  } catch (err) {
    return res(404).json({ error: err.message });
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tag_name = req.body.tag_name;
    const newTag = await Tag.bulkCreate([{ tag_name }]);
    return res.status(200).json(newTag);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const reqId = req.params.id;
  const tag_name = req.body.tag_name;
  try {
    const updatedTag = await Tag.update(
      {
        tag_name,
      },
      {
        where: {
          id: reqId,
        },
      },
    );
    return res.status(200).json(updatedTag);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const delId = req.params.id;
  try {
    const deletedData = await Tag.destroy({
      where: {
        id: delId,
      },
    });
    return res.status(200).json(deletedData);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
