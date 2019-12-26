import React, { Component } from 'react';
import $ from 'jquery';
import ListCustomers from './ListCustomers';
import CreateCustomer from './CreateCustomer';
import UpdateCustomer from './UpdateCustomer';
import DelCustomer from './DelCustomer';

export class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {

            /* <activeComponent> will decide which component to be loaded. 
             * By default, the 'List' comonent will be rendered. */
            activeComponent: 'List',

            /* <customerToBeEdited> is a state object to store selected customer details.
             * <Edit> button in <ListCustomers> component will call <SetEditDetails> method and update this state object. */
            customerToBeEdited: {
                id: null,
                name: '',
                address: ''
            }
        }

        /* Method binding */
        this.GetCustomer = this.GetCustomer.bind(this);
        this.DeleteCustomer = this.DeleteCustomer.bind(this);
        this.NewCustomer = this.NewCustomer.bind(this);
        this.EditCustomer = this.EditCustomer.bind(this);
        this.LoadCreate = this.LoadCreate.bind(this);
        this.LoadDelete = this.LoadDelete.bind(this);
        this.ConfirmDelete = this.ConfirmDelete.bind(this);
        this.setEditDetails = this.setEditDetails.bind(this);
        this.BackToList = this.BackToList.bind(this);
    };

    /* Get the list of existing Customer data */
    GetCustomer() {
        var self = this;
        $.ajax({
            type: 'GET',
            datatype: 'json',
            /* <url> : /<Controller>/<MethodName> */
            url: '/Customer/GetCustomer',
            success: function (response) {
                self.setState({ customerData: response });
            },
            error: function (response) {
                console.log("ajax call-GetCustomer failed...!");
            },
        });
    };

    /* Delete selected Customer.
       <ListCustomer> component will call this method when <Delete> button is clicked.
       Unique Id of a Customer has to be passed in as parameter.*/
    DeleteCustomer(id) {
        var self = this;
        $.ajax({
            type: 'POST',
            url: `Customer/DeleteCustomer?id=${id}`,
            success: function (response) {
                self.setState({ customerData: response });
            },
            error: function (response) {
                console.log('ajax call-DeleteCustomer failed...!');
            },
        });
    };

    /* Create a new Customer.
     * <ListCustomer> component will call this method when <Create Customer> button is clicked.*/
    NewCustomer(name, address) {
        var self = this;
        $.ajax({
            type: 'POST',
            url: `Customer/CreateCustomer?name=${name}&address=${address}`,
            success: function (response) {
                self.setState({ customerData: response });
            },
            error: function (response) {
                console.log('ajax call-CreateCustomer failed...!')
            },
        });
    };

    /* Update an existing Customer */
    EditCustomer(id, name, address) {
        var self = this;
        $.ajax({
            type: 'POST',
            url: `Customer/UpdateCustomer?id=${id}&newName=${name}&newAddress=${address}`,
            success: function (response) {
                self.setState({ customerData: response });
            },
            error: function (response) {
                console.log('ajax call-CreateCustomer failed...!')
            },
        });
    };

    setEditDetails(id, name, address) {
        this.setState({ activeComponent: 'Update' });

        this.setState({
            customerToBeEdited: {
                id: id,
                name: name,
                address: address
            }
        });
    }

    LoadCreate() {
        this.setState({ activeComponent: 'Create' });
    }

    LoadDelete(id, name, address) {
        this.setState({ activeComponent: 'Delete' });

        this.setState({
            customerToBeEdited: {
                id: id,
                name: name,
                address: address
            }
        })
    }

    ConfirmDelete() {
        this.DeleteCustomer(this.state.customerToBeEdited.id);
        this.BackToList();
    }

    BackToList() {
        this.setState({ activeComponent: 'List' })
    }

    render() {
        switch (this.state.activeComponent) {
            case 'List':
                return (
                    <div>
                        <ListCustomers
                            getCustomer={this.GetCustomer}
                            data={this.state.customerData}
                            setEditDetails={this.setEditDetails}
                            loadCreate={this.LoadCreate}
                            loadDelete={this.LoadDelete}
                        />
                    </div>
                )
            case 'Update':
                return (
                    <div>
                        <UpdateCustomer
                            customerToBeEdited={this.state.customerToBeEdited}
                            editCustomer={this.EditCustomer}
                            backToList={this.BackToList}
                        />
                    </div>
                )
            case 'Create':
                return (
                    <div>
                        <CreateCustomer
                            newCustomer={this.NewCustomer}
                            backToList={this.BackToList}
                        />
                    </div>
                )
            case 'Delete': {
                return (
                    <div calss="ui modal">
                        <DelCustomer
                            customerToBeEdited={this.state.customerToBeEdited}
                            confirmDelete={this.ConfirmDelete}
                            loadDelete={this.LoadDelete}
                            backToList={this.BackToList}
                        />
                    </div>
                )
            }
            default:
                return (
                    <div></div>
                )
        };
    };

}