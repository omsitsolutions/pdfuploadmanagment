const documents = (state = [], action) => {
    switch (action.type) {
      case 'ADD_DOCUMENT':
        return [
          ...state,
          {
            id: action.id,
            size: action.size,
            path: action.path
          }
        ]
      case 'SET_DOCUMENTS':
        return action.documents
      default:
        return state
    }
  }
  
  export default documents