import { ModuleExporter } from '@shipt/nova/framework/services/module-exporter'
import { ISG1ModuleContext } from '@shipt/nova/framework/interfaces/sg1-module-context'
import { IMenuItem } from '@shipt/nova/framework/interfaces/sg1-menu-item'
import { ISG1Route } from '@shipt/nova/framework/interfaces/sg1-route'
// TODO: refactor @shipt/nova to simplify import statements without affecting this dependency tree

const moduleId = require('../package.json').name

export class Context implements ISG1ModuleContext {
  id = moduleId
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

ModuleExporter.context(new Context())