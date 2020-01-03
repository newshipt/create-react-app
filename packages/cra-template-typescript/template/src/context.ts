import {
  ContextExporter,
  ISG1ModuleContext,
  IMenuSection,
  ISG1Route,
} from '@shipt/nova'
import { name } from '../package.json'

export class Context implements ISG1ModuleContext {
  ID = name

  // Routes accessible from menu
  get Menu(): IMenuSection[] {
    return [
      {
        sort: 0,
        name: 'Modules',
        items: [
          {
            sort: 0,
            name: 'Module Component',
            route: {
              path: '/module',
              component: 'ModuleComponent',
            },
          },
        ],
      },
    ]
  }

  // Routes accessible from components, but not in menu
  get SubRoutes(): ISG1Route[] {
    return []
  }
}

ContextExporter.export(new Context())
