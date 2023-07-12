export const initialState = {
  loading: false,
  contacts: [],
  groups: [],
  group: {},
  filteredContacts: [],
  query: "",
  contact: {
    fullname: "",
    photo: "",
    email: "",
    job: "",
    mobile: "",
    group: "",
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_LOADING":
      return { ...state, loading: !state.loading };

    case "CREATE_CONTACT":
      return { ...state, contact: { ...state.contact, ...action.payload } };

    case "CLEAR_CONTACT":
      return {
        ...state,
        contact: {
          fullname: "",
          photo: "",
          email: "",
          job: "",
          mobile: "",
          group: "",
        },
      };

    case "GET_ALL_CONTACTS":
      return { ...state, contacts: action.payload.contacts };

    case "GET_CONTACT_BY_ID":
      return { ...state, contact: action.payload.contact };

    case "ADD_CONTACT":
      const id =
        state.contacts.length > 0
          ? state.contacts[state.contacts.length - 1].id + 1
          : 1;
          console.log(action.payload.values)
      return {
        ...state,
        contacts: [...state.contacts, { ...action.payload.values, id: id }],
      };

    case "UPDATE_CONTACT":
      let contactSelected = state.contacts.find(
        (contact) => contact.id == action.payload.contactId
      );
      contactSelected={...contactSelected,...action.payload.values}
      return state;

    case "REMOVE_CONTACT":
      const { contactId } = action.payload;
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id != contactId),
      };

    case "GET_ALL_GROUPS":
      return { ...state, groups: action.payload.groups };

    case "GET_GROUP_BY_CONTACT_GROUP":
      return { ...state, group: action.payload.group };

    case "SET_QUERY_SEARCH":
      return { ...state, query: action.payload.query };

    case "SEARCH_CONTACT":
      return {
        ...state,
        filteredContacts: state.contacts.filter((contact) =>
          contact.fullname.toLowerCase().includes(action.payload.query.toLowerCase())
        ),
      };

      default:
      return state;
  }
};
