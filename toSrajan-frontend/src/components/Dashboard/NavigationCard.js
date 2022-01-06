/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ColorButton3 } from '../../constants/index';
import dishPlaceholderImage from '../../images/dishPlaceholderImage.jpeg';
import './Dashboard.css';

// CSS styles
const useStyles = makeStyles(() => ({
  button: {
    width: '100%',
    padding: 0,
    height: '60px',
    margin: 0,
    fontFamily: 'Galano Grotesque',
  },
}));

const NavigationCard = (props) => {
  const classes = useStyles();
  return (
    <div className="col-12 col-sm-8 col-md-6 col-lg-4" style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
      <div className="card cardCustom" justify="center" style={{ width: props.size || '18rem', margin: '20px' }}>
        <img className="card-img-top" src={props.source || dishPlaceholderImage} alt="Bologna" style={{ height: '100%' }} />
        <div className="card-body text-center" style={{ background: props.color || '#fff', padding: 0, margin: 0 }}>
          <ColorButton3
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={props.onNavigate}
          >
            {' '}
            {props.label}
            {' '}

          </ColorButton3>
        </div>
      </div>
    </div>
  );
};

NavigationCard.propTypes = {
  // ...prop type definitions here
  // navigateFlag: PropTypes.bool,
  // handleClickOpen: PropTypes.func,
  onNavigate: PropTypes.func,
  source: PropTypes.any,
  size: PropTypes.any,
  color: PropTypes.any,
  label: PropTypes.any,
};

export default NavigationCard;
