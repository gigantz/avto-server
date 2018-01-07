import express from 'express';
import path from 'path';
import Metrix from 'metrix';
import checkToken from '../middleware/checkToken';

const router = express.Router();

import Users from 'models/Users';
import Auto from 'models/Auto';

router.get('/marks', async (req, res, next) => {
  try {
    const model = await Auto.aggregate([
      {$match: { make_id: { $ne: null } }},
      {$sort: { make_id: -1 } },
      {$group: {_id: '$make_id', label: { $first: '$make' }}},
  ])
    res.json(model);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
});

router.get('/models/:markId', async (req, res, next) => {
  try {
    const model = await Auto.aggregate([
      {$match: { make_id: +req.params.markId }},
      {$group: {_id: '$model_id', label: { $first: '$model' }}}
  ])
    res.json(model);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
});

router.get('/years/:modelId', async (req, res, next) => {
  try {
    const model = await Auto.aggregate([
      {$match: { model_id: +req.params.modelId }},
      {$group: {_id: '$year', label: { $first: '$year' }}}
  ])
    res.json(model);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
});



router.get('/bodies/:modelId/:year', async (req, res, next) => {
  try {
    const model = await Auto.aggregate([
      {$match: { model_id: +req.params.modelId, year: +req.params.year }},
      {$group: {_id: '$body_id', label: { $first: '$body' }}}
  ])
    res.json(model);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
});

router.get('/generations/:modelId/:year/:bodyId', async (req, res, next) => {
  try {
    const model = await Auto.aggregate([
      {$match: { model_id: +req.params.modelId, year: +req.params.year, body_id: +req.params.bodyId}},
      {$group: {_id: '$generation_id', label: { $first: '$generation' }}}
  ])
    res.json(model);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
});

router.get('/trims/:modelId/:year/:bodyId/:generationId', async (req, res, next) => {
  try {
    const model = await Auto.aggregate([
      {$match: { model_id: +req.params.modelId, year: +req.params.year, body_id: +req.params.bodyId, generation_id: +req.params.generationId}},
      {$group: {_id: '$trim_id', label: { $first: '$trim' }}}
  ])
    res.json(model);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
});

router.get('/getid/:modelId/:year/:bodyId/:generationId/:trimId', checkToken, async (req, res, next) => {
  try {
    const model = await Auto.findOne({
      model_id: +req.params.modelId,
      year: +req.params.year,
      body_id: +req.params.bodyId,
      generation_id: +req.params.generationId,
      trim_id: +req.params.trimId,
    });

    Metrix.dispatch('AUTO_NEW_SELECTED', req.user, model);
    
    res.json(model);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
});

router.get('/one/:autoId', async (req, res, next) => {
  try {
    const model = await Auto.findOne({ _id: req.params.autoId });
    
    res.json(model);
  } catch ({ message }) {
    return next({
      status: 500,
      message
    });
  }
});

export default router;