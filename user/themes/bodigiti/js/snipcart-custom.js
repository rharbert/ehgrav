
/**
* Snipcart: Cart
*/

document.addEventListener("snipcart.ready", function() {

  /**
   * Snipcart Wrapper: If cart-not-empty add class for css add background color
   * --------------------------------------------------------------------------
   */

  var updateHeader = function(){
    if(Snipcart.api.items.count() !== 0){
      $('#snipcart-wrapper').addClass('cart-not-empty');
    }
    else {
      $('#snipcart-wrapper').removeClass('cart-not-empty');
    }
  }
  Snipcart.subscribe('item.removed', function (item) {
      updateHeader();
  });
  Snipcart.subscribe('item.added', function (item) {
      updateHeader();
  });
  updateHeader();

  /**
   * Size Options + Button Add-to-cart
   * --------------------------------------------------------------------------
   */

  // Size Chooser + Error Message Hide if none selected (message shown based
  // on button click below) */
  $('#size-chooser').on("change", function(){
    // If select <option> .size class exists then add class 'active' and hide error message
    $(this).find('option.size:selected').addClass('active')
      .siblings('option').removeClass('active'),
      $('.error-message').fadeOut('fast').removeClass('active');
    // If select <option> .default then add no class ''
    $(this).find('option.default:selected').addClass('')
      .siblings('option').removeClass('active');
  });

  // Button add-to-cart: if a size is selected add class 'snipcart..'
  // which allows adding to cart
  // Button + Size: validate size option was selected or throw alert
  $("#add-to-cart").on("click", function(e){
    /* if */
    $("#size-chooser").length ?
      /* if / else */
      $(".sizes option.active").length ? $(this).addClass("snipcart-add-item") : (e.preventDefault(),
        $(this).removeClass("snipcart-add-item"), /* 'else' continued */
        $(".error-message").fadeIn("fast").addClass("active")) /* 'else' end */
    /* else */
    : $(this).addClass("snipcart-add-item");
  });


  /**
   * Size: add selected to popup, by adding attribute "item-custom1-value" to <button>
   * --------------------------------------------------------------------------
   */

  $('#size-chooser').on("change", function() {
    $('button').data('item-custom1-value', $(this).val());
  });

  /**
   * Popup Continue Shopping button: show it
   * --------------------------------------------------------------------------
   */

  Snipcart.execute('config', 'show_continue_shopping', true);

  /**
   * Popup Close on mouse-click outside of the popup
   * --------------------------------------------------------------------------
   */

   // It verifies that the click isn't on the the container or the container's child.
   // If it's not, it clicks on the #snipcart-close component to properly close the modal

  $(document).mouseup(function(e) {
    var container = $(".snip-layout__main-container");
    if(!container.is(e.target) && container.has(e.target).length === 0) {
      $("#snipcart-close").click();
    }
  });


}, false); /* End: Snipcart event listener */
