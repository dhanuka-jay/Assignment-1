import React, { Component } from 'react';
import $ from 'jquery';
import ListStores from './ListStores';
import CreateStore from './CreateStore';
import UpdateStore from './UpdateStore';
import DelStore from './DelStore';

export class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {

            /* <activeComponent> will decide which component to be loaded. 
             * By default, the 'List' comonent will be rendered. */
            activeComponent: 'List',

            storeToBeEdited: {
                id: null,
                name: '',
                address: ''
            }
        }

        /* Method binding */
        this.GetStore = this.GetStore.bind(this);
        this.DeleteStore = this.DeleteStore.bind(this);
        this.NewStore = this.NewStore.bind(this);
        this.EditStore = this.EditStore.bind(this);
        this.LoadCreate = this.LoadCreate.bind(this);
        this.LoadDelete = this.LoadDelete.bind(this);
        this.ConfirmDelete = this.ConfirmDelete.bind(this);
        this.setEditDetails = this.setEditDetails.bind(this);
        this.BackToList = this.BackToList.bind(this);
    };

    /* Get the list of existing Store data */
    GetStore() {
        var self = this;
        $.ajax({
            type: 'GET',
            datatype: 'json',
            /* <url> : /<Controller>/<MethodName> */
            url: '/Store/GetStore',
            success: function (response) {
                self.setState({ storeData: response });
            },
            error: function (response) {
                console.log("ajax call-GetStore failed...!");
            },
        });
    };

    /* Delete selected Store.
       <ListStore> component will call this method when <Delete> button is clicked.
       Unique Id of a Store has to be passed in as parameter.*/
    DeleteStore(id) {
        var self = this;
        $.ajax({
            type: 'POST',
            url: `Store/DeleteStore?id=${id}`,
            success: function (response) {
                self.setState({ storeData: response });
            },
            error: function (response) {
                console.log('ajax call-DeleteStore failed...!');
            },
        });
    };

    /* Create a new Store.
     * <ListStore> component will call this method when <Create Store> button is clicked.*/
    NewStore(name, address) {
        var self = this;
        $.ajax({
            type: 'POST',
            url: `Store/CreateStore?name=${name}&address=${address}`,
            success: function (response) {
                self.setState({ storeData: response });
            },
            error: function (response) {
                console.log('ajax call-CreateStore failed...!')
            },
        });
    };

    /* Update an existing Store */
    EditStore(id, name, address) {
        var self = this;
        $.ajax({
            type: 'POST',
            url: `Store/UpdateStore?id=${id}&newName=${name}&newAddress=${address}`,
            success: function (response) {
                self.setState({ storeData: response });
            },
            error: function (response) {
                console.log('ajax call-EditStore failed...!')
            },
        });
    };

    setEditDetails(id, name, address) {
        this.setState({ activeComponent: 'Update' });

        this.setState({
            storeToBeEdited: {
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
            storeToBeEdited: {
                id: id,
                name: name,
                address: address
            }
        })
    }

    ConfirmDelete() {
        this.DeleteStore(this.state.storeToBeEdited.id);
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
                        <ListStores
                            getStore={this.GetStore}
                            data={this.state.storeData}
                            setEditDetails={this.setEditDetails}
                            loadCreate={this.LoadCreate}
                            loadDelete={this.LoadDelete}
                        />
                    </div>
                )
            case 'Update':
                return (
                    <div>
                        <UpdateStore
                            storeToBeEdited={this.state.storeToBeEdited}
                            editStore={this.EditStore}
                            backToList={this.BackToList}
                        />
                    </div>
                )
            case 'Create':
                return (
                    <div>
                        <CreateStore
                            newStore={this.NewStore}
                            backToList={this.BackToList}
                        />
                    </div>
                )
            case 'Delete': {
                return (
                    <div calss="ui modal">
                        <DelStore
                            storeToBeEdited={this.state.storeToBeEdited}
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