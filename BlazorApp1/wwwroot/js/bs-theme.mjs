/*
To implement in blazor server 9 add this file to wwwroot/js/bs-theme.mjs and add the following line to:
Components\App.razor
<script type="module" src="js/bs-theme.mjs"></script>

Update the following line to:
Components\Routes.razor to include the following line:
@rendermode InteractiveServer

This will allow the theme to be set and toggled from Blazor components using JSInterop. The theme preference is stored in localStorage 
and will persist across sessions. If no preference is set, it will default to the system's color scheme preference.

Update the following CSS files to remove hardcode style rules that conflict with the theme toggle functionality. 
Instead, use CSS variables or data attributes to allow dynamic theming:
Components\Layout\MainLayout.razor.css
Components\Layout\NavMenu.razor.css
wwwroot\app.css

Add the following files to your project to complete the implementation:
Components\Layout\ThemeToggle.razor

*/

const storageKey = "bs-theme";

function systemPrefersDark() {
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
}

function getTheme() {
  const stored = localStorage.getItem(storageKey);
  if (stored === "light" || stored === "dark") return stored;
  return systemPrefersDark() ? "dark" : "light";
}

function apply(theme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
}

export function init() {
  apply(getTheme());
}

export function get() {
  return document.documentElement.getAttribute("data-bs-theme") || getTheme();
}

export function set(theme) {
  if (theme !== "light" && theme !== "dark") return;
  localStorage.setItem(storageKey, theme);
  apply(theme);
}

export function toggle() {
  const next = (get() === "dark") ? "light" : "dark";
  set(next);
  return next;
}
