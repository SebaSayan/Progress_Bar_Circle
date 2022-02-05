function createBarre(elem) {
    if (elem) {

        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }

        var oMask = document.createElement('DIV');
        var oBarre = document.createElement('DIV');
        var oSup50 = document.createElement('DIV');

        oMask.className = 'progress-masque';
        oBarre.className = 'progress-barre';
        oSup50.className = 'progress-sup50';

        oMask.appendChild(oBarre);
        oMask.appendChild(oSup50);
        elem.appendChild(oMask);
    }
    return elem;
}

function initJauge(elem) {
    var angle;
    var oMask;
    var oSup50;
    var oBarre = elem.querySelector('.progress-barre');
    if (!oBarre) {

        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }

        oMask = document.createElement('DIV');
        oBarre = document.createElement('DIV');
        oSup50 = document.createElement('DIV');

        oMask.className = 'progress-masque';
        oBarre.className = 'progress-barre';
        oSup50.className = 'progress-sup50';

        oMask.appendChild(oBarre);
        oMask.appendChild(oSup50);
        elem.appendChild(oMask);
    }
    var val = elem.getAttribute('data-value');
    var valeur = val ? val * 1 : 0;
    elem.setAttribute('data-value', valeur.toFixed(1));
    angle = 360 * valeur / 100;
    if (oBarre) {
        oBarre.style.transform = 'rotate(' + angle + 'deg)';
    }
}

var oJauges = document.querySelectorAll('.progress-circle:not([class*=demo])');
var i, nb = oJauges.length;
for (i = 0; i < nb; i += 1) {

    createBarre(oJauges[i]);
}

var handleRange = function () {
    this.cibles = this.cible || document.querySelectorAll('[id^=' + this.dataset['for'] + ']');
    for (i = 0; i < this.cibles.length; i += 1) {
        this.cibles[i].setAttribute('data-value', this.value || 0);
        initJauge(this.cibles[i]);
    }
};

var oTRanges = document.querySelectorAll('[type=range]');
nb = oTRanges.length;
for (i = 0; i < nb; i += 1) {
    oTRanges[i].onchange = oTRanges[i].oninput = handleRange;
}

var step = 0.1;
var modulo = 1 / step;
var angle;
var count;
var i;
var nb = 100 + step / 2;
var txt = [];
for (i = 0, count = 0; i < nb; i += step, count += 1) {
    angle = 360 * i / 100;
    space = i < 10 ? '  ' : i < 100 ? ' ' : '';

    if (0 === count % modulo) {
        txt.push('.progress-circle[data-value="' + i.toFixed(0) + '"]  ' + space + ' .progress-barre,');
        txt.push('.progress-circle[data-value="' + i.toFixed(0) + '."] ' + space + ' .progress-barre,');
    }
    txt.push('.progress-circle[data-value="' + i.toFixed(1) + '"]' + space + ' .progress-barre {transform: rotate(' + angle.toFixed(2) + 'deg)}');
}
document.getElementById('val_css').innerHTML = txt.join('\r\n');
var oStyle = document.createElement('style');
oStyle.id = "style_insered";
oStyle.textContent = txt.join('\r\n');
document.querySelector('head').appendChild(oStyle);