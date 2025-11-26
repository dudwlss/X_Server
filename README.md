# Node.js SNS 서버 프로젝트

## 📌 프로젝트 소개

이 프로젝트는 **Node.js + Express + MongoDB**를 기반으로 한 SNS(소셜 네트워크 서비스) 백엔드 서버와 **Vanilla JavaScript**로 구현된 프론트엔드 클라이언트를 포함합니다.

사용자 인증(JWT), 게시글 CRUD, 그리고 직관적인 웹 인터페이스를 제공합니다.

---

## 🛠 기술 스택

### 백엔드
- **Node.js** - 서버 런타임
- **Express** - 웹 프레임워크
- **MongoDB + Mongoose** - 데이터베이스
- **JWT (jsonwebtoken)** - 사용자 인증
- **bcrypt** - 비밀번호 암호화
- **express-validator** - 입력 검증
- **CORS** - Cross-Origin Resource Sharing

### 프론트엔드
- **HTML5** - 마크업
- **CSS3** - 스타일링 (Vanilla CSS)
- **JavaScript (ES6+)** - 클라이언트 로직
- **Fetch API** - 서버와의 통신

---

## 📂 프로젝트 구조

```
Server/
├── app.mjs                 # Express 앱 진입점
├── config.mjs              # 환경 설정
├── package.json            # 프로젝트 의존성
├── .env                    # 환경 변수 (DB URI, JWT Secret 등)
│
├── router/                 # API 라우터
│   ├── auth.mjs           # 인증 관련 라우트 (/auth/login, /auth/signup, /auth/me)
│   └── posts.mjs          # 게시글 관련 라우트 (/post)
│
├── controller/             # 비즈니스 로직
│   ├── auth.mjs           # 인증 컨트롤러
│   └── post.mjs           # 게시글 컨트롤러
│
├── data/                   # 데이터 접근 계층
│   ├── auth.mjs           # 사용자 데이터 처리
│   └── post.mjs           # 게시글 데이터 처리
│
├── db/                     # 데이터베이스 연결
│   └── database.mjs       # MongoDB 연결 설정
│
├── middleware/             # Express 미들웨어
│   ├── auth.mjs           # JWT 인증 미들웨어
│   └── validator.mjs      # 입력 검증 미들웨어
│
└── client/                 # 🎨 프론트엔드 (새로 추가)
    ├── index.html         # 로그인 페이지
    ├── signup.html        # 회원가입 페이지
    ├── posts.html         # 게시글 목록 페이지
    ├── post-detail.html   # 게시글 상세 페이지
    ├── write.html         # 게시글 작성 페이지
    ├── edit.html          # 게시글 수정 페이지
    │
    ├── css/
    │   └── style.css      # 전역 스타일시트
    │
    └── js/
        ├── api.js         # API 통신 모듈
        ├── auth.js        # 로그인/회원가입 로직
        ├── posts.js       # 게시글 목록 로직
        ├── post-detail.js # 게시글 상세 로직
        └── write.js       # 게시글 작성/수정 로직
```

---

## 🚀 시작하기

### 1. 환경 설정

`.env` 파일을 생성하고 다음 내용을 입력하세요:

```env
MONGODB_URI=mongodb://localhost:27017/your-database
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
HOST_PORT=8080
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 서버 실행

```bash
npm run dev
```

서버가 `http://localhost:8080`에서 실행됩니다.

### 4. 프론트엔드 접속

브라우저에서 `http://localhost:8080/client/index.html`로 접속하세요.

---

## 🎨 프론트엔드 기능

### 주요 페이지

#### 1. **로그인 페이지** (`index.html`)
- 사용자 아이디와 비밀번호로 로그인
- JWT 토큰을 로컬 스토리지에 저장
- 로그인 실패 시 에러 메시지 표시

#### 2. **회원가입 페이지** (`signup.html`)
- 아이디, 비밀번호, 이름, 이메일, 프로필 이미지 URL 입력
- 입력 검증 (최소 4자 이상)
- 회원가입 성공 시 자동 로그인 또는 로그인 페이지로 이동

#### 3. **게시글 목록 페이지** (`posts.html`)
- 모든 게시글 목록 표시
- 작성자 아이디로 게시글 검색 기능
- 게시글 클릭 시 상세 페이지로 이동
- 글쓰기 버튼 및 로그아웃 기능

#### 4. **게시글 상세 페이지** (`post-detail.html`)
- 게시글 내용, 작성자, 작성일 표시
- 본인이 작성한 게시글인 경우 수정/삭제 버튼 표시
- 권한 확인을 위해 `/auth/me` API 호출

#### 5. **게시글 작성 페이지** (`write.html`)
- 새 게시글 작성
- 최소 4자 이상 입력 검증
- 작성 완료 후 게시글 목록으로 이동

#### 6. **게시글 수정 페이지** (`edit.html`)
- 기존 게시글 내용 불러오기
- 수정 후 저장
- URL 파라미터로 게시글 ID 전달

### 주요 기능

#### 🔐 인증 시스템
- JWT 토큰 기반 인증
- 로컬 스토리지에 토큰 저장
- 401 에러 발생 시 자동 로그아웃 및 로그인 페이지로 리다이렉트
- 모든 API 요청에 `Authorization: Bearer <token>` 헤더 자동 추가

#### 📝 게시글 관리
- 게시글 생성, 조회, 수정, 삭제 (CRUD)
- 작성자 기준 게시글 필터링
- 본인 게시글만 수정/삭제 가능

#### 🎨 UI/UX
- 반응형 디자인
- 깔끔한 카드 스타일 레이아웃
- 에러 메시지 표시
- 로딩 상태 처리

---

## 📡 API 엔드포인트

### 인증 (Auth)

| Method | Endpoint | 설명 | 인증 필요 |
|--------|----------|------|-----------|
| POST | `/auth/signup` | 회원가입 | ❌ |
| POST | `/auth/login` | 로그인 | ❌ |
| GET | `/auth/me` | 현재 사용자 정보 조회 | ✅ |

### 게시글 (Post)

| Method | Endpoint | 설명 | 인증 필요 |
|--------|----------|------|-----------|
| GET | `/post` | 모든 게시글 조회 | ✅ |
| GET | `/post?userid=<username>` | 특정 사용자의 게시글 조회 | ✅ |
| GET | `/post/:id` | 게시글 상세 조회 | ✅ |
| POST | `/post` | 게시글 작성 | ✅ |
| PUT | `/post/:id` | 게시글 수정 | ✅ |
| DELETE | `/post/:id` | 게시글 삭제 | ✅ |

---

## 💻 프론트엔드 코드 구조

### API 모듈 (`js/api.js`)

모든 서버 통신을 담당하는 중앙화된 API 클래스:

```javascript
class API {
  static async login(userid, password)
  static async signup(userid, password, name, email, url)
  static async getPosts(username)
  static async getPost(id)
  static async createPost(text)
  static async updatePost(id, text)
  static async deletePost(id)
  static async me()
}
```

**주요 특징:**
- 자동 JWT 토큰 헤더 추가
- 401 에러 시 자동 로그아웃
- 에러 핸들링
- JSON 응답 파싱

### 페이지별 스크립트

- **`auth.js`**: 로그인/회원가입 폼 처리
- **`posts.js`**: 게시글 목록 렌더링 및 검색
- **`post-detail.js`**: 게시글 상세 표시 및 권한 확인
- **`write.js`**: 게시글 작성/수정 (동일 파일 사용)

---

## 🎨 스타일 가이드

### CSS 변수 (`style.css`)

```css
:root {
  --primary-color: #4a90e2;
  --secondary-color: #f5f5f5;
  --text-color: #333;
  --error-color: #e74c3c;
  --success-color: #2ecc71;
}
```

### 주요 스타일
- 중앙 정렬 레이아웃
- 카드 스타일 컨테이너
- 부드러운 호버 효과
- 반응형 폼 디자인

---

## 🔒 보안 고려사항

### 백엔드
- ✅ bcrypt를 사용한 비밀번호 해싱
- ✅ JWT 토큰 기반 인증
- ✅ express-validator를 통한 입력 검증
- ✅ CORS 설정

### 프론트엔드
- ✅ 로컬 스토리지에 JWT 토큰 저장
- ✅ 401 에러 시 자동 로그아웃
- ✅ XSS 방지를 위한 innerHTML 사용 최소화
- ⚠️ HTTPS 사용 권장 (프로덕션 환경)

---

## 📝 개발 노트

### 프론트엔드 추가 개발 내용

이 프로젝트의 **백엔드는 기존에 구현**되어 있었으며, **프론트엔드를 새롭게 추가**하여 완전한 풀스택 애플리케이션으로 확장했습니다.

#### 추가된 내용:
1. **6개의 HTML 페이지** - 로그인, 회원가입, 게시글 목록/상세/작성/수정
2. **통합 CSS 스타일시트** - 일관된 디자인 시스템
3. **모듈화된 JavaScript** - API 통신, 인증, 게시글 관리 로직 분리
4. **사용자 경험 개선** - 에러 메시지, 로딩 상태, 권한 확인

#### 기술적 선택:
- **Vanilla JavaScript 사용** - 프레임워크 없이 순수 JavaScript로 구현
- **Fetch API** - 비동기 서버 통신
- **LocalStorage** - 클라이언트 측 토큰 저장
- **모듈 패턴** - 코드 재사용성과 유지보수성 향상

---

## 🐛 알려진 이슈

- [ ] 프로필 이미지 업로드 기능 미구현 (URL만 입력 가능)
- [ ] 페이지네이션 미구현
- [ ] 실시간 알림 기능 없음

---

## 🔮 향후 개선 사항

- [ ] 댓글 기능 추가
- [ ] 좋아요 기능
- [ ] 이미지 업로드
- [ ] 프로필 페이지
- [ ] 팔로우/팔로워 시스템
- [ ] 실시간 채팅 (Socket.io)

---

## 📄 라이센스

ISC

---

## 👤 작성자

**Backend**: 기존 구현  
**Frontend**: 새로 추가 구현

---

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.
