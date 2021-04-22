import { FSXAApi, FSXAContentMode } from 'fsxa-api'
import express, { Request, Response } from 'express'
// eslint-disable-next-line import/named
import { FSXAMiddlewareContext } from 'fsxa-nuxt-module'
const expressIntegration = require('fsxa-api/dist/lib/integrations/express')
  .default

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

export default {
  async handler(context: FSXAMiddlewareContext, req: Request, res: Response) {
    const app = express()
    app.use('/dev', expressIntegration({ api: enterpriseDev }))
    app.use('/patchday', expressIntegration({ api: enterprisePatchday }))
    return app(req, res)
  },
  route: '/projects'
}
