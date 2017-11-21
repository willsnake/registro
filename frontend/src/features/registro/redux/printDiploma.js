import jsPDF from 'jspdf';
import {
    PRINT_DIPLOMA_USER,
} from './constants';

export function printDiploma(e) {
    e.preventDefault();
    return (dispatch, getState) => {
        dispatch({
            type: PRINT_DIPLOMA_USER
        });

        const { userEdit } = getState().registro;
        const doc = new jsPDF({
            orientation: 'landscape'
        });
        doc.setFont('Helvetica');
        doc.text(`${userEdit.titulo} ${userEdit.nombre} ${userEdit.apellido_pa} ${userEdit.apellido_ma}`, 110, 125);
        doc.text(`${userEdit.categoria}`, 130, 135);
        const newPDF = doc.output('dataurlstring', 'gafete.pdf');
        window.open(newPDF);
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case PRINT_DIPLOMA_USER:
            return {
                ...state
            };

        default:
            return state;
    }
}
