import React, { Component } from 'react';
import $ from 'jquery';
import ListSales from './ListSales';
import CreateSales from './CreateSales';
import DelSales from './DelSales';
import UpdateSales from './UpdateSales';

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
                dateSold: null,

                salesUpdateData: null
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
        this.BackToList = this.BackToList.bind(this);
        this.GetCustomerList = this.GetCustomerList.bind(this);
        this.GetProductList = this.GetProductList.bind(this);
        this.GetStoreList = this.GetStoreList.bind(this);
        this.FindUpdateSales = this.FindUpdateSales.bind(this);
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
            url: `Sales/UpdateSales?id=${id}&productId=${productId}&customerId=${customerId}&storeId=${storeId}&dateSold=${dateSold}`,
            success: function (response) {
                self.setState({ salesData: response });
            },
            error: function (response) {
                console.log('ajax call-EditSales failed...!')
            },
        });
    };

    /*
 * GetCustomerList, GetProductList, GetStoreList methods will be used to populate 'Customer', 'Product' and 'Store'
 * dropdowns in Create and Update components.
 */
    GetCustomerList() {
        var self = this;
        $.ajax({
            type: 'GET',
            datatype: 'json',
            url: '/Customer/GetCustomer',
            success: function (response) {
                self.setState({ customerData: response });
            },
            error: function (response) {
                console.log("ajax call-GetCustomerList failed...!");
            },
        });
    };

    //----------------------------

    GetProductList() {
        var self = this;
        $.ajax({
            type: 'GET',
            datatype: 'json',
            url: '/Product/GetProduct',
            success: function (response) {
                self.setState({ productData: response });
            },
            error: function (response) {
                console.log("ajax call-GetProductList failed...!");
            },
        });
    };

    //----------------------------

    GetStoreList() {
        var self = this;
        $.ajax({
            type: 'GET',
            datatype: 'json',
            url: '/Store/GetStore',
            success: function (response) {
                self.setState({ storeData: response });
            },
            error: function (response) {
                console.log("ajax call-GetStoreList failed...!");
            },
        });
    };

    FindUpdateSales(id) {
        //console.log(id);
        var self = this;
        $.ajax({
            type: 'GET',
            datatype: 'json',
            url: `Sales/FindSales?id=${id}`,
            success: function (response) {
                self.setState({ salesUpdateData: response });
                //@@@@response verified
                self.setState({ activeComponent: 'Update' });
            },
            error: function (response) {
                console.log('ajax call-DeleteSales failed...!');
            },
        });
    };

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
                            findUpdateSales={this.FindUpdateSales}
                            loadCreate={this.LoadCreate}
                            loadDelete={this.LoadDelete}
                        />
                    </div>
                )
            case 'Update':
                return (
                    <div>
                        <UpdateSales
                            getCustomerList={this.GetCustomerList}
                            getProductList={this.GetProductList}
                            getStoreList={this.GetStoreList}
                            salesToBeEdited={this.state.salesToBeEdited}
                            salesUpdateData={this.state.salesUpdateData}
                            customerData={this.state.customerData}
                            productData={this.state.productData}
                            storeData={this.state.storeData}
                            editSales={this.EditSales}
                            backToList={this.BackToList}
                        />
                    </div>
                )
            case 'Create':
                return (
                    <div>
                        <CreateSales
                            getCustomerList={this.GetCustomerList}
                            getProductList={this.GetProductList}
                            getStoreList={this.GetStoreList}
                            customerData={this.state.customerData}
                            productData={this.state.productData}
                            storeData={this.state.storeData}
                            newSales={this.NewSales}
                            backToList={this.BackToList}
                        />
                    </div>
                )
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
            default:
                return (
                    <div></div>
                )
        };
    };

}