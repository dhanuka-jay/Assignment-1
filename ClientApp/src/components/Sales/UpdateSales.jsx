import React, { Component } from 'react';
import '../Main.css';
import { Dropdown } from 'semantic-ui-react';

const boxmodel = {
    width: '500px',
    maxWidth: '100%',
    margin: '0 auto',
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: '999',
    backgroundColor: '#eee',
    padding: '10px 20px 40px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column'
};

const closebutton = {
    marginBottom: '15px',
    padding: '3px 8px',
    cursor: 'pointer',
    borderRadius: '50%',
    border: 'none',
    width: '30px',
    height: '30px',
    fontWeight: 'bold',
    alignSelf: 'flex-end'
};

export class UpdateSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: null,
            productId: null,
            storeId: null,
            dateSold: null
        }

        this.mySubmitHandler = this.mySubmitHandler.bind(this);
        this.myChangeHadler = this.myChangeHadler.bind(this);
    }

    componentDidMount() {
        this.props.getCustomerList();
        this.props.getProductList();
        this.props.getStoreList();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.customerData !== nextProps.customerData) {
            this.setState({ customerData: nextProps.customerData })
        }
        if (this.props.productData !== nextProps.productData) {
            this.setState({ productData: nextProps.productData })
        }
        if (this.props.storeData !== nextProps.storeData) {
            this.setState({ storeData: nextProps.storeData })
        }
    }

    myChangeHadler(event, data) {
        if (data) {
            this.setState({ [data.name]: data.value });
        }
        else {
            this.setState({ dateSold: event.target.value });
        }
    };

    mySubmitHandler(event) {
        this.props.editSales(this.props.salesUpdateData.id,
            (this.state.productId == null) ? this.props.salesUpdateData.productId : this.state.productId,
            (this.state.customerId == null) ? this.props.salesUpdateData.customerId : this.state.customerId,
            (this.state.storeId == null) ? this.props.salesUpdateData.storeId : this.state.storeId,
            (this.state.dateSold == null) ? this.props.salesUpdateData.dateSold : this.state.dateSold);
        this.props.backToList();
        event.preventDefault();

    };

    render() {

        let customerOptions = null;
        let productOptions = null;
        let storeOptions = null;

        if (this.state.customerData) {
            customerOptions = this.state.customerData.map(customer => ({
                key: customer.id,
                text: customer.name,
                value: customer.id,
            }));
        };
        if (this.state.productData) {
            productOptions = this.state.productData.map(product => ({
                key: product.id,
                text: product.name,
                value: product.id,
            }));
        };
        if (this.state.storeData) {
            storeOptions = this.state.storeData.map(store => ({
                key: store.id,
                text: store.name,
                value: store.id,
            }));
        };

        return (
            <div className="ui clearing segment" style={boxmodel}>
                <button style={closebutton} onClick={this.props.backToList}>X</button>
                <form onSubmit={this.mySubmitHandler}>
                    <div>
                        <h2> Update Sales </h2>
                    </div>
                    <div>
                        <label>Customer</label>
                        <Dropdown
                            name='customerId'
                            defaultValue={this.props.salesUpdateData.customerId}
                            placeholder='Select Customer'
                            onChange={this.myChangeHadler}
                            selection
                            clearable
                            options={customerOptions}
                        />
                    </div>
                    <div>
                        <label>Product</label>
                        <Dropdown
                            name='productId'
                            defaultValue={this.props.salesUpdateData.productId}
                            placeholder='Select Product'
                            onChange={this.myChangeHadler}
                            selection
                            clearable
                            options={productOptions}
                        />
                    </div>
                    <div>
                        <label>Store</label>
                        <Dropdown
                            name='storeId'
                            defaultValue={this.props.salesUpdateData.storeId}
                            placeholder='Select Store'
                            onChange={this.myChangeHadler}
                            selection
                            clearable
                            options={storeOptions}
                        />
                    </div>
                    <div>
                        <label>Date Sold</label>
                        <input type="text" name="dateSold" value={this.props.salesUpdateData.dateSold} onChange={this.myChangeHadler} />
                    </div>
                    <div>
                        <button className="small ui right labeled icon right floated green button" type="submit"><i className="check icon"></i>Edit</button>
                    </div>
                    <div>
                        <button className="small ui right floated black button" onClick={this.props.backToList}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    };

}

export default UpdateSales;