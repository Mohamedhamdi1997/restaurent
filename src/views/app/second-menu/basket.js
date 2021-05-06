import React, {Component} from 'react';

export default class Basket extends Component {
     
    constructor(props) {
        super(props)
        
    }
        state = {
            counter : "0"
        };
    
        incrumenteCount = () => {
            this.setState({ counter: parseInt(this.state.counter)+1});
          }
      
    render() {
        return (
            <div className="row"> 
            <button onClick={this.incrumenteCount}>click me !</button><br/>
                       {this.state.counter} 
            {this.props.cartItems.length===0? "is empty": <div>you have {this.props.cartItems.length} products</div>}
             {this.props.cartItems.length > 0 &&
                 <div>
                     <ul>
                         {this.props.cartItems.map(item =>
                            <li>
                                <b>{item.title}</b>
                                X {item.count}
                                <button className="btn btn-danger" ></button>
                            </li>)}
                     </ul>
                     
                 </div>
             }
            </div>
               
            
        )
    }

}