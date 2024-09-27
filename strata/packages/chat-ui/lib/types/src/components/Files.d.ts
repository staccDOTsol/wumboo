declare type NamedFile = {
    name: string;
    file: string | Blob;
};
export declare function Files({ files, onCancelFile, }: {
    files: NamedFile[];
    onCancelFile?: (file: string | Blob) => void;
}): JSX.Element;
export {};
//# sourceMappingURL=Files.d.ts.map