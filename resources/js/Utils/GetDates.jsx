export function getEndDate(startdate, frequency) {
    const fecha = new Date(startdate);
    let fechaVencimiento = new Date(fecha);

    switch (Number(frequency)) {
        case 1:
            if (fecha.getUTCMonth() === 1 && fecha.getUTCDate() === 1) {
                fechaVencimiento.setUTCMonth(fechaVencimiento.getUTCMonth());
                fechaVencimiento.setUTCDate(28);
            } else {
                fechaVencimiento.setUTCMonth(fechaVencimiento.getUTCMonth() + 1);
                fechaVencimiento.setUTCDate(fechaVencimiento.getUTCDate() - 1);
            }
            break;

        case 2:
            const cantidadDiasDelMes = obtenerDiasDelMes(startdate);
            fechaVencimiento.setDate(
                fechaVencimiento.getDate() + (cantidadDiasDelMes === 31 ? 15 : 14)
            );
            break;

        case 3:
            fechaVencimiento.setDate(fechaVencimiento.getDate() + 6);
            break;
        case 4:
            fechaVencimiento.setDate(fechaVencimiento.getDate() + 1);
            break;

        default:
            throw new Error("Tipo de pago no válido");
    }
    return fechaVencimiento.toISOString().split('T')[0];
};