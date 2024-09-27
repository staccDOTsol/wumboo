"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowSize = void 0;
const react_1 = require("react");
const canUseDOM = typeof window !== "undefined";
const useIsomorphicLayoutEffect = canUseDOM ? react_1.useLayoutEffect : react_1.useEffect;
function useWindowSize() {
    const [size, setSize] = (0, react_1.useState)(["100vw", "100vh"]);
    useIsomorphicLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth.toString(), window.innerHeight.toString()]);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
}
exports.useWindowSize = useWindowSize;
//# sourceMappingURL=useWindowSize.js.map