import jsPDF from 'jspdf';
import {
    PRINT_ID_USER,
} from './constants';

export function printID(e) {
    e.preventDefault();
    return (dispatch, getState) => {
        dispatch({
            type: PRINT_ID_USER
        });

        const { user } = getState().registro;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'cm',
            format: [10, 13]
        });
        doc.setFont('Helvetica');
        doc.setFontSize(10);
        doc.text(`${user.titulo} ${user.nombre} ${user.apellido_pa} ${user.apellido_ma}`, 2.6, 9);
        doc.text(`${user.categoria}`, 3.6, 9.7);
        const newPDF = doc.output('dataurlstring', 'gafete.pdf');
        window.open(newPDF);
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case PRINT_ID_USER:
            return {
                ...state
            };

        default:
            return state;
    }
}
