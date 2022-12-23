/**@type {string} */
let display_value;
/**@type {HTMLDivElement} */
let elm;
const STORAGE_KEY = 'twitter_banner_hide_state';
/**
 *
 * @param {'log' | 'debug' | 'error'} type
 * @param  {...any} args
 */
const logger = (type, ...args) => {
    for (const arg of args) {
        console[type]('[TTLB]::', arg);
    }
};

const cacheBanner = () => {
    const _elm = document.querySelector('[data-testid="BottomBar"]');
    if (!_elm) {
        logger('debug', 'Could not find the bottom bar conatiner');
        return;
    }
    if (!_elm.querySelector('a[href="/login"]')) {
        logger('debug', 'Could not "a[href="/login"]" inside the bottom bar');
        return;
    }
    elm = _elm;
    if (display_value === undefined) {
        display_value = elm.style.display;
    }
};

const oneTimeObserver = new MutationObserver(async () => {
    try {
        cacheBanner();
        const r = await localGet(STORAGE_KEY);
        act(r[STORAGE_KEY].action);
    } catch (e) {
        logger('error', e);
    } finally {
        oneTimeObserver.disconnect();
        logger('debug', 'observer disconnected');
    }
});

const localSet = (key, value) => chrome.storage.local.set({ [key]: value });
const localGet = key => chrome.storage.local.get([key]);

const act = action => {
    if (action === 'show') {
        elm.style.display = display_value;
    } else if (action === 'hide') {
        elm.style.display = 'none';
    }
    logger('debug', 'action::', action);
    localSet(STORAGE_KEY, { action });
};

oneTimeObserver.observe(document.getElementById('react-root'), {
    subtree: true,
    attributes: true,
});
logger('debug', 'observer connected');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>
    act(request.action)
);
