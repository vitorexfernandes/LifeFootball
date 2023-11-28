import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Banner.css';

export const Banner = (props) => {
  return (
    <section className="banner">
      <div className="banner-background"></div>
      <div className="banner-content">
        <img className="banner-image" src="/images/banner.png" alt="banner Champions" />
        <div className="banner-text">Live Football</div>
        <div className="banner-button-container">
        <button className="banner-button" id="live_picker_button">
          LIVE
        </button>
        {props.showButton && (
          <button className="banner-button" id="date_picker_button" onClick={props.toggleDatePicker}>
            DATE
          </button>
        )}
        {props.showSelectionDate && (
          <DatePicker
              selected={props.selectedDate}
              onChange={props.handleDateChange}
              dateFormat="d/MM/yyyy"
              open={true}
          />
        )}
        </div>
      </div>
    </section>
  );
};
