# Integer_Net ReactApp

[![Software License][ico-license]](LICENSE.md)

This is a work in progress, but it's a first version of a bootstrap template module / reference to build React Apps that are loaded in to the Magento 2 (Venia/Blank) theme.

## Installation

1. Install via composer
    ```
    composer require integer-net/magento2-reactapp
    ```
2. Enable module
    ```
    bin/magento setup:upgrade
    ```
3. Visit http(s)://{base_url}/reactapp

## Configuration

When starting development, rename and:
 - reactapp/.env.development.template to .env.development
 - reactapp/src/config.js.template to config.js.
and set the right values in these files.

More documentation on the way.

## Credits

- [Willem Wigman][link-author]

## License

The MIT License (MIT). Please see [License File](LICENSE.txt) for more information.

[ico-license]: https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square

[link-author]: https://github.com/wigman
