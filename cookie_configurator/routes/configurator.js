const express = require('express');
const { getAddonsFromReq } = require('../utils/get-addons-from-req');
const { COOKIE_ADDONS, COOKIE_BASES } = require('../data/cookies-data');
const { generateError } = require('../utils/generate-error');

const configuratorRouter = express();

configuratorRouter
  .get('/select-base/:baseName', (req, res) => {
    const { baseName } = req.params;

    if (!COOKIE_BASES[baseName]) {
      return generateError(res, `There is no such base as ${baseName}`);
    }
    res
      .cookie('cookieBase', baseName)
      .render('configurator/base-selected', {
        baseName,
      });
  })

  .get('/add-addon/:addonName', (req, res) => {
    const { addonName } = req.params;

    if (!COOKIE_ADDONS[addonName]) {
      return generateError(res, `There is no such addon as ${addonName}`);
    }

    const addedAddons = getAddonsFromReq(req);

    if (addedAddons.includes(addonName)) {
      return generateError(res, `You has already chosen ${addonName}`);
    }

    addedAddons.push(addonName);
    res
      .cookie('addons', JSON.stringify(addedAddons))
      .render('configurator/added', {
        addonName,
      });
  })

  .get('/delete-addon/:addonName', (req, res) => {
    const { addonName } = req.params;

    const addedAddons = getAddonsFromReq(req);

    if (!addedAddons.includes(addonName)) {
      return generateError(res, `You cannot delete ${addonName}`);
    }

    const addonsAfterDelete = addedAddons.filter((addon) => addon !== addonName);
    res
      .cookie('addons', JSON.stringify(addonsAfterDelete))
      .render('configurator/deleted', {
        addonName,

      });
  });

module.exports = {
  configuratorRouter,
};
