---
type: page
title: Chancium - Chrome extension to bookmark your job
listed: true
slug: bookmark-your-job---chrome-extension
---draft

Chrome extensions make our life so easy by there minimal actions. Being a student, searching for the jobs or internships is a tedious work. There are various websites where you can login, search and save a job. But we search for jobs or internships in many of those websites.  To visit your saved jobs, you need to go to each and every website and do it. The repeated mails from the job websites may irritate in tracking our jobs. 

 **Chancium** is a chrome extension which makes this work easier for you. Visit any website, if you want to save your job, just some clicks would do it. By this we can have more chance to apply for jobs within time.

## User guide for this extension

1. Add extension to your chrome browser.
2. Search for a job in LinkedIn, Glassdoor, Indeed, etc. 
3. When you want to the save the job, go to that URL, and click on the extension.
4. This needs minimal of your effort. Smart suggestions would have already filled the form details before. You just need to check, edit the way you want and save it.
5. Once you save the form, you could probably see in the list present with heading "Saved pages". 
6. That's it. Now you have saved your job. You will redirect to the job page by clicking on the extension. 
7. Now if you want to delete a particular job, you can click on delete button present.

## Components of the project

- manifest.json
- Javascript and HTML files for popup

## Explaining manifest.json file

These are the basic version kind of things that manifest.json should have.`

$plugin[{
    "type": "code-block",
    "data": {
        "languageBlocks": [
            {
                "code": "\"manifest_version\" : 2,\n\"name\" : \"IOTA Hackathon\",\n\"version\" : \"0.001\",",
                "language": "json"
            }
        ]
    }
}]$

We do need browser action, which is responsible for the popup when we click on the extension. 

$plugin[{
    "type": "code-block",
    "data": {
        "languageBlocks": [
            {
                "code": "\"browser_action\":{\n  \t\t\t\/\/ this is the icon that you see on extension\n       \"default_icon\" : \"tictactoe.png\", \n  \t\t\t\/\/ this is the popup webpage code\n       \"default_popup\" : \"Form\/index.html\",\n       \"default_title\" : \"IOTA\"\n },",
                "language": "json"
            }
        ]
    }
}]$

Permissions are necessary for get the current tab link from the user and storing the bookmarked things to the DOM.  

$plugin[{
    "type": "code-block",
    "data": {
        "languageBlocks": [
            {
                "code": "\"permissions\" : [\n     \"tabs\", \/\/ for getting info about tabs\n     \"storage\"\/\/ for storage in local DOM\n]",
                "language": "json"
            }
        ]
    }
}]$

## API's used

1. chrome.tabs ([https://developer.chrome.com/extensions/tabs](https://developer.chrome.com/extensions/tabs))
2. chrome.storage([https://developer.chrome.com/apps/storage](https://developer.chrome.com/apps/storage))

### Challenges resolved

I didn't use **currentTab** in quering for the current url because if the user has more than one window open, each of them with multiple tabs, **Chrome defines the "current window" as the one that is running the content script that makes use of the `chrome.tabs` API**. I solved it by referencing not the "current" window but the **last focused one.**