/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    url: 'index.html',
    revision: '2715105d0c7a22d7ae006abac47ca5d0',
  },
  {
    url: 'jr-family-tree-397b35d7.js',
    revision: '1cb4568827fc3f7950939825f3c4931f',
  },
  {
    url: 'polyfills/custom-elements-es5-adapter.84b300ee818dce8b351c7cc7c100bcf7.js',
    revision: 'cff507bc95ad1d6bf1a415cc9c8852b0',
  },
  {
    url: 'polyfills/dynamic-import.b745cfc9384367cc18b42bbef2bbdcd9.js',
    revision: 'ed55766050be285197b8f511eacedb62',
  },
  {
    url: 'polyfills/webcomponents.6954abecfe8b165751e6bc9b0af6c639.js',
    revision: '894a294495257c3d389efa3e1bd9bde7',
  },
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL('/index.html'));