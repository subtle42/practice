import * as reactDom from 'react-dom/client'
import * as React from 'react'
import { ZoneComponent } from './components/zone'
import 'bootstrap/dist/css/bootstrap.min.css'

const root = reactDom.createRoot(document.getElementsByTagName('body')[0])
root.render(<ZoneComponent />)
