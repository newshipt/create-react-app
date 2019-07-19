import SampleHome from './components/sample/SampleHome'
import SampleEdit from './components/sample/SampleEdit'
import { ModuleExporter } from '@shipt/nova'

ModuleExporter.export(SampleHome)
ModuleExporter.export(SampleEdit)