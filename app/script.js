// ================================
// HEX → RGB
// ================================

function hexToRgb(hex) {

    hex = hex.trim().replace("#", "");

    // Support #RGB as well as #RRGGBB
    if (hex.length === 3) {
        hex =
            hex[0] + hex[0] +
            hex[1] + hex[1] +
            hex[2] + hex[2];
    }

    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
        throw new Error(
            "Invalid HEX color"
        );
    }

    const r = parseInt(
        hex.substring(0, 2),
        16
    );

    const g = parseInt(
        hex.substring(2, 4),
        16
    );

    const b = parseInt(
        hex.substring(4, 6),
        16
    );

    return {
        r: r,
        g: g,
        b: b
    };
}


// ================================
// RGB → HEX
// ================================

function rgbToHex(r, g, b) {

    if (
        !Number.isInteger(r) ||
        !Number.isInteger(g) ||
        !Number.isInteger(b) ||
        r < 0 || r > 255 ||
        g < 0 || g > 255 ||
        b < 0 || b > 255
    ) {
        throw new Error(
            "Invalid RGB value"
        );
    }

    return "#" +
        [r, g, b]
        .map(value =>
            value
                .toString(16)
                .padStart(2, "0")
        )
        .join("")
        .toUpperCase();
}


// ================================
// RGB → HSL
// ================================

function rgbToHsl(r, g, b) {

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);

    const min = Math.min(r, g, b);

    let h = 0;

    let s = 0;

    const l = (max + min) / 2;

    if (max !== min) {

        const d = max - min;

        s =
            l > 0.5
                ? d / (2 - max - min)
                : d / (max + min);

        switch (max) {

            case r:

                h =
                    (g - b) / d +
                    (g < b ? 6 : 0);

                break;

            case g:

                h =
                    (b - r) / d + 2;

                break;

            case b:

                h =
                    (r - g) / d + 4;

                break;
        }

        h /= 6;
    }

    return {

        h: Math.round(h * 360),

        s: Math.round(s * 100),

        l: Math.round(l * 100)

    };
}


// ================================
// HSL → RGB
// ================================

function hslToRgb(h, s, l) {

    h /= 360;

    s /= 100;

    l /= 100;

    let r;
    let g;
    let b;

    if (s === 0) {

        r = g = b = l;

    } else {

        const hue2rgb = function(p, q, t) {

            if (t < 0) t += 1;

            if (t > 1) t -= 1;

            if (t < 1 / 6)
                return p + (q - p) * 6 * t;

            if (t < 1 / 2)
                return q;

            if (t < 2 / 3)
                return p +
                    (q - p) *
                    (2 / 3 - t) *
                    6;

            return p;
        };

        const q =
            l < 0.5
                ? l * (1 + s)
                : l + s - l * s;

        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);

        g = hue2rgb(p, q, h);

        b = hue2rgb(p, q, h - 1 / 3);
    }

    return {

        r: Math.round(r * 255),

        g: Math.round(g * 255),

        b: Math.round(b * 255)

    };
}


// ================================
// Parse RGB Input
// ================================

function parseRgb(value) {

    const numbers =
        value.match(/\d+(\.\d+)?/g);

    if (!numbers || numbers.length !== 3) {

        throw new Error(
            "Enter RGB like: 52, 152, 219"
        );
    }

    const r = Number(numbers[0]);

    const g = Number(numbers[1]);

    const b = Number(numbers[2]);

    if (
        r < 0 || r > 255 ||
        g < 0 || g > 255 ||
        b < 0 || b > 255
    ) {

        throw new Error(
            "RGB values must be between 0 and 255"
        );
    }

    return {
        r: Math.round(r),
        g: Math.round(g),
        b: Math.round(b)
    };
}


// ================================
// Parse HSL Input
// ================================

function parseHsl(value) {

    const numbers =
        value.match(/-?\d+(\.\d+)?/g);

    if (!numbers || numbers.length !== 3) {

        throw new Error(
            "Enter HSL like: 204, 70%, 53%"
        );
    }

    const h = Number(numbers[0]);

    const s = Number(numbers[1]);

    const l = Number(numbers[2]);

    if (
        h < 0 || h > 360 ||
        s < 0 || s > 100 ||
        l < 0 || l > 100
    ) {

        throw new Error(
            "HSL values are out of range"
        );
    }

    return {
        h: h,
        s: s,
        l: l
    };
}


// ================================
// Convert Color
// ================================

function convertColor() {

    const type =
        document.getElementById(
            "conversionType"
        ).value;

    const input =
        document.getElementById(
            "colorInput"
        ).value.trim();

    const error =
        document.getElementById(
            "error"
        );

    error.textContent = "";

    try {

        let rgb;

        // ----------------------------
        // HEX
        // ----------------------------

        if (type === "hex") {

            rgb = hexToRgb(input);

        }

        // ----------------------------
        // RGB
        // ----------------------------

        else if (type === "rgb") {

            rgb = parseRgb(input);

        }

        // ----------------------------
        // HSL
        // ----------------------------

        else if (type === "hsl") {

            const hsl = parseHsl(input);

            rgb = hslToRgb(
                hsl.h,
                hsl.s,
                hsl.l
            );
        }


        // Generate all formats

        const hex =
            rgbToHex(
                rgb.r,
                rgb.g,
                rgb.b
            );

        const hsl =
            rgbToHsl(
                rgb.r,
                rgb.g,
                rgb.b
            );


        // Update results

        document.getElementById(
            "hexResult"
        ).textContent = hex;


        document.getElementById(
            "rgbResult"
        ).textContent =
            `${rgb.r}, ${rgb.g}, ${rgb.b}`;


        document.getElementById(
            "hslResult"
        ).textContent =
            `${hsl.h}, ${hsl.s}%, ${hsl.l}%`;


        // Update preview

        document.getElementById(
            "colorPreview"
        ).style.backgroundColor = hex;


        // Update color picker

        document.getElementById(
            "colorPicker"
        ).value = hex;


    } catch (err) {

        error.textContent = err.message;

    }
}


// ================================
// Conversion Type Change
// ================================

document
    .getElementById("conversionType")
    .addEventListener(
        "change",
        function() {

            const type = this.value;

            const label =
                document.getElementById(
                    "inputLabel"
                );

            const input =
                document.getElementById(
                    "colorInput"
                );


            if (type === "hex") {

                label.textContent =
                    "HEX Color";

                input.value =
                    "#3498DB";

                input.placeholder =
                    "#3498DB";
            }


            else if (type === "rgb") {

                label.textContent =
                    "RGB Color";

                input.value =
                    "52, 152, 219";

                input.placeholder =
                    "52, 152, 219";
            }


            else if (type === "hsl") {

                label.textContent =
                    "HSL Color";

                input.value =
                    "204, 70%, 53%";

                input.placeholder =
                    "204, 70%, 53%";
            }

            convertColor();

        }
    );


// ================================
// Color Picker
// ================================

document
    .getElementById("colorPicker")
    .addEventListener(
        "input",
        function() {

            const hex = this.value;

            document.getElementById(
                "conversionType"
            ).value = "hex";

            document.getElementById(
                "colorInput"
            ).value = hex;

            convertColor();

        }
    );


// ================================
// Copy Result
// ================================

function copyValue(elementId) {

    const value =
        document.getElementById(
            elementId
        ).textContent;

    navigator.clipboard.writeText(value);

    alert(
        "Copied: " + value
    );
}


// ================================
// Reset
// ================================

function resetColor() {

    document.getElementById(
        "conversionType"
    ).value = "hex";

    document.getElementById(
        "colorInput"
    ).value = "#3498DB";

    document.getElementById(
        "colorPicker"
    ).value = "#3498DB";

    document.getElementById(
        "inputLabel"
    ).textContent = "HEX Color";

    document.getElementById(
        "error"
    ).textContent = "";

    convertColor();
}


// ================================
// Initial Conversion
// ================================

document
    .getElementById("conversionType")
    .addEventListener(
        "change",
        function() {

            const type = this.value;

            const label =
                document.getElementById("inputLabel");

            const input =
                document.getElementById("colorInput");

            if (type === "hex") {

                label.textContent = "HEX Color";

                input.value = "#3498DB";

                input.placeholder = "#3498DB";
            }

            else if (type === "rgb") {

                label.textContent = "RGB Color";

                input.value = "52, 152, 219";

                input.placeholder = "52, 152, 219";
            }

            else if (type === "hsl") {

                label.textContent = "HSL Color";

                input.value = "204, 70%, 53%";

                input.placeholder = "204, 70%, 53%";
            }

            convertColor();
        }
    );
