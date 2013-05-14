# MDMagick

jQuery plugin to add MarkDown butttons and preview to any kind of input field.

Check the [demo page](http://fguillen.github.com/MDMagick)

## How it works

A special control buttons will be added on top of the selected input field with commands like:

* bold
* italic
* link
* list
* title
* image

And a preview div will be added on the bottom of the selected input field with a MarkDown previsualization of the selected input field content.

## Version

* 0.0.1 (but already in production applications)

## Usage

### Explicitly

Using the `$(<selector>).mdmagick()` call:

    <textarea id="my-textarea"></textarea>
    <script>
      $(function(){ $("#my-textarea").mdmagick(); })
    </script>

or Implicitly:

Adding the special class `mdm-input` to any input field:

    <textarea class="mdm-input"></textarea>

## Browsers support

Tested in:

* (OSX) Chrome 21.0.1180.57
* (OSX) Firefox 8.0.1
* (OSX) Safari 6.0

## Dependencies

* jquery
* [a-tools](http://archive.plugins.jquery.com/project/a-tools)
* [showdown](https://github.com/coreyti/showdown/)

## Install

##### 1. Download [the last version of the code](https://github.com/fguillen/MDMagick/zipball/master).
##### 2. Unzip the package
##### 3. Copy `vendor`, `lib` and `assets` folders to a _public_ folder in your web application. Let's call it `mdmagick`.
##### 4. Import the dependencies:

    <script src="./mdmagick/vendor/jquery.js" type="text/javascript" charset="utf-8"></script>
    <script src="./mdmagick/vendor/a-tools.js" type="text/javascript" charset="utf-8"></script>
    <script src="./mdmagick/vendor/showdown.js" type="text/javascript" charset="utf-8"></script>

##### 5. Import the mdmagick plugin:

    <script src="./mdmagick/lib/mdmagick.js" type="text/javascript" charset="utf-8"></script>

##### 6. Import the mdmagick styles and icons

    <link rel="stylesheet" href="./mdmagick/assets/mdmagick.css" ></style>
    <link rel="stylesheet" href="./mdmagick/assets/icon_font/style.css" />
    <!--[if lte IE 7]><script src="./mdmagick/assets/icon_font/lte-ie7.js"></script><![endif]-->

##### 7. You are ready!

**Note**: if you application is already importing some of the _dependencies_ you have not to do it twice.

## FAQ

### How to silent the log:

Add:

    <script> window.MDM_SILENT = true; </script>

Before the:

    <script src="./lib/mdmagick.js" type="text/javascript" charset="utf-8"></script>


## TODO

* Check for performance issues
* Improve the slideOut and In animations

## Attributions

* Icons used in the control div from: [IcoMoon](http://keyamoon.com/icomoon/#toHome)


## License

MIT License

Copyright (c) 2012 Fernando Guillen Suarez

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

