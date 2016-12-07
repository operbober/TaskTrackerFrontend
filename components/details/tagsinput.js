import React from 'react'
import ReactDOM from 'react-dom'
import {Button, FormControl} from 'react-bootstrap'
import Tag from './tag'

export default class TagsInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tags: this.props.tags
        }
    }

    _deleteTag = (tag) => {
        let tags = this.state.tags;
        tags.splice(tags.indexOf(tag), 1);
        this.setState({
            tags: tags
        })
    };

    _addTag = (event) => {
        const {formControlNewTag} = this.refs;
        let newTag = ReactDOM.findDOMNode(formControlNewTag).value;
        if(event.key == 'Enter' && newTag.length > 2) {
            ReactDOM.findDOMNode(formControlNewTag).value = '';
            let newTags = this.state.tags;
            if (newTags.indexOf(newTag) == -1) {
                newTags.push(newTag);
            }
            this.setState(newTags);

        }
    };

    _saveTags = () => {
        this.props.saveTags(this.state.tags);
    };

    render() {
        if (this.state.tags) {
            var tags = this.state.tags.map((tag, index) =>
                <Tag key={'tag_' + index} tag={tag} delete={this._deleteTag}/>
            );
        }
        
        return(
            <div>
                {tags}
                <FormControl type="text" ref="formControlNewTag" onKeyDown={this._addTag}/>
                <Button onClick={this._saveTags}>Save</Button>
            </div>
        )
    }
}