let modal = document.getElementById("modal");
let modalContent = document.getElementById("modal-content");
let modalHead = document.getElementById("modal-header");

let closeButton = document.getElementsByClassName("close")[0];

closeButton.addEventListener("click", () => {
	modal.style.display = "none";
});

window.addEventListener("click", (event) => {
	if (event.target === modal) {
		modal.style.display = "none";
	}
});