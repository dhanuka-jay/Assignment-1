import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

class TestModel extends Component {

    render() {
        return (
            <div>
                <Modal trigger={<Button>Show Modal</Button>} closeIcon>
                    <Header icon='archive' content='Archive Old Messages' />
                    <Modal.Content>
                        <p>
                            This is a Model-Dailog testing. !
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red'>
                            <Icon name='Cancel' /> No
                        </Button>
                        <Button color='green'>
                            <Icon name='Delete' /> Yes
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
};

export default TestModel;