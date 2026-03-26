
// FOLDING ---------------------------------------------------------------------

// Add arrows to trip headings
const noteheadings = [...document.getElementsByTagName('h2')];
const arrowsvg = `<svg width="10" height="10" viewBox="0 0 10 10" class="droparrow" `
    +`xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">`
    +`<path style="stroke-width:1;stroke-linejoin:round;" `
    +`d="M 1.1517591,2.9637924 4.9865781,7.6621763 8.8213969,2.9637924 Z" /></svg>`;
noteheadings.map(h =>
    h.innerHTML = arrowsvg + h.innerHTML);

// Fold notes section
const notes = [...document.getElementsByClassName('outline-2')];

notes.map(outline =>
    [...outline.children].map(div =>
        div.tagName !== 'H2' ? div.classList.toggle('inactive') : null));

noteheadings.map(h2 =>
    h2.addEventListener('click', function() {
        [...this.parentElement.children].map(div =>
            div.tagName !== 'H2' ? div.classList.toggle('inactive'): null);
        this.getElementsByClassName('droparrow')[0].classList.toggle('dropped');
    }));


// FILTERS ---------------------------------------------------------------------

const notetitle = note => note
      .getElementsByTagName('h2')[0]
      .innerText.split('\n')[1]
      .trim();

const notetags = note =>
      [...note.getElementsByClassName('tag')]
      .map(s => s.innerText);

const notedate = note =>
      new Date(note.getElementsByClassName('timestamp')[0]
               .innerText
               .substring(1,11));

const notefiltertext = note => note.textContent;

const intersection = (array1, array2) => array1.filter(value => array2.includes(value));

// Read tags
const tagobjects = [...document.getElementsByClassName('tag')]
      .map(e => e.innerText);
const tags = [...new Set(tagobjects)];


// Search bar
const title = document.getElementsByClassName('title')[0];
const searchid = 'searchbar';
title.innerHTML += `<div id='filters'>`;
filters.innerHTML += `<input id='${searchid}' placeholder='Filter'>`;
// filters.innerHTML += `<input type=date id='min-date'><br>`;
// filters.innerHTML += `<input type=date id='max-date'><br>`;
filters.innerHTML += `<div id=tagbuttons>`;
for (let i=0; i<tags.length; i++) {
    tagbuttons.innerHTML += `<button type="button">${tags[i]}</button>`;
}


const searchbar = document.getElementById(searchid);
searchbar.addEventListener('input', function() {refreshfilter();});

const buttons = [...document.getElementsByTagName('button')];
buttons.map(button => 
    button.addEventListener('click',
                            function() {
                                this.classList.toggle('checked');
                                refreshfilter();
                            })
);


function refreshfilter() {
    let filterVal = searchbar.value;

    for (let i=0; i<notes.length; i++) {
        let note = notes[i];
        note.classList.remove('inactive');
        if (notefiltertext(note).indexOf(filterVal) === -1) {
            note.classList.add('inactive');
        } else {
            note.classList.remove('inactive');
        }
    }

    let checkedtags = buttons.filter(b => b.classList == 'checked').map(b => b.innerText);
    if (checkedtags.length > 0) {
        for (let i=0; i<notes.length; i++) {
            let note = notes[i];
            if (intersection(notetags(note), checkedtags).length === 0) {
                note.classList.add('inactive');
            }
        }
    }
}


// MICROJOURNAL TIMESTAMPS -----------------------------------------------------
const jnlcandidates = document.getElementsByClassName('outline-text-2');
for (let i=0; i<jnlcandidates.length-1; i++) {
    jnlcandidates[i].innerHTML = jnlcandidates[i].innerHTML
        .replace(/([0-9][0-9]:[0-9][0-9])/g, "<span id='mjnltime'>$1</span>");
}
