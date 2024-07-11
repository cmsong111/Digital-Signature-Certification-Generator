---
layout: post
title: "RSA 키 생성하기"
date: 2024-07-09 15:24:38 +0900
---

# RSA 키 생성하기

> RSA 키를 생성하는 방법에 대해 알아봅니다.

### 1. RSA 키 생성

[디지털 서명 생성 페이지](/Digital-Signature-Certification-Generator/rsa-key-gen)로 접속합니다.

Create RSA Key Pair 버튼을 클릭합니다.

<p>
    <img src="/Digital-Signature-Certification-Generator/assets/images/rsa_key_gen_example.png" width="700">
</p>

### 2. 생성된 키 확인

키를 생성하면 Private Key와 Public Key가 생성됩니다.

Private key를 사용해서 JWS를 생성하고, Public Key를 사용해서 JWS를 검증할 수 있습니다.

Private Key는 안전한 곳에 보관하고, Public Key는 검증에 사용하게 될 홈페이지에서 키를 등록합니다.

Download RSA Key Pari 버튼을 통해 키를 다운로드 받을 수 있습니다.

### 주의사항

- Private Key는 절대로 타인에게 노출되어서는 안됩니다.
- Private Key를 분실하면 복구가 불가능합니다.
- 다운로드한 Key는 안전한 곳에 보관해야 합니다.
- Public Key는 안전하게 공유해도 무방합니다.
- 해당 웹 페이지에서는 해당 [RSA](/Digital-Signature-Certification-Generator/assets/example_rsa.txt)키를 사용합니다
