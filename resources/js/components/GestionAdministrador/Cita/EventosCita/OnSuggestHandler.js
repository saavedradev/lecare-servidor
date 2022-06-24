import React from 'react'

function OnSuggestHandler(text,setText,setvalueCita,valueCita,setSuggestions) {
    const cliente =
            text.primer_nombre +
            " " +
            text.segundo_nombre +
            " " +
            text.primer_apellido;
        setText(cliente);
        setvalueCita({...valueCita,'cedula_cliente':text.id})
        setSuggestions([]);
}

export default OnSuggestHandler

