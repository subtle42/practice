import * as React from 'react'
import Form from 'react-bootstrap/Form'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Modal from 'react-bootstrap/Modal'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { fieldUtil } from '../form.utils'

type Props = {}

type IForm = {
    name: string
}

const zones = [
    'zone1',
    'zone2',
    'zone3',
    'zone4',
]

export const ZoneComponent:React.FC<Props> = (props) => {
    const [show, setShow] = React.useState(false)
    const [searchText, setSearchText] = React.useState('')
    const [removeZone, setRemoveZone] = React.useState<undefined | string>()
    const {register, handleSubmit, formState, reset} = useForm<IForm>()
    const onValid: SubmitHandler<IForm> = (data) => {
        console.log(data)
        reset()
    }
    const onInvalid: SubmitErrorHandler<IForm> = (data) => console.error(data)

    const getForm = () => {
        if (!show) return
        return <Form noValidate validated={formState.isValid} onSubmit={handleSubmit(onValid, onInvalid)}>
            <Form.Group className={formState.errors.name && 'danger'}>
                <Form.FloatingLabel label="Name" className="mb-3">
                    <Form.Control placeholder=''
                        isInvalid={!!formState.errors.name}
                        {...register('name', fieldUtil({required: true, minLength: 3, maxLength: 100}))} />
                    <Form.Control.Feedback type='invalid'>{formState.errors.name?.message}</Form.Control.Feedback>
                </Form.FloatingLabel>
            </Form.Group>
            <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
                <Button variant='outline-secondary'
                    onClick={() => {
                        setShow(false)
                        reset()
                    }}>
                    Cancel
                </Button>
                <Button variant='outline-primary'
                    type='submit'>
                    Save
                </Button>
            </div>
        </Form>
    }

    const getSearchBox = () => {
        return <Form>
            <Form.Control placeholder='Search'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}>
            </Form.Control>
        </Form>
    }

    const getList = () => {
        return <ListGroup>
            {zones.filter(x => x.includes(searchText))
            .map((zone, index) => <ListGroup.Item action key={index}
                style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>{zone}</div>
                <div>
                    <Button size='sm' variant='outline-info'>
                        <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button size='sm' variant='outline-danger' onClick={(e) => {
                        e.stopPropagation()
                        setRemoveZone(zone)
                    }}>
                        <i className="bi bi-trash3"></i>
                    </Button>
                </div>
            </ListGroup.Item>)}
        </ListGroup>
    }

    const getRemoveModal = () => {
        return <Modal size='sm' centered show={!!removeZone} onHide={() => setRemoveZone(undefined)}>
            <Modal.Header>
                <Modal.Title>Remove Zone</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to remove {removeZone}?
            </Modal.Body>
            <Modal.Footer>
                <Button>Yes</Button>
                <Button variant='secondary' onClick={() => setRemoveZone(undefined)}>No</Button>
            </Modal.Footer>
        </Modal>
    }

    return <div>
        <Button onClick={() => setShow(!show)}>
            Add Zone
        </Button>
        {getSearchBox()}
        {getList()}
        {getRemoveModal()}
        <Offcanvas show={show} onHide={() => setShow(false)}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Create/Edit Zone</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {getForm()}
            </Offcanvas.Body>
        </Offcanvas>
    </div>
}