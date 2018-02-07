import { connect } from 'react-redux'
import { update_data_Creater,  update_OtherValue_Creater } from '../../redux/actions'
import ParentComponent from './Main_component'

const mapStateToProps = state => {  
  return {
    app_data: state.data,
    app_otherValue: state.otherValue
  }
}

const mapDispatchToProps = dispatch => {
  return {
    app_update_data_Creater: val => {
      dispatch(update_data_Creater(val))
    },
     app_update_OtherValue_Creater: val => {
      dispatch(update_OtherValue_Creater(val))
    }
  }
}

const Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(ParentComponent)

export default Main