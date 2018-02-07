import { connect } from 'react-redux'
import { update_data_Creater,  update_OtherValue_Creater, rowData_Creater } from '../../redux/actions'
import ParentComponent from './agGrid_component'

const mapStateToProps = state => {  
  return {
    app_rowData: state.rowData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    app_update_rowData: val => {
      dispatch(rowData_Creater(val))
    }
  }
}

const Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(ParentComponent)

export default Main