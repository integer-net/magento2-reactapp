export const reloadMagentoMiniCart = () => {
  const requireJs = window.require;
  if (requireJs && requireJs.defined('Magento_Customer/js/customer-data')) {
    requireJs(['Magento_Customer/js/customer-data'], function(customerData) {
      var sections = ['cart', 'customer'];
      customerData.reload(sections, true);
    });
  }
};

export const reloadInvalidatedSections = () => {
  const requireJs = window.require;
  if (requireJs && requireJs.defined('Magento_Customer/js/customer-data')) {
    requireJs(['Magento_Customer/js/customer-data', 'jquery'], function(
      customerData,
      $
    ) {
      /**
       * We can't listen for jQuery events in native JS, so we're firing a native event triggered by the jQuery one
       */
      $(document).one('customer-data-reload', function() {
        const event = window.CustomEvent
          ? new CustomEvent('customer-data-reload', {})
          : document
              .createEvent('CustomEvent')
              .initCustomEvent('customer-data-reload', true, true, {});

        /**
         * we need a timeout because reload is dispatched before the localstorage
         * is updated in /vendor/magento/module-customer/view/frontend/web/js/customer-data.js
         *
         * $(document).trigger('customer-data-reload', [sectionNames]); // should be moved below buffer.update()
         * buffer.update(sections);
         */
        setTimeout(function() {
          document.dispatchEvent(event);
        }, 500);
      });

      const sections = customerData.getExpiredSectionNames();
      customerData.reload(sections, true);
    });
  }
};
