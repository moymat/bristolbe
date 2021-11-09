export const getRightsListValue = (state, permission) => {
    if (permission === 'editors') {
        return state.bristol.bristolEditorsList;
    } 
    else if (permission === 'readers') {
        return state.bristol.bristolReadersList;
    } 
}
