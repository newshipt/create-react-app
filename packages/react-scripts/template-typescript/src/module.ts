import SampleHome from './components/sample/SampleHome'
import SampleEdit from './components/sample/SampleEdit'
import { ModuleExporter } from '@shipt/nova/module'

ModuleExporter.export(SampleHome)
ModuleExporter.export(SampleEdit)