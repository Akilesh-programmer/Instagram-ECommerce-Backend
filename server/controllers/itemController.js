import Item from "../models/Item.js";

// Create Item
export const createItem = async (req, res, next) => {
  try {
    const { name, description, price, quantityInStock, store, collection } =
      req.body;

    if (!name || !description || !price || !quantityInStock || !store) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const newItem = await Item.create({
      name,
      description,
      price,
      quantityInStock,
      store,
      collection,
    });

    res
      .status(201)
      .json({ message: "Item created successfully", item: newItem });
  } catch (error) {
    next(error);
  }
};

// Delete Item
export const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await item.deleteOne();

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Update Item
export const updateItem = async (req, res, next) => {
  try {
    const { name, description, price, quantityInStock, collection } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description, price, quantityInStock, collection },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res
      .status(200)
      .json({ message: "Item updated successfully", item: updatedItem });
  } catch (error) {
    next(error);
  }
};

// Add Store to Item
export const addStoreToItem = async (req, res, next) => {
  try {
    const { storeId } = req.body;
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if store is already added
    if (item.stores.includes(storeId)) {
      return res.status(400).json({ message: "Store already exists in item" });
    }

    item.stores.push(storeId);
    await item.save();

    res.status(200).json({ message: "Store added to item successfully", item });
  } catch (error) {
    next(error);
  }
};

// Remove Store from Item
export const removeStoreFromItem = async (req, res, next) => {
  try {
    const { storeId } = req.body;
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (!item.stores.includes(storeId)) {
      return res.status(400).json({ message: "Store not found in item" });
    }

    item.stores = item.stores.filter((id) => id.toString() !== storeId);
    await item.save();

    res
      .status(200)
      .json({ message: "Store removed from item successfully", item });
  } catch (error) {
    next(error);
  }
};

// Add Collection to Item
export const addCollectionToItem = async (req, res, next) => {
  try {
    const { collectionId } = req.body;
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if collection is already added
    if (item.collections.includes(collectionId)) {
      return res
        .status(400)
        .json({ message: "Collection already exists in item" });
    }

    item.collections.push(collectionId);
    await item.save();

    res
      .status(200)
      .json({ message: "Collection added to item successfully", item });
  } catch (error) {
    next(error);
  }
};

// Remove Collection from Item
export const removeCollectionFromItem = async (req, res, next) => {
  try {
    const { collectionId } = req.body;
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (!item.collections.includes(collectionId)) {
      return res.status(400).json({ message: "Collection not found in item" });
    }

    item.collections = item.collections.filter(
      (id) => id.toString() !== collectionId
    );
    await item.save();

    res
      .status(200)
      .json({ message: "Collection removed from item successfully", item });
  } catch (error) {
    next(error);
  }
};
