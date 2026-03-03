const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  const { keyword } = req.query;

  const query = keyword
    ? { name: { $regex: keyword, $options: "i" } }
    : {};

  const products = await Product.find(query);
  res.json(products);
};

exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product Deleted" });
};