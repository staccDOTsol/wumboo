import { Alert, Box, Progress, Text, VStack } from "@chakra-ui/react";
import { useInterval } from "@strata-foundation/react";
import React, { useEffect, useState } from "react";
import { useAsync } from "react-async-hook";
export function LongPromiseNotification({ onComplete, onError, exec, estTimeMillis, text }) {
    const [time, setTime] = useState(0);
    const { result, error } = useAsync(exec, []);
    useEffect(() => {
        if (onComplete && result) {
            onComplete(result);
        }
    }, [result, onComplete]);
    useEffect(() => {
        if (onError && error) {
            onError(error);
        }
    }, [error, onError]);
    useInterval(() => {
        setTime(time => time + 100);
    }, 100);
    return (React.createElement(Alert, { w: "290px", bgColor: "black.300", borderTop: "1px", borderTopColor: "gray.600", rounded: "lg", fontFamily: "body", color: "white", status: "success", flexDirection: "column", p: 0 },
        React.createElement(Box, { w: "full" },
            React.createElement(Progress, { value: Math.min(time / estTimeMillis, 95) * 100 })),
        React.createElement(VStack, { align: "left", w: "full", p: 2, spacing: 1 },
            React.createElement(Text, { color: "gray.400" }, text))));
}
;
//# sourceMappingURL=LongPromiseNotification.js.map