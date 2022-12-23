let display_value;
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

const findAndToggleBanner = () => {
    /**
     * @type {MaybeDivElement}
     */
    const elm = document.querySelector('[data-testid="BottomBar"]');
    if (!elm) {
        logger('debug', 'Could not find the bottom bar conatiner');
        return;
    }
    if (!elm.querySelector('a[href="/login"]')) {
        logger('debug', 'Could not "a[href="/login"]" inside the bottom bar');
        return;
    }
    if (display_value === undefined) {
        display_value = elm.style.display;
    }
    const display = elm.style.display;
    elm.style.display = display === 'none' ? display_value : 'none';
    logger('debug', `toggled display to --> "${elm.style.display}"`);
};

const observer = new MutationObserver(() => {
    try {
        findAndToggleBanner();
    } catch (e) {
        logger('error', e);
    } finally {
        observer.disconnect();
        logger('debug', 'observer disconnected');
    }
});

observer.observe(document.getElementById('react-root'), {
    subtree: true,
    attributes: true,
});
logger('debug', 'observer connected');

/**
 * @typedef {HTMLDivElement | null | undefined} MaybeDivElement
 */
