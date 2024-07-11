
// RSA 전역 변수
/** string pem */
let rsaPublicKey;
/** string pem */
let rsaPrivateKey;


/**
 *  RSA Key Pair 생성
 */
function createRSAKeyPair() {
    rsaKeypair = KEYUTIL.generateKeypair("RSA", 1024);


    document.getElementById('privateKey').value = KEYUTIL.getPEM(rsaKeypair.prvKeyObj, "PKCS1PRV");
    document.getElementById('publicKey').value =  KEYUTIL.getPEM(rsaKeypair.pubKeyObj);
    
    rsaPrivateKey = document.getElementById('privateKey').value;
    rsaPublicKey =  document.getElementById('publicKey').value;
}

/**
 * RSA Key Pair 로드
 */
function loadRSAKeyPair() {

    const privateKey = document.getElementById('privateKey');
    const publicKey = document.getElementById('publicKey');

    if (privateKey){
        try{
            rsaKeypair = KEYUTIL.getKey(privateKey.value, "PKCS1PRV");
            rsaPrivateKey = privateKey.value;
            privateKey.classList.remove('is-invalid');
            createJson();
        } catch (e) {
            privateKey.classList.add('is-invalid');
        }

    }

    if (publicKey){
        try{
            rsaKeypair = KEYUTIL.getKey(publicKey.value);
            rsaPublicKey = publicKey.value;
            publicKey.classList.remove('is-invalid');
            verifyJWS()
        }
        catch (e) {
            publicKey.classList.add('is-invalid');
        }
    }
}
    

/**
 * RSA Key Pair 다운로드
 */
function downloadRSAKeyPair() {
    const privateKey = document.getElementById('privateKey');
    const publicKey = document.getElementById('publicKey');

    // 값이 없으면 리턴
    if (!privateKey.value || !publicKey.value) {
        createRSAKeyPair()
    }

    const element = document.createElement('a');
    const file = new Blob([privateKey.value + '\n' + publicKey.value], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'keypair.txt';
    element.click();
}

/**
 * Json 생성 
 * @returns  {string} message
 */
function createJson(){
    // messageForm form data to json
    const form = document.getElementById('messageForm');
    const formData = new FormData(form);

    // FormData 객체를 일반적인 객체로 변환
    const dataObject = Object.fromEntries(formData.entries());

    // JSON 문자열로 변환
    const jsonString = JSON.stringify(dataObject, null, 2);
    
    // JSON 문자열을 textarea에 출력
    document.getElementById('json-body').value = jsonString;

    generateJwsCode(jsonString);

    return jsonString;
}

function generateJwsCode(message) {

    // RSA 키가 없으면 리턴
    var rsaPrivateKey = document.getElementById('privateKey').value;
    if (!rsaPrivateKey) {
        return;
    }

    var oHeader = {alg: "PS256"};
    var sHeader = JSON.stringify(oHeader);
    document.getElementById('jws_code').value = KJUR.jws.JWS.sign("PS256", sHeader, message, rsaPrivateKey);

}


function verifyJWS() {
    // JWS 코드와 공개키를 가져옵니다.
    const jwsCode = document.getElementById("jws-code")


    // JWS 코드와 공개키가 입력되지 않았을 경우 경고창을 띄웁니다.
    if (jwsCode.className === "form-control is-invalid" && rsaPublicKey === undefined) {
        console.log("JWS 코드와 공개키를 입력해주세요.")
        return
    }
    
    // JWS 코드를 검증합니다.
    try {
        isValid = KJUR.jws.JWS.verify(jwsCode.value, rsaPublicKey, ["PS256"])
    } catch (e) {
        isValid = false
    }
 
    // 검증 결과를 화면에 표시합니다.
    document.getElementById("parse_result").className = isValid ? "btn btn-success" : "btn btn-danger"
    document.getElementById("parse_result").innerText = isValid ? "검증 성공" : "검증 실패"
    document.getElementById("download_area").className = isValid ? "d-block" : "d-none"
    
}

function parseJWS() {
    const jwsCode = document.getElementById("jws-code")

    try{
        const parsed = KJUR.jws.JWS.parse(jwsCode.value)
        const header = parsed.headerObj
        const payload = parsed.payloadObj
    
        document.getElementById("header").innerText = JSON.stringify(header, null, 2)
        document.getElementById("payload").innerText = JSON.stringify(payload, null, 2)

        jwsCode.classList.remove('is-invalid');
        verifyJWS();
    } catch (e) {
        jwsCode.classList.add('is-invalid');
    }
}