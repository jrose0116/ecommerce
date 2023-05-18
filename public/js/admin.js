let destroySession = document.getElementById("destroySession");
let modal = document.getElementById("admin-modal");

let viewAll = document.getElementById("viewAll");
let viewLogs = document.getElementById("viewLogs");
let closeButton = document.getElementsByClassName("close")[0];
let createItem = document.getElementById("createItem");

let modalContent = document.getElementById("admin-modal-content");
let modalHead = document.getElementById("admin-modal-header");

const refresh = () => {
	$.ajax({
		method: "GET",
		dataType: "html",
		credential: "same-origin",
		data: {},
		success: (data) => {
			$("#activeListings").html($(data).filter("#activeListings").html())
			$("#inactiveListings").html($(data).filter("#inactiveListings").html())
		},
		error: (obj, err, errT) => {
			console.log("Error: ", obj.responseText);
		},
	})
}

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

				data = data.sort((a, b) => {
					return a.name.localeCompare(b.name);
				});

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

viewLogs.addEventListener("click", (event) => {
	try {
		$.ajax({
			url: "/admin/auditLogs",
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
				let hTime = document.createElement("th");
				let hAction = document.createElement("th");
				let hContent = document.createElement("th");

				hTime.textContent = "Time";
				hAction.textContent = "Action";
				hContent.textContent = "Content";

				headers.appendChild(hTime);
				headers.appendChild(hAction);
				headers.appendChild(hContent);

				data.forEach((item) => {
					let itemRow = table.insertRow();
					let time = itemRow.insertCell();
					let action = itemRow.insertCell();
					let content = itemRow.insertCell();

					time.textContent = item.time;
					action.textContent = item.action;
					content.textContent = item.content;
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
	modalContent.innerHTML = `<form id="createForm">
	<label for="create-item-name">Item Name</label>
	<input type="text" name="create-item-name" id="create-item-name" />
	<label for="create-item-price">Price</label>
	<input type="number" step="0.01" name="create-item-price" id="create-item-price" />
	<label for="create-item-imgURL">Image URL</label>
	<input type="text" name="create-item-imgURL" id="create-item-imgURL" />
	<input type="submit" value="Submit" />
    </form>`;
	modalHead.innerHTML = "Create Item";
	modal.style.display = "block";

	let createForm = document.getElementById("createForm")

	createForm.addEventListener("submit", (event) => {
		event.preventDefault()
		try {
			$.ajax({
				url: "/admin/createItem",
				method: "POST",
				dataType: "json",
				credential: "same-origin",
				data: {
					name: createForm.querySelector('input[name="create-item-name"]').value,
					price: createForm.querySelector('input[name="create-item-price"]').value,
					img: createForm.querySelector('input[name="create-item-imgURL"]').value,
				},
				success: (data) => {
					let card = document.createElement("div")
					card.classList.add("item-card", "item-card-preview")

					const img = document.createElement("img");
					img.src = data.img;
					img.alt = data.name;

					const name = document.createElement("h2");
					name.classList.add("item-card-head");
					name.textContent = data.name;

					const price = document.createElement("p");
					price.textContent = "$" + data.price;

					const details = document.createElement("button");
					details.classList.add("item-card-details");
					details.textContent = "Details";

					const cart = document.createElement("button");
					cart.classList.add("item-card-cart");
					cart.textContent = "Add to Cart";

					card.appendChild(img);
					card.appendChild(name);
					card.appendChild(price);
					card.appendChild(details);
					card.appendChild(cart);

					modalContent.append(card)
					refresh()
				},
				error: (obj, err, errT) => {
					console.log("Error: ", obj.responseText);
				},
			})
		} catch (e) {
			console.log("Error: ", e);
		}
	})
});
