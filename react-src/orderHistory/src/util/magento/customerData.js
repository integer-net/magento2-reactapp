import { debounce } from 'throttle-debounce';

export const reloadMagentoMiniCart = () => {
  const requireJs = window.require;
  // if requireJs is available on the page where this app is loaded, and it uses customer-data, reload the sections needed for the minicart
  if (requireJs && requireJs.defined('Magento_Customer/js/customer-data')) {
    requireJs(['Magento_Customer/js/customer-data'], function(customerData) {
      var sections = ['cart', 'customer'];
      customerData.reload(sections, true);
    });
  }
};

export const reloadInvalidatedSections = () => {
  const requireJs = window.require;
  // if requireJs is available on the page where this app is loaded, and it uses customer-data, reload the invalidated sections
  if (requireJs && requireJs.defined('Magento_Customer/js/customer-data')) {
    requireJs(['Magento_Customer/js/customer-data'], function(customerData) {
      const sections = customerData.getExpiredSectionNames();
      customerData.reload(sections, true);
    });
  }
};

export const notifyOnSectionUpdate = (sections = ['customer']) => {
  // if requireJs is available on the page where this app is loaded, listen for changes/updates to the customer-data sections
  // and fire a custom event we can listen to
  if (window.require) {
    window.require(['Magento_Customer/js/customer-data'], function(
      customerData
    ) {
      const notifyEvent = 'customer-data-reloaded';

      const notifyUpdate = () => {
        const event = window.CustomEvent
          ? new CustomEvent(notifyEvent, {})
          : document
              .createEvent('CustomEvent')
              .initCustomEvent(notifyEvent, true, true, {});

        document.dispatchEvent(event);
      };

      // debounce the notifyUpdate function so that it is not called more then once per second
      // it will execute the last call, so we should then have the latest data to process
      const debouncedNotifyUpdate = debounce(1000, false, notifyUpdate);

      for (let section of sections) {
        const customerDataSection = customerData.get(section);
        customerDataSection.subscribe(debouncedNotifyUpdate, this);
      }
    });
  }
};
