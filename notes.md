# Functional Requirements and Notes

Light/Dark Mode toggle -- takes system preference by default, but can override with toggle

- What HTML markup to use (accessible) -- https://scottaohara.github.io/a11y_styled_form_controls/src/radio-button--switch/

 - Use fieldset, legend, radio inputs

- Switching between light/dark mode via JS
- Prefers-color-scheme media query -- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme

- Three option toggle: light/dark/system pref -- https://codepen.io/renddrew/pen/bRomab

CSS Variables (custom properties) -- https://css-tricks.com/updating-a-css-variable-with-javascript/

Accessibility
- Use correct heading tags
- Screenreader-only text for card titles/username -- https://www.accessibility-developer-guide.com/examples/hiding-elements/visually/

BEM = Block Element Modifier

- Examples
Block = card
Element = icon, platform, count, change, etc.
Modifier = facebook, twitter, etc.

card
card__icon
card__icon--facebook
card__username

card__count
card__count--big, card__count--small
card__label

card__change
card__change--up, card__change--down