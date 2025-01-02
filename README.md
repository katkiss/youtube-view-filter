# YouTube View Filter

A Chrome extension that helps you filter YouTube videos based on view count, allowing you to focus on content with your desired level of popularity.

## Features

- 🎯 Filter videos based on minimum view count threshold
- 🎨 Subtle visual indicators for filtered videos
- ⚡ Real-time filtering as you browse
- 🔄 Persistent settings across browser sessions
- 🖱️ Hover to preview filtered videos

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

Or just download from chrome
[Download](https://chromewebstore.google.com/detail/youtube-view-filter/jnbddcablfaiiciijfogiglfbbpeopdf)
## Usage

1. Click the extension icon in your Chrome toolbar
2. Enter your desired minimum view count threshold
3. Click "Save Settings" to apply the filter
4. Browse YouTube normally - videos below your threshold will be automatically filtered

The extension will:
- Fade out videos below the threshold
- Add a grayscale effect to filtered videos
- Display a small badge indicating low view count
- Allow you to hover over filtered videos to preview them

## How It Works

The extension uses:
- Chrome Storage API to persist user settings
- MutationObserver to handle YouTube's dynamic content loading
- Custom CSS transitions for smooth visual effects
- Intelligent view count parsing (supports K, M, B suffixes)

## Permissions

The extension requires minimal permissions:
- `activeTab`: To interact with YouTube pages
- `storage`: To save your view threshold settings

## Permission Justifications

### Required Permissions

#### `activeTab`
This permission is required to:
- Detect and read video view counts from the current YouTube page
- Apply visual filters to videos that fall below the threshold
- Ensure the extension only works when you're actively viewing YouTube

We use this instead of broader permissions to maintain minimal access to your browsing activity.

#### `storage`
This permission is required to:
- Save your preferred view count threshold
- Persist your settings between browser sessions
- Sync your preferences across devices when you're signed into Chrome

### Host Permissions

#### `*://*.youtube.com/*`
This permission is required to:
- Allow the extension to function only on YouTube domains
- Monitor YouTube's dynamic content loading
- Apply filters to YouTube video elements

We specifically limit the extension to YouTube domains for security and privacy reasons.

## Development

The extension consists of several key files:
- `manifest.json`: Extension configuration
- `content.js`: Main filtering logic
- `popup.html/js`: Settings interface
- `styles.css`: Visual styling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

YoGoUrT - [GitHub Profile](https://github.com/YoGoUrT20)

## Acknowledgments

- YouTube's DOM structure and selectors
- Chrome Extensions API
- Contributors and users who provide feedback