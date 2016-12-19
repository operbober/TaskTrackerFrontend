import React from 'react'
import ReactDOM from 'react-dom'
import {FormControl, FormGroup, Col, ControlLabel} from 'react-bootstrap'
import Tag from './tag'

export default class Filter extends React.Component{
    constructor(props){
        super(props);
    }

    _filter = () => {
        const {formControlFilterKey} = this.refs;
        let filterKey = ReactDOM.findDOMNode(formControlFilterKey).value;
        this.props.filter(filterKey);
    };

    render() {
        return(
            <div>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={1}>
                        {this.props.filterField}
                    </Col>
                    <Col sm={4}>
                        <FormControl type="text" onKeyUp={this._filter} ref="formControlFilterKey"/>
                    </Col>
                </FormGroup>
                <br/>
            </div>
        )
    }
}