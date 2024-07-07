
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
    const name = document.getElementById('name').value;
    const content = document.getElementById('content').value;
    const date = document.getElementById('date').value;
    const organization = document.getElementById('organization').value;
    const creator = document.getElementById('creator').value;

    const message = JSON.stringify({ serialNumber, title, name, content, date, organization, creator }, null, 2);
    document.getElementById('json-body').value = message;

    generateJwsCode(message);
    return message;
}

function generateJwsCode(message) {

    // RSA 키가 없으면 리턴
    if (!rsaKeypair) {
        return;
    }

    var oHeader = {alg: "PS256"};
    var sHeader = JSON.stringify(oHeader);
    document.getElementById('jws_code').value = KJUR.jws.JWS.sign("PS256", sHeader, message, rsaKeypair.prvKeyObj);

}


function verifyJWS() {
    // JWS 코드와 공개키를 가져옵니다.
    const jwsCode = document.getElementById("jws-code").value
    const publicKey = document.getElementById("publicKey").value
    let isValid = false

    // JWS 코드와 공개키가 입력되지 않았을 경우 경고창을 띄웁니다.
    if (document.getElementById("jws-code").value === "" || document.getElementById("publicKey").value === "") {
        alert("JWS 코드 또는 공개키를 입력해주세요.")
        return false
    }
    
    // JWS 코드를 검증합니다.
    try {
        isValid = KJUR.jws.JWS.verify(jwsCode, publicKey, ["PS256"])
    } catch (e) {
        alert("JWS 코드 또는 공개키가 올바르지 않습니다.")
        isValid = false
    }
 
    // 검증 결과를 화면에 표시합니다.
    document.getElementById("parse_result").className = isValid ? "btn btn-success" : "btn btn-danger"
    document.getElementById("parse_result").innerText = isValid ? "검증 성공" : "검증 실패"

    // JWS 코드를 파싱합니다.
    if (isValid) {
        parseJWS(jwsCode)
    }
    // 결과를 반환합니다.
    return isValid
}

function parseJWS() {
    const jwsCode = document.getElementById("jws-code").value
    const parsed = KJUR.jws.JWS.parse(jwsCode)
    const header = parsed.headerObj
    const payload = parsed.payloadObj

    document.getElementById("header").innerText = JSON.stringify(header, null, 2)
    document.getElementById("payload").innerText = JSON.stringify(payload, null, 2)
}