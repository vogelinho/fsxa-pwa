In diesem Kapitel werden wir eine Rest-Schnittstelle implementieren, damit wir auf andere Projekte zugreifen können.

Bitte beachte das generelle Vorwort wie man die CustomRoutes definiert. Hier knüpfen wir direkt daran an.

Als Ausgangssituation haben wir eine Datei namens `fetchOtherProject.ts` mit dem Inhalt

```typescript
import express, { Request, Response } from 'express'
// eslint-disable-next-line import/named
import { FSXAMiddlewareContext } from 'fsxa-nuxt-module'

export default {
  async handler(
    context: FSXAMiddlewareContext,
    request: Request,
    response: Response
  ) {
    const app = express()

    return app(request, response)
  },
  route: '/projects'
}
```

Nach dem wir die `FSXAApi` und FSXAContentMode `importiert` haben.

```typescript
import { FSXAApi, FSXAContentMode } from 'fsxa-api'
```

Hier können wir eine neue Instanz einer FSXAApi erzeugen, die wir mit den jeweiligen Daten des Projektes befüllen, welchen wir ansprechen wollen.

```typescript
const otherProject = new FSXAApi(FSXAContentMode.PREVIEW, {
  mode: 'remote',
  config: {
    apiKey: 'xxx',
    caas: 'xxx',
    navigationService: 'xxx',
    projectId: 'xxx',
    tenantId: 'xxx'
  }
})
```

Als `mode` muss `remote` ausgewählt werden. Die Attribute in der `config` müssen auch befüllt werden. Hierbei empfehlen wir diese Daten in die `.env` Datei zu schreiben und dann mit Hilfe von `process.env`. Damit besteht nicht die Gefahr, dass wichtige Daten nicht gepusht werden.

Diese Daten werden bei einer laufenden Anwendung **nicht** im Client angezeigt, da dieser Code ausschließlich auf dem Server ausgeführt wird.

Dieses Projekt müssen wir nun zur Verfügung stellen, dazu benutzen wir die Express-Integration die durch die FSXAApi zur Verfügung gestellt wird:

```typescript
const expressIntegration = require('fsxa-api/dist/lib/integrations/express')
  .default
```

```typescript
export default {
  async handler(context: FSXAMiddlewareContext, req: Request, res: Response) {
    const app = express()
    app.use('/other', expressIntegration({ api: otherProject }))
    return app(req, res)
  },
  route: '/projects'
}
```

Diesen Endpunkt kann man nun in einer Komponente verwenden, um die Informationen aus dem anderen Projekt zu erlangen.

Dazu erstellt man dort wiederum eine Instanz der FSXAApi jedoch mit dem `mode: 'proxy'`.

Dort müssen wir als zweites Argument eine `baseURL` mitgeben. Dort geben wir die URL an, die wir gerade als Endpunkt erzeugt haben.

```typescript
new FSXAApi(FSXAContentMode.PREVIEW, {
  mode: 'proxy',
  baseURL: '/api/projects/other'
})
```

Wenn du diese FSXAApi in mehreren Komponenten benutzen möchtest, empfehlen wir eine Basiskomponente in der du die FSXAApi instanziierst und vererbst.
Die Komponenten die die FSXAAApi benutzen sollen, können von dieser Basiskomponente ergeben und haben Zugriff.
