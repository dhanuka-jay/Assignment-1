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

export class DelProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <div style={boxmodel}>
                <button style={closebutton} onClick={this.props.backToList}>X</button>
                <div>
                    <div>
                        <h2>Delete Product </h2>
                    </div>
                    <div>
                        <h2>Are you sure?</h2>
                    </div>
                    <div>
                        <button className="small ui right labeled icon right floated red button" onClick={this.props.confirmDelete}><i className="trash icon"></i>Delete</button>
                    </div>
                    <div>
                        <button className="small ui right floated black button" onClick={this.props.backToList}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    };

}

export default DelProduct;