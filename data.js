// All CV content lives here. Add/edit entries and both UI languages update.
const UI = {
  en: {
    profile: "Professional Profile",
    skills: "Skills",
    experience: "Work Experience",
    projects: "Industrial Projects (DEER Lab)",
    education: "Education",
    conferences: "Conferences, Presentations, and Awards",
    publications: "Publications and Proceedings",
    services: "Academic Services",
    international: "International",
    domestic: "Domestic",
    intlJournal: "International Journal (SCI & SCIE & SSCI)",
    domJournal: "Domestic Journal (KCI)",
    workingPapers: "Working Papers",
    selectedProjects: "Selected Projects",
    notes: "(a) alphabetically ordered (equally contributed) · (c) corresponding author · (f) first author · * equal contribution",
  },
  kr: {
    profile: "소개",
    skills: "보유 역량",
    experience: "경력",
    projects: "산업 프로젝트 (DEER Lab)",
    education: "학력",
    conferences: "학술발표 및 수상",
    publications: "논문 및 출판물",
    services: "학술 활동",
    international: "국제",
    domestic: "국내",
    intlJournal: "국제 저널 (SCI & SCIE & SSCI)",
    domJournal: "국내 저널 (KCI)",
    workingPapers: "작업 중인 논문",
    selectedProjects: "주요 프로젝트",
    notes: "(a) 알파벳 순 (균등 기여) · (c) 교신저자 · (f) 제1저자 · * 균등 기여",
  },
};

const PROFILE = {
  name: "NohYoon Seong",
  email: "nyseong94@gmail.com",
  scholar: "https://scholar.google.com/citations?user=m7w57hoAAAAJ&hl=ko",
  photo: "assets/photo.png",
  summary: {
    en: ["Management Information System (MIS)", "Machine Learning and Deep Learning for Business and Finance"],
    kr: ["경영정보시스템(MIS)", "비즈니스·금융을 위한 머신러닝 및 딥러닝"],
  },
};

const SKILLS = {
  en: ["Python programming for Machine Learning and Deep Learning", "R programming & C++ programming", "Econometrics"],
  kr: ["머신러닝/딥러닝을 위한 Python 프로그래밍", "R 프로그래밍 & C++ 프로그래밍", "계량경제학"],
};

// Each entry: period, role {en,kr}, org, location, bullets {en,kr}[]
const EXPERIENCE = [
  {
    period: "Feb. 2022 ~",
    role: { en: "CEO", kr: "대표(CEO)" },
    org: "A.I.mtory",
    location: "Seoul",
    bullets: [{ en: "AI for Smart Factory", kr: "스마트팩토리를 위한 AI" }],
    projectList: [
      {
        org: "리스크컨설팅코리아",
        name: { en: "News interpretation: information classification & summarization", kr: "뉴스해석: 정보 분류 및 요약" },
        period: "Jan. 2026 ~",
      },
      {
        org: "동화엔텍",
        name: { en: "Quote (estimate) information extraction", kr: "견적서 정보 추출" },
        period: "Dec. 2025 ~",
      },
      {
        org: "동화엔텍",
        name: { en: "Consulting", kr: "컨설팅" },
        period: "Oct. 2024 ~ Dec. 2024",
      },
      {
        org: "SG글로벌 신동사업장",
        name: { en: "Vision inspection system", kr: "비전검사기" },
        period: "Oct. 2024 ~ Nov. 2024 (subscription from Oct. 2025)",
      },
      {
        org: "LS ITC",
        name: { en: "LQC", kr: "LQC" },
        period: "May. 2024 ~ Sep. 2024",
      },
      {
        org: "KM&I",
        name: { en: "Vision system", kr: "비전시스템" },
        period: "Dec. 2023 ~ Jun. 2024 (subscription from Feb. 2025)",
      },
      {
        org: "KM&I 창원공장",
        name: { en: "Consulting", kr: "컨설팅 (창원공장)" },
        period: "Oct. 2023 ~ Dec. 2023",
      },
      {
        org: "교보정보통신",
        name: { en: "Advisory retainer", kr: "자문" },
        period: "Jun. 2023 ~ Dec. 2023",
      },
      {
        org: "주식회사 유명",
        name: { en: "병석 컨설팅", kr: "병석 컨설팅" },
        period: "Mar. 2023",
      },
      {
        org: "현대엔지비",
        name: { en: "Hyundai vehicle robot condition-based monitoring (CBM)", kr: "현차 로봇 CBM" },
        period: "Jan. 2023 ~ Nov. 2023",
      },
      {
        org: "LS일렉트릭",
        name: { en: "Robot process optimization", kr: "로봇 공정 최적화" },
        period: "Oct. 2022 ~ Jan. 2023",
      },
    ],
  },
  {
    period: "Feb. 2023 ~",
    role: { en: "Instructor", kr: "강사" },
    org: "Korea National Open University",
    location: "Seoul",
    bullets: [{ en: "Computer Vision", kr: "컴퓨터 비전" }],
  },
  {
    period: "Mar. 2022 ~ Feb. 2023",
    role: { en: "Instructor", kr: "강사" },
    org: "KyungHee University",
    location: "Seoul",
    bullets: [
      { en: "Management Information Systems", kr: "경영정보시스템" },
      { en: "Programming Language and Data Science", kr: "프로그래밍 언어 및 데이터 과학" },
    ],
  },
  {
    period: "Oct. 2021 ~ Oct. 2022",
    role: { en: "AI Programmer", kr: "AI 프로그래머" },
    org: "Basbai",
    location: "Seoul",
    bullets: [
      { en: "Computer Vision for fracture detection", kr: "골절 진단을 위한 컴퓨터 비전" },
      { en: "Deep learning for cancer prediction with genetic sequence", kr: "유전자 서열 기반 암 예측 딥러닝" },
    ],
  },
  {
    period: "Oct. 2020 ~ Apr. 2021",
    role: { en: "AI Programmer", kr: "AI 프로그래머" },
    org: "Fashionade",
    location: "Seoul",
    bullets: [{ en: "Fashion compatibility prediction with computer vision", kr: "컴퓨터 비전 기반 패션 조합 적합성 예측" }],
  },
  {
    period: "Apr. 2020 ~ Dec. 2020",
    role: { en: "Data Scientist", kr: "데이터 사이언티스트" },
    org: "KB Financial Group",
    location: "Seoul",
    bullets: [
      { en: "Reinforcement learning for portfolio optimization", kr: "포트폴리오 최적화를 위한 강화학습" },
      { en: "Deep learning for stock prediction and market analysis", kr: "주가 예측 및 시장 분석 딥러닝" },
    ],
  },
  {
    period: "Jan. 2020 ~ Mar. 2021",
    role: { en: "AI Programmer", kr: "AI 프로그래머" },
    org: "Animal Industry Data Korea",
    location: "Seoul",
    bullets: [
      { en: "Computer Vision and Reinforcement Learning for object detection, multi-object tracking, and re-identification of livestock", kr: "가축 객체 탐지, 다중 객체 추적, 재식별을 위한 컴퓨터 비전 및 강화학습" },
      { en: "Pose estimation", kr: "자세 추정(Pose Estimation)" },
    ],
  },
  {
    period: "Oct. 2019 ~ Nov. 2019",
    role: { en: "Data Scientist", kr: "데이터 사이언티스트" },
    org: "Big Data Academy Education TA & ML Project, Samsung Fire & Marine Insurance",
    orgNote: "Kookmin University Industry-Academia Collaboration Foundation",
    location: "Seoul",
    bullets: [
      { en: "Deep learning for settlement amount prediction", kr: "보험금 지급액 예측 딥러닝" },
      { en: "Deep learning for insurance recommender system", kr: "보험 추천 시스템 딥러닝" },
      { en: "Deep learning for anomaly detection in accounting", kr: "회계 이상탐지 딥러닝" },
    ],
  },
  {
    period: "Jun. ~ Sep. 2019",
    role: { en: "Data Scientist", kr: "데이터 사이언티스트" },
    org: "AfreecaTV",
    location: "Seoul",
    bullets: [
      { en: "Text mining for user chatting analysis", kr: "사용자 채팅 분석을 위한 텍스트 마이닝" },
      { en: "Voice recognition and speech analysis", kr: "음성 인식 및 음성 분석" },
      { en: "Meta-data generation from chatting and speech analysis", kr: "채팅·음성 분석 기반 메타데이터 생성" },
    ],
  },
  {
    period: "Feb. ~ Jul. 2019",
    role: { en: "Data Scientist", kr: "데이터 사이언티스트" },
    org: "Recommender System, Samsung C&T – SSFMall",
    orgNote: "Hansung University Industry-Academia Collaboration Foundation",
    location: "Seoul",
    bullets: [
      { en: "Machine Learning and Deep Learning for Personalized Recommendation", kr: "개인화 추천을 위한 머신러닝 및 딥러닝" },
      { en: "Successful A/B test against Recopick, the industry's 1st recommender system", kr: "업계 1위 추천 시스템 Recopick 대비 A/B 테스트 성공" },
    ],
  },
  {
    period: "Oct. 2018 ~ Nov. 2018",
    role: { en: "Data Scientist", kr: "데이터 사이언티스트" },
    org: "Big Data Academy Education TA & ML Project, Samsung Fire & Marine Insurance",
    orgNote: "Kookmin University Industry-Academia Collaboration Foundation",
    location: "Seoul",
    bullets: [
      { en: "Deep learning survival model for Risk Consultant churn prediction", kr: "리스크 컨설턴트 이탈 예측을 위한 생존분석 딥러닝 모델" },
      { en: "Sequence model to analyze system status and predict errors from core system log data", kr: "핵심 시스템 로그 기반 시스템 상태 분석 및 오류 예측 시퀀스 모델" },
    ],
  },
  {
    period: "Apr. ~ Sep. 2018",
    role: { en: "Data Scientist", kr: "데이터 사이언티스트" },
    org: "Recommender System, Samsung C&T – SSFMall",
    orgNote: "Hansung University Industry-Academia Collaboration Foundation",
    location: "Seoul",
    bullets: [
      { en: "Machine Learning and Deep Learning for Product Recommendation", kr: "상품 추천을 위한 머신러닝 및 딥러닝" },
      { en: "Successful A/B test against Recopick, the industry's 1st recommender system", kr: "업계 1위 추천 시스템 Recopick 대비 A/B 테스트 성공" },
      { en: "Customer segmentation using user-item embedding and deep learning", kr: "사용자-아이템 임베딩 및 딥러닝 기반 고객 세분화" },
      { en: "Econometrics for customer analysis and customer cube", kr: "고객 분석 및 고객 큐브를 위한 계량경제학" },
    ],
  },
  {
    period: "Jul. 2017 ~ Dec. 2017",
    role: { en: "Data Scientist", kr: "데이터 사이언티스트" },
    org: "Sentience",
    location: "Seoul",
    bullets: [
      { en: "Web crawling", kr: "웹 크롤링" },
      { en: "Text mining – fake news detection", kr: "텍스트 마이닝 – 가짜뉴스 탐지" },
      { en: "Business data analysis", kr: "비즈니스 데이터 분석" },
    ],
  },
  {
    period: "Nov. 2017 ~ Dec. 2017",
    role: { en: "Data Scientist", kr: "데이터 사이언티스트" },
    org: "Big Data Academy Education TA & ML Project, Samsung Fire & Marine Insurance",
    orgNote: "Kookmin University Industry-Academia Collaboration Foundation",
    location: "Seoul",
    bullets: [
      { en: "Website revisit prediction model with LSTM on log data", kr: "로그 데이터 기반 LSTM 웹사이트 재방문 예측 모델" },
      { en: "Insurance coverage recommender system with Deep Neural Network", kr: "심층신경망 기반 보험 보장 추천 시스템" },
    ],
  },
];

const PROJECTS = [
  {
    period: "Jul. 2019 ~ Dec. 2019",
    role: { en: "Project Manager", kr: "프로젝트 매니저" },
    org: "PopFunding",
    bullets: [
      { en: "Developing AI model to evaluate accounts receivable and for risk management", kr: "매출채권 평가 및 리스크 관리를 위한 AI 모델 개발" },
      { en: "Optimizing LTV and interest rate for accounts receivable financing", kr: "매출채권 금융을 위한 LTV 및 금리 최적화" },
      { en: "Deep learning based credit score prediction", kr: "딥러닝 기반 신용점수 예측" },
    ],
  },
  {
    period: "Nov. 2018 ~ Apr. 2019",
    role: { en: "Project Manager", kr: "프로젝트 매니저" },
    org: "2digits",
    bullets: [
      { en: "Developing next-generation securities valuation, future value prediction, and risk management model based on artificial intelligence", kr: "AI 기반 차세대 증권 가치평가·미래가치 예측·리스크 관리 모델 개발" },
      { en: "Deep learning based cryptocurrency volatility prediction", kr: "딥러닝 기반 암호화폐 변동성 예측" },
      { en: "Extension of stock loan model to evaluate cryptocurrency loans with liquidation and stochastic volatility", kr: "청산 및 확률적 변동성을 반영한 암호화폐 대출 평가로 주식담보대출 모델 확장" },
    ],
  },
  {
    period: "Aug. 2018 ~ Sep. 2018",
    role: { en: "Researcher", kr: "연구원" },
    org: "Korea Blockchain Association",
    bullets: [
      { en: "Analysis of employment effectiveness of blockchain technology", kr: "블록체인 기술의 고용 효과성 분석" },
      { en: "Scenario planning", kr: "시나리오 플래닝" },
      { en: "Interview", kr: "인터뷰" },
    ],
  },
  {
    period: "Jul. 2017 ~ Dec. 2017",
    role: { en: "Researcher", kr: "연구원" },
    org: "NICE Investors Service",
    bullets: [{ en: "An empirical study on financial market, credit infrastructure, and economic growth", kr: "금융시장·신용인프라·경제성장에 관한 실증연구" }],
  },
  {
    period: "Jul. 2017 ~ Nov. 2017",
    role: { en: "Researcher", kr: "연구원" },
    org: "KAIST 4th Industrial Revolution Research Project",
    bullets: [{ en: "Robot industry and labor markets", kr: "로봇 산업과 노동시장" }],
  },
];

const EDUCATION = [
  {
    period: "2017.02 – 2022.02",
    degree: { en: "Ph.D. in Management Information Systems", kr: "경영정보시스템 박사" },
    org: "Management Information Science, KAIST College of Business",
    location: "Seoul",
  },
  {
    period: "2015.02 – 2015.06",
    degree: { en: "Exchange Student in Grandes Écoles", kr: "그랑제콜 교환학생" },
    org: "École Centrale Paris",
    location: "",
  },
  {
    period: "2012.02 – 2017.02",
    degree: { en: "Bachelor of Physics", kr: "물리학 학사" },
    org: "Korea Advanced Institute of Science and Technology (KAIST)",
    location: "Daejeon",
  },
];

// Citations kept in original submitted language across both UI languages (academic convention).
const CONFERENCES = {
  international: [
    "NohYoon Seong, Keongtae Kim. “Equity Crowdfunding and Startup Performance.” International Conference on Information Systems (ICIS) (2021). (Conference, presenter) (f)",
    "NohYoon Seong, Kihwan Nam. “Deep learning for financial distress prediction considering individual effect and complex system.” SIGKDD Machine Learning in Finance Workshop (2021). (Conference, presenter) (f)",
    "NohYoon Seong, Kihwan Nam. “Neural recommender system considering user homogeneity.” SIGKDD Machine Learning for Consumers and Markets Workshop (2021). (Conference, presenter) (f)",
    "NohYoon Seong, Keongtae Kim. “Equity Crowdfunding and Startup Performance.” 81th Annual Meeting of the Academy of Management (AOM) (2021). (Conference, presenter) (f)",
    "Jooyoung Kim, NohYoon Seong, Kihwan Nam. “Better than Humans? AI challenge in Creative Tasks: Randomized Field Experiment on AI Recommender Systems.” INFORMS Workshop on Data Science (2020). (Conference)",
    "NohYoon Seong, Kihwan Nam, Byungtae Lee. “Predicting stock movements based on financial news with systematic group identification.” INFORMS Workshop on Data Science (2020). (Conference) (f)",
    "NohYoon Seong, Kihwan Nam, Byungtae Lee. “Deep learning for financial distress prediction considering individual effect and complex system.” INFORMS Workshop on Data Science (2020). (Conference, Best student paper nominee) (f)",
    "Jooyoung Kim, NohYoon Seong, Kihwan Nam. “Better than Humans? AI challenge in Creative Tasks: Randomized Field Experiment on AI Recommender Systems.” Conference on Information Systems and Technology (CIST) (2020). (Conference)",
    "KiHwan Nam, Hyelin Oh, Wonseok Oh, NohYoon Seong. “A “Falsely-Framed” Choice: A Randomized Field Experiment on the Attraction Effects in Recommender Systems.” Conference on Information Systems and Technology (CIST) (2020). (Conference)",
    "Keongtae Kim, NohYoon Seong, Viswanathan Siva. “Impact of Equity Crowdfunding on Venture Performance.” Statistical Challenges in Electronic Commerce Research (SCECR) (2020). Madrid, Spain (Conference, presenter) (a)",
    "SangMyung Lee, NohYoon Seong. “Existence and Time Trend of Psychological Barrier in Bitcoin Market: Evidence from US, Europe, Hong Kong.” International Conference on Information Systems (ICIS) (2019). Munich, Germany (Conference) (c)",
    "Jooman Kim, Gloria Jinakim, Nohyoon Seong, Taeyong Yang. “The Effect of the Price Fluctuation of Cryptocurrency and Personal Characteristics on Technology Acceptance of Cryptocurrency by Medical Service Providers.” Korean Chapter of the Association for Information Systems (KrAIS) (2018). San Francisco, USA (Conference, presenter)",
  ],
  domestic: [
    "KiHwan Nam, Hyelin Oh, Wonseok Oh, NohYoon Seong. “A “Falsely-Framed” Choice: A Randomized Field Experiment on the Attraction Effects in Recommender Systems.” KMIS, 2019 Fall. (Conference, Best Paper Award (2nd)) (a)",
    "NohYoon Seong, KiHwan Nam. “Predicting stock movements based on financial news with systematic group identification.” Korea Intelligent Information System Society, 2019 Spring. Seoul, Republic of Korea (Conference, Presenter) (f)",
    "“Blockchain Strategy Management Research Proposal Award.” Korean Strategic Management Information (Award/$2,500)",
    "KiHwan Nam, WooChang Jeong, NohYoon Seong. “Prediction of blockbuster drama with a pattern analysis on early viewing ratings.” Korea Intelligent Information System Society, 2018 Spring. Seoul, Republic of Korea (Conference) (c)",
    "NohYoon Seong, KiHwan Nam. “Online news-based stock price forecasting considering homogeneity in the sector.” Korea Intelligent Information System Society, 2017 Fall. Seoul, Republic of Korea (Conference, Presenter) (f)",
    "NohYoon Seong, KiHwan Nam. “Combining macro-economical effects with sentiment analysis for stock index prediction.” Korea Intelligent Information System Society, 2017 Spring. Seoul, Republic of Korea (Conference, Presenter) (f)",
  ],
};

const PUBLICATIONS = {
  intlJournal: [
    "JunKyu Jang, NohYoon Seong. (2023) “Deep reinforcement learning for stock portfolio optimization by connecting with modern portfolio theory.” Expert Systems with Applications, 218, 119556 (c)",
    "NohYoon Seong, KiHwan Nam. (2022) “Forecasting price movements of global financial indexes using complex quantitative financial networks.” Knowledge-Based Systems, 235, 107608 (f)",
    "NohYoon Seong. (2021). “Deep spatiotemporal attention network for fine particle matter 2.5 concentration prediction with causality analysis.” IEEE Access, 9, 73230–73239 (c, f)",
    "NohYoon Seong, KiHwan Nam. (2021). “Predicting stock movements based on financial news and market segmentation.” Expert Systems with Applications, 164, 113988 (f)",
    "KiHwan Nam, NohYoon Seong. (2021). “A Study on Influencing Factors for Customer Satisfaction and the Continuing Use of Social Network Services in Financial Industry.” Enterprise Information Systems, 15(3), 395–419 (c)",
    "KiHwan Nam, NohYoon Seong. (2019). “Financial news-based stock price prediction using causality analysis of influence in the Korean stock market.” Decision Support Systems, 117, 100–112 (c)",
  ],
  domJournal: [
    "NohYoon Seong, KiHwan Nam. (2019). “Predicting stock movements based on financial news with systematic group identification.” Journal of Intelligence and Information Systems, 25(3), 1–17 (f)",
    "KiHwan Nam, NohYoon Seong. (2018). “Prediction of a hit drama with a pattern analysis on early viewing ratings.” Journal of Intelligence and Information Systems, 24(4), 33–49 (c)",
    "NohYoon Seong, KiHwan Nam. (2018). “Online news-based stock price forecasting considering homogeneity in the sector.” Journal of Intelligence and Information Systems, 24(2), 1–19 (f)",
    "NohYoon Seong, KiHwan Nam. (2017) “Combining macro-economical effects with sentiment analysis for stock index prediction.” Entrue Journal of Information Technology, 16(2), 41–54 (f)",
  ],
  workingPapers: [
    "NohYoon Seong, Youngchan Hwang, JooYoung Kim, Keongtae Kim, Sunil Mithas. (2023) “Balancing Expertise: How Equity Crowdfunding and Investor Composition Affect Startup Performance.” MIS Quarterly, Major Revision (f)",
    "NohYoon Seong, Kanghyun Cho, KiHwan Nam. “Beyond Persuasion: Communication Style as a Buffer Against Market Volatility in Inclusive Decentralized Fundraising.” Journal of Business Research, Major Revision (c)",
    "KiHwan Nam, Wonseok Oh, NohYoon Seong. “Frame of Mind: A Validation of Attraction Effects in Recommender Systems Through a Randomized Field Experiment.” Production and Operations Management, Major Revision (a)",
    "SangMyung Lee, NohYoon Seong. “Existence and Time Trend of Psychological Barrier in Bitcoin Market: Evidence from US, Europe, Hong Kong.” (c)",
    "Jooyoung Kim, NohYoon Seong, Kihwan Nam. “Better than Humans? AI challenge in Creative Tasks: Randomized Field Experiment on AI Recommender Systems.”",
    "NohYoon Seong, KiHwan Nam. “Predicting stock movements based on financial news with systematic group identification.” (f)",
  ],
};

const SERVICES = ["Peer Review in ICIS", "Peer Review in Decision Support Systems", "Peer Review in Journal of Intelligence and Information Systems"];
