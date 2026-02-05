(function () {
    const storageKey = "bs-theme";

    function systemPrefersDark() {
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    function getTheme() {
        const stored = localStorage.getItem(storageKey);
        if (stored === "light" || stored === "dark") return stored;
        return systemPrefersDark() ? "dark" : "light";
    }

    function apply(theme) {
        document.documentElement.setAttribute("data-bs-theme", theme);
    }

    // Apply ASAP
    apply(getTheme());

    // ✅ Don’t overwrite if already present
    window.bsTheme ??= {
        init: function () { apply(getTheme()); },
        get: function () { return document.documentElement.getAttribute("data-bs-theme") || getTheme(); },
        set: function (theme) { localStorage.setItem(storageKey, theme); apply(theme); },
        toggle: function () {
            const next = (window.bsTheme.get() === "dark") ? "light" : "dark";
            window.bsTheme.set(next);
            return next;
        }
    };
})();
