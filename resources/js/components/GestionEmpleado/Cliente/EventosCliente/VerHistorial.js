import axios from 'axios';

function VerHistorial(event,idHistorial,setValuesHistorialCliente,valuesHistorialCliente,setKey,page) {
event.preventDefault();
setValuesHistorialCliente({...valuesHistorialCliente,idHistorial:idHistorial});
axios.get(`https://lecarespa.herokuapp.com/api/historial/${idHistorial}`).then((res) => {
        const historialEncontrado = res.data.historial;
        const antecedente= res.data.antecedente;
        const examenFisico= res.data.examenFisico;
        const signoVital= res.data.signoVital;
        const historial = Object.assign({}, historialEncontrado, antecedente,examenFisico,signoVital);
        console.log(historial)
        setValuesHistorialCliente({
            ...valuesHistorialCliente,
            ...historial,idHistorial:historialEncontrado.id
        });
        setKey(page);
    });
}

export default VerHistorial
