export function convertMeasure(v, from, to) {
    if (from === to) {
        return v;
    }
    if (from === 'm' && to === 'f') {
        return round(v * 3.280839895);
    } else if (from === 'f' && to === 'm') {
        return round(v / 3.280839895);
    }
    return v;
}

function round(which) {
    return Math.round(which * 100) / 100;
}