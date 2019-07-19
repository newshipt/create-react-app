import { ContextExporter, ISG1ModuleContext, IMenuSection, ISG1Route } from '@shipt/nova/context'

const id = require('../package.json').name

export class Context implements ISG1ModuleContext {
  ID = id

  // Routes accessible from SG1 menu
  get Menu(): IMenuSection[] {
    return [{
      sort: 0,
      name: 'Sample Mud Owl',
      items: [{
        sort: 0,
        name: 'Sample Home',
        route: {
          path: '/sample',
          component: 'SampleHome'
        }
      }, {
        sort: 1,
        name: 'Sample Edit',
        route: {
          path: '/sample/edit',
          component: 'SampleEdit'
        }
      }]
    }]
  }

  // Routes accessible from components
  get SubRoutes(): ISG1Route[] {
    return []
  }
}

ContextExporter.export(new Context())