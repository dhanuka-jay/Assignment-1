﻿import React, { Component } from 'react';
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

export class CreateCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: ''
        }

        this.mySubmitHandler = this.mySubmitHandler.bind(this);
        this.myChangeHadler = this.myChangeHadler.bind(this);
    }

    myChangeHadler(event) {
        this.setState({ [event.target.name]: event.target.value });
    };

    mySubmitHandler(event) {
        this.props.newCustomer(this.state.name, this.state.address);
        this.props.backToList();
        event.preventDefault();

    };

    render() {

        return (
            <div className="ui clearing segment" style={boxmodel}>
                <button style={closebutton} onClick={this.props.backToList}>X</button>
                <form onSubmit={this.mySubmitHandler}>
                    <div>
                        <h2> Create Customer </h2>
                    </div>
                    <div>
                        <label>Name</label>
                        <input type="text" name="name" onChange={this.myChangeHadler} />
                    </div>
                    <div>
                        <label>Address</label>
                        <input type="text" name="address" onChange={this.myChangeHadler} />
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

export default CreateCustomer;