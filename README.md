# MDMagick

Add MarkDown butttons and preview to any kind of input field.

Check the [demo page](http://fguillen.github.com/MDMagick)

## How it works

A special control buttons will be added on top of the selected input field with commands like:

* bold
* italic
* link
* list
* title

And a preview div will be added on the bottom of the selected input field with a MarkDown previsualization of the selected input field content.

## Usage

### Explicitly

Using the `$(<selector>).mdmagick()` call:

    <textarea id="my-textarea"></textarea>
    <script>
      $(function(){
        $("#my-textarea").mdmagick();
      })
    </script>

or Implicitly:

Adding the special class `mdm-input` to any input field:

    <textarea class="mdm-input"></textarea>

## Dependencies

* jquery
* a-tools
* showdown

## License

Creative Commons BY

## Attributions

* Icons used in the control div from: [IcoMoon](http://keyamoon.com/icomoon/#toHome)