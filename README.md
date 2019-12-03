## Description

### - Who this project is for?
- This extension is dedicated to counting the points in brackets on boards in Asana
- Useful for following scrum for developers and teams to estimate work

### - Why do they use it?
- Easily glance at points in a sprint

---

## Installing and getting the project running
```
git clone git@github.com:BenefitMany/AsanaCounterExtension.git
cd AsanaCounterExtension/
```

To do Development on the project go to `chrome://extensions/`
- Make sure you are in development mode.
- Load unpacked extension
- Point to the directory you just cloned.
- Reload on changes to test updates made.

Almost all the logic for this extension is in /src/inject/inject.js

---

## Formatting Guidelines
- The goal of this project is to be short and concise. The size goal of this extension to stay under 10kbs.

## Todo
 - Make the project easier to trace through.
 - Add screenshots
 - Minimal Styling (Right alignment and maybe a background color)

## FAQS
- Can you add this feature?
  - Yes, probably if it's within reason and within the scope of this project.

- What's the difference between this and other extensions that do the same thing?
  - Size is under 8kb and very general purpose.
  - Constant updates, if this breaks on boards it's usually fixed within 48 hours.
  - Under 100 lines of code and updates based off ticket movement.
