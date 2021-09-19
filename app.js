const timelineDiv = document.querySelector("#timeline");
const messagesDiv = document.querySelector("#messages-inner");
const textInput = document.querySelector("#chatbox");

var currentSpeaker = "right";
var scrollCount;

const scrollToBottom = ()=>{
	timelineDiv.scrollTop = timelineDiv.scrollHeight
	scrollCount--;
	if(scrollCount) setTimeout(scrollToBottom, 10);
};

const switchSpeaker = (elem)=>{
	if (currentSpeaker == "left") {
		currentSpeaker = "right";
		if (elem) {
			elem.classList.remove("messageleft");
			elem.classList.remove("messageblue");
			elem.classList.add("messageright");
			elem.classList.add("messagegreen");
		}
	} else {
		currentSpeaker = "left";
		if (elem) {
			elem.classList.remove("messageright");
			elem.classList.remove("messagegreen");
			elem.classList.add("messageleft");
			elem.classList.add("messageblue");
		}
	}
}

const addTyping = ()=>{
	let lastChild = messagesDiv.lastChild;
	if(lastChild.classList != undefined && lastChild.classList.contains("typing")) return;
	let newMessageDiv = makeMessageBox();
	newMessageDiv.classList.add("typing");
	makeDots(newMessageDiv);

	newMessageDiv.addEventListener("mouseup", (event)=>{
		switchSpeaker(newMessageDiv);
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
		removeTyping();
		let message = textInput.value;
		textInput.value = "";
		let newMessageDiv = makeMessageBox();
		let newMessageText = document.createTextNode(message);
		newMessageDiv.appendChild(newMessageText);
		messagesDiv.appendChild(newMessageDiv);
		scrollCount = 40;
		scrollToBottom();
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