let hideEnabled = true;

function hideDifficulty() {
    const elements = document.querySelectorAll('[class*="text-difficulty-"], [class*="text-yellow"],[class*="text-lc-yellow"], [class*="text-lc-green"], [class*="text-dark-yellow"], [class*="text-olive"], [class*="text-dark-olive"], [class*="text-pink"], [class*="text-dark-pink"]');
    elements.forEach(el => { if (hideEnabled) el.style.display = 'none'; });
}

function showDifficulty() {
    const elements = document.querySelectorAll('[class*="text-difficulty-"], [class*="text-yellow"], [class*="text-lc-yellow"], [class*="text-lc-green"], [class*="text-dark-yellow"], [class*="text-olive"], [class*="text-dark-olive"], [class*="text-pink"], [class*="text-dark-pink"]');
    elements.forEach(el => { el.style.display = ''; });
}

hideDifficulty();

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
                if (node.matches('[class*="text-difficulty-"], [class*="text-yellow"], [class*="text-dark-yellow"],[class*="text-lc-yellow"],[class*="text-lc-green"], [class*="text-olive"], [class*="text-dark-olive"], [class*="text-pink"], [class*="text-dark-pink"]')) {
                    if (hideEnabled) node.style.display = 'none';
                }
                node.querySelectorAll && node.querySelectorAll('[class*="text-difficulty-"], [class*="text-yellow"],[class*="text-lc-yellow"],[class*="text-lc-green"], [class*="text-dark-yellow"], [class*="text-olive"], [class*="text-dark-olive"], [class*="text-pink"], [class*="text-dark-pink"]').forEach(el => {
                    if (hideEnabled) el.style.display = 'none';
                });
            }
        });
    });
});
observer.observe(document.body, { childList: true, subtree: true });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.toggleHide) {
        hideEnabled = !hideEnabled;
        hideEnabled ? hideDifficulty() : showDifficulty();
        sendResponse({ hideEnabled });
    }
});
