import express, { response } from 'express';
import Products from '../Models/UserModel.js';

let router = express.Router();

router.post('/product/add', async (req, res) => {
  console.log(req.body);
  Products.create({
    name: req.body.name,
    expiry: req.body.expiry,
    price: req.body.price,
    stock: req.body.stock,
  })
    .then((response) => {
      res.status(200).json({ response: 'success' });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/products', (req, res) => {
  Products.find()
    .then((response) => {
      res.status(200).json({ data: response });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get('/product/details', async (req, res) => {
  console.log(req.query.id);
  const response = await Products.findOne({ _id: req.query.id });
  res.json({ data: response });
});

router.post('/product/edit', (req, res) => {
  console.log(req.body);
  let form = req.body;
  Products.updateOne(
    { _id: form._id },
    {
      $set: {
        name: form.name,
        expiry: form.expiry,
        price: form.price,
        stock: form.stock,
      },
    }
  )
    .then((response) => {
      res.status(200).json({ message: 'Success' });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete('/product/delete', (req, res) => {
  console.log(req.query.id);
  Products.deleteOne({ _id: req.query.id })
    .then((response) => {
      res.status(200).json({ message: 'Success' });
    })
    .catch((err) => {
      res.json(err);
    });
});

export default router;
