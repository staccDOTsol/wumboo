"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessages = exports.ChatMessageSkeleton = void 0;
const react_1 = __importStar(require("react"));
const react_2 = require("@chakra-ui/react");
const spl_utils_1 = require("@strata-foundation/spl-utils");
const throttle_1 = __importDefault(require("lodash/throttle"));
const react_async_hook_1 = require("react-async-hook");
const Message_1 = require("./message/Message");
const INACTIVE_TIME = 60; // After 1 minute, new grouping
const INFINITE_SCROLL_THRESHOLD = 300;
const FETCH_COUNT = 50;
const ChatMessageSkeleton = () => (react_1.default.createElement(react_2.Flex, { padding: 2, gap: 2 },
    react_1.default.createElement(react_2.Flex, null,
        react_1.default.createElement(react_2.SkeletonCircle, { size: "9" })),
    react_1.default.createElement(react_2.Flex, { grow: 1, direction: "column", gap: 2 },
        react_1.default.createElement(react_2.Flex, { gap: 2 },
            react_1.default.createElement(react_2.Skeleton, { height: "8px", w: "120px" }),
            react_1.default.createElement(react_2.Skeleton, { height: "8px", w: "60px" })),
        react_1.default.createElement(react_2.Skeleton, { height: "8px", w: "full" }),
        react_1.default.createElement(react_2.Skeleton, { height: "8px", w: "full" }))));
exports.ChatMessageSkeleton = ChatMessageSkeleton;
const canUseDOM = typeof window !== "undefined";
const useIsomorphicLayoutEffect = canUseDOM ? react_1.useLayoutEffect : react_1.useEffect;
const ChatMessages = ({ isLoading, isLoadingMore, hasMore, fetchMore = () => null, scrollRef, messages = [], }) => {
    const myScrollRef = (0, react_1.useRef)(null);
    if (!scrollRef)
        scrollRef = myScrollRef;
    const hasMessages = messages.length > 0;
    const [isSticky, setIsSticky] = (0, react_1.useState)(true);
    // On render if we dont have a scroll bar
    // and we have hasMore then fetch initialMore
    (0, react_1.useEffect)(() => {
        if (scrollRef.current.scrollHeight == scrollRef.current.offsetHeight &&
            hasMore &&
            !isLoading) {
            fetchMore(FETCH_COUNT);
        }
    }, [scrollRef, hasMore, isLoading, fetchMore]);
    const handleOnScroll = (0, react_1.useCallback)((0, throttle_1.default)((e) => {
        const scrollOffset = e.target.scrollHeight + e.target.scrollTop;
        if (scrollOffset <= e.target.offsetHeight + INFINITE_SCROLL_THRESHOLD &&
            !isLoadingMore &&
            hasMore) {
            fetchMore(FETCH_COUNT);
        }
        setIsSticky(e.target.scrollTop > -50);
    }, 300), [isLoadingMore, fetchMore, hasMore, setIsSticky]);
    const loaders = (0, react_1.useMemo)(() => {
        return !messages.length ? (Array.from(Array(FETCH_COUNT).keys()).map((x, index) => (react_1.default.createElement(exports.ChatMessageSkeleton, { key: `skeleton-${index}` })))) : (react_1.default.createElement(exports.ChatMessageSkeleton, null));
    }, [messages.length]);
    const { execute: scrollToMessage } = (0, react_async_hook_1.useAsyncCallback)(function (id) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield (0, spl_utils_1.sleep)(300);
            }
            document.removeEventListener("keypress", keyPress);
        });
    });
    const scrollAnchorRef = (0, react_1.useRef)(null);
    useIsomorphicLayoutEffect(() => {
        var _a;
        if (isSticky)
            (_a = scrollAnchorRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
    }, [messages, isSticky]);
    return (react_1.default.createElement(react_2.Flex, { grow: 1, overflowY: "auto", direction: "column-reverse", ref: scrollRef, onScroll: handleOnScroll },
        react_1.default.createElement("div", { ref: scrollAnchorRef, style: { height: "0px" }, id: "scroll-anchor" }),
        !isLoading &&
            (messages === null || messages === void 0 ? void 0 : messages.map((msg, index) => (react_1.default.createElement(Message_1.MemodMessage, Object.assign({ scrollToMessage: scrollToMessage, key: msg === null || msg === void 0 ? void 0 : msg.id }, msg, { showUser: !(messages[index + 1] &&
                    messages[index + 1].sender.equals(msg.sender) &&
                    messages[index + 1].endBlockTime >=
                        (msg.startBlockTime || new Date().valueOf() / 1000) -
                            INACTIVE_TIME) || !!msg.reply }))))),
        (isLoading || isLoadingMore) && loaders,
        !(isLoading || isLoadingMore) && !hasMessages && (react_1.default.createElement(react_2.Stack, { w: "full", h: "full", justifyContent: "center", alignItems: "center", gap: 0, spacing: 0, position: "relative", lineHeight: 9 },
            react_1.default.createElement(react_2.Text, { fontSize: "3xl", zIndex: "1" }, "Its Quiet In Here"),
            react_1.default.createElement(react_2.Text, { fontSize: "3xl", color: "primary.500", zIndex: "1" }, "Say Something"),
            react_1.default.createElement(react_2.Icon, { width: "100%", height: "50%", viewBox: "0 0 578 440", fill: "none", xmlns: "http://www.w3.org/2000/svg", color: "gray.800", position: "absolute" },
                react_1.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z", fill: "currentColor" }))))));
};
exports.ChatMessages = ChatMessages;
//# sourceMappingURL=ChatMessages.js.map