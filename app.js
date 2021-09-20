const timelineDiv = document.querySelector("#timeline");
const messagesDiv = document.querySelector("#messages-inner");
const textInput = document.querySelector("#chatbox");

var currentSpeaker = "right";
var scrollCount;

const scrollToBottom = ()=>{
	timelineDiv.scrollTop = timelineDiv.scrollHeight
	scrollCount--;
	if(scrollCount > 0) setTimeout(scrollToBottom, 10);
};

const switchSpeaker = (elem)=>{
	if (currentSpeaker == "left") {
		currentSpeaker = "right";
		if (elem && elem.classList && elem.classList.contains("typing")) {
			elem.classList.remove("messageleft");
			elem.classList.remove("messageblue");
			elem.classList.add("messageright");
			elem.classList.add("messagegreen");
		}
	} else {
		currentSpeaker = "left";
		if (elem && elem.classList && elem.classList.contains("typing")) {
			elem.classList.remove("messageright");
			elem.classList.remove("messagegreen");
			elem.classList.add("messageleft");
			elem.classList.add("messageblue");
		}
	}
	textInput.focus();
}

const addTyping = ()=>{
	let lastChild = messagesDiv.lastChild;
	if(lastChild.classList != undefined && lastChild.classList.contains("typing")) return;
	let newMessageDiv = makeMessageBox();
	newMessageDiv.classList.add("typing");
	makeDots(newMessageDiv);

	newMessageDiv.addEventListener("mouseup", (event)=>{
		switchSpeaker(newMessageDiv);
	});

	newMessageDiv.addEventListener("touchend", (event)=>{
		textInput.focus();
	});

	messagesDiv.appendChild(newMessageDiv);
}

const removeTyping = ()=>{
	let lastChild = messagesDiv.lastChild;
	if ((lastChild.classList != undefined && lastChild.classList.contains("typing"))) {
		lastChild.remove();
	}
}

const makeMessageBox = ()=>{
	let newMessageDiv = document.createElement("div");
	newMessageDiv.classList.add("messagebox");
	if (currentSpeaker == "left") {
		newMessageDiv.classList.add("messageleft");
		newMessageDiv.classList.add("messageblue");
	} else {
		newMessageDiv.classList.add("messageright");
		newMessageDiv.classList.add("messagegreen");
	}
	scrollToBottom();
	return newMessageDiv;
}

const makeDots = (element)=>{
	let newDot = document.createElement("div");
	newDot.classList.add("dot");
	newDot.classList.add("dot-1");
	element.appendChild(newDot);
	newDot = document.createElement("div");
	newDot.classList.add("dot");
	newDot.classList.add("dot-2");
	element.appendChild(newDot);
	newDot = document.createElement("div");
	newDot.classList.add("dot");
	newDot.classList.add("dot-3");
	element.appendChild(newDot);
}

const sendMessage = ()=>{
	if (textInput.value) {
		let message = textInput.value;
		textInput.value = "";
		let lastChild = messagesDiv.lastChild;
		let newMessageDiv = undefined;
		if (lastChild.classList != undefined && lastChild.classList.contains("typing")) {
			newMessageDiv = lastChild;
			newMessageDiv.classList.remove("typing");
			while (newMessageDiv.firstChild) {
				newMessageDiv.removeChild(newMessageDiv.lastChild);
			}
		} else {
			newMessageDiv = makeMessageBox();
			messagesDiv.appendChild(newMessageDiv);
		}
		let newMessageText = document.createTextNode(message);
		newMessageDiv.appendChild(newMessageText);
		scrollCount = 40;
		switchSpeaker();
		textInput.focus();
	}
};

textInput.addEventListener("keyup", (event)=>{
  if (event.keyCode === 13) {
    event.preventDefault();
    sendMessage();
  }
});

textInput.addEventListener("input", (event)=>{
	if(textInput.value) {
		addTyping();
	} else {
		removeTyping();
	}
});

window.onload = function() {
  textInput.focus();
}