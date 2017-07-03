//noinspection JSCheckFunctionSignatures
chrome.runtime.onMessage.addListener((request, sender) => {

    if (request.isCDCMRepo) {

        let iconPaths = {
            '16': 'img/icon16.png',
            '48': 'img/icon48.png',
            '128': 'img/icon128.png'
        };

        if (!request.isCDCMRepo) {
            iconPaths = {
                '16': 'img/icon-bw16.png',
                '48': 'img/icon-bw48.png',
                '128': 'img/icon-bw128.png'
            };
        }

        chrome.browserAction.setIcon({
            path: iconPaths,
            tabId: sender.tab.id
        });
    }
});