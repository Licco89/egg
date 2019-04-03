'use strict';

const assert = require('assert');
const WORKER = Symbol('BaseHookClass#worker');

class BaseHookClass {

  constructor(worker) {
    this[WORKER] = worker;
  }

  get logger() {
    return this[WORKER].logger;
  }

  get config() {
    return this[WORKER].config;
  }

  get app() {
    assert(this[WORKER].type === 'application', 'agent boot should not use app instance');
    return this[WORKER];
  }

  get agent() {
    assert(this[WORKER].type === 'agent', 'app boot should not use agent instance');
    return this[WORKER];
  }
}

module.exports = BaseHookClass;
