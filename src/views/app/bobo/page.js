import React, {Component} from 'react';

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {

            setsearchterm: ''
        }}
    
    render() {
        
            this.state = {

                setsearchterm: ''
            }
        
        
        return (
            <div className="row">  
            <div className="col-md-4">
                {this.props.count} products found.
                </div> 
                <div className="col-md-4">
                    <label>
                        Order by
                        <select className="form-control" value={this.props.sort}
                        onChange={this.props.handleChangeSort}>
                        <option value="lowest">lowest</option>
                        <option value="highest">highest</option>

                        </select>
                    </label>
                    <label>
                        Type
                        <select className="form-control" value={this.props.sort}
                        onChange={this.props.handleChangerSort}>
                        <option value="pc">pc</option>
                        <option value="souris">souris</option>
                        <option value="kit">kit</option>
                        <option value="casque">casque</option>

                        </select>
                    </label>
                   
                </div> 
                <div className="col-md-4">
                <input type="text" placeholder="search" onChange={event => {this.state.setsearchterm(event.target.value); }}  />
                </div> 
            </div>
        )
    }

}