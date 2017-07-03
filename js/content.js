Github.isCDCMRepo()
    .then(() => {

        chrome.runtime.sendMessage({ isCDCMRepo: true });

        new Github();
    })
    .catch(error => {

        chrome.runtime.sendMessage({ isCDCMRepo: false });
        // console.error(error);
    });