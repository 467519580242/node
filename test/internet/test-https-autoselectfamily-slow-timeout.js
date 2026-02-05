'use strict';

const common = require('../common');
const { addresses } = require('../common/internet');

if (!common.hasCrypto)
  common.skip('missing crypto');

const assert = require('assert');
const { request } = require('https');

const req = request(
  `https://${addresses.INET_HOST}/en`,
  // Increased timeout to handle slower CI environments while still testing
  // the autoSelectFamily mechanism with realistic failure scenarios
  { autoSelectFamily: true, autoSelectFamilyAttemptTimeout: 100 },
  common.mustCall((res) => {
    assert.strictEqual(res.statusCode, 200);
    res.resume();
  }),
);

req.on('error', common.mustNotCall());
req.end();
