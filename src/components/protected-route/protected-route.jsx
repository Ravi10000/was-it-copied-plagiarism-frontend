import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { Route, Navigate } from "react-router-dom";

function Protect({ currentUser, isFetchingUser, ...otherProps }) {
  return (
    <>
      {!currentUser ? (
        <Route element={<Navigate to="/login" />} />
      ) : (
        <Route {...otherProps} />
      )}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Protect);
