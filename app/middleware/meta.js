/**
 * meta middleware, should be the first middleware
 */

'use strict';

module.exports = () => {
  return function* meta(next) {
    yield next;
    // total response time header
    this.set('x-readtime', Date.now() - this.starttime);

    // try to support Keep-Alive Header
    const server = this.app.server;
    if (server && server.keepAliveTimeout && server.keepAliveTimeout >= 1000 && this.header.connection !== 'close') {
      const timeout = parseInt(server.keepAliveTimeout / 1000);
      this.set('keep-alive', `timeout=${timeout}`);
    }
  };
};
