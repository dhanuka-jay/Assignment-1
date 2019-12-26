import React, { Component } from 'react';
import $ from 'jquery';
import ListSales from './ListSales';
import CreateSales from './CreateSales';
/*
import DelSales from './DelSales';
import UpdateSales from './UpdateSales';
*/

export class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {

            /* <activeComponent> will decide which component to be loaded. 
             * By default, the 'List' comonent will be rendered. */
            activeComponent: 'List',

            salesToBeEdited: {
                id: null,
                productId: null,
                customerId: null,
                storeId: null,
                dateSold: null
            }
        }

        /* Method binding */
        this.GetSales = this.GetSales.bind(this);
        this.DeleteSales = this.DeleteSales.bind(this);
        this.NewSales = this.NewSales.bind(this);
        this.EditSales = this.EditSales.bind(this);
        this.LoadCreate = this.LoadCreate.bind(this);
        this.LoadDelete = this.LoadDelete.bind(this);
        this.ConfirmDelete = this.ConfirmDelete.bind(this);
        this.setEditDetails = this.setEditDetails.bind(this);
        this.BackToList = this.BackToList.bind(this);
    };

    /* Get the list of existing Sales data */
    GetSales() {
        var self = this;
        $.ajax({
            type: 'GET',
            datatype: 'json',
            /* <url> : /<Controller>/<MethodName> */
            url: '/Sales/GetSales',
            success: function (response) {
                self.setState({ salesData: response });
            },
            error: function (response) {
                console.log("ajax call-GetSales failed...!");
            },
        });
    };

    /* Delete selected Sales.
       <ListSales> component will call this method when <Delete> button is clicked.
       Unique Id of a Sales has to be passed in as parameter.*/
    DeleteSales(id) {
        var self = this;
        $.ajax({
            type: 'POST',
            url: `Sales/DeleteSales?id=${id}`,
            success: function (response) {
                self.setState({ salesData: response });
            },
            error: function (response) {
                console.log('ajax call-DeleteSales failed...!');
            },
        });
    };

    /* Create a new Sales.
     * <ListSales> component will call this method when <Create Product> button is clicked.*/
    NewSales(productId, customerId, storeId, dateSold) {
        var self = this;
        $.ajax({
            type: 'POST',
            url: `Sales/CreateSales?productId=${productId}&customerId=${customerId}&storeId=${storeId}&dateSold=${dateSold}`,
            success: function (response) {
                self.setState({ salesData: response });
            },
            error: function (response) {
                console.log('ajax call-CreateSales failed...!')
            },
        });
    };

    /* Update an existing Sales */
    EditSales(id, productId, customerId, storeId, dateSold) {
        var self = this;
        $.ajax({
            type: 'POST',
            url: `Sales/EditSales?id=${id}&productId=${productId}&customerId=${customerId}&storeId=${storeId}&dateSold=${dateSold}`,
            success: function (response) {
                self.setState({ salesData: response });
            },
            error: function (response) {
                console.log('ajax call-EditSales failed...!')
            },
        });
    };

    setEditDetails(id, productId, customerId, storeId, dateSold) {
        this.setState({ activeComponent: 'Update' });

        this.setState({
            salesToBeEdited: {
                id: id,
                productId: productId,
                customerId: customerId,
                storeId: storeId,
                dateSold: dateSold
            }
        });
    }

    LoadCreate() {
        this.setState({ activeComponent: 'Create' });
    }

    LoadDelete(id, productId, customerId, storeId, dateSold) {
        this.setState({ activeComponent: 'Delete' });

        this.setState({
            salesToBeEdited: {
                id: id,
                productId: productId,
                customerId: customerId,
                storeId: storeId,
                dateSold: dateSold
            }
        })
    }

    ConfirmDelete() {
        this.DeleteSales(this.state.salesToBeEdited.id);
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
                        <ListSales
                            getSales={this.GetSales}
                            data={this.state.salesData}
                            setEditDetails={this.setEditDetails}
                            loadCreate={this.LoadCreate}
                            loadDelete={this.LoadDelete}
                        />
                    </div>
                )
            /*
            case 'Update':
                return (
                    <div>
                        <UpdateSales
                            salesToBeEdited={this.state.salesToBeEdited}
                            editSales={this.EditSales}
                            backToList={this.BackToList}
                        />
                    </div>
                )
                */
            case 'Create':
                return (
                    <div>
                        <CreateSales
                            newSales={this.NewSales}
                            backToList={this.BackToList}
                        />
                    </div>
                )
            /*
            case 'Delete': {
                return (
                    <div calss="ui modal">
                        <DelSales
                            salesToBeEdited={this.state.salesToBeEdited}
                            confirmDelete={this.ConfirmDelete}
                            loadDelete={this.LoadDelete}
                            backToList={this.BackToList}
                        />
                    </div>
                )
            }
            */
            default:
                return (
                    <div></div>
                )
        };
    };

}