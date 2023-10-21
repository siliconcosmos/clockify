export const Strings = {
    unwrapMatch(searchSpace:string, regex:string|RegExp):string[] {
        let cells:RegExpMatchArray|null = searchSpace.match(regex);
        if (cells && cells.length > 0) {
            return [...cells];
        }
        return [];
    }
};