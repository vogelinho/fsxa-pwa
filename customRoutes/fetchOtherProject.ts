import { FSXAApi, FSXAContentMode } from 'fsxa-api'
import express from 'express'
const expressIntegration = require('fsxa-api/dist/lib/integrations/express')
  .default

const router = express.Router()

const enterpriseDev = new FSXAApi(FSXAContentMode.PREVIEW, {
  mode: 'remote',
  config: {
    apiKey: 'xxx',
    caas: 'xxx',
    navigationService: 'xxx',
    projectId: 'xxx',
    tenantId: 'xxx'
  }
})

const enterprisePatchday = new FSXAApi(FSXAContentMode.PREVIEW, {
  mode: 'remote',
  config: {
    apiKey: 'xxx',
    caas: 'xxx',
    navigationService: 'xxx',
    projectId: 'xxx',
    tenantId: 'xxx'
  }
})

router.use('/dev', expressIntegration({ api: enterpriseDev }))
router.use('/patchday', expressIntegration({ api: enterprisePatchday }))

export default {
  router,
  route: '/projects'
}
