/**
 * Bootstrap Theme Management Module
 * 
 * Provides light/dark theme toggling with localStorage persistence and system preference detection.
 * See README.md for complete implementation instructions.
 * 
 * Exported functions:
 * - init(): Initialize theme on page load
 * - get(): Get current theme
 * - set(theme): Set theme to 'light' or 'dark'
 * - toggle(): Toggle between light and dark themes
 * 
 * Events:
 * - Dispatches 'themeChanged' event on document when theme changes
 */

const storageKey = "bs-theme";
const THEMES = Object.freeze({ LIGHT: "light", DARK: "dark" });

function systemPrefersDark() {
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
}

function getTheme() {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored === THEMES.LIGHT || stored === THEMES.DARK) return stored;
  } catch (e) {
    // localStorage might be unavailable (private browsing, etc.)
    console.warn("localStorage unavailable:", e);
  }
  return systemPrefersDark() ? THEMES.DARK : THEMES.LIGHT;
}

function apply(theme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
  // Dispatch custom event for theme changes
  document.dispatchEvent(new CustomEvent("themeChanged", { detail: { theme } }));
}

export function init() {
  apply(getTheme());
  
  // Listen for system preference changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    // Only apply if user hasn't set a manual preference
    try {
      if (!localStorage.getItem(storageKey)) {
        apply(e.matches ? THEMES.DARK : THEMES.LIGHT);
      }
    } catch {
      // Ignore localStorage errors
    }
  });
}

export function get() {
  return document.documentElement.getAttribute("data-bs-theme") || getTheme();
}

export function set(theme) {
  if (theme !== THEMES.LIGHT && theme !== THEMES.DARK) {
    console.warn(`Invalid theme "${theme}". Use "light" or "dark".`);
    return;
  }
  
  try {
    localStorage.setItem(storageKey, theme);
  } catch (e) {
    console.warn("Failed to save theme preference:", e);
  }
  
  apply(theme);
}

export function toggle() {
  const next = get() === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
  set(next);
  return next;
}

// Auto-initialize theme on module load
init();
