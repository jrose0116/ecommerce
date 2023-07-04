let checkoutButton = document.getElementById("orderButton")
let fname = document.getElementById("checkout-fname")
let lname = document.getElementById("checkout-lname")
let add1 = document.getElementById("checkout-add1")
let add2 = document.getElementById("checkout-add2")
let city = document.getElementById("checkout-city")
let zip = document.getElementById("checkout-zip")

// Payment information will not be stored or used

checkoutButton.addEventListener("click", async (event) => {
    $.ajax({
		method: "POST",
		dataType: "JSON",
		credential: "same-origin",
		data: {
            fname: fname.value,
            lname: lname.value,
            add1: add1.value,
            add2: add2.value,
            city: city.value,
            zip: zip.value,
        },
		success: (data) => {
			window.location.href = data.retURL
		},
		error: (obj, err, errT) => {
			console.log("Error: ", obj.responseText);
		},
	});
})