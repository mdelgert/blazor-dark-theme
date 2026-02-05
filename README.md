# Blazor Dark Theme

A Bootstrap 5.3+ dark mode implementation for Blazor Server applications with theme persistence and toggle functionality.

## Overview

This project demonstrates how to implement a light/dark theme toggle in Blazor Server 9 using Bootstrap 5.3+'s native dark mode support. The theme preference is stored in localStorage and persists across sessions. If no preference is set, it defaults to the system's color scheme preference.

## Prerequisites

- Bootstrap 5.3 or higher (dark mode support)
- Blazor Server 9
- Update your `bootstrap.min.css` and `bootstrap.min.css.map` to version 5.3+

## Implementation Steps

### 1. Create the Theme Module

Add the JavaScript theme module to `wwwroot/js/bs-theme.mjs`:
- This file provides functions for theme management
- See the existing file for the complete implementation

### 2. Update `Components/App.razor`

Add the following script tag to include the theme module:

```razor
<script type="module" src="js/bs-theme.mjs"></script>
```

This should be added in the `<head>` section or before the closing `</body>` tag.

### 3. Update `Components/Routes.razor`

Add the interactive render mode to enable client-side interactivity:

```razor
@rendermode InteractiveServer
```

This allows Blazor components to use JSInterop for theme toggling.

### 4. Create `Components/Layout/ThemeToggle.razor`

Create a theme toggle component to allow users to switch between light and dark modes.
This component should use JSInterop to call the JavaScript functions from `bs-theme.mjs`.

### 5. Update CSS Files

Remove hardcoded style rules that conflict with theme toggle functionality from:
- `Components/Layout/MainLayout.razor.css`
- `Components/Layout/NavMenu.razor.css`
- `wwwroot/app.css`

Instead, use CSS variables or Bootstrap's data attributes to allow dynamic theming.
Example: Use `var(--bs-body-bg)` instead of hardcoded colors.

### 6. Update HTML Root Element

Ensure the HTML element supports the theme attribute (already handled by the JavaScript module):

```html
<html lang="en" data-bs-theme="dark">
```

The theme module will automatically set this attribute based on user preference or system settings.

## How It Works

1. **Theme Initialization**: On page load, the module checks localStorage for a saved theme preference
2. **System Preference Fallback**: If no preference exists, it uses the system's color scheme preference
3. **Persistence**: User selections are saved to localStorage and persist across sessions
4. **Toggle Functionality**: Users can switch between light and dark modes via the ThemeToggle component

## API Reference

The `bs-theme.mjs` module exports the following functions:

- `init()`: Initialize the theme on page load
- `get()`: Returns the current theme ('light' or 'dark')
- `set(theme)`: Sets the theme to 'light' or 'dark'
- `toggle()`: Toggles between light and dark themes and returns the new theme

## Resources

- [Stack Overflow Discussion](https://stackoverflow.com/questions/79243591/how-to-set-dark-theme-in-blazor-project)
- [Bootstrap 5.3 Dark Mode Documentation](https://getbootstrap.com/docs/5.3/customize/color-modes/)

## License

See [LICENSE](LICENSE) file for details.