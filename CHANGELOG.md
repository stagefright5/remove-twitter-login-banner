# Remove Twitter Login Banner

## 0.0.1

- Toggle display of the bottom banner containing the "/login" link to `none` on page load
- Use "popup" action to get user input
- Use `chrome.storage.local` to persist the setting for the current browser
- Query all the tabs with url "https://twitter.com/*" to dispatch action based on user input
