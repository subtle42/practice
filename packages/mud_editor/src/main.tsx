import * as React from 'react'
import { ZoneComponent } from './components/zone'

type Props = {}

export const MainComponent:React.FC<Props> = () => {

    return <div style={{display: 'flex', justifyContent: 'center'}}>
        <ZoneComponent />
    </div>
}