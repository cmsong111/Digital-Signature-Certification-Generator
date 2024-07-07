# RSASSA-PSS 전자 서명 서명키 생성

## 목적

상장 및 인증서 부여 시 전자서명을 통해 해당 인증서에 대한 신뢰성을 높이기 위해 사용한다.

## Payload, Signature로 구성된다.

### Payload

> 인증서 및 수료증에 대한 정보를 담고 있는 JSON 형식의 데이터

```json
{
  "serialNumber": "제 2024-0001호",
  "title": "수료증",
  "content": "위 사람은 GDSC DEU 23-24기를 성공적으로 수료하였음을 증명합니다.",
  "date": "2024-07-06",
  "creator": "GDSC DEU 23-24 Lead 김남주"
}
```

### Signature

> Json을 RSASSA-PSS로 서명한 값

```json
{
  "signature": "qwiofhqwfoihqowinefowq" // RSASSA-PSS로 생성된 전자서명
}
```
