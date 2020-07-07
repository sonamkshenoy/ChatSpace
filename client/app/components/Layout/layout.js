import React, {Component} from 'react';
import HeaderComponent from '../Header/header';

class LayoutComponent extends Component{
    render(){
        return(
            <div>
                <HeaderComponent />
                {this.props.children}
            </div>            
        );
    }
}

export default LayoutComponent;