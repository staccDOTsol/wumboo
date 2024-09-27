import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, } from "react";
import { Flex, Icon, Skeleton, SkeletonCircle, Stack, Text, } from "@chakra-ui/react";
import { sleep } from "@strata-foundation/spl-utils";
import throttle from "lodash/throttle";
import { useAsyncCallback } from "react-async-hook";
import { MemodMessage } from "./message/Message";
const INACTIVE_TIME = 60; // After 1 minute, new grouping
const INFINITE_SCROLL_THRESHOLD = 300;
const FETCH_COUNT = 50;
export const ChatMessageSkeleton = () => (React.createElement(Flex, { padding: 2, gap: 2 },
    React.createElement(Flex, null,
        React.createElement(SkeletonCircle, { size: "9" })),
    React.createElement(Flex, { grow: 1, direction: "column", gap: 2 },
        React.createElement(Flex, { gap: 2 },
            React.createElement(Skeleton, { height: "8px", w: "120px" }),
            React.createElement(Skeleton, { height: "8px", w: "60px" })),
        React.createElement(Skeleton, { height: "8px", w: "full" }),
        React.createElement(Skeleton, { height: "8px", w: "full" }))));
const canUseDOM = typeof window !== "undefined";
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;
export const ChatMessages = ({ isLoading, isLoadingMore, hasMore, fetchMore = () => null, scrollRef, messages = [], }) => {
    const myScrollRef = useRef(null);
    if (!scrollRef)
        scrollRef = myScrollRef;
    const hasMessages = messages.length > 0;
    const [isSticky, setIsSticky] = useState(true);
    // On render if we dont have a scroll bar
    // and we have hasMore then fetch initialMore
    useEffect(() => {
        if (scrollRef.current.scrollHeight == scrollRef.current.offsetHeight &&
            hasMore &&
            !isLoading) {
            fetchMore(FETCH_COUNT);
        }
    }, [scrollRef, hasMore, isLoading, fetchMore]);
    const handleOnScroll = useCallback(throttle((e) => {
        const scrollOffset = e.target.scrollHeight + e.target.scrollTop;
        if (scrollOffset <= e.target.offsetHeight + INFINITE_SCROLL_THRESHOLD &&
            !isLoadingMore &&
            hasMore) {
            fetchMore(FETCH_COUNT);
        }
        setIsSticky(e.target.scrollTop > -50);
    }, 300), [isLoadingMore, fetchMore, hasMore, setIsSticky]);
    const loaders = useMemo(() => {
        return !messages.length ? (Array.from(Array(FETCH_COUNT).keys()).map((x, index) => (React.createElement(ChatMessageSkeleton, { key: `skeleton-${index}` })))) : (React.createElement(ChatMessageSkeleton, null));
    }, [messages.length]);
    const { execute: scrollToMessage } = useAsyncCallback(async function (id) {
        // listen to escape key press to break loop
        let breakLoop = false;
        function keyPress(e) {
            if (e.key === "Escape") {
                breakLoop = true;
            }
        }
        document.addEventListener("keypress", keyPress);
        while (!breakLoop && hasMore && scrollRef.current) {
            let findElem = document.getElementById(id);
            if (findElem) {
                findElem.scrollIntoView({ behavior: "smooth", block: "center" });
                return;
            }
            // scroll to the top which should load more messages
            scrollRef.current.scroll({
                top: -scrollRef.current.scrollHeight,
                behavior: "smooth",
            });
            await sleep(300);
        }
        document.removeEventListener("keypress", keyPress);
    });
    const scrollAnchorRef = useRef(null);
    useIsomorphicLayoutEffect(() => {
        if (isSticky)
            scrollAnchorRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
    }, [messages, isSticky]);
    return (React.createElement(Flex, { grow: 1, overflowY: "auto", direction: "column-reverse", ref: scrollRef, onScroll: handleOnScroll },
        React.createElement("div", { ref: scrollAnchorRef, style: { height: "0px" }, id: "scroll-anchor" }),
        !isLoading &&
            messages?.map((msg, index) => (React.createElement(MemodMessage, { scrollToMessage: scrollToMessage, key: msg?.id, ...msg, showUser: !(messages[index + 1] &&
                    messages[index + 1].sender.equals(msg.sender) &&
                    messages[index + 1].endBlockTime >=
                        (msg.startBlockTime || new Date().valueOf() / 1000) -
                            INACTIVE_TIME) || !!msg.reply }))),
        (isLoading || isLoadingMore) && loaders,
        !(isLoading || isLoadingMore) && !hasMessages && (React.createElement(Stack, { w: "full", h: "full", justifyContent: "center", alignItems: "center", gap: 0, spacing: 0, position: "relative", lineHeight: 9 },
            React.createElement(Text, { fontSize: "3xl", zIndex: "1" }, "Its Quiet In Here"),
            React.createElement(Text, { fontSize: "3xl", color: "primary.500", zIndex: "1" }, "Say Something"),
            React.createElement(Icon, { width: "100%", height: "50%", viewBox: "0 0 578 440", fill: "none", xmlns: "http://www.w3.org/2000/svg", color: "gray.800", position: "absolute" },
                React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z", fill: "currentColor" }))))));
};
//# sourceMappingURL=ChatMessages.js.map