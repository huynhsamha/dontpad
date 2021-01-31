import express from 'express';
import socketSetting from '../config/socket';
import serverSetting from '../config/server';

const router = express.Router();

router.get('/settings', (req, res, next) => {
  res.status(200).json({
    socket: {
      publicKey: socketSetting.publicKey,
      skLength: socketSetting.sessionKeyLength
    },
    server: {
      schema: serverSetting.schema,
      domain: serverSetting.domain,
      site: serverSetting.site
    }
  });
});

router.use('*', (req, res, next) => {
  res.status(404).send(`You can not access this path. Please back to ${serverSetting.site}`);
});

export default router;
