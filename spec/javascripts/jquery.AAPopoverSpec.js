describe("AAPopover", function() {

  beforeEach(function() {
    this.$button = $(inject({
      el: 'a',
      id: 'my_popover_button',
      attrs: {href: '#my_popover'}
    }));
    
    this.$popover = $(inject({
      id: 'my_popover'
    }));
    
    this.$button.AAPopover({
      fadeInDuration: 0,
      fadeOutDuration: 0,
    });
        
    this.popover = this.$button.data("AAPopover");
  });
  
  describe("opening button / link is pressed", function() {
    it("should open the popover", function() {
      this.$button.trigger("click");
      expect($("#my_popover")).toBeVisible();
    });  
  });
  
  describe("when initiated", function() {
    it("should be hidden", function() {
      expect(this.$popover).toBeHidden();
    });
    
    it("should be have class popover", function() {
      expect(this.$popover).toHaveClass("popover");
    });
    
    describe("nipple", function() {
      it("should exist", function() {
        expect(this.$popover).toContain(".popover_nipple");
      });
    });
  });
  
  describe("when open is called", function() {
    beforeEach(function() {
      expect(this.$popover).toBeHidden();
      this.$button.AAPopover('open');
    });
    
    it("should be open", function() {
      expect(this.$popover).toBeVisible();
    });
    
    // @ToDo Can't figure out how to test this yet
    //describe("positioning", function() {
    //  beforeEach(function() {
    //    
    //  });
    //  
    //  it("should be centered horizontally to the button / link", function() {
    //    expect(this.$popover.css('left')).toEqual("20px");
    //  });
    //  
    //  it("should be under the button / link", function() {
    //    expect(this.$popover.css('top')).toEqual("40px");
    //  });
    //});
    
  });
  
  describe("when destroy is called", function() {
    beforeEach(function() {
      this.$button.AAPopover('destroy');
    });
    
    it("should not have AAPopover stored as a data attr", function() {
      expect(this.$button.data("AAPopover")).toEqual(undefined);
    });
    
    it("should not be bound to any event listeners", function() {
      expect(this.$button.data("events")).toEqual(undefined);
    });
  });
  
  describe("when it's already open", function() {
    beforeEach(function() {
      this.$button.AAPopover('open');
    });
    
    describe("when close is called", function() {
      beforeEach(function() {
        this.$button.AAPopover('close');
      });
      
      it("should close", function() {
        expect(this.$popover).toBeHidden();
      });
    });
    
    describe("when user clicks outside", function() {
      beforeEach(function() {
        $(document).trigger("click");
      });
      
      it("should close", function() {
        expect(this.$popover).toBeHidden();
      });
    });
  });

  describe("options", function() {
    describe("autoOpen set to false", function() {
      beforeEach(function() {
        this.$button.AAPopover("destroy");
        this.$button.AAPopover({
          autoOpen: false
        });
      });
      it("should not open when the link is clicked", function() {
        this.$button.trigger("click");
        expect($("#my_popover")).toBeHidden();
      });
    });
  });
  
});