let element = $('.widget-abc123');
let data = {
	device: 'desktop', //desktop, tablet, mobile
	inEditor: true,
	siteId: '',
	elementId: '',
	config: {
		sampleList: [{}],
		sample:''
	}
};

let collection = new Collection()

let device = data.device;
let sampleList = data.config.sampleList;
let sample = data.config.sample;

let noCollectMessage = 'No data was found.' ///data.config.noCollectMessage
let noCollectSubMessage = 'This will be hidden on preview and live site.' ///data.config.noCollectSubMessage
let sampleListData;

switch (device) {
	case 'desktop':
		$(element).width("960px");
		break;
	case 'tablet':
		$(element).width("875px");
		break;
	default:
		$(element).width("326px");
}

//ADD MULTIPLE LINK SOURCE HERE


dmAPI.runOnReady('init', function () {
	const typedTextSpan = document.querySelector(".typed-text");
	const cursorSpan = document.querySelector(".cursor");
	
	const textArray = ["can draft a packing list for your weekend fishing and camping trip", "can suggest more high-protein options to add to your vegan diet"];
	const typingDelay = 100;
	const erasingDelay = 100;
	const newTextDelay = 1000; // Delay between current and next text
	let textArrayIndex = 0;
	let charIndex = 0;
	
	function type() {
	  if (charIndex < textArray[textArrayIndex].length) {
		if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
		typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
		charIndex++;
		setTimeout(type, typingDelay);
	  } 
	  else {
		cursorSpan.classList.remove("typing");
		  setTimeout(erase, newTextDelay);
	  }
	}
	
	function erase() {
		if (charIndex > 0) {
		if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
		typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
		charIndex--;
		setTimeout(erase, erasingDelay);
	  } 
	  else {
		cursorSpan.classList.remove("typing");
		textArrayIndex++;
		if(textArrayIndex>=textArray.length) textArrayIndex=0;
		setTimeout(type, typingDelay + 1100);
	  }
	}
	
	document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
	  if(textArray.length) setTimeout(type, newTextDelay + 250);
	});
})
