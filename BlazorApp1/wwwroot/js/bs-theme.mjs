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

// Auto-initialize theme on module load
init();
