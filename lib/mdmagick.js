// Apple.prototype.getInfo = function() {
//     return this.color + ' ' + this.type + ' apple';
// };

function MDM( inputElement ) {
  this.inputElement = inputElement;

  this.initialize = function(){
    this.controlsElement = MDM.Utils.appendControls( inputElement );
    this.previewElement  = MDM.Utils.appendPreview( inputElement );

    this.activatePreview( this.inputElement, this.previewElement );
    this.activateControls( this.controlsElement );
    this.activateInput( this.inputElement, this.controlsElement, this.previewElement );
  };

  this.activateControls = function( controlsElement ){
    $( controlsElement ).find( ".mdm-bold" ).click( $.proxy( this.bold, this ) );
    $( controlsElement ).find( ".mdm-italic" ).click( $.proxy( this.italic, this ) );
    $( controlsElement ).find( ".mdm-link" ).click( $.proxy( this.link, this ) );
    $( controlsElement ).find( ".mdm-title" ).click( $.proxy( this.title, this ) );
    $( controlsElement ).find( ".mdm-list" ).click( $.proxy( this.list, this ) );
  };

  this.activatePreview = function( inputElement, previewElement ) {
    $(inputElement).keyup( $.proxy( this.updatePreview, this ) );
    this.updatePreview();
  };

  this.activateInput = function( inputElement, controlsElement, previewElement ){
    $(inputElement).focus( function(){
      $(controlsElement).addClass( "focus" );
      $(previewElement).addClass( "focus" );
      $(controlsElement).removeClass( "blur" );
      $(previewElement).removeClass( "blur" );
    });

    $(inputElement).blur( function(){
      $(controlsElement).removeClass( "focus" );
      $(previewElement).removeClass( "focus" );
      $(controlsElement).addClass( "blur" );
      $(previewElement).addClass( "blur" );
    });
  };

  this.updatePreview = function(){
    var converter = new Attacklab.showdown.converter();
    $( this.previewElement ).html(
      converter.makeHtml( $( this.inputElement ).val() )
    );
  };

  this.bold =  function(){
    MDM.Actions.bold( this.inputElement );
    this.updatePreview();
  };

  this.italic =  function(){
    MDM.Actions.italic( this.inputElement );
    this.updatePreview();
  };

  this.link =  function(){
    MDM.Actions.link( this.inputElement );
    this.updatePreview();
  };

  this.title =  function(){
    MDM.Actions.title( this.inputElement );
    this.updatePreview();
  };

  this.list =  function(){
    MDM.Actions.list( this.inputElement );
    this.updatePreview();
  };

  this.initialize();
}

MDM.Actions = {
  bold: function( inputElement ){
    var selection = $( inputElement ).getSelection();
    $( inputElement ).replaceSelection( "**" + selection.text + "**" );
  },

  italic: function( inputElement ){
    var selection = $( inputElement ).getSelection();
    $( inputElement ).replaceSelection( "_" + selection.text + "_" );
  },

  link: function( inputElement ){
    var link = prompt( "Link to URL", "http://" );
    var selection = $( inputElement ).getSelection();
    $( inputElement ).replaceSelection( "[" + selection.text + "](" + link + ")" );
  },

  title: function( inputElement ){
    MDM.Utils.selectWholeLines( inputElement );
    var selection = $( inputElement ).getSelection();
    var hash = (selection.text.charAt( 0 ) == "#") ? "#" : "# ";
    $( inputElement ).replaceSelection( hash + selection.text );
  },

  list: function( inputElement ){
    MDM.Utils.selectWholeLines( inputElement );
    var selection = $( inputElement ).getSelection();
    var text = selection.text;
    var result = "";
    var lines = text.split( "\n" );
    for( var i = 0; i < lines.length; i++ ){
      var line = $.trim( lines[i] );
      if( line.length > 0 ) result += "- " + line + "\n";
    }

    $( inputElement ).replaceSelection( result );
  }
}

MDM.Utils = {
  appendControls: function( inputElement ){
    var element = $( MDM.Utils.controlsTemplate() );
    $(inputElement).before( element );

    return element;
  },

  appendPreview: function( inputElement ){
    var element = $( MDM.Utils.previewTemplate() );
    element.css( "width", $( inputElement ).css( "width" ) );
    // element.css( "padding", $( inputElement ).css( "padding" ) );
    element.css( "font-size", $( inputElement ).css( "font-size" ) );
    $(inputElement).after( element );

    return element;
  },

  selectWholeLines: function( inputElement ){
    var content = $( inputElement ).val();
    var selection = $( inputElement ).getSelection();
    var iniPosition = (selection.start > 0) ? (selection.start - 1) : 0;
    var endPosition = selection.end;

    // going back until a "\n"
    while( content[iniPosition] != "\n" && iniPosition >= 0 ) {
      iniPosition--;
    }

    while( content[endPosition] != "\n" && endPosition <= content.length ) {
      endPosition++;
    }

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
  console.info( "loading MDMagick..." );

  jQuery.fn.mdmagick = function(){
    this.each( function( index, inputElement ){
      var mdm = new MDM( inputElement );
    });
  };

  $(".mdm-input").mdmagick();
});
