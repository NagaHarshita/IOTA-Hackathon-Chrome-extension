// global variables
var urlList = [];
document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ lastFocusedWindow: true, active: true }, function (tabs) {
        // tabs is an array so fetch the first (and only) object-element in tab 
        var currentTab = tabs[0];
        var url = currentTab.url;
        console.log(url);
        console.log(currentTab);
        var fillURL = document.getElementById('url');
        fillURL.value = currentTab.url;
        console.log(fillURL.value);
        var fillName = document.getElementById('company');
        fillName.value = url.split(".")[0];
        var fillRole = document.getElementById('role');
        fillRole.value = currentTab.title;
    });
    getUrlListAndRestoreInDom();
    // event listener for the button inside popup window
    document.getElementById('button').addEventListener('click', addLink);
});
// fetch the URL of the current tab, add inside the window
function addLink() {
    chrome.tabs.query({ lastFocusedWindow: true, active: true }, function (tabs) {
        // tabs is an array so fetch the first (and only) object-element in tab 
        var currentTab = tabs[0];
        var url = currentTab.url;
        var urlValue = document.getElementById('url');
        var nameValue = document.getElementById('company');
        var roleValue = document.getElementById('role');
        var obj = {
            "company": nameValue.value,
            "role": roleValue.value,
            "url": urlValue.value
        };
        var res = urlList.filter(function (e) { return e.url == obj.url; });
        var count = 0;
        var ele;
        for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
            ele = res_1[_i];
            if (count == 0) {
                count++;
            }
            else {
                break;
            }
        }
        if (count == 0) {
            //Don't add duplicates
            addUrlToListAndSave(obj);
            addUrlToDom(obj);
        }
    });
}
function getUrlListAndRestoreInDom() {
    chrome.storage.local.get({ urlList: [] }, function (data) {
        urlList = data.urlList;
        urlList.forEach(function (obj) {
            addUrlToDom(obj);
        });
    });
}
function addUrlToDom(obj) {
    // change the text message
    document.getElementById("div").innerHTML = "<h2>Saved pages</h2>";
    // format HTML
    // var html = '<li><a href=' + url + " target='_blank'>" + url + '</a></li>';
    //Add URL to DOM
    // document.getElementById("list").insertAdjacentHTML('beforeend',html);
    //Build the new DOM elements programatically instead:
    var newDiv = document.createElement('div');
    var newLink = document.createElement('a');
    var deleteButton = document.createElement('button');
    newDiv.setAttribute('id', obj.url);
    newDiv.setAttribute('class', 'col-*-*');
    newLink.textContent = obj.company + " " + obj.role;
    newLink.setAttribute('href', obj.url);
    newLink.setAttribute('target', '_blank');
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () { deleteUrl(obj); deleteUrlfromDom(obj); };
    newDiv.appendChild(newLink);
    newDiv.appendChild(deleteButton);
    document.getElementById("list").appendChild(newDiv);
}
function deleteUrlfromDom(obj) {
    var elem = document.getElementById(obj.url);
    elem.remove();
}
function deleteUrl(obj) {
    urlList = urlList.filter(function (el) { return el.url != obj.url; });
    saveUrlList();
}
function addUrlToListAndSave(obj) {
    var res = urlList.filter(function (e) { return e.url == obj.url; });
    var count = 0;
    var ele;
    for (var _i = 0, res_2 = res; _i < res_2.length; _i++) {
        ele = res_2[_i];
        if (count == 0) {
            count++;
        }
        else {
            break;
        }
    }
    if (count == 0) {
        //URL is not already in list
        urlList.push(obj);
        saveUrlList();
    }
}
function saveUrlList(callback) {
    chrome.storage.local.set({ urlList: urlList }, function () {
        if (typeof callback === 'function') {
            //If there was no callback provided, don't try to call it.
            callback();
        }
    });
}
