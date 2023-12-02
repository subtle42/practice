import * as React from 'react'
import Button from 'react-bootstrap/Button'
import { RoomComponent } from './room'


type Props = {
    zone?: string
    done: () => void
}

export const ZoneDetailComponent: React.FC<Props> = (props) => {

    if (!props.zone) return

    return <div>
        <Button onClick={() => props.done()}>Go Back</Button>
        <RoomComponent zone={props.zone} />
    </div>
}