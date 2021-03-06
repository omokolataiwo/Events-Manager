import React from 'react';
import PropTypes from 'prop-types';

import '../../public/style.scss';

const CenterCard = (props =>
  (
    <div className="col-lg-4 col-sm-12 col-xs-12 col-md-6 center-card">
      <div className="card" style={{ marginTop: '30px' }}>
        <img className="card-img-top img-fluid" src={props.center.imageUrl} alt="Card" />
        <div className="card-body">
          <h4 className="card-title">{props.center.name}</h4>
          <p className="card-text date-of-event"># <b>{props.center.rentalCost}</b> per day</p>
          <div className="card-menu action-buttons">
            <div className="btn-group">
              <button className="btn edit-btn" onClick={props.promptSeeCenter} id={props.center.id}>DETAILS</button>
              <button className="btn modify-btn" onClick={props.promptModifyCenter} id={props.center.id}>EDIT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
);

const propTypes = {
  center: PropTypes.shape({
    name: PropTypes.string.isRequired,
    facilities: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string,
    rentalCost: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  promptModifyCenter: PropTypes.func.isRequired,
  promptSeeCenter: PropTypes.func.isRequired,
};

CenterCard.propTypes = propTypes;
export default CenterCard;
