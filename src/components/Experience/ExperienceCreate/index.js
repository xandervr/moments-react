import React, {Component} from 'react';
import './index.css';

class ExperienceCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: ''
        };
    }

    onChangeTitle = e => {
        const title = e.target.value;
        this.setState({title: title});
    };

    onChangeDescription = e => {
        const description = e.target.value;
        this.setState({description: description});
    };

    render() {
        const {title, description} = this.state;

        return (
            <div style={{marginTop: '200px'}}>
                <input value={title} onChange={this.onChangeTitle} />
                <input value={description} onChange={this.onChangeDescription} />
            </div>
        );
    }
}

export default ExperienceCreate;
