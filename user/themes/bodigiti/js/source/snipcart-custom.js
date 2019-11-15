
/**
* Snipcart: Cart
*/

document.addEventListener("snipcart.ready", function() {

  /**
   * Snipcart Update Header when item added or removed
   * --------------------------------------------------------------------------
   */

  Snipcart.subscribe('item.removed', function (item) {
      updateHeader();
  });
  Snipcart.subscribe('item.added', function (item) {
      updateHeader();
  });
  updateHeader();

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
