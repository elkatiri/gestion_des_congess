import Demande from '../FichierJson/Demande.json';

const initState = Demande;

const DemandeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'AJOUTER_CONGE':
            return [...state, action.payload];

        case 'MODIFIER_STATUT_CONGE':
            return state.map(conge =>
                conge.id === action.payload.id
                    ? { ...conge, statut: action.payload.statut } 
                    : conge 
            );

        default:
            return state;
    }
};

export default DemandeReducer;
