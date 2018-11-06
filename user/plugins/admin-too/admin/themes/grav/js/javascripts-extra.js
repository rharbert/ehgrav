
jQuery(function($) {

  /**
  * Styles Field: Click "button" to add CSS selector to module styles field
  * ----------------------------------------------------------------------------
  */

  $('.tags_select button').click(function() {
      var value = $(this).val();
      var textarea = $(this).parent().parent().parent().parent().find('textarea.module__styles');
      textarea.val(textarea.val() + value + '  ');
      return false;
  });

  /**
  * Modules Page: show/hide modules when toggling
  * ----------------------------------------------------------------------------
  */

  // If header.modules exist on page
  if ($("ul[data-collection-holder] .form-fieldset.toggle").length) {
    // Hide All Fieldsets
    $("ul[data-collection-holder] .form-fieldset.toggle").hide();

    // Text-Image + Button
    // "module_toggle" inserted via blueprints classes
    $(".module_toggle input:radio").on("click", function() {

      var moduleType = ($(this).attr('value'));

      $(this).closest("li").children(".form-fieldset.toggle").hide();
      $(this).closest("li").children(".form-fieldset.toggle" + "." + moduleType).show();
    });

    // Columns
    // "module_toggle" inserted via blueprints classes
    $(".module_toggle_column input:radio").on("click", function() {

      var moduleType = ($(this).attr('value'));

      $(this).closest("li").children(".form-fieldset.toggle").hide();
      $(this).closest("li").children(".form-fieldset.toggle" + "." + moduleType).show();
    });
  }
});
