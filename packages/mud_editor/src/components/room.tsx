import * as React from 'react'
import Form from 'react-bootstrap/Form'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup'
import { useForm, SubmitHandler } from 'react-hook-form';
import { fieldUtil } from '../form.utils';

type Props = {
    zone: string
}
type IForm = {
    name: string
    description: string
}

const roomList:any[] = [{name: 'asdfadwf'}]

export const RoomComponent:React.FC<Props> = (props) => {
    const [show, setShow] = React.useState(false)
    const [searchText, setSearchText] = React.useState('')
    const {register, handleSubmit, formState, reset} = useForm<IForm>()
    const onSubmit: SubmitHandler<IForm> = (values) => {
        console.log(values)
        reset()
    }

    const renderForm = () => {
        if (!show) return
        return <Form noValidate validated={formState.isValid} onSubmit={handleSubmit(onSubmit)}>
            <Form.FloatingLabel label='Name'>
                <Form.Control placeholder=''
                    isInvalid={!!formState.errors.name}
                    {...register('name', fieldUtil({required: true, minLength: 3, maxLength: 100}))}>
                </Form.Control>
                <Form.Control.Feedback type='invalid'>{formState.errors.name?.message}</Form.Control.Feedback>
            </Form.FloatingLabel>
            <Form.FloatingLabel label="Description">
                <Form.Control as="textarea"
                    isInvalid={!!formState.errors.description}
                    placeholder=''
                    style={{height: 150}}
                    {...register('description', fieldUtil({required: true, minLength: 3, maxLength: 1000}))}>
                </Form.Control>
                <Form.Control.Feedback type='invalid'>{formState.errors.description?.message}</Form.Control.Feedback>
            </Form.FloatingLabel>
            <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
                <Button variant='secondary' onClick={() => {
                    setShow(false)
                    reset()
                }}>Cancel</Button>
                <Button type='submit' disabled={formState.isValid}>Save</Button>
            </div>
        </Form>
    }

    const renderList = () => {
        return <ListGroup>
            {roomList.filter(x => x.name.includes(searchText))
            .map((room) => <ListGroup.Item key={room.name} style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>{room.name}</div>
                <div>
                    <Button size='sm' variant='outline-warning'>
                        <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button size='sm' variant='outline-danger'>
                        <i className="bi bi-trash3"></i>
                    </Button>
                </div>
            </ListGroup.Item>)}
        </ListGroup>
    }

    const renderSearch = () => {
        return <Form>
            <Form.Control placeholder='Search'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}>
            </Form.Control>
        </Form>
    }

    return <div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button onClick={() => setShow(true)}>Create Room</Button>
        </div>
        {renderSearch()}
        {renderList()}
        <Offcanvas show={show} onHide={() => setShow(false)}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Create/Edit Room</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {renderForm()}
            </Offcanvas.Body>
        </Offcanvas>
    </div>
}