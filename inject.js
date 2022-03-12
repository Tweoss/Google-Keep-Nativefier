// Handling keys
const click = (el) => {
    el.dispatchEvent(new MouseEvent('mousedown'));
    el.dispatchEvent(new MouseEvent('mouseup'));
};

const selectors = {
    'tasks': ".IZ65Hb-n0tgWb.IZ65Hb-WsjYwc-nUpftc.di8rgd-r4nke.RNfche",
    'palettes': "[aria-label=\"Background options. Select to change note color or add background.\"",
    'opened_palette': ".ti6hGc",
    'active_task': ".cb6R2e-AHmuwe",
    'palette_button_relative': "div > div > div[aria-label=\"Background options\"]",
    'color_button_relative': "div > div",
}

const handle_color = (e, color) => {
    // make sure is currently in palette
    const current_el = document.activeElement;
    const palette = current_el.closest(selectors.opened_palette);
    if (!palette) {
        return;
    }
    click(palette.querySelector(selectors.color_button_relative + `[aria-label="${color}"]`));
    e.stopImmediatePropagation();
    e.preventDefault();
}

// close the first visible palette by DOM order if `el` is inside a palette
const close_one_palette = (e, el) => {
    const palette = el.closest(selectors.opened_palette);
    if (palette) {
        click(document.querySelector(selectors.active_task).querySelector(selectors.palette_button_relative));
        e.stopImmediatePropagation();
        e.preventDefault();
        return true;
    } else {
        return false;
    }

}

const handlers = {
    's': (e) => {
        if (!e.ctrlKey) {
            return;
        }
        const current_el = document.activeElement;
        // Closing palette if currently inside palette, else open palette
        if (!close_one_palette(e, current_el)) {
            // used j or k to focus element
            const keyboard_focused = current_el.querySelector("div > div > div[aria-label=\"Background options\"]");
            if (keyboard_focused && keyboard_focused.clientWidth > 0) {
                click(keyboard_focused);
                return;
            }
            // main creating new note
            const main_create = document.querySelector("body > div.notes-container > div > div > div > div > div > div > div > div[aria-label=\"Background options\"]");
            if (main_create.clientWidth > 0) {
                click(main_create);
                return;
            }
            // main editing an existing note
            const individual_edit = document.querySelector("body > div > div > div > div > div > div[aria-label=\"Background options\"]");
            if (individual_edit) {
                click(individual_edit);
                return;
            }
            // hovered element
            const hovered = document.querySelector("body > div.notes-container > div > div > div > div > div:hover > div > div > div > div[aria-label=\"Background options\"]");
            if (hovered) {
                click(hovered);
                return;
            }
            e.stopImmediatePropagation();
            e.preventDefault();
        }

    },
    // keys for Red, Yellow, Dark blue, Purple, Gray
    'r': (e) => {
        handle_color(e, 'Red');
    },
    'y': (e) => {
        handle_color(e, 'Yellow');
    },
    'b': (e) => {
        handle_color(e, 'Dark blue');
    },
    'p': (e) => {
        handle_color(e, 'Purple');
    },
    'g': (e) => {
        handle_color(e, 'Gray');
    },
};

document.addEventListener("keydown", (e) => {
    if (handlers[e.key]) {
        handlers[e.key](e);
    }
});
