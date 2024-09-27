"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const ri_1 = require("react-icons/ri");
const sections = [
    {
        title: "Docs",
        items: [
            {
                title: "Tutorial",
                href: "https://docs.strataprotocol.com/im/getting_started",
            },
        ],
    },
    {
        title: "Community",
        items: [
            {
                title: "Discord",
                href: "https://discord.gg/XQhCFg77WM",
            },
            {
                title: "Twitter",
                href: "https://twitter.com/StrataProtocol",
            },
        ],
    },
    {
        title: "Policies",
        items: [
            {
                title: "Terms of Service",
                href: "/terms-of-service.pdf",
            },
            {
                title: "Privacy Policy",
                href: "/privacy-policy.pdf",
            },
        ],
    },
    {
        title: "More",
        items: [
            {
                title: "Blog",
                href: "https://www.strataprotocol.com/blog",
            },
            {
                title: "GitHub",
                href: "https://github.com/StrataFoundation/strata",
            },
            {
                title: "Launchpad",
                href: "https://app.strataprotocol.com",
            },
        ],
    },
];
const Footer = () => {
    return (react_2.default.createElement(react_1.VStack, { bg: "#191C2A", pt: "60px", pb: "120px" },
        react_2.default.createElement(react_1.Container, { maxW: "container.lg" },
            react_2.default.createElement(react_1.Stack, { spacing: 16, direction: ["column", "row"] }, sections.map(({ title, items }) => (react_2.default.createElement(react_1.VStack, { align: "left", key: title },
                react_2.default.createElement(react_1.Text, { fontWeight: 700, fontSize: "15px", color: "white" }, title),
                items.map((item) => (react_2.default.createElement(react_1.Link, { href: item.href, key: item.title, fontWeight: 400, fontSize: "15px", color: "orange.500", isExternal: true },
                    react_2.default.createElement(react_1.HStack, { spacing: 1 },
                        react_2.default.createElement(react_1.Text, null, item.title),
                        react_2.default.createElement(react_1.Icon, { as: ri_1.RiExternalLinkLine })))))))))),
        react_2.default.createElement(react_1.Center, { textColor: "rgba(255, 255, 255, 0.49)", w: "full" }, "Copyright \u00A9 2022 Strata Foundation.")));
};
exports.Footer = Footer;
//# sourceMappingURL=Footer.js.map