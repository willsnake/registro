import jsPDF from 'jspdf';
import {
    PRINT_ID_USER_EDIT,
} from './constants';

export function printIDEdit(args = {}) {
    return (dispatch, getState) => {
        dispatch({
            type: PRINT_ID_USER_EDIT
        });

        const { userEdit } = getState().registro;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'cm',
            format: [10, 13]
        });
        doc.setFont('Helvetica');
        doc.setFontSize(10);
        doc.text(`${userEdit.titulo} ${userEdit.nombre} ${userEdit.apellido_pa} ${userEdit.apellido_ma}`, 2.6, 9);
        doc.text(`${userEdit.categoria}`, 3.6, 9.7);
        const newPDF = doc.output('dataurlstring', 'gafete.pdf');
        window.open(newPDF);
    };
}

export function reducer(state, action) {
    switch (action.type) {
        case PRINT_ID_USER_EDIT:
            return {
                ...state
            };

        default:
            return state;
    }
}
