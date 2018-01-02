import React, {Component} from 'react';
import './index.css';
import add from '../../../assets/svg/add-white.svg';

class ExperienceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      location: '',
      privacy: ''
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

  onChangeLocation = e => {
    const location = e.target.value;
    this.setState({location: location});
  };

  onChangePrivacy = e => {
    const privacy = e.target.value;
    this.setState({privacy: privacy});
  }

  render() {
    const {title, description, location, privacy} = this.state;

    return (
      <section className="add-experience-section">
        <h1 className="add-experience-title">New experience</h1>
        <div className="experience-form">
          <div>
            <div className="input-holder">
              <input id="experience-title" value={title} onChange={this.onChangeTitle}/>
              <label className="input-label" htmlFor="experience-title">Title</label>
            </div>
            <div className="input-holder">
              <input id="experience-location" value={location} onChange={this.onChangeLocation}/>
              <label className="input-label" htmlFor="experience-location">Location</label>
            </div>
            <div className="input-holder">
              <textarea id="experience-desc" value={description} onChange={this.onChangeDescription}></textarea>
              <label className="input-label" htmlFor="experience-desc">Description</label>
            </div>
            <div className="input-holder">
              <select
                  className={privacy === `public` || privacy === `` ? 'privacy-select privacy-public pointer' : 'privacy-select privacy-private pointer'}
                  value={privacy}
                  onChange={this.onChangePrivacy}>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
              </select>
            </div>
          </div>
          <div>
            <input className="experience-photo-input" id="file" type="file" accept="image/*|video*"/>
            <label className="pointer" htmlFor="file">
              <div className="file-selector">
                <img src={add} alt=""/>
              </div>
              <p className="file-label">Choose an experience photo</p>
            </label>
          </div>
        </div>
        <h2>Add moments</h2>
        <div className="moment-form">
          <div className="file-selector-holder">
            <input className="experience-photo-input" id="moment-file" type="file" accept="image/*|video*"/>
            <label className="pointer" htmlFor="moment-file">
              <div className="file-selector">
                <img src={add} alt=""/>
              </div>
              <p className="file-label">Choose a photo</p>
            </label>
          </div>
          <div className="moment-inputs-holder">
            <div className="input-holder">
              <input id="moment-experience-title" value={title} onChange={this.onChangeTitle}/>
              <label className="input-label" htmlFor="moment-experience-title">Title</label>
            </div>
            <div className="input-holder">
              <input id="moment-experience-location" value={location} onChange={this.onChangeLocation}/>
              <label className="input-label" htmlFor="moment-experience-location">Location</label>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ExperienceCreate;
