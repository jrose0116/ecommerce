let hoverTime = 300;
let hoveredElem = false;
var timeout;

const refresh2 = () => {
	$.ajax({
		method: "GET",
		dataType: "html",
		credential: "same-origin",
		data: {},
		success: (data) => {
      		$("#checkout-elem").html($(data).find("#checkout-elem").html());
		},
		error: (obj, err, errT) => {
			console.log("Error: ", obj.responseText);
		},
	});
};

document.getElementById('checkout-elem').onmouseover = () => {
  document.getElementById('nav-elem-checkout').style.display = "flex";
  document.getElementById('cart-close-button').addEventListener("click", (event) =>{
	event.preventDefault();
	document.getElementById('nav-elem-checkout').style.display = "none"
})
  clearTimeout(timeout)
}

document.getElementById('checkout-elem').onmouseout = () => {
  timeout = setTimeout(()=>{document.getElementById('nav-elem-checkout').style.display = "none"; refresh2()}, hoverTime)
}