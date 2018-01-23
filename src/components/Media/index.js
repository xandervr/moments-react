import React, {Component} from 'react';
import './index.css';

class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliderValue: 0,
            volumeValue: 0.7
        };
    }

    playVideo = e => {
        const $video = e.target.parentNode.querySelector(`video`);
        if ($video.paused === true) {
            e.target.previousElementSibling.play();
            e.target.innerHTML = `pause`;
        } else {
            e.target.previousElementSibling.pause();
            e.target.innerHTML = `play`;
        }
    };

    pauseSliderVideo = e => {
        const $video = e.target.parentNode.parentNode.querySelector(`video`);
        $video.pause();
    };

    playSliderVideo = e => {
        const $video = e.target.parentNode.parentNode.querySelector(`video`);
        $video.play();
        document.querySelector(`.play-btn`).innerHTML = `pause`;
    };

    fullScreenVideo = e => {
        const $video = e.target.parentNode.parentNode.querySelector(`video`);
        if ($video.requestFullscreen) {
            $video.requestFullscreen();
        } else if ($video.mozRequestFullScreen) {
            $video.mozRequestFullScreen(); // Firefox
        } else if ($video.webkitRequestFullscreen) {
            $video.webkitRequestFullscreen(); // Chrome and Safari
        }
    };

    muteVideo = e => {
        const $video = e.target.parentNode.parentNode.querySelector(`video`);
        if ($video.muted === true) {
            $video.muted = false;
            e.target.innerHTML = `mute`;
        } else {
            $video.muted = true;
            e.target.innerHTML = `unmute`;
        }
    };

    scrollVideo = e => {
        const $video = e.target.parentNode.parentNode.querySelector(`video`);
        const time = $video.duration * (e.target.value / 100);
        $video.currentTime = time;
    };

    updateSlider = e => {
        // const $slider = e.target.parentNode.querySelector(`input[type="range"]`);
        const value = 100 / e.target.duration * e.target.currentTime;
        this.setState({sliderValue: value});
    };

    volumeSliderVideo = e => {
        console.log(this.state.volumeValue);
        const $video = e.target.parentNode.parentNode.querySelector(`video`);
        this.setState({volumeValue: e.target.value});
        $video.volume = e.target.value;
    };

    render() {
        const {media} = this.props;
        if (media.image) {
            if (media.metadata) {
                switch (media.metadata.orientation) {
                    case 6:
                        return <img src={media.image} className="rotated" alt={media.name} {...this.props} />;
                    default:
                        return <img src={media.image} alt={media.name} {...this.props} />;
                }
            } else return <img src={media.image} alt={media.name} {...this.props} />;
        } else if (media.video) {
            return (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <video width="320" height="240" onTimeUpdate={this.updateSlider} {...this.props}>
                        <source src={media.video} type={media.mime} />
                        Your browser does not support the video tag.
                    </video>
                    <span className="play-btn pointer" onClick={this.playVideo}>
                        play
                    </span>
                    <span className="video-controls">
                        <span className="mute-btn" onClick={this.muteVideo}>
                            mute
                        </span>
                        <input
                            type="range"
                            className="pointer"
                            value={this.state.sliderValue}
                            onChange={this.scrollVideo}
                            onMouseDown={this.pauseSliderVideo}
                            onMouseUp={this.playSliderVideo}
                        />
                        <input
                            type="range"
                            className="volume-slider pointer"
                            min="0"
                            max="1"
                            step="0.01"
                            value={this.state.volumeValue}
                            onChange={this.volumeSliderVideo}
                        />
                        <span className="fullscreen-btn pointer" onClick={this.fullScreenVideo}>
                            full
                        </span>
                    </span>
                </div>
            );
        } else return null;
    }
}

export default Media;
