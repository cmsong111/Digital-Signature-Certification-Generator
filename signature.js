
// RSA 전역 변수
let rsaKeypair;


/**
 *  RSA Key Pair 생성
 */
function createRSAKeyPair() {
    rsaKeypair = KEYUTIL.generateKeypair("RSA", 1024);


    document.getElementById('privateKey').value = KEYUTIL.getPEM(rsaKeypair.prvKeyObj, "PKCS1PRV");
    document.getElementById('publicKey').value =  KEYUTIL.getPEM(rsaKeypair.pubKeyObj);
    //document.getElementById('publicKey').value =  sRSAPubCertPEM
}

/**
 * RSA Key Pair 로드
 */
function loadRSAKeyPair() {

    const privateKey = document.getElementById('privateKey');
    const publicKey = document.getElementById('publicKey');

    if  (!privateKey || !publicKey) {
        alert('키를 입력해주세요.');
        return;
    }

    rsaKeypair = {
        prvKeyObj: KEYUTIL.getKey(privateKey.value),
        pubKeyObj: KEYUTIL.getKey(publicKey.value)
    };
}
    

/**
 * RSA Key Pair 다운로드
 */
function downloadRSAKeyPair() {
    const privateKey = document.getElementById('privateKey').value;
    const publicKey = document.getElementById('publicKey').value;

    // 값이 없으면 리턴
    if (!privateKey || !publicKey) {
        alert('먼저 키를 생성해주세요.');
        return;
    }

    const element = document.createElement('a');
    const file = new Blob([privateKey + '\n' + publicKey], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'keypair.txt';
    element.click();
}

/**
 * Json 생성 
 * @returns  {string} message
 */
function createJson(){
    const serialNumber = document.getElementById('SerialNumber').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const date = document.getElementById('date').value;
    const creator = document.getElementById('creator').value;

    const message = JSON.stringify({ serialNumber, title, content, date, creator });
    document.getElementById('json-body').value = message;

    generateSignature(message);
    return message;
}

function generateSignature(message) {

    // RSA 키가 없으면 리턴
    if (!rsaKeypair) {
        return;
    }

    var oHeader = {alg: "PS256"};
    var sHeader = JSON.stringify(oHeader);
    document.getElementById('signature').value = KJUR.jws.JWS.sign("PS256", sHeader, message, rsaKeypair.prvKeyObj);

    verifySignature();
}

function verifySignature() {

    const signature = document.getElementById('signature').value;

    // RSA 키가 없으면 리턴
    if (!rsaKeypair) {
        return;
    }

    const isValid = KJUR.jws.JWS.verify(signature,  rsaKeypair.pubKeyObj,  ["PS256"]);
    document.getElementById('signature-result').className = isValid ? 'btn btn-success' : 'btn btn-danger';
    document.getElementById('signature-result').innerText = isValid ? '검증 성공' : '검증 실패';
}

