import React, { Component } from 'react';
import $ from 'jquery';
import ListProducts from './ListProducts';
import CreateProduct from './CreateProduct';
import DelProduct from './DelProduct';
import UpdateProduct from './UpdateProduct';

export class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {

            /* <activeComponent> will decide which component to be loaded. 
             * By default, the 'List' comonent will be rendered. */
            activeComponent: 'List',

            productToBeEdited: {
                id: null,
                name: '',
                price: ''
            }
        }

        /* Method binding */
        this.GetProduct = this.GetProduct.bind(this);
        this.DeleteProduct = this.DeleteProduct.bind(this);
        this.NewProduct = this.NewProduct.bind(this);
        this.EditProduct = this.EditProduct.bind(this);
        this.LoadCreate = this.LoadCreate.bind(this);
        this.LoadDelete = this.LoadDelete.bind(this);
        this.ConfirmDelete = this.ConfirmDelete.bind(this);
        this.setEditDetails = this.setEditDetails.bind(this);
        this.BackToList = this.BackToList.bind(this);
    };

    /* Get the list of existing Product data */
    GetProduct() {
        var self = this;
        $.ajax({
            type: 'GET',
            datatype: 'json',
            /* <url> : /<Controller>/<MethodName> */
            url: '/Product/GetProduct',
            success: function (response) {
                self.setState({ productData: response });
            },
            error: function (response) {
                console.log("ajax call-GetProduct failed...!");
            },
        });
    };

    /* Delete selected Product.
       <ListProducts> component will call this method when <Delete> button is clicked.
       Unique Id of a Product has to be passed in as parameter.*/
    DeleteProduct(id) {
        var self = this;
        $.ajax({
            type: 'POST',
            url: `Product/DeleteProduct?id=${id}`,
            success: function (response) {
                self.setState({ productData: response });
            },
            error: function (response) {
                console.log('ajax call-DeleteProduct failed...!');
            },
        });
    };

    /* Create a new Product Line.
     * <ListProduct> component will call this method when <Create Product> button is clicked.*/
    NewProduct(name, price) {
        var self = this;
        $.ajax({
            type: 'POST',
            url: `Product/CreateProduct?name=${name}&price=${price}`,
            success: function (response) {
                self.setState({ productData: response });
            },
            error: function (response) {
                console.log('ajax call-CreateProduct failed...!')
            },
        });
    };

    /* Update an existing Product */
    EditProduct(id, name, price) {
        var self = this;
        $.ajax({
            type: 'POST',
            url: `Product/UpdateProduct?id=${id}&newName=${name}&newPrice=${price}`,
            success: function (response) {
                self.setState({ productData: response });
            },
            error: function (response) {
                console.log('ajax call-CreateProduct failed...!')
            },
        });
    };

    setEditDetails(id, name, price) {
        this.setState({ activeComponent: 'Update' });

        this.setState({
            productToBeEdited: {
                id: id,
                name: name,
                price: price
            }
        });
    }

    LoadCreate() {
        this.setState({ activeComponent: 'Create' });
    }

    LoadDelete(id, name, price) {
        this.setState({ activeComponent: 'Delete' });

        this.setState({
            productToBeEdited: {
                id: id,
                name: name,
                price: price
            }
        })
    }

    ConfirmDelete() {
        this.DeleteProduct(this.state.productToBeEdited.id);
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
                        <ListProducts
                            getProduct={this.GetProduct}
                            data={this.state.productData}
                            setEditDetails={this.setEditDetails}
                            loadCreate={this.LoadCreate}
                            loadDelete={this.LoadDelete}
                        />
                    </div>
                )
            case 'Update':
                return (
                    <div>
                        <UpdateProduct
                            productToBeEdited={this.state.productToBeEdited}
                            editProduct={this.EditProduct}
                            backToList={this.BackToList}
                        />
                    </div>
                )
            case 'Create':
                return (
                    <div>
                        <CreateProduct
                            newProduct={this.NewProduct}
                            backToList={this.BackToList}
                        />
                    </div>
                )
            case 'Delete': {
                return (
                    <div calss="ui modal">
                        <DelProduct
                            productToBeEdited={this.state.productToBeEdited}
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