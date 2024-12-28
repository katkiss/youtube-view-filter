let viewThreshold = 1000; // Default value,  updated from storage

// Get the threshold from storage
chrome.storage.sync.get(['viewThreshold'], function (result) {
    if (result.viewThreshold) {
        viewThreshold = result.viewThreshold;
    }
});

// Listen for threshold updates
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes.viewThreshold) {
        viewThreshold = changes.viewThreshold.newValue;
        debouncedHideNoViewVideos(); // Re-run filtering with new threshold
    }
});



function parseViewCount(viewText) {
    if (!viewText || viewText === 'no views') return 0;

    // Remove 'views' and any verification badges from the text
    viewText = viewText.replace(/views?/i, '')
        .replace(/•/g, '')
        .trim();

    // Handle K, M, B suffixes
    const multipliers = {
        'K': 1000,
        'M': 1000000,
        'B': 1000000000
    };

    // Extract number and suffix
    const match = viewText.match(/^([\d,.]+)\s*([KMB])?$/i);
    if (!match) {
        return 0;
    }

    let [_, number, suffix] = match;

    // Remove commas and convert to number
    number = parseFloat(number.replace(/,/g, ''));

    // Apply multiplier if suffix exists
    if (suffix && multipliers[suffix.toUpperCase()]) {
        number *= multipliers[suffix.toUpperCase()];
    }

    return number;
}

function getAllVideoItems() {
    // Using multiple selector strategies
    const selectors = [
        'ytd-rich-item-renderer',
        'ytd-video-renderer',
        'ytd-grid-video-renderer'
    ];

    return [...document.querySelectorAll(selectors.join(','))];
}

function getViewCountElement(videoItem) {
    // Try multiple selector strategies
    const selectors = [
        '#metadata-line span:nth-child(1)',
        '#metadata-line span:first-child',
        'ytd-video-meta-block div[id="metadata-line"] span:first-child',
        'div[id="metadata-line"] span:first-child'
    ];

    for (const selector of selectors) {
        const element = videoItem.querySelector(selector);
        if (element) {
            return element;
        }
    }

    // Try XPath as fallback
    const xpath = './/*[@id="metadata-line"]/span[1]';
    const result = document.evaluate(xpath, videoItem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return result.singleNodeValue;
}


function hideNoViewVideos() {

    const videoItems = getAllVideoItems();

    videoItems.forEach((item, index) => {
        const viewCountElement = getViewCountElement(item);

        if (viewCountElement) {
            const viewText = viewCountElement.textContent.trim().toLowerCase();

            const viewCount = parseViewCount(viewText);

            if (viewCount < viewThreshold) {
                item.classList.add('low-views');

                // Add hidden-video class after animation completes
                item.addEventListener('transitionend', () => {
                    item.classList.add('hidden-video');
                }, { once: true });
            } else {
                item.classList.remove('low-views');
                item.classList.remove('hidden-video');
            }
        } else {
        }
    });
}

// Debounce function to prevent too frequent updates
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced version of hideNoViewVideos
const debouncedHideNoViewVideos = debounce(hideNoViewVideos, 250);

// Run initially after a short delay to ensure page is loaded
setTimeout(debouncedHideNoViewVideos, 1500);

// Create observer for dynamic content loading
const observer = new MutationObserver((mutations) => {
    debouncedHideNoViewVideos();
});

// Start observing changes
const config = { childList: true, subtree: true };
observer.observe(document.body, config);
