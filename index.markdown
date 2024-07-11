---
layout: post
---

# JWS Based Certification Generater

> 상장에 JWS를 적용하여 인증서를 생성하는 프로젝트입니다.

### 1. Json 기반으로 인증서에 들어갈 내용을 작성합니다.

```json
{
  "serialNumber": "제 2024-0001호",
  "title": "수료증",
  "name": "홍길동",
  "content": "위 사람은 GDSC DEU에서 성실하게 활동하였으므로 이 수료증을 수여합니다.",
  "date": "2024-07-11",
  "organization": "GDSC 23-24 Dong-Eui Chapter Lead",
  "creator": "김남주",
  "template": "gdsc_deu_23-24.pptx"
}
```

### 2. JWS를 이용하여 Json을 서명합니다.

```plaintext
eyJhbGciOiJQUzI1NiJ9.ewogICJzZXJpYWxOdW1iZXIiOiAi7KCcIDIwMjQtMDAwMe2YuCIsCiAgInRpdGxlIjogIuyImOujjOymnSIsCiAgIm5hbWUiOiAi7ZmN6ri464-ZIiwKICAiY29udGVudCI6ICLsnIQg7IKs656M7J2AIEdEU0MgREVV7JeQ7IScIOyEseyLpO2VmOqyjCDtmZzrj5ntlZjsmIDsnLzrr4DroZwg7J20IOyImOujjOymneydhCDsiJjsl6ztlanri4jri6QuIiwKICAiZGF0ZSI6ICIyMDI0LTA3LTExIiwKICAib3JnYW5pemF0aW9uIjogIkdEU0MgMjMtMjQgRG9uZy1FdWkgQ2hhcHRlciBMZWFkIiwKICAiY3JlYXRvciI6ICLquYDrgqjso7wiLAogICJ0ZW1wbGF0ZSI6ICJnZHNjX2RldV8yMy0yNC5wcHR4Igp9.BX12L41zoNGAhoPgrusxDTo8niuAmU49T88wBAtf0BsIeJu-aQ8Df1I5MpT9hk-z_FUnwjbaVf_MDhCfk_CPDrwkseVEoxzDistTsqtp6FiDf47L2ONfktKF-Q1MkMXJZKDfPdoV-zNTIv_b3keA9v83UwMvIORt6U85GQhy4ic
```

### 3. 수여자에게 코드를 전달합니다. (QR or URL)

- URL:
  [https://cmsong111.github.io/Digital-Signature-Certification-Generator/verify?code=eyJhbGciOiJQUzI1NiJ9.ewogICJzZXJpYWxOdW1iZXIiOiAi7KCcIDIw...](https://cmsong111.github.io/Digital-Signature-Certification-Generator/verify?code=eyJhbGciOiJQUzI1NiJ9.ewogICJzZXJpYWxOdW1iZXIiOiAi7KCcIDIwMjQtMDAwMe2YuCIsCiAgInRpdGxlIjogIuyImOujjOymnSIsCiAgIm5hbWUiOiAi7ZmN6ri464-ZIiwKICAiY29udGVudCI6ICLsnIQg7IKs656M7J2AIEdEU0MgREVV7JeQ7IScIOyEseyLpO2VmOqyjCDtmZzrj5ntlZjsmIDsnLzrr4DroZwg7J20IOyImOujjOymneydhCDsiJjsl6ztlanri4jri6QuIiwKICAiZGF0ZSI6ICIyMDI0LTA3LTExIiwKICAib3JnYW5pemF0aW9uIjogIkdEU0MgMjMtMjQgRG9uZy1FdWkgQ2hhcHRlciBMZWFkIiwKICAiY3JlYXRvciI6ICLquYDrgqjso7wiLAogICJ0ZW1wbGF0ZSI6ICJnZHNjX2RldV8yMy0yNC5wcHR4Igp9.BX12L41zoNGAhoPgrusxDTo8niuAmU49T88wBAtf0BsIeJu-aQ8Df1I5MpT9hk-z_FUnwjbaVf_MDhCfk_CPDrwkseVEoxzDistTsqtp6FiDf47L2ONfktKF-Q1MkMXJZKDfPdoV-zNTIv_b3keA9v83UwMvIORt6U85GQhy4ic)

- QR:
  <img src="./assets/images/qr_example.png" width="300" height="300">

### 4. 웹 페이지를 통해 검증 또는 인증서 내려받기를 진행합니다.

![cer](./assets/images/certification_example.jpg)
