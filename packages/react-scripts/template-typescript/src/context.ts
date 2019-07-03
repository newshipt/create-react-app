import { ContextExporter, ISG1ModuleContext, IMenuSection } from '@shipt/nova/context'

const id = require('../package.json').name

export class Context implements ISG1ModuleContext {
    ID = id
    get Menu(): IMenuSection[] {
        return [{
            sort: 0,
            name: 'Sample',
            items: [{
                sort: 0,
                name: 'Sample Home',
                routes: [{
                    path: '/sample',
                    component: 'SampleDefault'
                }]
            }, {
                sort: 1,
                name: 'Sample Edit',
                routes: [{
                    path: '/sample/edit',
                    component: 'SampleEdit'
                }]
            }]
        }]
    }
}

ContextExporter.export(new Context())