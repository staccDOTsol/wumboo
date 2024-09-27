import { Textarea } from "@chakra-ui/react";
import React from "react";
export const ChatInput = ({ onChange, inputRef, ...rest }) => (React.createElement(Textarea, { ref: inputRef, onChange: onChange, resize: "none", overflow: "hidden", rows: 1, px: 0, w: "full", h: "full", backgroundColor: "transparent", outline: "none", boxShadow: "none !important", border: "none !imporatnt", borderColor: "transparent !important", placeholder: "GM, Say Something.....", ...rest }));
//# sourceMappingURL=ChatInput.js.map