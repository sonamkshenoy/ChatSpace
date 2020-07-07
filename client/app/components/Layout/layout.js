import React, {Component} from 'react';
// import HeaderComponent from '../Header/header';
import FooterComponent from '../Footer/footer';

class LayoutComponent extends Component{
    render(){
        return(
            <div>
                {/* <HeaderComponent /> */}
                {this.props.children}
                <FooterComponent/>
            </div>            
        );
    }
}

export default LayoutComponent;