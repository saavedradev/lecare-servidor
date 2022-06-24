import React from 'react'

function EliminarFilasTable(e,idValue,values,setValues) {
e.preventDefault();
const newArray = values.filter(
    (element) => element.id !== idValue
);
setValues(newArray);
}

export default EliminarFilasTable


