var zeroPad = function (num) {
    return '00000000'.slice(String(num).length) + num
};
var textToBinary = function (username) {
    return username.split('').map(function (char) {
        return zeroPad(char.charCodeAt(0).toString(2));
    }).join(' ')
};

var binaryToZeroWidth = function (binary) {
    return binary.split('').map(function (binaryNum) {
        var num = parseInt(binaryNum, 10);
        if (num === 1) {
            return '​'; // zero-width space
        } else if (num === 0) {
            return '‌'; // zero-width non-joiner
        }
        return '‍'; // zero-width joiner
    }).join('') // zero-width no-break space
};

var zeroWidthToBinary = function (string) {
    return string.split('').map(function (char) { // zero-width no-break space
        if (char === '​') { // zero-width space
            return '1';
        } else if (char === '‌') { // zero-width non-joiner
            return '0';
        }
        return ' '; // add single space
    }).join('')
};

var binaryToText = function (string) {
    return string.split(' ').map(function (num) {
        return String.fromCharCode(parseInt(num, 2))
    }).join('')
};


function decode() {
    var tx = document.querySelector("#decode").value;
    var a = binaryToText(zeroWidthToBinary(tx)).trim();
    alert(a)
}

function encode() {
    var tx = document.querySelector("#encode").value;
    var s = binaryToZeroWidth(textToBinary(tx));
    document.querySelector("#parse").innerText = s;
    copy('parse')
}


/**
 * 一键复制
 * @param  {String} id [需要复制的内容]
 * @param  {String} attr [需要 copy 的属性，默认是 innerText，主要用途例如赋值 a 标签上的 href 链接]
 *
 * range + selection
 *
 * 1.创建一个 range
 * 2.把内容放入 range
 * 3.把 range 放入 selection
 *
 * 注意：参数 attr 不能是自定义属性
 * 注意：对于 user-select: none 的元素无效
 */
function copy(id, attr) {
    let target = null;

    if (attr) {
        let curNode = document.querySelector('#' + id);
        target = document.createElement('div');
        target.id = 'tempTarget';
        target.style.opacity = '0';
        target.innerText = curNode[attr];
        document.body.appendChild(target);
    } else {
        target = document.querySelector('#' + id);
    }

    try {
        let range = document.createRange();
        range.selectNode(target);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        alert('复制成功');
    } catch (e) {
        alert('复制失败');
    }

    if (attr) {
        // remove temp target
        target.parentElement.removeChild(target);
    }
}