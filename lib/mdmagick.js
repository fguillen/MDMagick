// Apple.prototype.getInfo = function() {
//     return this.color + ' ' + this.type + ' apple';
// };

function MDM( inputElement ) {
  this.inputElement = inputElement;

  this.initialize = function(){
    this.controlsElement = MDM.Utils.appendControls( inputElement );
    this.previewElement  = MDM.Utils.appendPreview( inputElement );

    this.activePreview( this.inputElement, this.previewElement );
    this.activeControls( this.controlsElement );
  };

  this.activeControls = function( controlsElement ){
    console.log( "activeControls", controlsElement );
    $( controlsElement ).find( ".mdm-bold" ).click( $.proxy( this.bold, this ) );
    $( controlsElement ).find( ".mdm-italic" ).click( $.proxy( this.italic, this ) );
    $( controlsElement ).find( ".mdm-link" ).click( $.proxy( this.link, this ) );
    $( controlsElement ).find( ".mdm-title" ).click( $.proxy( this.title, this ) );
    $( controlsElement ).find( ".mdm-list" ).click( $.proxy( this.list, this ) );
  };

  this.activePreview = function( inputElement, previewElement ) {
    console.log( "activePreview.inputElement", inputElement );
    console.log( "activePreview.previewElement", previewElement );
    $(inputElement).keyup( $.proxy( this.updatePreview, this ) );
    this.updatePreview();
  };

  this.updatePreview = function(){
    console.log( "updatePreview.this", this );
    var converter = new Attacklab.showdown.converter();
    $( this.previewElement ).html(
      converter.makeHtml( $( this.inputElement ).val() )
    );
  };

  this.bold =  function(){
    console.log( "MDM.bold" );
    MDM.Actions.bold( this.inputElement );
    this.updatePreview();
  };

  this.italic =  function(){
    console.log( "MDM.italic" );
    MDM.Actions.italic( this.inputElement );
    this.updatePreview();
  };

  this.link =  function(){
    console.log( "MDM.link" );
    MDM.Actions.link( this.inputElement );
    this.updatePreview();
  };

  this.title =  function(){
    console.log( "MDM.title" );
    MDM.Actions.title( this.inputElement );
    this.updatePreview();
  };

  this.list =  function(){
    console.log( "MDM.list" );
    MDM.Actions.list( this.inputElement );
    this.updatePreview();
  };
}

MDM.Actions = {
  bold: function( inputElement ){
    console.log( "MDM.Actions.bold", inputElement );
    var selection = $( inputElement ).getSelection();
    $( inputElement ).replaceSelection( "**" + selection.text + "**" );
  },

  italic: function( inputElement ){
    console.log( "MDM.Actions.italic", inputElement );
    var selection = $( inputElement ).getSelection();
    $( inputElement ).replaceSelection( "_" + selection.text + "_" );
  },

  link: function( inputElement ){
    console.log( "MDM.Actions.link", inputElement );
    var link = prompt( "Link to URL", "http://" );
    var selection = $( inputElement ).getSelection();
    $( inputElement ).replaceSelection( "[" + selection.text + "](" + link + ")" );
  },

  title: function( inputElement ){
    console.log( "MDM.Actions.title", inputElement );
    MDM.Utils.selectWholeLines( inputElement );
    var selection = $( inputElement ).getSelection();
    var hash = (selection.text.charAt( 0 ) == "#") ? "#" : "# ";
    $( inputElement ).replaceSelection( hash + selection.text );
  },

  list: function( inputElement ){
    console.log( "MDM.Actions.list", inputElement );
    MDM.Utils.selectWholeLines( inputElement );
    var selection = $( inputElement ).getSelection();
    var text = selection.text;
    var result = "";
    var lines = text.split( "\n" );
    console.log( "lines", lines.length );
    for( var i = 0; i < lines.length; i++ ){
      console.log( "line", i, lines[i] );
      var line = $.trim( lines[i] );
      if( line.length > 0 ) result += "- " + line + "\n";
    }

    $( inputElement ).replaceSelection( result );
  }
}

MDM.Utils = {
  appendControls: function( inputElement ){
    console.log( "appendControls", inputElement );

    var element = $( MDM.Utils.controlsTemplate() );
    $(inputElement).before( element );

    return element;
  },

  appendPreview: function( inputElement ){
    console.log( "appendPreview", inputElement )

    var element = $( MDM.Utils.previewTemplate() );
    element.css( "width", $( inputElement ).css( "width" ) );
    element.css( "padding", $( inputElement ).css( "padding" ) );
    element.css( "font-size", $( inputElement ).css( "font-size" ) );
    $(inputElement).after( element );

    return element;
  },

  selectWholeLines: function( inputElement ){
    console.log( "selectWholeLines", inputElement );
    var content = $( inputElement ).val();
    var selection = $( inputElement ).getSelection();
    var iniPosition = (selection.start > 0) ? (selection.start - 1) : 0;
    var endPosition = selection.end;

    // going back until a "\n"
    while( content[iniPosition] != "\n" && iniPosition >= 0 ) {
      console.log( "content[iniPosition]", iniPosition, content[iniPosition] );
      iniPosition--;
    }

    // going forward until a "\n"
    while( content[endPosition] != "\n" && endPosition <= content.lenght ) {
      console.log( "content[endPosition]", endPosition, content[endPosition] );
      endPosition++;
    }

    console.log( "iniPosition", iniPosition );
    console.log( "endPosition", endPosition );

    $( inputElement ).setSelection( iniPosition + 1, endPosition );
  },

  controlsTemplate: function(){
    var template =
      "<div class=\"mdm-controls\">" +
      "  <ul>" +
      "    <li class=\"mdm-bold\"><a class=\"icon-bold\" href=\"#mdm-bold\"><span>B</span></a></li>" +
      "    <li class=\"mdm-italic\"><a class=\"icon-italic\" href=\"#mdm-italic\"><span>I</span></a></li>" +
      "    <li class=\"mdm-link\"><a class=\"icon-link\" href=\"#mdm-link\"><span>a</span></a></li>" +
      "    <li class=\"mdm-list\"><a class=\"icon-list\" href=\"#mdm-list\"><span>l</span></a></li>" +
      "    <li class=\"mdm-title\"><a class=\"icon-title\" href=\"#mdm-title\"><span>T</span></a></li>" +
      "  </ul>" +
      "</div>";

    return template;
  },

  previewTemplate: function(){
    var template = "<div class=\"mdm-preview\"></div>";

    return template;
  }
}

$(function(){
  $(".mdm-input").each( function( index, inputElement ){
    var mdm = new MDM( inputElement );
    mdm.initialize();
  });
});