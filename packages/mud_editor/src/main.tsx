import * as React from 'react'
import { ZoneComponent } from './components/zone'
import { ZoneDetailComponent } from './components/details'

type Props = {}

export const MainComponent:React.FC<Props> = () => {
    const [selectedZone, setSelectedZone] = React.useState<undefined | string>()

    const renderZone =  () => {
        if (selectedZone) return
        return <ZoneComponent select={(x: string) => setSelectedZone(x)} />
    }

    const renderDetails = () => {
        if (!selectedZone) return
        return <ZoneDetailComponent zone={selectedZone} done={() => setSelectedZone(undefined)} />
    }

    return <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{width: 400}}>
           {renderZone()}
           {renderDetails()}
        </div>
    </div>
}