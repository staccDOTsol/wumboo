import "react-responsive-carousel/lib/styles/carousel.min.css";
declare type Community = {
    name: string;
    description: string;
    publicKey: string;
    image: string;
};
export declare const FEATURED_COMMUNITIES: Community[];
declare const Community: ({ identifierCertificateMint, name, description, dailyActiveUsers, image, }: {
    identifierCertificateMint?: string;
    name: string;
    description: string;
    dailyActiveUsers?: number;
    image: string;
}) => JSX.Element;
export declare const FeaturedCommunities: () => JSX.Element;
export {};
//# sourceMappingURL=FeaturedCommunities.d.ts.map