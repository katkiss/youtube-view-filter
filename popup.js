function saveOptions() {
    const threshold = document.getElementById('threshold').value;
    chrome.storage.sync.set({
        viewThreshold: parseInt(threshold)
    }, function () {
        const status = document.getElementById('status');
        status.textContent = 'Saved!';
        setTimeout(function () {
            status.textContent = '';
        }, 2000);

        // Reload the active tab after 1 second
        setTimeout(() => {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.reload(tabs[0].id);
            });
        }, 1000);
    });
}

function restoreOptions() {
    chrome.storage.sync.get({
        viewThreshold: 1000 // default value
    }, function (items) {
        document.getElementById('threshold').value = items.viewThreshold;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions); 