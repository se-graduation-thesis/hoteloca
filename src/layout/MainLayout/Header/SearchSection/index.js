import PropTypes from 'prop-types';

// third-party
import PopupState from 'material-ui-popup-state';


// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = () => {
    return (
        <h3 style={{ marginLeft: 30 }}>Chào mừng Quản lý</h3>
    );
};

MobileSearch.propTypes = {
    value: PropTypes.string,
    setValue: PropTypes.func,
    popupState: PopupState
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
    return (
        <>
            <h3 style={{ marginLeft: 30 }}>Chào mừng Quản lý</h3>
        </>
    );
};

export default SearchSection;
