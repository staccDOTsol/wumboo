import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Grid, // our UI Component to display the results
SearchBar, // the search bar the user will type into
SearchContext, // the context that wraps and connects our components
SearchContextManager, // the context manager, includes the Context.Provider
SuggestionBar, // an optional UI component that displays trending searches and channel / username results
 } from "@giphy/react-components";
import { GIPHY_API_KEY } from "../constants/globals";
export function GifSearch({ onSelect }) {
    return (React.createElement(SearchContextManager, { apiKey: GIPHY_API_KEY },
        React.createElement(Components, { onSelect: onSelect })));
}
// define the components in a separate function so we can
// use the context hook. You could also use the render props pattern
const Components = ({ onSelect }) => {
    //@ts-ignore
    const { fetchGifs, searchKey } = useContext(SearchContext);
    return (React.createElement(React.Fragment, null,
        React.createElement(SearchBar, null),
        React.createElement(Box, { w: "full", mt: 2 },
            React.createElement(SuggestionBar, null)),
        React.createElement(Box, { maxH: "500px", overflow: "auto", mt: 4 },
            React.createElement(Grid, { key: searchKey, columns: 3, width: 625, fetchGifs: fetchGifs, onGifClick: (gif, e) => {
                    e.preventDefault();
                    onSelect(String(gif.id));
                } }))));
};
//# sourceMappingURL=GifSearch.js.map