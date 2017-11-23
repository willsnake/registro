import jsPDF from 'jspdf';
import {
    PRINT_ID_USER_EDIT,
    NAME_ID_X,
    NAME_ID_Y,
    LAST_NAME_ID_X,
    LAST_NAME_ID_Y,
    ID_BASE,
    ID_HEIGHT,
    ID_FONT_SIZE,
    CATEGORY_ID_X,
    CATEGORY_ID_Y,
} from './constants';

export function printIDEdit(e) {
    e.preventDefault();
    return (dispatch, getState) => {
        dispatch({
            type: PRINT_ID_USER_EDIT
        });

        const { userEdit } = getState().registro;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'cm',
            format: [ID_BASE, ID_HEIGHT]
        });
        doc.setFont('Helvetica');
        doc.setFontSize(ID_FONT_SIZE);
        const nombre = `${userEdit.titulo} ${userEdit.nombre}`;
        const categoria = `${userEdit.categoria}`;
        if (nombre.length > 10) {
            doc.text(nombre, 0.5, NAME_ID_Y);
        } else {
            doc.text(nombre, NAME_ID_X, NAME_ID_Y);
        }
        doc.text(`${userEdit.apellido_pa} ${userEdit.apellido_ma}`, LAST_NAME_ID_X, LAST_NAME_ID_Y);
        if (categoria === 'COMITÉ ORGANIZADOR') {
            doc.text(`${userEdit.categoria}`, 0, CATEGORY_ID_Y);
        } else {
            doc.text(`${userEdit.categoria}`, CATEGORY_ID_X, CATEGORY_ID_Y);
        }
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
