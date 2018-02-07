import React from "react";
import { FormHelperText } from 'material-ui/Form';

const MyHelperText = (props) => (       
    props.map( message => 
        <FormHelperText>        
            { message }    
        </FormHelperText>  
    );
);
export default MyHelperText;