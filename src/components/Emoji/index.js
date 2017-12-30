import React, {Component} from 'react';
import {Picker} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

class Emoji extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    selectEmoji(emoji) {
        const {addToComment} = this.props;
        this.setState({emoji});
        addToComment(emoji.native);
    }

    render() {
        return (
            <div className="emoji-selector">
                <Picker title="" emoji="smile" onClick={emoji => this.selectEmoji(emoji)} />
            </div>
        );
    }
}

export default Emoji;
