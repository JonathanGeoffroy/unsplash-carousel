import { useCallback, useEffect, useReducer } from "react";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const INITIAL_STATE = {
  initialized: false,
  data: null,
  selectedIndex: null,
};

const ACTIONS = {
  INITIALIZED: "INITIALIZED",
  PREVIOUS: "PREVIOUS",
  NEXT: "NEXT",
  GOTO: "GOTO",
};

function previous() {
  return {
    type: ACTIONS.PREVIOUS,
  };
}
function next() {
  return {
    type: ACTIONS.NEXT,
  };
}

function goto(index) {
  return {
    type: ACTIONS.GOTO,
    payload: index,
  };
}

function initialized(data) {
  return {
    type: ACTIONS.INITIALIZED,
    payload: data,
  };
}

function reducer(state, action) {
  const { data, selectedIndex, initialized } = state;
  switch (action.type) {
    case ACTIONS.INITIALIZED:
      return {
        ...state,
        data: action.payload,
        initialized: true,
        selectedIndex: 0,
      };
    case ACTIONS.PREVIOUS:
      if (!initialized) {
        return state;
      }
      return {
        ...state,
        selectedIndex: (data.length + selectedIndex - 1) % data.length,
      };
    case ACTIONS.NEXT:
      if (!initialized) {
        return state;
      }
      return {
        ...state,
        selectedIndex: (selectedIndex + 1) % data.length,
      };

    case ACTIONS.GOTO:
      if (!initialized) {
        return state;
      }
      return {
        ...state,
        selectedIndex: Math.min(action.payload, data.length - 1),
      };
    default:
      return state;
  }
}

export default function useSelection() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    fetch(SERVER_URL)
      .then((res) => res.json())
      .then((data) => dispatch(initialized(data)));
  }, []);

  const handlePrevious = useCallback(() => dispatch(previous()), []);
  const handleNext = useCallback(() => dispatch(next()), []);
  const handleGoto = useCallback((index) => dispatch(goto(index)), []);

  return {
    state,
    handlePrevious,
    handleNext,
    handleGoto,
  };
}
