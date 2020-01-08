import React, { Component } from 'react';

export class ListSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            
        }

        this.FindSales = this.FindSales.bind(this);
    }

    componentDidMount() {
        this.props.getSales();

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({ data: nextProps.data })
        }
    }

    FindSales(id) {
        this.props.findUpdateSales(id);
        //console.log(id);
    }

    render() {
        let tableData = null;
        if (this.state.data !== null && this.state.data !== undefined) {
            tableData = this.state.data.map(item =>
                <tr key={item.id}>
                    <td>{item.customerName}</td>
                    <td>{item.productName}</td>
                    <td>{item.storeName}</td>
                    <td>{item.dateSold}</td>
                    <td><button className="small ui yellow button" onClick={() => this.FindSales(item.id)}><i className="edit icon"></i>Edit</button></td>
                    <td><button className="small ui red button" onClick={() => this.props.loadDelete(item.id, item.customerName, item.productName, item.storeName, item.dateSold)}><i className="trash icon"></i>Delete</button></td>
                </tr>
            );
            return (
                <div>
                    <button className="small ui blue button" onClick={this.props.loadCreate}>New Sales</button>
                    <table className="table" aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <td><b>Customer</b></td>
                                <td><b>Product</b></td>
                                <td><b>Store</b></td>
                                <td><b>Date Sold</b></td>
                                <td><b>Action</b></td>
                                <td><b>Action</b></td>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </table>
                </div>
            );
        }
        else {
            return (
                <div></div>
            )
        }
    }
      
}

export default ListSales;