# daycycle

A widget for showing a background gradient based on the time of day

## Installation

Just clone this repo or download these two files.

Then include this in the head of your website:

```html
<link rel="stylesheet" href="daycycle/src/assets/css/daycycle.css">
<script src="daycycle/src/submodules/suncalc/suncalc.js"></script>
<script src="daycycle/src/assets/js/daycycle.js"></script>
```

## Usage

In your HTML, include one of these:
```html
<div class="daycycle" style="height: 100vh; width: 100%; position: fixed; z-index: -1">
        </div>
```

The `[style]` attribute is entirely optional. The one in the example does a passable job of presenting the gradient as a page background if you include it first inside your `<body>` tag. Add whatever styles you want - daycycle just provides the gradient and a 24-hour animating loop moving it up and down.

## License

Daycycle is [CC0](href="https://creativecommons.org/publicdomain/zero/1.0/")

## Known issues

Daycycle currently tries to get GPS so it can customize the length of the day part of the animation, but getting GPS fails in Chrome unless you're on https.

Everything about this is slapdash. I'll work on it.