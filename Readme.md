
## User guide for this extension

1. Add extension to your chrome browser.
2. Search for a job in LinkedIn, Glassdoor, Indeed, etc. 
3. When you want to the save the job, go to that URL, and click on the extension.
4. This needs minimal of your effort. Smart suggestions would have already filled the form details before. You just need to check, edit the way you want and save it.
5. Once you save the form, you could probably see in the list present with heading "Saved pages". 
6. That's it. Now you have saved your job. You will redirect to the job page by clicking on the extension. 
7. Now if you want to delete a particular job, you can click on delete button present.

## API's used

1. chrome.tabs ([https://developer.chrome.com/extensions/tabs](https://developer.chrome.com/extensions/tabs))
2. chrome.storage([https://developer.chrome.com/apps/storage](https://developer.chrome.com/apps/storage))

### Challenges resolved

I didn't use **currentTab** in quering for the current url because if the user has more than one window open, each of them with multiple tabs, **Chrome defines the "current window" as the one that is running the content script that makes use of the `chrome.tabs` API**. I solved it by referencing not the "current" window but the **last focused one.**