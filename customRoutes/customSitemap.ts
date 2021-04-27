import express, { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
// eslint-disable-next-line import/named
import { FSXAMiddlewareContext } from 'fsxa-nuxt-module'

const router = express.Router()

export default {
  async handler(context: FSXAMiddlewareContext, req: Request, res: Response) {
    const app = express()
    app.get('/', async (request, response) => {
      const host = [req.protocol, '://', req.headers.host].join('')
      const routesFile = fs.readFileSync(
        path.resolve(process.cwd(), './dist/routes.json'),
        {
          encoding: 'UTF-8'
        }
      )
      let routes: any[] = JSON.parse(routesFile)
      routes = routes.filter((item) => item.name !== 'fsxa-page')
      let navigation
      try {
        navigation = await context.fsxaAPI.fetchNavigation(null, 'de_DE123')
      } catch (e) {
        navigation = { seoRouteMap: [] }
      }
      const locations = [
        ...new Set([
          ...Object.keys(navigation?.seoRouteMap || []).map((route) =>
            route.toLowerCase()
          ),
          ...routes.map((route) => (route.path as string).toLowerCase() + '/')
        ])
      ]

      res.set('Content-Type', 'text/xml')
      res.send(`<?xml version="1.0" encoding="UTF-8"?>
      <urlset>
      ${locations
        .map(
          (location) => `
            <url><loc>${host}${location}</loc></url>
            `
        )
        .join('\n')}
            </urlset>`)
    })
    return app(req, res)
  },
  route: '/sitemap'
}
