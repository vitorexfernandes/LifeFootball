import './Banner.css'

export const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-background">   </div>
      <div className="banner-content">
              <img className="banner-image" src="/images/banner.png" alt="banner Champions"/>
              <div className="banner-text">Live Football</div>
              <div className="banner-button-container">
                  <button className="banner-button" id="live_picker_button">LIVE</button>
                  <button className="banner-button" id="date_picker_button">DATE</button>
              </div>
      </div>
    </section>
  );
}


