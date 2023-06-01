import { closeConnection, dbConnection } from "../config/mongoConnection.js";
import { createBundle } from "../data/bundles.js";
import { createItem } from "../data/items.js";

const db = await dbConnection();

await db.dropDatabase();

let items = [
	{
		name: 'Alpine Sage',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/AlpinsSage_1.png?v=1616617440',
		price: 6.99,
		enabled: true,
	},
	{
		name: 'Bay Rum',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/BayRum_1.png?v=1616616258',
		price: 6.99,
		enabled: true,
	},
	{
		name: 'Birchwood Breeze',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/Front.png?v=1619122823',
		price: 6.99,
		enabled: true,
	},
	{
		name: 'Coconut Castaway',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/DrSquatch_coconutcastawaysoap_1200PNG_0006.png?v=1648507920',
		price: 6.99,
		enabled: true,
	},
	{
		name: 'Cold Brew Cleanse',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/ColdBrew_1.png?v=1616617758',
		price: 6.99,
		enabled: true,
	},
	{
		name: 'Fresh Falls',
		img: 'https://cdn.shopify.com/s/files/1/0555/4431/5957/products/DrSquatch_UkWebPhotos_1200PNG_0011_1.png?v=1644271399',
		price: 6.99,
		enabled: true,
	},
	{
		name: 'Gold Moss',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/GoldMoss_1.png?v=1616617167',
		price: 6.99,
		enabled: true,
	},
	{
		name: "Cool Fresh Aloe",
		img: "https://cdn.shopify.com/s/files/1/0275/7784/3817/products/CoolFreshAloe_1.png?v=1632844339",
		price: 6.99,
		enabled: true,
	},
	{
		name: 'Pine Tar',
		img: 'https://cdn.shopify.com/s/files/1/0555/4431/5957/products/DrSquatch_UkWebPhotos_1200PNG_0006_8.png?v=1644327598',
		price: 6.99,
		enabled: true,
	},
	{
		name: 'Spartan Scrub',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/files/Frame1_9d4aa675-080e-454e-b002-41fff0a124e2.png?v=1683070087',
		price: 8.99,
		enabled: true,
	},
	{
		name: 'Spidey Suds',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20220811_DrSquatch_SpideySuds_12632_47341248-1fd8-42c6-85ab-6c19929ff32d_1024x1024.png?v=1665767898',
		price: 13.99,
		enabled: true,
	},
	{
		name: 'The Batman Bricc',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/IMG_6542_b046f10e-8c85-47c1-9cb4-e6164b63bf39.png?v=1645640965',
		price: 7.99,
		enabled: true,
	},
	{
		name: 'The Riddler Enigma',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/IMG_6543_124e9a30-b995-4a49-be72-9780c6925831.png?v=1645640974',
		price: 7.99,
		enabled: true,
	},
	{
		name: 'Wood Barrel Bourbon',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/WoodBarrelBourbon_1.png?v=1616616812',
		price: 6.99,
		enabled: true,
	},
	{
		name: 'Eucalyptus Greek Yogurt',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/EucalyptusGreekYogurt_1.png?v=1616616936',
		price: 6.99,
		enabled: true,
	},
];

let bundleSoaps = [
	{
		name: 'Frosty Peppermint',
		img: 'https://cdn.shopify.com/s/files/1/0555/4431/5957/products/FrostyPeppermint_soap_005.png?v=1668536088',
		price: 7.99,
	},
	{
		name: 'Snowy Pine Tar',
		img: 'https://cdn.shopify.com/s/files/1/0555/4431/5957/products/SnowyPineTar_soap_005.png?v=1668536088',
		price: 7.99,
	},
	{
		name: 'Mars Bar',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/drsquatch_marsbarsoap_1200PNG_0005.png?v=1651519384',
		price: 7.99,
	},
	{
		name: 'Moon Rock',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/drsquatch_moonrocksoap_PSD_0006.png?v=1651518996',
		price: 7.99,
	},
	{
		name: 'Black Hole',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/Frame2024.png?v=1681324173',
		price: 7.99,
	},
	{
		name: 'Area 51 Bricc',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20210407_DrSquatch_GalaxyBundle_ProductPhotos_IMG_2601_3a12326d-f088-4de3-be21-229ef3dde823.png?v=1651519848',
		price: 7.99,
	},
	{
		name: 'Wisdom Wash',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20210504_DrSquatch_StarWarsBundle_ProductPhotos_IMG_9083_1.png?v=1660339511',
		price: 7.99,
		enabled: true,
	},
	{
		name: 'Only Hope Soap',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20210504_DrSquatch_StarWarsBundle_ProductPhotos_IMG_9074_1.png?v=1660339511',
		price: 7.99,
		enabled: true,
	},
	{
		name: 'Dark Side Scrub',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20210504_DrSquatch_StarWarsBundle_ProductPhotos_IMG_9068_1.png?v=1660339511',
		price: 7.99,
		enabled: true,
	},
	{
		name: 'Ruthless Rinse',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20210504_DrSquatch_StarWarsBundle_ProductPhotos_IMG_9078_1.png?v=1660339511',
		price: 7.99,
		enabled: true,
	},
	{
		name: 'Sinister Scrub',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20220414_DrSquatch_StarWars4620_1_1.png?v=1660339679',
		price: 7.99,
		enabled: true,
	},
	{
		name: 'Suds of Darkness',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20220414_DrSquatch_StarWars4630-Edit_1_1.png?v=1660339685',
		price: 7.99,
		enabled: true,
	},
	{
		name: 'Resistance Rinse',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20220414_DrSquatch_StarWars4604_1_1.png?v=1660339679',
		price: 7.99,
		enabled: true,
	},
	{
		name: 'Legendary Lather',
		img: 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20220414_DrSquatch_StarWars4612_1_1.png?v=1660339659',
		price: 7.99,
		enabled: true,
	},
]

let addBars = async () => {
	try {
		for (let i in items) {
			let item = items[i];
			await createItem(item.name, item.img, item.price, [], item.enabled || i % 3 != 1, false);
		}
	} catch (e) {
		console.log(e)
	} finally {
		await closeConnection();
	}
}

// North Pole Bundle
let frostyPeppermint = await createItem('Frosty Peppermint', 'https://cdn.shopify.com/s/files/1/0555/4431/5957/products/FrostyPeppermint_soap_005.png?v=1668536088', 7.99, [], false, false)
let snowyPineTar = await createItem('Snowy Pine Tar', 'https://cdn.shopify.com/s/files/1/0555/4431/5957/products/SnowyPineTar_soap_005.png?v=1668536088', 7.99, [], false, false)

let northPoleBundle = await createBundle('North Pole Bundle', 'https://cdn.shopify.com/s/files/1/0555/4431/5957/products/NorthPole4-Packdom_int_l.png?v=1666621620', 28.99, [[frostyPeppermint._id, 2], [snowyPineTar._id, 2]], false, false)

// Galaxy Bundle
let area51 = await createItem('Area 51 Bricc', 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20210407_DrSquatch_GalaxyBundle_ProductPhotos_IMG_2601_3a12326d-f088-4de3-be21-229ef3dde823.png?v=1651519848', 7.99, [], true, false)
let blackHole = await createItem('Black Hole', 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/Frame2024.png?v=1681324173', 7.99, [], true, false)
let marsBar = await createItem('Mars Bar', 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/drsquatch_marsbarsoap_1200PNG_0005.png?v=1651519384', 7.99, [], true, false)
let moonRock = await createItem('Mars Bar', 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/drsquatch_moonrocksoap_PSD_0006.png?v=1651518996', 7.99, [], true, false)

let galaxyBundle = await createBundle('Galaxy Bundle', 'https://cdn.shopify.com/s/files/1/0275/7784/3817/files/galaxy_bundle_image_new.png?v=1681250481', 28.99, [[area51._id, 1], [blackHole._id, 1], [marsBar._id, 1], [moonRock._id, 1]], true, false)

// Star Wars 1
let wisdomWash = await createItem('Wisdom Wash', 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20210504_DrSquatch_StarWarsBundle_ProductPhotos_IMG_9083_1.png?v=1660339511', 7.99, [], true, false)
let darkSideScrub = await createItem('Dark Side Scrub', 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20210504_DrSquatch_StarWarsBundle_ProductPhotos_IMG_9068_1.png?v=1660339511', 7.99, [], true, false)
let onlyHopeSoap = await createItem('Only Hope Soap', 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20210504_DrSquatch_StarWarsBundle_ProductPhotos_IMG_9074_1.png?v=1660339511', 7.99, [], true, false)
let ruthlessRinse = await createItem('Ruthless Rinse', 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20210504_DrSquatch_StarWarsBundle_ProductPhotos_IMG_9078_1.png?v=1660339511', 7.99, [], true, false)

let starWarsBundle1 = await createBundle('Star Wars Collection I', 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/icollectionbooster_b549b6c3-b2ec-482b-808e-8bf91e3f2bad.png?v=1660265764', 28.99, [[wisdomWash._id, 1], [onlyHopeSoap._id, 1], [ruthlessRinse._id, 1], [darkSideScrub._id, 1]], true, false)

// Star Wars 2
let legendaryLather = await createItem('Legendary Lather', 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20220414_DrSquatch_StarWars4612_1_1.png?v=1660339659', 7.99, [], true, false)
let resistanceRinse = await createItem('Resistance Rinse', 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20220414_DrSquatch_StarWars4604_1_1.png?v=1660339679', 7.99, [], true, false)
let sudsOfDarkness = await createItem('Suds of Darkness', 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20220414_DrSquatch_StarWars4630-Edit_1_1.png?v=1660339685', 7.99, [], true, false)
let SinisterScrub = await createItem('Sinister Scrub', 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/20220414_DrSquatch_StarWars4620_1_1.png?v=1660339679', 7.99, [], true, false)

let starWarsBundle2 = await createBundle('Star Wars Collection II', 'https://cdn.shopify.com/s/files/1/0275/7784/3817/products/iicollectionbooster_1.png?v=1660265778', 28.99, [[legendaryLather._id, 1], [resistanceRinse._id, 1], [sudsOfDarkness._id, 1], [SinisterScrub._id, 1]], true, false)


await addBars();
