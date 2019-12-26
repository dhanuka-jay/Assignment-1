import React, { Component } from 'react';

export class ListCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getCustomer();
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
                    <td>{item.address}</td>
                    <td><button className="small ui yellow button" onClick={() => this.props.setEditDetails(item.id, item.name, item.address)}><i className="edit icon"></i>Edit</button></td>
                    <td><button className="small ui red button" onClick={() => this.props.loadDelete(item.id, item.name, item.address)}><i className="trash icon"></i>Delete</button></td>
                </tr>
            );
            return (
                <div>
                    <button className="small ui blue button" onClick={this.props.loadCreate}>New Customer</button>
                        <table className="table" aria-labelledby="tabelLabel">
                            <thead>
                                <tr>
                                    <td><b>Name</b></td>
                                    <td><b>Address</b></td>
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

export default ListCustomers;