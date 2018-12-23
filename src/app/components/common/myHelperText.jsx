import React from "react";
import { FormHelperText } from '@material-ui/core/Form';

const MyHelperText = (props) => (       
    props.map( message => 
        <FormHelperText>        
            { message }    
        </FormHelperText>  
    );
);
export default MyHelperText;