import React from 'react'

function OnChangeHandler(event,clientes,setSuggestions,setText,text){
        let matches = [];
        if (text.length > 0) {
            matches = clientes.filter((cliente) => {
                const regex = new RegExp(`${text}`, "gi");
                return cliente.primer_nombre.match(regex);
            });
        }
        console.log("matches", matches);
        setSuggestions(matches);
        setText(event);
}

export default OnChangeHandler

