import { ObjectId } from "mongodb";
import { bundles } from "../config/mongoCollections.js";
import { validNumber, validStr, validId } from "../validation.js";
import { createLog } from "./audit.js";
import { getItem } from "./items.js";

const createBundle = async (name, img, price, items, forSale, log) => {
    //validation
    try {
        name = validStr(name, "Name");
        img = validStr(img, "Image");
        price = validNumber(price, "Price", false, 0, 250);
    } catch (e) {
        throw e;
    }

    let bundle = {
        name,
        img,
        price,
        items,
        forSale: forSale || false,
    };

    const bundlesCollection = await bundles();
    const insertInfo = await bundlesCollection.insertOne(bundle);

    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
        throw "Error: Could not create bundle";
    }

    bundle._id = insertInfo.insertedId.toString();
    if (log != false) {
        await createLog("Create Bundle", `Name: ${bundle.name} | Price: ${bundle.price} | Image URL: ${bundle.img}`)
    }
    return bundle;
};

const getBundle = async (id) => {
    try {
        id = validId(id);
    } catch (e) {
        throw e;
    }

    const bundlesCollection = await bundles();
    const bundle = await bundlesCollection.findOne({ _id: new ObjectId(id) });

    if (bundle === null) {
        throw "Error: Could not find bundle";
    }

    bundle._id = bundle._id.toString();

    return bundle;
};

const getListedBundles = async () => {
    const bundlesCollection = await bundles();
    let bundlesList = await bundlesCollection.find({}).toArray();

    bundlesList = bundlesList.filter((bundle) => {
        return bundle.forSale == true;
    });
    bundlesList.map((bundle) => {
        bundle._id = bundle._id.toString();
    });

    return bundlesList;
};

const getUnlistedBundles = async () => {
    const bundlesCollection = await bundles();
    let bundlesList = await bundlesCollection.find({}).toArray();

    bundlesList = bundlesList.filter((bundle) => {
        return bundle.forSale == false;
    });
    bundlesList.map((bundle) => {
        bundle._id = bundle._id.toString();
    });

    return bundlesList;
};

const activateBundle = async (bundleId) => {
    bundleId = validId(bundleId)

    let bundle = await getBundle(bundleId)

    const bundlesCollection = await bundles()
    let activated = await bundlesCollection.updateOne({ _id: new ObjectId(bundleId) }, { $set: { forSale: true } })

    await createLog("Activate Bundle", `Name: ${bundle.name} | Id: ${bundleId}`)

    return bundle
}

const disableBundle = async (bundleId) => {
    bundleId = validId(bundleId)

    let bundle = await getBundle(bundleId)

    const bundlesCollection = await bundles()
    let disabled = await bundlesCollection.updateOne({ _id: new ObjectId(bundleId) }, { $set: { forSale: false } })

    await createLog("Activate Bundle", `Name: ${bundle.name} | Id: ${bundleId}`)

    return bundle
}

const deleteBundle = async (bundleId) => {
    bundleId = validId(bundleId)

    let bundle = await getBundle(bundleId)

    const bundlesCollection = await bundles()
    let deleted = await bundlesCollection.deleteOne({ _id: new ObjectId(bundleId) })

    await createLog("Delete bundle", `Name: ${bundle.name} | Id: ${bundleId}`)

    return bundle
}

const editBundleItems = async (bundleId, editItems) => {
    let bundle = await getBundle(bundleId)

    for (let i of editItems) {
        let item = await getItem(i[0]) // Errors if any item doesn't exist
    }

    const bundlesCollection = await bundles()
    let activated = await bundlesCollection.updateOne({ _id: new ObjectId(bundleId) }, { $set: { items: editItems } })

    return editItems;
}

export { createBundle, getListedBundles, getUnlistedBundles, activateBundle, disableBundle, deleteBundle, editBundleItems }