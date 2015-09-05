qrcode = new QRCode("qrcode", {
    width: 250,
    height: 250,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});

function showqrcode(httpaddr) {
    if ('' == httpaddr) return;
    $('#qrcode').css('visibility', 'visible')
    qrcode.makeCode(httpaddr)
}

function hideqrcode() {
    qrcode.clear()
    $('#qrcode').css('visibility', 'hidden')
}
