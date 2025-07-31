# Frontend Mentor - Time tracking dashboard solution

This is a solution to the [Time tracking dashboard challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Switch between viewing Daily, Weekly, and Monthly stats

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [https://skhbabez.github.io/time-tracking-dashboard-main/](https://skhbabez.github.io/time-tracking-dashboard-main/)
- Live Site URL: [https://github.com/skhbabez/time-tracking-dashboard-main/](https://github.com/skhbabez/time-tracking-dashboard-main/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- javascript

### What I learned

I learned how to use data attributes as well how to utilize css to stlye interactive and accessible radiobuttons.

```css
.toggle-btn {
  /* Radio button design*/
  & label {
    font-size: inherit;
    font-weight: inherit;
    color: var(--purple-500);
  }
  input {
    &[type="radio"] {
      opacity: 0;
      position: absolute;
    }
    &[type="radio"]:checked + label {
      color: white;
    }
    &[type="radio"]:focus-visible + label {
      outline: 1px solid var(--navy-200);
      border-radius: 4px;
    }
  }
}
```

I am espacially Proud of how I managed to update the state without any rerenders, insted folowing the advice on frontendmentor to update using data attributes. This made the page a lot more stabel and allowed me to focus more on the css side instead of complicated update logic.

```js
const timeCards = reportContainer.querySelectorAll(`[data-time]`);
radioButtons.forEach((btn) => {
  btn.addEventListener("change", (event) => {
    const timeFrame = event.currentTarget.value;
    timeCards.forEach((item) => {
      if (item.dataset.time !== timeFrame) {
        item.dataset.hidden = "true";
      } else {
        item.dataset.hidden = "false";
      }
    });
  });
});
```

### Continued development

This was surprisingly challenging as i ran into some interesting problems with anti aliasing and strange dom update behaviour. I am looking forwarrd to the accessibility section of the course, since I feel like I can still improve a lot in this regard.

### Useful resources

- [Radio accesibilty](https://stackoverflow.com/questions/23130072/how-can-i-make-my-modified-radio-buttons-tabbable) - Helpful resource for how to design accessible radio buttons
- [Dom Update Issue](https://stackoverflow.com/questions/72554580/event-listeners-get-removed-after-adding-removing-some-elements-of-a-list) - This explained, why insertHtml was killing my References and Event Listeners and provided a meaningful alternative.
