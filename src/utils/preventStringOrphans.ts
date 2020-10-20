/**
 * Replaces (at least) the last space with a non-breaking space to
 * prevent typesetting "orphans"
 * @param _str String to modify
 * @param minLastLineLength Minimum unbroken length of the last line (in characters)
 */


export default function preventStringOrphans(_str: string, minLastLineLength : number = 10) : string {
    let str = _str.trim();
    let len = str.length;

    let i = str.lastIndexOf(" ");

    str = str.substr(0, i) + '\u00A0' + str.substr(i+1, len-i-1);
    i = str.lastIndexOf(" ");

    while (i > len - minLastLineLength && i > 0) {
        str = str.substr(0, i) + '\u00A0' + str.substr(i+1, len-i-1);
        i = str.lastIndexOf(" ");
    }

    return str;
}
