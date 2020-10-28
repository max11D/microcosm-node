enum AccessibilityCodes {
    FULLY = "Only Fully Accessible Establishments",
    SUBWAY = "Nearby Accessible Subway Station"
};

export const AccessibilityCodesMap : { [key: string]: AccessibilityCodes; } = {
    "Only Fully Accessible Establishments": AccessibilityCodes.FULLY,
    "Nearby Accessible Subway Station": AccessibilityCodes.SUBWAY
}

export default AccessibilityCodes;