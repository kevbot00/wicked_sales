import React from 'react';
// import video from '../../client/images/landing.mp4';

export default class Landing extends React.Component {
  constructor( props ){
    super( props );
    this.state = {
      loading: true
    }
  }

  render(){
    return (


      // <video width="300" height="200" autoPlay controls>
      //   <source src='../../client/images/landing.mp4' type="video/mp4"/>
      // </video>
      // <div className="video p-0"
      //   style={{
      //     position: "relative",
      //     paddingBottom: "56.25%" /* 16:9 */,
      //     paddingTop: 25,
      //     height: 0
      //     }}
      //   >
      //     <iframe 
      //       style={{
      //         'position':"absolute",
      //         'width':"100%" ,
      //         'height':"88vh" ,
      //         'top':0,
      //         'left':0,
      //         // "pointerEvents":"none"
      //       }}
          
      //       src="https://www.youtube.com/embed/PY4ExLQyF4w?vq=hd720&start=40&autoplay=1&mute=1&showinfo=0&controls=0&loops=1&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=0&autohide=0" 
      //       frameBorder="0" 
      //       allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
      //       allowFullscreen

      //     >
      //     </iframe>
      //   </div>

      <section className="editorial-group oneup">
        <div className="yCmsComponent small-12 ">
        <section id="marquee_HappyBrandVideo" className="large trek-marquee">
          <div className="bg-video">
            <div className="video-background">
            <div className="video-foreground" style={{"height": "300%", "top": "-100%", "width": "100%", "left": "0px"}}>
              <iframe id="3AHH4_pKtOc" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="640" height="360" src="https://www.youtube.com/embed/PY4ExLQyF4w?controls=0&showinfo=0&rel=0&autoplay=1&cc_load_policy=0&enablejsapi=1&&widgetid=1&mute=1" ></iframe>
              </div>
            </div>
          </div>
          <div className="fixed-overslider white">
            <div className="banner center">
              <h1 className="banner-header">Ride bikes. Have fun. Feel good.</h1>
              <div className="button-wrap">
                <a href="/us/en_US/bike-finder/" id="link_HappyBrandVideoMarquee" class="  inline-block button button--primary button--inverted button--skinny button--small font-medium uppercase" title="Find a bike">
                  Find a bike
                </a>
              </div>
            </div>
          </div>
        </section>
        </div>
      </section>
    )
  }
}
