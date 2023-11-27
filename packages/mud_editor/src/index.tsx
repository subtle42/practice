import * as reactDom from 'react-dom/client'
import * as React from 'react'
import { MainComponent } from './main'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

document.getElementsByTagName('html')[0].setAttribute('data-bs-theme', 'dark')
const root = reactDom.createRoot(document.getElementsByTagName('body')[0])
root.render(<MainComponent />)
