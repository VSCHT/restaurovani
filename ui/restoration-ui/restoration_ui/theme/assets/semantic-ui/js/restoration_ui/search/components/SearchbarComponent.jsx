import React, {Component} from "react";
import { SearchBar } from "@js/invenio_search_ui/components";
import { buildUID, withState} from "react-searchkit";
import { Input, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";

// export const CustomSearchBar = withState(
//   ({
//     onBtnSearchClick,
//     onInputChange,
//     placeholder,
//     uiProps,
//     onKeyPress,
//     queryString,
//     executeSearch,
//     ...actionProps
//   }) => {
//     const handleReset = (q) => {
//       onInputChange(q);
//       onBtnSearchClick();
//       executeSearch();
//     };

//     const mapDispatchToProps = (dispatch) => ({
//       resetQuery: () => dispatch(resetQuery()),
//     });

//     return (
//       <Input
//         className="predmety__input-search"
//         {...uiProps}
//         placeholder={placeholder || "Hledat..."}
//         onChange={(_, { value }) => {
//           onInputChange(value);
//         }}
//         value={queryString}
//         icon={
//           queryString !== "" ? (
//             <Button
//               onClick={()=>resetQuery()}
//               className="predmety__btn-reset"
//             >
//               <Icon name="delete" />
//             </Button>
//           ) : (
//             "none"
//           )
//         }
//         onKeyPress={onKeyPress}
//       ></Input>

//     );
//   }
// );


export const CustomSB = 
  ({
    onBtnSearchClick,
    onInputChange,
    placeholder,
    uiProps,
    onKeyPress,
    queryString,
    executeSearch,
    resetQuery,
    state,
    ...actionProps
  }) => {
    console.log(resetQuery)
    console.log(onKeyPress)
    console.log(state)


    const handleReset = (q) => {
      resetQuery(onBtnSearchClick)
      console.log(state)
      
          };

    return (
      <Input
        className="predmety__input-search"
        {...uiProps}
        placeholder={placeholder || "Hledat..."}
        onChange={(_, { value }) => {
          onInputChange(value);
        }}
        value={queryString}
        icon={
          queryString !== "" ? (
            <Button
              onClick={handleReset}
              className="predmety__btn-reset"
            >
              <Icon name="delete" />
            </Button>
          ) : (
            "none"
          )
        }
        onKeyPress={onKeyPress}
      ></Input>
    );
  }

// class CustomSB extends Component{
//   constructor(props){
//     super(props);
//     this.resetQuery= props.resetQuery;
//   }
//   render(){
//     const {
//       onBtnSearchClick,
//       onInputChange,
//       placeholder,
//       uiProps,
//       onKeyPress,
//       queryString,
//       executeSearch,
//       resetQuery,
//       state,
//       ...actionProps
//     }= this.props;
  
//   return(
//     <Input
//     className="predmety__input-search"
//     {...uiProps}
//     placeholder={placeholder || "Hledat..."}
//     onChange={(_, { value }) => {
//       onInputChange(value);
//     }}
//     value={queryString}
//     icon={
//       queryString !== "" ? (
//         <Button
//           onClick={() => resetQuery()}
//           className="predmety__btn-reset"
//         >
//           <Icon name="delete" />
//         </Button>
//       ) : (
//         "none"
//       )
//     }
//     onKeyPress={onKeyPress}
//   ></Input>
//   )
// }}

// export default CustomSB

