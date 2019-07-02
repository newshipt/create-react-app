import SampleDefault from './components/sample/SampleDefault'
import SampleEdit from './components/sample/SampleEdit'
import { ModuleExporter } from '@shipt/nova/module'

ModuleExporter.export(SampleDefault)
ModuleExporter.export(SampleEdit)