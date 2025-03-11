let dmAPI = {
	runOnReady: (functionName, callback) => {
		if (functionName) {
			callback();
		} else {
			console.error("Please Enter Function Name!");
		}
	},
	loadScript: (url, callback) => {
		var fjs = document.getElementsByTagName("script")[0];
		script = document.createElement("script");
		script.src = url;
		fjs.parentNode.insertBefore(script, fjs);
		if (script.readyState) { //IE
			script.onreadystatechange = function () {
				if (script.readyState == "loaded" ||
					script.readyState == "complete") {
					script.onreadystatechange = null;
					callback();
				}
			};
		} else { //Others
			script.onload = function () {
				callback();
			};
		}
		script.src = url;
		fjs.parentNode.insertBefore(script, fjs);
	}
};

//REMOVE DUPLICATE FOR ARRAY
// let uniqueItems = Array.from(new Set(items));

//REGEX'S FOR VALIDATION
let charRegex = /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s/g;
let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

// CREATE CSS LIBRARY
function cssLibrary(id, href) {
	if (!document.getElementById(id)) {
		var head = document.getElementsByTagName('head')[0];
		var link = document.createElement('link');
		link.id = id;
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = href;
		link.crossOrigin = 'anonymous';
		head.appendChild(link);
	}
}

// COLLECTION FOR WIDGET LIST
function Collection() {
	this.data = (collection) => {
		return collection.map(i => {
			let item = {};
			Object.keys(i).filter(j => {
				// item[removeSpecial(j).toLowerCase()] = typeof i[j] == "object" ? i[j].href : this.removeExtra(i[j]);
				item[removeSpecial(j)] = typeof i[j] == "object" ? i[j].href : this.removeExtra(i[j]);
			});
			item.keyword = Object.keys(i).map(k => i[k]).join(',');
			return item;
		});
	};
	this.removeExtra = (str) => {
		if (str) {
			return str.includes("</p>") ? str.substring(str.indexOf(">") + 1).replace("</p>", '') : str;
		}
		return str;
	};

	function removeSpecial(str) {
		let pattern = str.replace(/[^A-Z0-9]/ig, ``);
		return pattern;
	}
}

// REMOVE DUPLICATED KEY IN ARRAY
function removeDuplicates(arr, key) {
	return [...new Map(arr.map(item => [item[key], item])).values()]
}

//Remove Array Duplicates
// function removeDuplicates(array, key) {
// 	return array.reduce(function (arr, item) {
// 		const removed = arr.filter(function (i) {
// 			return i[key] !== item[key];
// 		});
// 		return [...removed, item];
// 	}, []);
// };

//REMOVE DUPLICATED KEY IN OBJECT ARRAY -> removeDuplicate(jobList.map(a => a.jobCategory));
function removeDuplicate(arr) {
	return uniqueItems = Array.from(new Set(arr))
}

//CREATE DROPDOWN OPTIONS
function createDropdownOption(arr, filter) {
	arr.map(function (i) {
		$(element).find('#' + filter).append(`<option value="${i}">${i}</option>`);
	});
}

// CHECK IF CONTAINS SPECIAL CHARACTER
function containsSpecialChars(str) {
	const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
	return specialChars.test(str);
}

//ADD COMMA  1,000,0000
function digitsComma(str) {
	return str.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
//WITH DECIMAL
function digitsDecimal(str) {
	return str.toString().includes(".") ? str.toString().split(".")[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "." + str.toString().split(".")[1] : str.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

//CONVERT $1,000.00 TO 1000.00
function convertInt(str) {
	let value = Number(str.replace(/[^0-9.-]+/g, ""));
	return value;
}

//REMOVE SPECIAL CHARACTER AND SPACES
function removeSpecial(str) {
	let pattern = str.replace(/[^A-Z0-9]/ig, ``);
	return pattern;
}
//CHECK IF TEXT IS URL
function urlChecker(str) {
	var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
		'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
	return !!pattern.test(str);
}

//REMOVE SPACES
function removeSpaces(str) {
	return str.replace(/\s/g, '');
}

//GENERATE UNIQUE ID
function uniqueIDGenerator() {
	var a = function () {
		return (((1 + Math.random()) * 0x1000) | 0).toString(16).substring(1)
	};
	return (a() + a() + a())
}

//GET VALUE FROM PARAMETER
function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// IP CHECKER
function initCountry() {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.timeout = 3000;
		xhr.onreadystatechange = function () {
			if (this.readyState == 4) {
				if (this.status == 200) {
					countryCode = countryCodeExpression.exec(this.responseText)
					ip = userIPExpression.exec(this.responseText)
					if (countryCode === null || countryCode[1] === '' ||
						ip === null || ip[1] === '') {
						reject('IP/Country code detection failed');
					}
					let result = {
						"countryCode": countryCode[1],
						"IP": ip[1]
					};
					resolve(result)
				} else {
					reject(xhr.status)
				}
			}
		}
		xhr.ontimeout = function () {
			reject('timeout')
		}
		xhr.open('GET', 'https://www.cloudflare.com/cdn-cgi/trace', true);
		xhr.send();
	});
}
// CONVERT UTC DATE TO LOCAL DATE
function convertUTCDateToLocalDate(date) {
	var dateLocal = new Date(date);
	var newDate = new Date(dateLocal.getTime() - dateLocal.getTimezoneOffset() * 60 * 1000);
	return newDate;
}