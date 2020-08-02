  
import * as ActionTypes from './ActionTypes';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    isLoading: state.serviceReducer.isLoading,
    error: state.serviceReducer.error,
    data: state.serviceReducer.data,
});

const mapDispatchToProps = (dispatch) => ({
    callService: (data) => dispatch(dispatchUserData(data))
})


export const dispatchUserData =(data)=>({
    type: ActionTypes.SERVICE_SUCCESS,
    data: data
})

export const serviceActionPending = () => ({
    type: ActionTypes.SERVICE_PENDING
})

export const serviceActionError = (error) => ({
    type: ActionTypes.SERVICE_ERROR,
    error: error
})


const serviceCallAction = connect(mapStateToProps,mapDispatchToProps)
export default serviceCallAction;
