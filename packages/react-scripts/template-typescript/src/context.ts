import { ContextExporter, ISG1ModuleContext, IMenuItem, ISG1Route } from '@shipt/nova/context'

const id = require('../package.json').name

export class Context implements ISG1ModuleContext {
  ID = id
  get Menu(): IMenuItem[] {
    let routes: ISG1Route[] = [];

    let sampleHomeRoute = {
      path: "/sample",
      component: 'SampleDefault',
      exact: true
    };
    routes.push(sampleHomeRoute);

    let sampleHome: IMenuItem = {
      Routes: routes,
      Display: "Sample Home",
      Permissions: []
    };

    let sampleEditRoute = {
      path: "/samples/edit",
      component: 'SampleEdit'
    };
    routes = [];
    routes.push(sampleEditRoute);

    let sampleEdit = {
      Routes: routes,
      Display: "Create a sample",
      Permissions: []
    };

    let menuItems: IMenuItem[] = [];
    menuItems.push(sampleHome);
    menuItems.push(sampleEdit);

    return menuItems;
  }
}

ContextExporter.export(new Context())