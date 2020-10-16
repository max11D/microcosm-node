export default function nameToSafeURL(str) {
    return str.replace(/[^0-9\sa-zA-Z]+/g, "").trim().replace(/\s+/g, "-").toLowerCase();
}