window.fetch = window.fetch || function() {};
class Github {

    contentTypes = [];

    constructor() {

        this.loadManifest().then(data => {

            console.log(data);

            const pageheadActionsElement = document.querySelector('.pagehead-actions');

            let items = [
                {
                    heading: 'Humans',
                    description: 'This is a human description.',
                    href: ''
                },
                {
                    heading: 'Sponsors',
                    description: 'This is a sponsor description.',
                    href: ''
                }
            ];

            pageheadActionsElement.insertAdjacentHTML('afterbegin',
`
    <li class="cdcm-editor">
    
        <div class="select-menu js-menu-container js-select-menu">
            
            <a href="#" class="btn btn-sm btn-with-count select-menu-button js-menu-target" role="button" aria-haspopup="true" aria-expanded="false" aria-label="Toggle repository notifications menu">
                <span class="js-select-button">Content Types</span>
            </a>
            
            <a class="social-count js-social-count" href="#" aria-label="${items.length} content types">${items.length}</a>
        
            <div class="select-menu-modal-holder">
                <div class="select-menu-modal subscription-menu-modal js-menu-content">
                    <div class="select-menu-header js-navigation-enable" tabindex="-1">
                        <span class="select-menu-title">Click to Edit</span>
                    </div>
                    <div class="select-menu-list js-navigation-container" role="menu">
                        ${items.map(item => `
                        <div class="select-menu-item js-navigation-item selected" role="menuitem" tabindex="0" onclick=${item.href}">
                            <div class="select-menu-item-text">
                                <span class="select-menu-item-heading">${item.heading}</span>
                                <span class="description">${item.description}</span>
                            </div>
                        </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
        </div>
        
    </li>
`);

        });

    }

    loadManifest() {

        const pathParts = window.location.pathname.substr(1).split('/');

        const repoPath = pathParts.slice(0, 2).join('/'),
            repoContentsPath = 'https://api.github.com/repos/' + repoPath + '/contents/cdcm.json';

        return window.fetch(repoContentsPath)
            .then((res) => res.json());
    }

    static isCDCMRepo() {

        if ('github.com' !== window.location.host) {
            return Promise.reject('Not github.com.');
        }

        const pathParts = window.location.pathname.substr(1).split('/');

        if (pathParts.length < 2) {
            return Promise.reject('Not a github repo.');
        }

        const repoPath = pathParts.slice(0, 2).join('/'),
            repoContentsPath = 'https://api.github.com/repos/' + repoPath + '/contents';

        return window.fetch(repoContentsPath)
            .then(function(res) {
                return res.json().then(function(files) {
                    if (files.filter(file => 'cdcm.json' === file.name).length) {
                        return Promise.resolve('');
                    }
                    return Promise.reject('Not a cdcm repo.');
                });
            });
    }

}