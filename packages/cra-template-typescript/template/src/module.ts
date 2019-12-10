import { ModuleExporter } from '@shipt/nova'
import { SampleHome } from './components/sample/SampleHome'
import { SampleEdit } from './components/sample/SampleEdit'

ModuleExporter.export("SampleHome", SampleHome)
ModuleExporter.export("SampleEdit", SampleEdit)