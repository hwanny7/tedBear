# 🐻 TEDBEAR - TED 영상 추천 서비스

![main_logo](/uploads/a91000ae1ed646188a73422e02d37dd7/main_logo.png)

## TEDBEAR 링크(PC 화면) : [https://ted-bear.com](https://ted-bear.com/)




## 소개 영상(UCC) : [https://www.youtube.com/watch?v=ibgid94lf5Q](https://www.youtube.com/watch?v=ibgid94lf5Q)

---

# 👣 프로젝트 진행 기간

---

2023.02.20(월) ~ 2023.04.07(금) (39일간 진행)

SSAFY 8기 2학기 특화프로젝트 - TEDBEAR

# 🐻 TEDBEAR - 배경

---

취업을 준비하는데 OPIC, TOEIC SPEAKING 등의 영어 말하기 점수를 요구하는 기업이 많아지면서, 영어 공부의 중요성이 대두되고 있습니다.

영어 말하기를 준비하기 위해서는 영어권 발화자의 발음을 직접 듣고, 따라 말하는 공부법이 가장 효과적입니다.

TEDBEAR는 영어 말하기를 공부하는 사람들을 위해 탄생한 TED 강연 영상 추천 서비스 입니다.

# 👣 TEDBEAR - 개요

---

*- TED와 함께 검증된 강연자의 비즈니스 회화를 들으며 영어를 공부하세요 -*

TEDBEAR는 미국의 유명한 강연회인 TED와 배워의 음가를 차용한 BEAR🐻의 합성어입니다.

TEDBEAR는 이용자의 실력에 맞는 TED 영상, 문장을 추천해주고 말하기 연습 기능, 단어 퍼즐과 십자말풀이 등을 제공하여 영어 학습을 효과적으로 도와주는 웹서비스 입니다.

# 🐻 주요 기능

---

### 영상, 문장 추천

- 문장에 “Gunning-Fog Index”, “flesch-reading-ease” 등의 지표를 활용하여 난이도를 부여합니다.
- 영상에 포함된 문장의 난이도 평균으로 난이도를 부여합니다.
- 이용자의 행위에 따라 영어 실력을 지속적으로 업데이트 합니다.
- 이용자의 실력에 맞는 TED 영상과 문장을 추천해줍니다.

### 영상 학습

- TED 영상과 동기화된 스크립트를 보면서 학습할수 있습니다.
- 문장 별 번역본을 제공합니다.
- 문장을 따라 말할며 연습할수 있습니다.

### 단어 퍼즐, 십자말풀이 게임

- 단어 퍼즐과 십자말풀기 게임을 통해 재미있게 단어와 문장을 학습할수 있습니다.
- 해당 단어가 포함된 문장을 쇼츠 형태의 힌트로 제공하여 단어와 문장을 효과적으로 학습할수 있습니다.

### 단어 사전

- 단어의 뜻과, 해당 단어가 포함된 문장과 영상을 함께 제공합니다.
- 검증된 TED 영상에 포함된 예문으로 단어를 학습할수 있습니다.

## 👣 **주요 기술**

---

**Backend**

- Java : Oracle OpenJDK 11.0.7
- SpringBoot 2.7.9
- Spring Security 5.7.7
- Spring Data Jpa 2.7.9
- Junit 5.8.2
- Gradle 7.6.1

**FrontEnd**

- React 17.0.2
- React-router 6.8.2
- Node.js 16.16.0
- TypeScript 4.9.5
- Redux 4.2.0
- Redux-toolkit 1.9.3
- Redux-persist 6.0.0
- Styled-component 5.3.9
- Axios 1.3.4
- React-ga4 2.1.0
- React-speech-recognition 3.10.0

**CI/CD**

- AWS EC2
- Ubuntu 20.04 LTS
- Jenkins 2.387.1
- Docker Engine 23.0.1
- Nginx ****1.23.4
- SSL

## 🐻 **프로젝트 파일 구조**

### Backend

```markdown
tedbear
|-- domain
|   |-- game
|   |-- log
|   |-- member
|   |-- model
|   |-- sentence
|   |-- video
|   └-- word
`-- global
    |-- common
    |   |-- mattermost
    |   └-- oauth2
    |-- config
    |-- error
    └-- util
        └-- data
            |-- controller
            |-- dto
            |-- exception
            └-- service
```

### FrontEnd

```markdown
tedbear
|-- public
└-- src
    |-- assets
    |   └-- img
    |-- components
    |   |-- bookmark
    |   |-- common
    |   |-- learning
    |   |-- level
    |   |-- profile
    |   |-- puzzle
    |   |-- short
    |   └-- video
    |-- pages
    |-- redux
    └-- utils
        └-- api
```

## 👣 협업 툴

---

- Git
- Notion
- JIRA
- Figma
- MatterMost
- Webex

## 🐻 협업 환경

---

- Gitlab
    - 코드의 버전을 관리
    - “main”, “develop-be”, “develop-fe”의 브랜치를 개발 git-flow에 따라 관리
    - 상세 기능 구현 시, “feature-be/(기능)”, “feature-fe/(기능)” 로 세부 브랜치 관리
    - Gitmoji를 활용하여 정해진 commit style에 맞춰 커밋 기록 관리
- JIRA
    - 매주 목표량을 설정하여 Sprint 진행
    - 업무의 할당량을 정하여 Story Point를 설정하고, In-Progress -> Done 순으로 작업
- Notion
    - 회의가 있을 때마다 회의록을 기록하여 보관
    - 에러 사항에 대해 기록하고 해결법 공유
    - 컨벤션 정리
    - 유저플로우, 와이어프레임, 기능명세서, ERD, API 리스트 등 산출물 실시간 공유
- Figma
    - 피그마 피그잼을 이용한 유저 플로우 설계
    - 피그마 디자인을 이용한 와이어 프레임 설계
    - 발표 자료 제작과 중간 결과물 실시간 공유

## 👣 팀원 역할 분배

---

![team_introduce](/uploads/ae1cbd78500268de7e875f3a4bbf5c4e/team_introduce.png)

## Contact Us

| 성명 | 깃허브아이디 | 기술스택 |
| --- | --- | --- |
| 박일규 | repeater1384 | JAVA / SpringBoot |
| 박서영 | SEOYOUNG-cloud | JAVA / SpringBoot |
| 정연진 | yeonjan | JAVA / SpringBoot |
| 윤승환 | Hwanny7 | React |
| 장유하 |  | React |
| 정혜주 | hyejoojung719 | React |

## 🐻 프로젝트 산출물

---

- [요구사항 명세서](https://blushing-friend-fae.notion.site/35220bca4fe84b5f9ec01b2782401f10)
- [API 명세서](https://blushing-friend-fae.notion.site/BE-API-1d1fc2e2ef2041c5b531e557bc00dd27)
- [ERD](https://www.erdcloud.com/d/Stfw9w3abZpp6nfAw)
- [와이어프레임](https://www.figma.com/file/sQaMuizs6UCsLCZmc5FnQI/%ED%8A%B9%ED%99%94%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-UI%2FUX?node-id=1297-799)


## 👣 프로젝트 결과물

---

- 아키텍쳐, CICD 구성도
- 중간발표자료
- 최종발표자료
- 포팅메뉴얼
