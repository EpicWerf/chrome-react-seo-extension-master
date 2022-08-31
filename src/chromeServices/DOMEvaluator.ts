import { DOMMessage, DOMMessageResponse } from "../types";

const messagesFromReactAppListener = (
	msg: DOMMessage,
	sender: chrome.runtime.MessageSender,
	sendResponse: (response: DOMMessageResponse) => void
) => {
	console.log("[content.js]. Message received", msg);

	const response: DOMMessageResponse = {
		title: document.title,
		headlines: Array.from(document.getElementsByTagName<"h1">("h1")).map((h1) => h1.innerText),
		url: document.URL.toString(),
	};

	console.log("[content.js]. Message response", response);

	sendResponse(response);
};

function highlightText() {
	const elements = document.getElementsByTagName("*") as HTMLCollectionOf<HTMLElement>;
	const word = "highlighted";

	for (let i = 0; i < elements.length; i++) {
		console.log(elements.length);
		const element: HTMLElement = elements[i];
		// if (element.innerText.includes(word)) {
		// 	let text = element.innerText;
		if (element.innerHTML.includes(word)) {
			//highlight the text
			//change the color of the text
			// element.style.color = "red";
			element.innerHTML = element.innerHTML.replace(word, `<span style="color:red">${word}</span>`);
			// element.style.font = "yellow";
			// let text = element.innerHTML;
			// alert(text)

			// text = text.replace(word, `<span style="background-color: yellow;">${word}</span>`);
			// element.style.backgroundColor = "yellow";
			break;
		}
	}
}

// function highlightText(element: any) {
// 	var nodes = element.childNodes;
// 	for (var i = 0, l = nodes.length; i < l; i++) {
// 		if (nodes[i].nodeType === 3) {
// 			// Node Type 3 is a text node
// 			var text = nodes[i].innerHTML;
// 			nodes[i].innerHTML = "<span style='background-color:#FFEA0'>" + text + "</span>";
// 		} else if (nodes[i].childNodes.length > 0) {
// 			highlightText(nodes[i]); // Not a text node or leaf, so check it's children
// 		}
// 	}
// }

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.highlight === true) {
		highlightText();
		sendResponse({ messageStatus: "recieved" });
	}
});

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
