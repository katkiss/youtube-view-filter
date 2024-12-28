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