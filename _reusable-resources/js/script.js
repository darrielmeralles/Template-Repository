//let monthlist = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//let monthlist = ['January','February','March','April','May','June','July','August','September','October','November','December'];

//<script src = "https://code.jquery.com/jquery-3.1.0.js"></script>

let itemLink = currentURL.includes(data.siteId) ? `/site/${data.siteId}/${dynamicPage}/${i.page_item_url}?preview=true&insitepreview=true&dm_device=${data.device}` : i.page_item_url;
if (typeof i.page_item_url == "object") {
    itemLink = i.page_item_url.href;
}

// Reusable
function multiFilter(obj, filters) {
    const filterKeys = Object.keys(filters);
    return obj.filter(function (eachObj) {
        return filterKeys.every(function (eachKey) {
            if (!filters[eachKey].length) {
                return true; // passing an empty filter means that filter is ignored.
            }
            return filters[eachKey] == eachObj[eachKey];
        });
    });
}

// DUDA dmAPI
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

//Remove duplicate from Object
function removeDuplicates(array, key) {
    return array.reduce(function (arr, item) {
        const removed = arr.filter(function (i) {
            return i[key] !== item[key];
        });
        return [...removed, item];
    }, []);
}

//Remove duplicate from array
function removeA(arr) {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

// Sort
function sortItems(data, key) {
    return data.sort((a, b) => a[key] < b[key] ? -1 : 1);
}

// Get Specific String
function select_str(str, index, charCount, strRep) {
    return str.substring(str.indexOf(index) + charCount).replace(strRep, '');
}

// ! RESOURCES
// ! RESOURCES
// ! RESOURCES

cssLibrary('https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css', 'jqueryUICss');
cssLibrary('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.css', 'slickSliderCSs');
cssLibrary('https://cdnjs.cloudflare.com/ajax/libs/paginationjs/2.1.4/pagination.css', 'paginationCss');
cssLibrary('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css', 'fontAwesomeSource');
cssLibrary('https://unpkg.com/tippy.js@6.3.7/themes/light.css', 'themeLightCss');
cssLibrary('https://unpkg.com/tippy.js@6.3.7/animations/scale.css', 'animationaScaleCss');

function cssLibrary(href, id) {
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

function paginationFunction(completeData) {
    //sortItems(completeData);
    $(element).find('.crwItemMainContainer').pagination({
        dataSource: completeData,
        pageSize: 3,
        callback: function (data, pagination) {
            let createRecipe = data.length != 0 ? createItemStructure(data) : `
                <div class="crwNoResult">
                    <i class="fas fa-exclamation-circle crwNoRes crwNoResIcon"></i>
                    <div class="crwNoRes crwNoResText">${data.length} result found.</div>
                </div>`;
            mainElement.html(createRecipe);
            data.length % 3 != 2 ? null : mainElement.append(`<div class="crwItems recipeFiller"></div>`);
        }
    });
}

pagination(document, "script", "paginationJS", "https://irt-cdn.multiscreensite.com/8914113fe39e47bcb3040f2b64f71b02/files/uploaded/paginates.min.js", function () {
    initialize();
});

function loadScript(d, s, id, url, callback) {
    $('#' + id).remove();
    var fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    script = d.createElement(s);
    script.id = id;
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

// Add comma  1,000,0000
function digits(str) {
    return str.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
// with decimal
function digits(str) {
    return str.toString().includes(".") ? str.toString().split(".")[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + "." + str.toString().split(".")[1] : str.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

//Convert $1,000.00 to 1000.00
function convertInt(str) {
    let value = Number(str.replace(/[^0-9.-]+/g, ""));
    return value;
}

// Remove Special Character and spaces
function removeSpecial(str) {
    let pattern = str.replace(/[^A-Z0-9]/ig, ``);
    return pattern;
}
// Check if text is URL
function urlChecker(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

// Remove Spaces
function removeSpaces(str) {
    return str.replace(/\s/g, '');
}

// Ellipsis
function ellipsis(str) {
    if (str.split(" ").length <= 20) {
        return str;
    }
    return str.split(" ").filter((i, index) => {
        return index <= 20 ? i.trim() : false;
    }).join(" ") + "...";
}
// Split Category
function filter(obj, key) {
    let newObj = obj.map(i => {
        return i[key].split(",").map(j => {
            return j.trim();
        });
    }).flat();
    var uniqueItems = Array.from(new Set(newObj));
    return uniqueItems.sort((a, b) => {
        return a > b ? 1 : -1;
    }).map(i => {
        return `<option>${i}</option>`;
    }).join('');
};

// COLLECTION FOR WIDGET LIST
let collections = new Collection();
let collectData = collect.data(collections);

function Collection() {
    this.data = (collection) => {
        return collection.map(i => {
            let item = {};
            Object.keys(i).filter(j => {
                item[removeSpecial(j).toLowerCase()] = typeof i[j] == "object" ? i[j].href : this.removeExtra(i[j]);
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

function starDOM(rating) {
    let starColor = #ED8A19;
    let starIcon = `<i class="fa-solid fa-star"></i>`;
    let stars = '';

    for (let i = 0; i < 5; i++) {
        stars += `${i < count ? starIcon :""}`;
    }
    return stars;
};

// COLLECTION USING DUDA JS API
let collect = new Collect();
let collection = data.config.collection;
const includedSearch = ['name', 'id']; // Searchable

dmAPI.loadCollectionsAPI().then(apiResult => {
    apiResult.data(collection).get().then(collected => {
        let resp = collect.data(collected.values); // Pass "List" Variable
        console.log(resp);
    });
});

function Collect() {
    this.data = (collection) => {
        return collection.map(i => {
            let item = {};
            item.page_item_url = i.page_item_url;
            Object.keys(i.data).filter(j => {
                item[removeSpecial(j).toLowerCase()] = this.removeExtra(i.data[j]);
            });
            item.keyword = Object.keys(i.data).map(k => includedSearch.includes(k.toLowerCase()) ? i.data[k] : null).filter(l => l !== null).join(" ").toLowerCase();
            return item;
        });
    };
    this.removeExtra = (str) => {
        let fullText = '';
        if (typeof str !== "undefined") {
            if (!str.includes("</p>")) {
                fullText = str;
            } else {
                fullText = str.substring(str.indexOf(">") + 1).replace("</p>", '');
            }
        }
        return fullText;
    };

    function removeSpecial(str) {
        let pattern = str.replace(/[^A-Z0-9]/ig, ``);
        return pattern;
    }
}

//Remove Duplicate For Array
var uniqueItems = Array.from(new Set(items));

let spreadsheet = data.config.spreadsheet;
let sheet = spreadsheet.substring(spreadsheet.indexOf('d/') + 2).replace('/edit?usp=sharing', '');
let sheetDetails = {
    sheetid: sheet,
    sheetname: data.config.sheetname ? data.config.sheetname : "Sheet1",
    apikey: data.config.apikey ? data.config.apikey : "AIzaSyAO95R71N7Ha4Z8smai-y23QuKE2Rrq4U0"
};

let collects = new Collection();
let responseData = collects.response(sheetDetails);
responseData.then(resp => {
    //  code here
});

// GSX COLEECTIONS
function Collection() {
    this.ajax = function () {
        return $.ajax({
            url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetDetails.sheetid}/values/${sheetDetails.sheetname}?key=${sheetDetails.apikey}`,
        });
    };
    this.response = function (sheetDetails) {
        let sheet = this.ajax(sheetDetails);
        return sheet.then(resp => {
            let header = resp.values[0];
            let values = resp.values.filter((i, index) => index !== 0);
            let included = header.filter(a => includedSearch.includes(a.replace(/[^A-Za-z]+/g, "").toLowerCase()));

            return values.map(i => {
                let items = {};
                header.map((k, index) => {
                    items[removeSpecial(k.toLowerCase())] = i[index];
                });
                items.page_item_url = items.propertyname.replace(/\s/g, '-').toLowerCase();
                items.keyword = included.map(b => items[b.replace(/[^A-Za-z]+/g, "").toLowerCase()].toLowerCase()).join(",");
                return items;
            });
        });

    };

    function removeSpecial(str) {
        let pattern = str.replace(/[^A-Z0-9]/ig, ``);
        return pattern;
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// IFRAME RESIZE
iframeResize('thebookingbuttonData')


function iframeResize(ifrmid) {

    var buffer = 20; //scroll bar buffer
    var iframe = document.getElementById(ifrmid);

    function pageY(elem) {
        return elem.offsetParent ? (elem.offsetTop + pageY(elem.offsetParent)) : elem.offsetTop;
    }

    function resizeIframe() {
        var height = document.documentElement.clientHeight;
        height -= pageY(document.getElementById(ifrmid)) + buffer;
        height = (height < 0) ? 0 : height;
        document.getElementById(ifrmid).style.height = height + 'px';
    }

    // .onload doesn't work with IE8 and older.
    if (iframe.attachEvent) {
        iframe.attachEvent("onload", resizeIframe);
    } else {
        iframe.onload = resizeIframe;
    }

    window.onresize = resizeIframe;
}

removeByAttr(arr, 'name', 'joe');
var removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
        if (arr[i] &&
            arr[i].hasOwnProperty(attr) &&
            (arguments.length > 2 && arr[i][attr] === value)) {

            arr.splice(i, 1);

        }
    }
    return arr;
}

//SCROLLTOP Pagination
let headerHeight = $('.dmHeaderContainer').css("position") == "fixed" ? parseFloat($('.dmHeaderContainer').outerHeight()) : 0;
let scrollTo = $(element).offset().top - headerHeight - 20;
afterPageOnClick: function () {
        window.scrollTo({
            top: scrollTo,
            behavior: 'smooth'
        });
    },
    afterNextOnClick: function () {
        window.scrollTo({
            top: scrollTo,
            behavior: 'smooth'
        });
    },
    afterPreviousOnClick: function () {
        window.scrollTo({
            top: scrollTo,
            behavior: 'smooth'
        });
    }

// RESIZE OBSERVER
const resizeObserver = new ResizeObserver(entries => {
    entries.map(i => {
        let containerHeight = i.contentRect.height
        $(i).parent().css('height', containerHeight)
    })
});
resizeObserver.observe(document.querySelector('#donorBox'));


function isScrollToFinished(positionOfItem, scrollContainer, el) {
    const checkIfScrollToIsFinished = setInterval(() => {
        if (positionOfItem === scrollContainer.scrollTop()) {


            clearInterval(checkIfScrollToIsFinished);
        }
    }, 25);
}

// ! RANDOMIZE ARRAY
function shuffle(array) {
    var currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

function refreshCSS() {
    var sheets = [].slice.call(document.getElementsByTagName("link"));
    var head = document.getElementsByTagName("head")[0];
    for (var i = 0; i < sheets.length; ++i) {
        var elem = sheets[i];
        var parent = elem.parentElement || head;
        parent.removeChild(elem);
        var rel = elem.rel;
        if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
            var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
            elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
        }
        parent.appendChild(elem);
    }
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

function loadScript(d, s, id, url, callback) {
    $('#' + id).remove();
    var fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return
    }
    script = d.createElement(s);
    script.id = id;
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

function guidGenerator() {
    var a = function () {
        return (((1 + Math.random()) * 0x1000) | 0).toString(16).substring(1)
    };
    return (a() + a() + a())
}

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

function reload_js(src) {
    $('script[src="' + src + '"]').remove();
    $('<script>').attr('src', src).appendTo('head');
}

function getChecked(el) {
    let checkedPermission = [];
    el.filter(function () {
        if ($(this).is(":checked")) {
            checkedPermission.push($(this).val());
        }
    });
    return checkedPermission;
}