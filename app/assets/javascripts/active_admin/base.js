//= require "active_admin/vendor"

/* Active Admin JS */

$(function(){
  $(".datepicker").datepicker({dateFormat: 'yy-mm-dd'});

  $(".clear_filters_btn").click(function(){
    window.location.search = "";
    return false;
  });

  // Batch actions stuff
  
  $('#batch_actions_button').toggle(function() {
    if (!$(this).hasClass("disabled")) {
      $("#batch_actions_popover").fadeIn(50);
    };
  }, function() {
    $("#batch_actions_popover").fadeOut(100);
  });
  
  $('.index_table thead :checkbox').click(function() {
    if ($(this).attr('checked') == true) {
      $('#batch_actions_button').removeClass("disabled");
      $('#batch_actions_button').addClass("selected");
      $(this).parents(".index_table").find('tr :checkbox').attr('checked', 'true');
      $(this).parents(".index_table").find('tr').addClass("selected");
    } else {
      $('#batch_actions_button').addClass("disabled");
      $('#batch_actions_button').removeClass("selected");
      $(this).parents(".index_table").find('tr :checkbox').attr('checked', '');
      $(this).parents(".index_table").find('tr').removeClass("selected");
    }
  });
  
  $('.index_table tbody :checkbox').click(function() {
    if ($(this).attr('checked') == true) {
      $('#batch_actions_button').removeClass("disabled");
      $('#batch_actions_button').addClass("selected");
      $(this).parents('tr').addClass("selected");
    } else {
      if ($(this).parents(".index_table").find("tbody").find("input:checked").length == 0) {
        $('#batch_actions_button').addClass("disabled");
        $('#batch_actions_button').removeClass("selected");
      };
      
      $(this).parents('tr').removeClass("selected");
      
      $(this).parents(".index_table").find('thead th :checkbox').attr('checked', '');
      
    }
  });

  // Attach a click hanlder to each of the batch action items
  $('#batch_actions_popover a.batch_action').click(function(e) {
	
	// Present optional confirmation prompt to user
	var $target = $(e.target);
	if ( $target.attr("data-request-confirm") ) {
		if ( !confirm( $target.attr("data-request-confirm") ) ) {
			$("#batch_actions_popover").fadeOut(100);
			return false;
		}
	}
	
	// Submit the form, sending the request
	$('#batch_action').val( $target.attr("data-action") );
	$('#collection_selection').submit();
	
  });

});
