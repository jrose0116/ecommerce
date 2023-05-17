let destroySession = document.getElementById("destroySession");
let modal = document.getElementById("admin-modal");

let viewAll = document.getElementById("viewAll");
let closeButton = document.getElementsByClassName("close")[0];
let createItem = document.getElementById("createItem");

let modalContent = document.getElementById("admin-modal-content");
let modalHead = document.getElementById("admin-modal-header");

closeButton.addEventListener("click", () => {
	modal.style.display = "none";
});

window.addEventListener("click", (event) => {
	if (event.target === modal) {
		modal.style.display = "none";
	}
});

viewAll.addEventListener("click", (event) => {
	try {
		$.ajax({
			url: "/admin/viewAllListings",
			method: "GET",
			dataType: "json",
			credential: "same-origin",
			data: {},
			success: (data) => {
				modal.style.display = "block";

				let table = document.createElement("table");
				table.id = "modal-table";
				modalHead.innerHTML = "View Listings";

				let headers = table.insertRow();
				let hName = document.createElement("th");
				let hId = document.createElement("th");
				let hPrice = document.createElement("th");
				let hImgUrl = document.createElement("th");

				hName.textContent = "Item";
				hId.textContent = "Id";
				hPrice.textContent = "Price";
				hImgUrl.textContent = "Image URL";

				headers.appendChild(hName);
				headers.appendChild(hId);
				headers.appendChild(hPrice);
				headers.appendChild(hImgUrl);

				data.forEach((item) => {
					let itemRow = table.insertRow();
					let name = itemRow.insertCell();
					let id = itemRow.insertCell();
					let price = itemRow.insertCell();
					let imgUrl = itemRow.insertCell();

					name.textContent = item.name;
					id.textContent = item._id;
					price.textContent = "$" + item.price;
					imgUrl.textContent = item.img;
				});

				modalContent.innerHTML = "";
				modalContent.appendChild(table);
			},
			error: (obj, err, errT) => {
				console.log("Error: ", obj.responseText);
			},
		});
	} catch (e) {
		console.log("Error: ", e);
	}
});

destroySession.addEventListener("click", (event) => {
	try {
		$.ajax({
			url: "/admin/destroySession",
			method: "GET",
			dataType: "json",
			credential: "same-origin",
			data: {},
			success: (data) => {
				window.location.href = "/";
			},
			error: (obj, err, errT) => {
				console.log("Error: ", obj.responseText);
			},
		});
	} catch (e) {
		console.log("Error: ", e);
	}
});

createItem.addEventListener("click", (event) => {
	modalContent.innerHTML = `<form>
	<label for="name">Item Name</label>
	<input type="text" name="name" />
	<label for="price">Price</label>
	<input type="number" step="0.01" name="price" />
	<label for="imgURL">Image URL</label>
	<input type="text" name="imgURL" />
	<input type="submit" value="Submit" />
    </form>`;
	modalHead.innerHTML = "Create Item";
	modal.style.display = "block";
});
