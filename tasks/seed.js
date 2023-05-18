import { closeConnection, dbConnection } from "../config/mongoConnection.js";
import { createItem } from "../data/items.js";

const db = await dbConnection();

await db.dropDatabase();

let items = [
	{
		name: 'Area 51 Bricc',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20210407_DrSquatch_GalaxyBundle_ProductPhotos_IMG_2601_3a12326d-f088-4de3-be21-229ef3dde823.png?v=1651519848',
		price: 7.99,
	},
	{
		name: 'Alpine Sage',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/AlpinsSage_1.png?v=1616617440',
		price: 6.99,
	},
	{
		name: 'Bay Rum',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/BayRum_1.png?v=1616616258',
		price: 6.99,
	},
	{
		name: 'Birchwood Breeze',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/Front.png?v=1619122823',
		price: 6.99,
	},
	{
		name: 'Black Hole',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/Frame2024.png?v=1681324173',
		price: 7.99,
	},
	{
		name: 'Coconut Castaway',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/DrSquatch_coconutcastawaysoap_1200PNG_0006.png?v=1648507920',
		price: 6.99,
	},
	{
		name: 'Cold Brew Cleanse',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/ColdBrew_1.png?v=1616617758',
		price: 6.99,
	},
	{
		name: 'Fresh Falls',
		img: 'https://cdn.shopify.com/s/files/1/0555/4431/5957/products/DrSquatch_UkWebPhotos_1200PNG_0011_1.png?v=1644271399',
		price: 6.99,
	},
	{
		name: 'Gold Moss',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/GoldMoss_1.png?v=1616617167',
		price: 6.99,
	},
	{
		name: "Cool Fresh Aloe",
		img: "https://cdn.shopify.com/s/files/1/0275/7784/3817/products/CoolFreshAloe_1.png?v=1632844339",
		price: 6.99
	},
	{
		name: 'Pine Tar',
		img: 'https://cdn.shopify.com/s/files/1/0555/4431/5957/products/DrSquatch_UkWebPhotos_1200PNG_0006_8.png?v=1644327598',
		price: 6.99,
	},
	{
		name: 'Spartan Scrub',
		img: 'https://pbs.twimg.com/media/FDHD-_sUUAMyGzk.jpg',
		price: 25.99,
	},
	{
		name: 'Spidey Suds',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20220811_DrSquatch_SpideySuds_12632_47341248-1fd8-42c6-85ab-6c19929ff32d_1024x1024.png?v=1665767898',
		price: 13.99,
	},
	{
		name: 'The Batman Bricc',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/IMG_6542_b046f10e-8c85-47c1-9cb4-e6164b63bf39.png?v=1645640965',
		price: 7.99,
	},
	{
		name: 'The Riddler Enigma',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/IMG_6543_124e9a30-b995-4a49-be72-9780c6925831.png?v=1645640974',
		price: 7.99,
	},
	{
		name: 'Wood Barrel Bourbon',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/WoodBarrelBourbon_1.png?v=1616616812',
		price: 6.99,
	},
	{
		name: 'Moon Rock',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/drsquatch_moonrocksoap_PSD_0006.png?v=1651518996',
		price: 7.99,
	},
	{
		name: 'Eucalyptus Greek Yogurt',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/EucalyptusGreekYogurt_1.png?v=1616616936',
		price: 6.99,
	},
	{
		name: 'Sinister Scrub',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20220414_DrSquatch_StarWars4620_1_1.png?v=1660339679',
		price: 7.99,
	},
	{
		name: 'Suds of Darkness',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20220414_DrSquatch_StarWars4630-Edit_1_1.png?v=1660339685',
		price: 7.99,
	},
	{
		name: 'Resistance Rinse',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20220414_DrSquatch_StarWars4604_1_1.png?v=1660339679',
		price: 7.99,
	},
	{
		name: 'Legendary Lather',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20220414_DrSquatch_StarWars4612_1_1.png?v=1660339659',
		price: 7.99,
	},
	{
		name: 'Wisdom Wash',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20210504_DrSquatch_StarWarsBundle_ProductPhotos_IMG_9083_1.png?v=1660339511',
		price: 7.99,
	},
	{
		name: 'Only Hope Soap',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20210504_DrSquatch_StarWarsBundle_ProductPhotos_IMG_9074_1.png?v=1660339511',
		price: 7.99,
	},
	{
		name: 'Dark Side Scrub',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20210504_DrSquatch_StarWarsBundle_ProductPhotos_IMG_9068_1.png?v=1660339511',
		price: 7.99,

	},
	{
		name: 'Ruthless Rinse',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20210504_DrSquatch_StarWarsBundle_ProductPhotos_IMG_9078_1.png?v=1660339511',
		price: 7.99,

	},
	{
		name: 'Mars Bar',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/drsquatch_marsbarsoap_1200PNG_0005.png?v=1651519384',
		price: 7.99,
	}
];

let addBars = async () => {
	try {
		for (let i in items) {
			let item = items[i];
			await createItem(item.name, item.img, item.price, [], i % 3 != 1);
		}
	} catch (e) {
		console.log(e)
	} finally {
		await closeConnection();
	}
}

await addBars();