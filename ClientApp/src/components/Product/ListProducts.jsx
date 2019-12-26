import React, { Component } from 'react';

export class ListProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getProduct();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({ data: nextProps.data })
        }
    }

    render() {

        let tableData = null;
        if (this.state.data !== null && this.state.data !== undefined) {
            tableData = this.state.data.map(item =>
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td><button className="small ui yellow button" onClick={() => this.props.setEditDetails(item.id, item.name, item.price)}><i className="edit icon"></i>Edit</button></td>
                    <td><button className="small ui red button" onClick={() => this.props.loadDelete(item.id, item.name, item.price)}><i className="trash icon"></i>Delete</button></td>
                </tr>
            );
            return (
                <div>
                    <button className="small ui blue button" onClick={this.props.loadCreate}>New Product</button>
                    <table className="table" aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <td><b>Name</b></td>
                                <td><b>Price</b></td>
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

export default ListProducts;