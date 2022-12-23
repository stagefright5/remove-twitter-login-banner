const actions = {
    true: 'hide',
    false: 'show',
    hide: true,
    show: false,
};
const STORAGE_KEY = 'twitter_banner_hide_state';
/**
 * @type {HTMLInputElement}
 */
const selectElement = document.querySelector('#toggle-twiter-login-banner');

selectElement?.addEventListener('change', ev =>
    onCheckboxToggle(ev.target.checked)
);

const onCheckboxToggle = checked => {
    chrome.tabs.query({ url: 'https://twitter.com/*' }, tabs => {
        if (!Array.isArray(tabs)) {
            tabs = [tabs];
        }
        for (const tab of tabs) {
            chrome.tabs.sendMessage(tab.id, {
                action: actions[checked],
            });
        }
        // const display = elm.style.display;
        // elm.style.display = display === 'none' ? display_value : 'none';
        // logger('debug', `toggled display to --> "${elm.style.display}"`);
    });
};

chrome.storage.local.get([STORAGE_KEY]).then(r => {
    selectElement.checked = actions[r[STORAGE_KEY].action];
    onCheckboxToggle(selectElement.checked);
});
