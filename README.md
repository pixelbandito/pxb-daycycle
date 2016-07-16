# \<pxb-daycycle\>

Fills a space with a gradient based on the sky at a time of day.

## Usage

In your HTML, include one of these:
```html
<pxb-daycycle></pxb-daycycle>
```

You can add a `[style]` attribute to stop pxb-daycycle from filling the screen. By default, it does a passable job of presenting the gradient as a page background if you include it first inside your `<body>` tag. Add whatever styles you want - daycycle just provides the gradient and a 24-hour animating loop moving it up and down.

## License

Daycycle is [CC0](href="https://creativecommons.org/publicdomain/zero/1.0/")

## Known issues

Daycycle currently tries to get GPS so it can customize the length of the day part of the animation, but getting GPS fails in Chrome unless you're on https.

Everything about this is slapdash. I'll work on it.

## Development

### Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your application locally.

### Viewing Your Application

```
$ polymer serve
```

### Building Your Application

```
$ polymer build
```

This will create a `build/` folder with `bundled/` and `unbundled/` sub-folders
containing a bundled (Vulcanized) and unbundled builds, both run through HTML,
CSS, and JS optimizers.

You can serve the built versions by giving `polymer serve` a folder to serve
from:

```
$ polymer serve build/bundled
```

### Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
