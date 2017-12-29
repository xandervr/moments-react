import React, {Component} from 'react';
import ReactEmojiSelector from 'react-emoji-selector';
import 'react-emoji-selector/lib/react-emoji-selector.css';

class Emoji extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    selectEmoji(emoji) {
        const {addToComment} = this.props;
        this.setState({emoji}); // {emoji: "🚀", key: "rocket"}
        addToComment(emoji.emoji);
    }

    render() {
        return (
            <div className="emoji-selector">
                <ReactEmojiSelector
                    visibleAmount={10}
                    searchPlaceholder="Search emoji"
                    onSelect={emoji => this.selectEmoji(emoji)}
                />
            </div>
        );
    }
}

export default Emoji;
