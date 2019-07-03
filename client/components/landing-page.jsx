import React from 'react';

export default class Landing extends React.Component {
  constructor( props ){
    super( props );
    this.state = {
      loading: true
    }
  }

  render(){
    return (

    <div className="video-wrapper">
      <iframe 
        width='100%'
        height='100%'
        src="https://www.youtube-nocookie.com/embed/PY4ExLQyF4w?autoplay=1&mute=1&enablejsapi=1&showinfo=0&modestBranding=1&controls=0&amp;start=40&end310" 
        frameBorder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowFullscreen>
      </iframe>
    </div>

    )
  }
}
