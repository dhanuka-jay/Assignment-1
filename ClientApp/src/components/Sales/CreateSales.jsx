import React, { Component } from 'react';
import '../Main.css';

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

export class CreateSales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: null,
            customerId: null,
            storeId: null,
            dateSold: null
        }

        this.mySubmitHandler = this.mySubmitHandler.bind(this);
        this.myChangeHadler = this.myChangeHadler.bind(this);
    }

    myChangeHadler(event) {
        this.setState({ [event.target.name]: event.target.value });
    };

    mySubmitHandler(event) {
        //this.props.newSales(this.state.productId, this.state.customerId, this.state.storeId, this.state.dateSold);
        //this.props.backToList();
        event.preventDefault();

    };

    render() {

        return (
            <div className="ui clearing segment" style={boxmodel}>
                <button style={closebutton} onClick={this.props.backToList}>X</button>
                <form onSubmit={this.mySubmitHandler}>
                    <div>
                        <h2> Create Sales </h2>
                    </div>
                    <div>
                        <label>Product</label>
                        <input type="text" name="productID" onChange={this.myChangeHadler} />
                    </div>
                    <div>
                        <label>Customer</label>
                        <input type="text" name="customerId" onChange={this.myChangeHadler} />
                    </div>
                    <div>
                        <label>Store</label>
                        <input type="text" name="storeId" onChange={this.myChangeHadler} />
                    </div>
                    <div>
                        <label>Date Sold</label>
                        <input type="text" name="dateSold" onChange={this.myChangeHadler} />
                    </div>
                    <div>
                        <button className="small ui right labeled icon right floated green button" type="submit"><i className="check icon"></i>Create</button>
                    </div>
                    <div>
                        <button className="small ui right floated black button" onClick={this.props.backToList}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    };

}

export default CreateSales;