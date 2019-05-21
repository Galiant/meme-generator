import React, { Component } from 'react';

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg",
      allMemeImages: []
    }
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
          const {memes} = response.data
          this.setState({ allMemeImages: memes })
        })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // get a random int(index in the array)
    const randomNum = Math.floor(Math.random() * this.state.allMemeImages.length)
    // get the meme from that index
    const randomMemeImage = this.state.allMemeImages[randomNum].url;
    // set 'randomImg to the .url of the random item which was grabbed
    this.setState({
      randomImage: randomMemeImage
    });
  }

  render() {
    return (
      <div>
        <form className="memeForm" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.topText}
            name="topText"
            placeholder="Top meme text"
            onChange={this.handleChange}
          />
          <input
            type="text"
            value={this.state.bottomText}
            name="bottomText"
            placeholder="Bottom meme text"
            onChange={this.handleChange}
          />
          <button>Generate</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImage} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;