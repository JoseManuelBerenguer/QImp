/*
 Demantisa.js. Eliminació dels valors petits escrits en format exponencial.
*/

autowatch = 1;

// Llindar opcional per magnitud (per si vols eliminar valors petits també)
var threshold = 1e-10;

function anything() {
    var msg = messagename + " " + arrayfromargs(arguments).join(" ");
    var strValues = msg.trim().split(/\s+/);
    var cleaned = [];

    for (var i = 0; i < strValues.length; i++) {
        var s = strValues[i];

        // Si conté notació exponencial, el convertim directament a 0.0
        if (s.indexOf("e") !== -1 || s.indexOf("E") !== -1) {
            cleaned.push(0.0);
            continue;
        }

        var num = parseFloat(s);

        // Si és NaN o massa petit, també el fem zero
        if (isNaN(num) || Math.abs(num) < threshold) {
            cleaned.push(0.0);
        } else {
            cleaned.push(num);
        }
    }

    outlet(0, cleaned);
}