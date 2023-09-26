import { connect } from "react-redux";
import { VocabularySelectField } from "@js/oarepo_vocabularies";
import { createStore, combineReducers } from 'redux';
import{ configureStore }from "@reduxjs/toolkit"
import {resetQuery} from 'react-searchkit'

const rootReducer = combineReducers({
  dataReducer,   
});

export const store = configureStore(rootReducer);

const mapStateToProps = (state) => ({
    value: null,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    resetQuery: () => dispatch(resetQuery()), 
  });
  

  export const ConnectedVocabularySelectField = connect(
    mapStateToProps,
    mapDispatchToProps
  )(VocabularySelectField);
  