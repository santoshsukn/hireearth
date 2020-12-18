import React from 'react';
export default class Filenotfound extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
                <div className = 'row'>
                    <div className="col-sm-4"></div>
                    <div className= "col-sm-4">
                        <center><h1>Please Enter a Valid URL</h1></center>  
                    </div>
                    <div class="col-sm-4"></div>
                </div>
        )
    }
}