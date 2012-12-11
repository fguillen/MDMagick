describe( "MDMagick", function(){
  afterEach(function() {
    $("#section-2 .mdm-input").val( "This is the text, with **bold** and _italic_." );
  });

  describe("MDM Loading", function() {
    it("authomatic mdm-input elements should have mdm-buttons div", function() {
      expect( $("#section-2 .mdm-buttons").length ).toEqual( 1 )
    });

    it("authomatic mdm-input elements should have mdm-preview div", function() {
      expect( $("#section-2 .mdm-preview").length ).toEqual( 1 );
    });

    it("non authomatic mdm-input elements should not have mdm-buttons div", function() {
      expect( $("#section-1 .mdm-buttons").length ).toEqual( 0 );
      expect( $("#section-3 .mdm-buttons").length ).toEqual( 0 );
    });

    it("non authomatic mdm-input elements should not have mdm-previw div", function() {
      expect( $("#section-1 .mdm-preview").length ).toEqual( 0 );
      expect( $("#section-3 .mdm-preview").length ).toEqual( 0 );
    });

    it("input field should be converted to a MDMagick input", function() {
      $("#textarea-1").mdmagick();
      expect( $("#section-1 .mdm-buttons").length ).toEqual( 1 );
      expect( $("#section-1 .mdm-preview").length ).toEqual( 1 );
    });

    it("preview should be updated in initialization", function() {
      expect( $("#section-2 .mdm-preview").html() ).toEqual( "<p>This is the text, with <strong>bold</strong> and <em>italic</em>.</p>" );
    });
  });

  describe("MDM User interaction", function() {
    beforeEach(function() {
    });

    it("preview should be updated when user keyup", function() {
      $("#section-2 .mdm-input").val( "another **text**." );
      expect( $("#section-2 .mdm-preview").html() ).toEqual( "<p>This is the text, with <strong>bold</strong> and <em>italic</em>.</p>" );
      $("#section-2 .mdm-input").keyup();
      expect( $("#section-2 .mdm-preview").html() ).toEqual( "<p>another <strong>text</strong>.</p>" );
    });

    it("should bold text", function() {
      $("#section-2 .mdm-input").setSelection(0,4);
      $("#section-2 .mdm-buttons .mdm-bold").click();
      expect( $("#section-2 .mdm-preview").html() ).toEqual( "<p><strong>This</strong> is the text, with <strong>bold</strong> and <em>italic</em>.</p>" );
    });

    it("should italic text", function() {
      $("#section-2 .mdm-input").setSelection(0,4);
      $("#section-2 .mdm-buttons .mdm-italic").click();
      expect( $("#section-2 .mdm-preview").html() ).toEqual( "<p><em>This</em> is the text, with <strong>bold</strong> and <em>italic</em>.</p>" );
    });

    it("should title text", function() {
      $("#section-2 .mdm-input").setSelection(0,4);
      $("#section-2 .mdm-buttons .mdm-title").click();
      expect( $("#section-2 .mdm-preview").html() ).toEqual( "<h1>This is the text, with <strong>bold</strong> and <em>italic</em>.</h1>" );
      $("#section-2 .mdm-buttons .mdm-title").click();
      expect( $("#section-2 .mdm-preview").html() ).toEqual( "<h2>This is the text, with <strong>bold</strong> and <em>italic</em>.</h2>" );
    });

    it("should add a link", function() {
      spyOn( window, "prompt" ).andReturn( "http://google.com" );
      $("#section-2 .mdm-input").setSelection(0,4);
      $("#section-2 .mdm-buttons .mdm-link").click();
      expect( $("#section-2 .mdm-preview").html() ).toEqual( "<p><a href=\"http://google.com\">This</a> is the text, with <strong>bold</strong> and <em>italic</em>.</p>" );
    });

    it("should list text", function() {
      $("#section-2 .mdm-input").val( "This is the list:\n\none\ntwo\nthree\n\nand more text" );
      $("#section-2 .mdm-input").setSelection(21,30);
      $("#section-2 .mdm-buttons .mdm-list").click();

      expect( $("#section-2 .mdm-preview").html() ).toEqual( "<p>This is the list:</p>\n\n<ul>\n<li>one</li>\n<li>two</li>\n<li>three</li>\n</ul>\n\n<p>and more text</p>" );
    });
  });

  describe("MDM panels (buttons and preview)", function() {
    beforeEach(function() {
    });

    it("should show panels on focus", function() {
      expect( $("#section-4 #textarea-4").prev( ".mdm-buttons" ).hasClass( "focus" ) ).toBeFalsy();
      expect( $("#section-4 #textarea-4").next( ".mdm-preview" ).hasClass( "focus" ) ).toBeFalsy();

      $("#section-4 #textarea-4").focus();

      expect( $("#section-4 #textarea-4").prev( ".mdm-buttons" ).hasClass( "focus" ) ).toBeTruthy();
      expect( $("#section-4 #textarea-4").next( ".mdm-preview" ).hasClass( "focus" ) ).toBeTruthy();
    });

    it("should hide panels on blur", function() {
      $("#section-4 #textarea-4").prev( ".mdm-buttons" ).addClass( "focus" )
      $("#section-4 #textarea-4").next( ".mdm-preview" ).addClass( "focus" )

      $("#section-4 #textarea-4").blur();

      expect( $("#section-4 #textarea-4").prev( ".mdm-buttons" ).hasClass( "focus" ) ).toBeFalsy();
      expect( $("#section-4 #textarea-4").next( ".mdm-preview" ).hasClass( "focus" ) ).toBeFalsy();
    });
  });

  describe( "MDM.Utils", function(){
    it( "selected whole lines should select whole lines", function() {
      $("#section-2 .mdm-input").val( "This is the list:\n\none\ntwo\nthree\n\nand more text" );
      $("#section-2 .mdm-input").setSelection(21,30);

      MDM.Utils.selectWholeLines( $("#section-2 .mdm-input") );
      var selection = $("#section-2 .mdm-input").getSelection();

      expect( selection.start ).toEqual( 19 );
      expect( selection.end ).toEqual( 32 );
    });
  });

  describe( "showdown", function(){
    it( "should create a list", function() {
      var text =
        "input This is the list:\n"+
        "\n" +
        "- one\n" +
        "- two\n" +
        "- three\n" +
        "\n" +
        "and more text.";

      var result =
        "<p>input This is the list:</p>\n" +
        "\n" +
        "<ul>\n" +
        "<li>one</li>\n" +
        "<li>two</li>\n" +
        "<li>three</li>\n" +
        "</ul>\n" +
        "\n" +
        "<p>and more text.</p>";

      var converter = new Attacklab.showdown.converter();
      expect( converter.makeHtml( text ) ).toEqual( result );
    });
  });

});

