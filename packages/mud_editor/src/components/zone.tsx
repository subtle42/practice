import * as React from 'react'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel';


type Props = {}

export const ZoneComponent:React.FC<Props> = (props) => {

    return <Form>
        <Form.Group>
            <FloatingLabel label="Name" className="mb-3">
                <Form.Control type="text" placeholder=''></Form.Control>
            </FloatingLabel>
        </Form.Group>
    </Form>
}