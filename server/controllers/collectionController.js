import Collection from "../models/Collection.js";

// Create Collection
export const createCollection = async (req, res, next) => {
  try {
    const { name, description, stores } = req.body;

    if (!name || !stores || !stores.length) {
      return res
        .status(400)
        .json({ message: "Name and at least one store are required" });
    }

    const newCollection = await Collection.create({
      name,
      description,
      stores,
    });
    res
      .status(201)
      .json({
        message: "Collection created successfully",
        collection: newCollection,
      });
  } catch (error) {
    next(error);
  }
};

// Remove Collection
export const removeCollection = async (req, res, next) => {
  try {
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    await collection.deleteOne();
    res.status(200).json({ message: "Collection removed successfully" });
  } catch (error) {
    next(error);
  }
};

// Update Collection
export const updateCollection = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const updatedCollection = await Collection.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedCollection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res
      .status(200)
      .json({
        message: "Collection updated successfully",
        collection: updatedCollection,
      });
  } catch (error) {
    next(error);
  }
};

// Add Store to Collection
export const addStoreToCollection = async (req, res, next) => {
  try {
    const { storeId } = req.body;
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    if (collection.stores.includes(storeId)) {
      return res
        .status(400)
        .json({ message: "Store already exists in collection" });
    }

    collection.stores.push(storeId);
    await collection.save();
    res.status(200).json({ message: "Store added successfully", collection });
  } catch (error) {
    next(error);
  }
};

// Remove Store from Collection
export const removeStoreFromCollection = async (req, res, next) => {
  try {
    const { storeId } = req.body;
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    if (!collection.stores.includes(storeId)) {
      return res.status(400).json({ message: "Store not found in collection" });
    }

    collection.stores = collection.stores.filter(
      (id) => id.toString() !== storeId
    );
    await collection.save();
    res.status(200).json({ message: "Store removed successfully", collection });
  } catch (error) {
    next(error);
  }
};

// Add Item to Collection
export const addItemToCollection = async (req, res, next) => {
  try {
    const { itemId } = req.body;
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    if (collection.items.includes(itemId)) {
      return res
        .status(400)
        .json({ message: "Item already exists in collection" });
    }

    collection.items.push(itemId);
    await collection.save();
    res.status(200).json({ message: "Item added successfully", collection });
  } catch (error) {
    next(error);
  }
};

// Remove Item from Collection
export const removeItemFromCollection = async (req, res, next) => {
  try {
    const { itemId } = req.body;
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    if (!collection.items.includes(itemId)) {
      return res.status(400).json({ message: "Item not found in collection" });
    }

    collection.items = collection.items.filter(
      (id) => id.toString() !== itemId
    );
    await collection.save();
    res.status(200).json({ message: "Item removed successfully", collection });
  } catch (error) {
    next(error);
  }
};
