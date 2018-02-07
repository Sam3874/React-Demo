export const update_data_Creater = value => ({  
  type: 'UPDATE_DATA',
  value
});

export const update_OtherValue_Creater = value => ({  
  type: 'UPDATE_OTHERVALUE',
  value
});

export const columnDefs_Creater = value => ({  
  type: 'UPDATE_COLUMNDEFS',
  value
});

export const rowData_Creater = (value=[]) => ({  
  type: 'UPDATE_ROWDATA',
  value
});