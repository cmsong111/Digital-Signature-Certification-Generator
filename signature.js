
// RSA 전역 변수
/** @type {JSEncrypt} */
let rsa;

/**
 *  RSA Key Pair 생성
 */
function createRSAKeyPair() {
    rsa = new JSEncrypt({ default_key_size: 2048 });
    rsa.getKey();
    document.getElementById('privateKey').value = rsa.getPrivateKey();
    document.getElementById('publicKey').value = rsa.getPublicKey();
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
   
    rsa = new JSEncrypt();
    rsa.setPrivateKey(privateKey.value);
    rsa.setPublicKey(publicKey.value);
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

async function generateSignature(message) {

    // RSA 키가 없으면 리턴
    if (!rsa) {
        return;
    }

    try{
        // Json 메시지 서명
        const msgBuffer = new TextEncoder().encode(message);
        const privateKeyObj = await importKey(rsa.getPrivateKey(), 'private');

        rsa.sign(msgBuffer, privateKeyObj).then(signature => {
            document.getElementById('signature').value = signature;
        });

    } catch (e) {
        console.error(e);
        console.error('서명 생성 실패');

    }

}

function verifySignature() {
    const serialNumber = document.getElementById('SerialNumber').value;
    const publicKey = document.getElementById('publicKey').value;
    const signature = document.getElementById('signature').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const date = document.getElementById('date').value;
    const creator = document.getElementById('creator').value;

    const message = JSON.stringify({ serialNumber, title, content, date, creator });
}


function importKey(pem, type) {
    const binaryDerString = window.atob(pem.split('\n').slice(1, -1).join(''));
    const binaryDer = str2ab(binaryDerString);

    return window.crypto.subtle.importKey(
        'pkcs8',
        binaryDer,
        {
            name: 'RSA-PSS',
            hash: 'SHA-256',
        },
        true,
        type === 'private' ? ['sign'] : ['verify']
    );
}

function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}
