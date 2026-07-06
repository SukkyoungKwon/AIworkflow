export type DelegationLevel = 'automate' | 'augment' | 'amplify' | 'human-own'

export interface DelegationInfo {
  level: DelegationLevel
  label: string
  definition: string
  humanInvolvement: string
  checkpoint: string
  example: string
}

export const delegationLevels: DelegationInfo[] = [
  {
    level: 'automate',
    label: 'Automate',
    definition: 'AI가 규칙적·반복적 작업을 전담 실행',
    humanInvolvement: '결과물 존재·형식만 확인, 세부 검수는 최소',
    checkpoint: '원본 누락, 포맷 오류 여부',
    example: '1. 지식 문서 틀 준비 · 2. 자료 수집·분석 — 전사',
  },
  {
    level: 'augment',
    label: 'Augment',
    definition: 'AI가 초안·분석을 만들고 사람이 검토·수정',
    humanInvolvement: '산출물마다 리뷰 후 승인 또는 반려',
    checkpoint: '맥락 적합성, 기존 패턴과의 일관성',
    example: '1. Risk Register · 2. 그룹핑·분석 · 3. 구조·스펙 초안 · 6. 디자인 시스템 · 7. 화면 전개',
  },
  {
    level: 'amplify',
    label: 'Amplify',
    definition: 'AI가 대안의 폭을 넓혀 탐색 범위를 확장',
    humanInvolvement: '여러 안 중 의미 있는 것을 선택',
    checkpoint: '다양성이 실제로 확보됐는지, 변주가 편향되지 않았는지',
    example: '4. 대표 화면 시안 — 병렬 컨셉 생성',
  },
  {
    level: 'human-own',
    label: 'Human Own',
    definition: 'AI는 참고자료만 제공, 결정과 책임은 사람',
    humanInvolvement: '처음부터 끝까지 사람이 주도',
    checkpoint: '판단 근거가 기록(Decision Log)으로 남았는지',
    example: '1. 기존 자산 확인 · 3. PRD 목표·우선순위 확정 · 게이트 심사 ①·② · 9. Decision Log 기록',
  },
]

export interface DeliverableItem {
  name: string
  level: DelegationLevel
  aiDoes: string
  humanDoes: string
  tools: string[]
}

export interface PromptExample {
  title: string
  when: string
  prompt: string
}

export interface WorkflowStage {
  id: string
  order: number
  kind: 'stage' | 'gate'
  name: string
  summary: string
  input: string
  deliverables: DeliverableItem[]
  howTo: string[]
  prompts: PromptExample[]
  checkpoint: string
}

export const workflows: WorkflowStage[] = [
  {
    id: 'foundation',
    order: 1,
    kind: 'stage',
    name: 'AI Context Foundation 구축',
    summary: 'AI가 팀의 맥락을 이해할 수 있도록 리스크 기준과 지식 문서 틀을 먼저 준비한다.',
    input: '(시작 단계) 프로젝트 킥오프 — 팀 목표, 기존 브랜드·디자인 자산(있다면)',
    deliverables: [
      {
        name: '기존 자산 확인 (선택)',
        level: 'human-own',
        aiDoes: '제공된 기존 자료(브랜드 원칙, 디자인 시스템, 리서치)를 이후 단계의 컨텍스트로 참고',
        humanDoes: '기존 자산이 있으면 수집해 전달, 없으면 생략',
        tools: ['Notion'],
      },
      {
        name: 'Risk Register 초안',
        level: 'augment',
        aiDoes: '개인정보·편향·저작권·과신(AI 결과 자동 반영) 리스크 후보 제시',
        humanDoes: '우리 프로젝트 맥락에 맞게 리스크 확정',
        tools: ['ChatGPT / Claude'],
      },
      {
        name: '지식 문서 틀 준비',
        level: 'automate',
        aiDoes: 'Research Wiki·Design System·Decision Log 빈 템플릿(마크다운) 생성',
        humanDoes: '템플릿 구조만 확인',
        tools: ['Notion'],
      },
    ],
    howTo: [
      '기존 브랜드 원칙·디자인 시스템·리서치 자료가 있는지 확인, 있으면 AI에 참고자료로 전달',
      'AI에게 이 프로젝트에서 흔한 리스크(개인정보·편향·저작권·과신) 후보를 요청',
      'Research Wiki·Design System·Decision Log 문서 틀을 미리 만들어 다음 단계부터 바로 채울 수 있게 준비',
    ],
    prompts: [
      {
        title: 'Risk Register 초안 생성',
        when: '프로젝트 시작 전 AI 협업 리스크를 미리 짚어둘 때',
        prompt:
          '이 프로젝트는 [프로젝트 한 줄 설명]이야. AI와 협업하면서 생길 수 있는 리스크를 개인정보, 편향, 저작권, AI 결과 과신(자동 반영) 4개 카테고리로 나눠서 각각 구체적인 시나리오와 대응 방법을 제안해줘. 일반론 말고 이 프로젝트 맥락에 맞게 작성해줘.\n\n[프로젝트 설명]\n[다루는 데이터 종류: 예) 사용자 인터뷰 녹음, 경쟁사 리서치 등]',
      },
      {
        title: '지식 문서 틀 생성',
        when: 'Research Wiki/Design System/Decision Log 템플릿을 처음 만들 때',
        prompt:
          '아래 3개 문서의 마크다운 템플릿을 만들어줘 (내용은 비워두고 구조만): 1) Research Wiki — 섹션: 인터뷰 요약, VOC, 경쟁사 분석, 시장 맥락 2) Design System 문서 — 섹션: 토큰, 컴포넌트, 금지 패턴 3) Decision Log — 섹션: 결정 사항, 선택 이유, 버린 대안, 재검토 조건. 각 섹션 제목만 잡고 예시 문장은 하나씩만 넣어줘.',
      },
    ],
    checkpoint: '리스크가 프로젝트 맥락에 맞게 구체적인지, 문서 틀이 다음 단계에서 바로 쓸 수 있는 형태인지',
  },
  {
    id: 'research',
    order: 2,
    kind: 'stage',
    name: '자료 수집·분석',
    summary: '요구사항, VOC, 경쟁사 자료를 모아 Research Wiki에 구조화된 맥락으로 정리한다.',
    input: 'Step 1에서 준비된 지식 문서 틀·Risk Register + 인터뷰·회의 녹음, 위키·문서, VOC, 경쟁사 자료 등 원시 자료',
    deliverables: [
      {
        name: '전사',
        level: 'automate',
        aiDoes: '녹음·회의록을 텍스트로 변환, 오탈자·누락 자체 검수',
        humanDoes: '전사 내용을 훑어보고 스펙·방향에 반영할 내용인지 1차 판단',
        tools: ['Clova Note'],
      },
      {
        name: '그룹핑·분석 → Research Wiki 구조화',
        level: 'augment',
        aiDoes: '유사 항목 그룹핑, 중복 정리, 패턴 분석 후 Research Wiki 템플릿 형식(주제별 섹션·출처·인용)으로 구조화',
        humanDoes: '구조화된 내용 검토, 편향·맥락 누락 확인',
        tools: ['ChatGPT / Claude', 'Notion'],
      },
    ],
    howTo: [
      '요구사항 수집 — 위키·문서에 흩어진 요구사항을 모아 마크다운 한 문서로 정리해 AI에 전달',
      '인터뷰 녹음/회의록을 AI에게 전사·요약 요청',
      '여러 소스(VOC, 경쟁사 리뷰, 요구사항 문서)를 한 표로 통합',
      "AI가 뽑은 패턴에 대해 '왜 그렇게 판단했는지' 되물어 검증",
      '검증된 분석 결과를 Step 1에서 만든 Research Wiki 템플릿에 실제로 채워 넣기',
    ],
    prompts: [
      {
        title: '요구사항 문서 마크다운 정리',
        when: '위키·문서 여러 페이지에 흩어진 요구사항을 AI에 넘기기 전, 하나의 입력으로 합칠 때',
        prompt:
          "아래는 서로 다른 위키/문서 페이지에서 가져온 내용이야. AI가 참고하기 쉬운 하나의 마크다운 문서로 정리해줘.\n\n1) 문서(페이지)별로 ## 제목으로 구분하고 원래 출처(문서명 또는 링크)를 표기\n2) 각 문서에서 핵심 요구사항·결정사항만 불릿으로 요약 (배경 설명은 생략)\n3) 서로 다른 문서에서 내용이 겹치거나 상충하면 '⚠️ 충돌' 섹션에 따로 모아줘\n4) 없는 내용은 만들어내지 말고 원문 그대로만 사용해줘\n\n[위키 페이지1 붙여넣기]\n[문서2 붙여넣기]\n[문서3 붙여넣기]",
      },
      {
        title: '인터뷰 전사 요약',
        when: '인터뷰/회의 녹취록을 정리할 때',
        prompt:
          "다음은 사용자 인터뷰 전사본이야. 1) 반복적으로 언급된 페인포인트를 주제별로 그룹핑하고 2) 각 그룹마다 근거가 되는 인용문을 2개씩 포함하고 3) 그룹별 언급 빈도를 표로 정리해줘. 없는 내용은 추측해서 채우지 말고 '언급 없음'이라고 표시해줘.\n\n[전사본 붙여넣기]",
      },
      {
        title: '다중 소스 통합',
        when: 'VOC·경쟁사 리뷰·내부 요구사항을 하나로 합칠 때',
        prompt:
          '아래 서로 다른 출처의 자료를 하나의 표로 통합해줘. 컬럼은 [요구사항 내용 / 출처 / 언급 강도 / 추정 우선순위(상중하) / 우선순위 판단 근거]로 하고, 우선순위는 반드시 근거와 함께 제시해줘.\n\n[자료1: VOC]\n[자료2: 경쟁사 리뷰]\n[자료3: 내부 요구사항 문서]',
      },
      {
        title: '편향 자가진단',
        when: 'AI가 뽑은 인사이트를 검증할 때',
        prompt:
          "방금 네가 정리한 인사이트에 대해 스스로 점검해줘: 1) 특정 소스나 응답자에 과도하게 의존하고 있지 않은지 2) 표본이 적어 일반화하기 위험한 항목은 무엇인지 3) 반대되거나 소수인 의견은 무엇이었는지 목록으로 알려줘.",
      },
      {
        title: 'Research Wiki 항목 작성',
        when: '검증까지 끝난 분석 결과를 Research Wiki에 실제로 채워 넣을 때',
        prompt:
          "아래 분석 결과를 Research Wiki 템플릿 형식에 맞춰 정리해줘. 섹션: 1) 인터뷰 요약(주제별 그룹 + 인용) 2) VOC 3) 경쟁사 분석 4) 시장 맥락. 각 항목마다 출처와 날짜를 표기해서, 다음 단계에서 이 문서만 보고도 근거를 추적할 수 있게 해줘. 해당 없는 섹션은 '자료 없음'이라고 표시해줘.\n\n[검증된 분석 결과 붙여넣기]",
      },
    ],
    checkpoint: '원본 누락, 과잉 일반화, 표본 편향 여부, Research Wiki 구조로 정리됐는지',
  },
  {
    id: 'structure',
    order: 3,
    kind: 'stage',
    name: '구조·스펙 정의',
    summary: 'PRD부터 정보구조, 유저플로우, 화면별 기능명세까지 — 화면을 그리기 전 모든 것을 정리한다.',
    input: 'Step 2에서 채워진 Research Wiki — 구조화된 리서치 인사이트',
    deliverables: [
      {
        name: 'PRD 초안',
        level: 'augment',
        aiDoes: '자료 수집 결과를 바탕으로 목표·배경·문제·성공지표 초안 작성',
        humanDoes: '목표·성공지표·우선순위 확정',
        tools: ['ChatGPT / Claude'],
      },
      {
        name: 'IA·기능 구조 초안',
        level: 'augment',
        aiDoes: '유사 서비스 사례 조사, 메뉴·기능 구조 초안 제시',
        humanDoes: '구조 초안 검토·수정',
        tools: ['ChatGPT / Claude'],
      },
      {
        name: '유저플로우',
        level: 'augment',
        aiDoes: '핵심 시나리오별 사용자 흐름(단계·분기) 초안 작성',
        humanDoes: '실제 사용 맥락과 맞는지, 빠진 분기 없는지 검토',
        tools: ['ChatGPT / Claude'],
      },
      {
        name: '화면별 기능명세서',
        level: 'augment',
        aiDoes: '화면별 입력값·상태·예외 처리를 포함한 상세 스펙 초안 작성',
        humanDoes: '스펙의 예외 케이스 검토',
        tools: ['ChatGPT / Claude', 'Notion'],
      },
      {
        name: '범위·우선순위 확정',
        level: 'human-own',
        aiDoes: '기능별 참고 정보(유사 사례, 난이도 추정) 제공',
        humanDoes: '비즈니스 우선순위·최종 범위 결정',
        tools: ['Notion'],
      },
    ],
    howTo: [
      '자료 수집 결과를 바탕으로 PRD(목표·배경·문제·성공지표) 초안 요청',
      '요구사항 정리본을 바탕으로 IA(정보구조) 초안 2안 요청',
      '핵심 시나리오별 유저플로우 초안 요청',
      '화면별 필수/향후 기능 구분 요청',
      '확정된 기능마다 입력값·상태·예외 처리까지 포함한 상세 스펙 작성 요청',
      '결정된 범위만 반영하고 나머지는 별도 백로그로 분리',
    ],
    prompts: [
      {
        title: 'PRD 초안 생성',
        when: '리서치 결과를 바탕으로 제품 요구사항 문서를 처음 만들 때',
        prompt:
          "다음 리서치 결과를 바탕으로 PRD 초안을 작성해줘. 포함할 항목: 1) 제품 목표 2) 배경(왜 지금 필요한가) 3) 해결하려는 문제 4) 성공 지표(정량적으로) 5) 범위에서 제외하는 것. 추측이 필요한 부분은 '가정'이라고 표시하고 근거를 남겨줘.\n\n[리서치 결과 요약 붙여넣기]",
      },
      {
        title: 'IA 초안 생성',
        when: '메뉴 구조 초안이 필요할 때',
        prompt:
          '다음 제품 요구사항과 사용자 목표를 바탕으로 정보구조(IA) 초안을 2가지 안으로 제시해줘. 각 안마다 1) 메뉴 트리(3단계까지) 2) 이 구조를 선택한 이유 3) 트레이드오프(장단점)를 표로 정리해줘.\n\n[요구사항 요약 붙여넣기]',
      },
      {
        title: '유저플로우 초안 생성',
        when: '핵심 시나리오의 사용자 흐름을 정리할 때',
        prompt:
          '다음 핵심 시나리오에 대해 사용자 흐름을 단계별로 정리해줘. 각 단계마다 1) 사용자 행동 2) 시스템 반응 3) 성공/실패 시 분기를 표시하고, 마지막에 놓치기 쉬운 예외 분기(에러, 취소, 뒤로가기 등)를 별도로 나열해줘.\n\n[핵심 시나리오 설명]\n[관련 IA/화면 목록]',
      },
      {
        title: '기능 목록 초안',
        when: '화면별 상세 기능을 정의할 때',
        prompt:
          "아래 메뉴 항목 각각에 대해 1) 핵심 기능 목록 2) 필수(MVP) vs 향후(Nice to have) 구분 3) 참고할 만한 유사 서비스 패턴을 정리해줘. 확신이 없는 부분은 '확인 필요'로 표시해줘.\n\n[메뉴 목록]",
      },
      {
        title: '화면별 상세 스펙 작성',
        when: '기능이 확정된 후, 개발이 바로 참고할 수 있는 상세 스펙 문서를 만들 때',
        prompt:
          "아래 화면과 확정된 기능 목록을 바탕으로 상세 스펙을 표로 정리해줘. 컬럼: 1) 입력 필드와 유효성 검사 규칙 2) 화면 상태(기본/로딩/에러/빈 상태) 3) 사용자 액션별 동작(성공/실패 처리 포함) 4) 연동이 필요한 API 또는 데이터 5) 예외·엣지 케이스. 확실하지 않은 부분은 '기획 확인 필요'로 표시하고 임의로 지어내지 마.\n\n[화면 이름]\n[확정된 기능 목록]",
      },
    ],
    checkpoint: '목표·비즈니스와의 정합성, 빠진 예외·분기 케이스, 스펙 누락 여부',
  },
  {
    id: 'concept',
    order: 4,
    kind: 'stage',
    name: '대표 화면 시안',
    summary: '스펙을 바탕으로 대표 화면의 구조(와이어프레임)를 먼저 잡고, 그 위에 여러 톤·스타일을 병렬 탐색한다.',
    input: 'Step 3의 「화면별 기능명세서」·「유저플로우」·「범위·우선순위 확정」 결과',
    deliverables: [
      {
        name: '대표 화면 와이어프레임',
        level: 'augment',
        aiDoes: 'IA·유저플로우·기능명세를 바탕으로 대표 화면의 구조·레이아웃(정보 위계) 초안 작성',
        humanDoes: '구조가 사용자 목표에 맞는지, 빠진 정보·기능 없는지 검토',
        tools: ['Figma (Make)'],
      },
      {
        name: '병렬 컨셉',
        level: 'amplify',
        aiDoes: '확정된 구조 위에 3~5개의 톤·스타일을 병렬로 생성',
        humanDoes: '컨셉 다양성·완성도 확인',
        tools: ['Figma (Make)'],
      },
      {
        name: '최종 방향 선별',
        level: 'human-own',
        aiDoes: '컨셉별 리스크·트레이드오프 정리',
        humanDoes: '목표·신뢰·접근성 기준으로 최종 선별',
        tools: ['Notion'],
      },
    ],
    howTo: [
      '스펙·유저플로우를 바탕으로 대표 화면의 와이어프레임(구조)부터 요청',
      '확정된 구조 위에 서로 다른 톤의 안을 병렬로 요청',
      '안끼리 실제로 다른지, 변주가 편향되지 않았는지 확인',
      '확정 전 AI에게 비판적 리뷰어 역할로 반박 요청',
    ],
    prompts: [
      {
        title: '대표 화면 와이어프레임 생성',
        when: '스펙을 화면 구조로 처음 옮길 때',
        prompt:
          '아래 화면의 기능 명세와 유저플로우를 바탕으로 와이어프레임 수준의 구조를 제안해줘. 1) 화면에 들어갈 정보·기능 블록을 우선순위 순으로 나열 2) 레이아웃 배치(상단/본문/하단 등)를 텍스트로 설명 3) 이 구조를 선택한 이유. 비주얼 스타일이나 색상은 아직 언급하지 말고 구조에만 집중해줘.\n\n[화면 기능 명세]\n[관련 유저플로우]',
      },
      {
        title: '병렬 컨셉 생성',
        when: '구조가 확정된 화면에 여러 톤·스타일을 빠르게 비교하고 싶을 때',
        prompt:
          '다음 화면의 확정된 구조(와이어프레임)와 핵심 사용자 목표를 바탕으로 서로 다른 톤의 UX 컨셉 3가지를 제시해줘. 각 컨셉마다 1) 톤·스타일 방향 2) 강조하는 사용자 가치 3) 예상 리스크(신뢰/접근성/구현 난이도)를 표로 정리해줘. 구조는 유지하고 톤만 다르게 가야 해.\n\n[확정된 와이어프레임/구조]\n[사용자 목표]',
      },
      {
        title: '반대 관점 리뷰',
        when: '확정 전 최종 검토할 때',
        prompt:
          '방금 제시한 안에 대해 비판적인 리뷰어 역할로 반박해줘. 1) 이 안이 실패할 수 있는 시나리오 2) 접근성 관점에서 놓친 것 3) 이 안을 선택하지 말아야 할 이유를 각각 최소 2개씩 제시해줘.',
      },
    ],
    checkpoint: '구조가 스펙을 다 반영했는지, 다양성이 실제로 확보됐는지, 안끼리 겹치지 않는지',
  },
  {
    id: 'gate-1',
    order: 5,
    kind: 'gate',
    name: '게이트 심사 ①',
    summary: '대표 시안을 최종 확정하고 판단 근거를 기록한다.',
    input: 'Step 4의 「병렬 컨셉」 후보들과 각 컨셉의 리스크·트레이드오프 정리',
    deliverables: [
      {
        name: '비교표',
        level: 'augment',
        aiDoes: '후보별 장단점 비교표 초안 작성',
        humanDoes: '비교표 내용 검증',
        tools: ['ChatGPT / Claude'],
      },
      {
        name: '최종 확정',
        level: 'human-own',
        aiDoes: '결정에는 관여하지 않음, 참고자료만 제공',
        humanDoes: '최종 확정, 판단 근거를 Decision Log에 기록',
        tools: ['Notion'],
      },
    ],
    howTo: [
      '비교표를 참고하되 최종 결정은 반드시 사람이 내림',
      '탈락한 안도 왜 버렸는지 이유를 남김',
      '기록은 이후 프로젝트에서 재사용 가능한 형태로 저장',
    ],
    prompts: [
      {
        title: '의사결정 기록 초안',
        when: '시안 확정 후 결정 근거를 남길 때',
        prompt:
          '우리가 [선택한 안]을 최종 선택한 이유와, 탈락한 안들을 왜 버렸는지를 Decision Log 형식으로 정리해줘. 형식: [결정 사항 / 선택 이유 / 버린 대안과 이유 / 재검토가 필요해지는 조건]. 내가 말한 이유만 사용하고 임의로 근거를 지어내지 마.\n\n[선택한 안과 이유, 탈락한 안]',
      },
    ],
    checkpoint: '판단 근거가 기록으로 남았는지, 탈락 이유가 명확한지',
  },
  {
    id: 'design-system',
    order: 6,
    kind: 'stage',
    name: '디자인 시스템 구축',
    summary: '확정 시안을 토대로 토큰·컴포넌트 규칙을 만든다.',
    input: '게이트①에서 확정된 대표 화면 시안과 Decision Log',
    deliverables: [
      {
        name: '토큰·컴포넌트 후보',
        level: 'augment',
        aiDoes: '확정 시안에서 토큰·컴포넌트 후보 추출',
        humanDoes: '기존 값과의 통합 여부 검토',
        tools: ['Figma'],
      },
      {
        name: '원칙·금지 패턴',
        level: 'human-own',
        aiDoes: '흔한 금지 패턴 예시 후보 제시',
        humanDoes: '원칙·예외·금지 패턴 최종 확정',
        tools: ['Notion'],
      },
    ],
    howTo: [
      '확정 시안에서 색상/타이포/간격 토큰 후보 추출',
      '기존 값과 통합 가능한 토큰은 병합 제안받기',
      '브랜드 원칙에 어긋나는 금지 패턴을 목록화',
    ],
    prompts: [
      {
        title: '토큰 추출',
        when: '확정 시안에서 디자인 토큰을 뽑을 때',
        prompt:
          '확정된 화면 시안(설명 또는 스타일 정보)을 보고 디자인 토큰 후보를 추출해줘. 색상(역할별: primary/text/border/background), 타이포 스케일, 간격(spacing) 단위, radius 값으로 나눠서 표로 정리하고, 기존과 비슷한 값이 있으면 통합할 후보도 같이 제안해줘.\n\n[확정 시안 설명/스타일 정보]',
      },
      {
        title: '금지 패턴 목록화',
        when: '디자인 원칙 문서를 정리할 때',
        prompt:
          "우리 브랜드 원칙은 [원칙 붙여넣기]야. 이 원칙에 어긋나는 흔한 UI 패턴 예시를 5개 이상 나열하고, 왜 어긋나는지 각각 한 줄로 설명해줘. 이건 '금지 패턴' 섹션에 넣을 거야.",
      },
    ],
    checkpoint: '기존 시스템과의 일관성, 예외 규정 누락 여부',
  },
  {
    id: 'build-screens',
    order: 7,
    kind: 'stage',
    name: '전체 화면 전개',
    summary: '분석 자료와 디자인 시스템을 기반으로 나머지 화면을 만든다.',
    input: 'Step 6의 디자인 시스템(토큰·컴포넌트·금지 패턴) + Step 3의 화면별 기능명세서',
    deliverables: [
      {
        name: '화면 대량 생성',
        level: 'augment',
        aiDoes: '디자인 시스템 규칙에 맞춰 화면 초안 대량 생성',
        humanDoes: '일관성·엣지케이스 검수',
        tools: ['Figma (Make)', 'Claude Code'],
      },
      {
        name: '엣지케이스 점검',
        level: 'augment',
        aiDoes: '빈 상태/로딩/에러 등 누락된 상태를 점검하고 제안',
        humanDoes: '적용 여부 최종 판단',
        tools: ['ChatGPT / Claude'],
      },
    ],
    howTo: [
      '디자인 시스템 규칙과 기능 명세를 함께 제공',
      '시스템에 없는 새 패턴은 만들지 말고 논의 대상으로 표시하도록 지시',
      '완성 후 빈 상태/로딩/에러 등 엣지케이스 별도 점검',
    ],
    prompts: [
      {
        title: '화면 일괄 생성',
        when: '디자인 시스템 확정 후 나머지 화면을 만들 때',
        prompt:
          "아래 디자인 시스템 규칙과 기능 명세를 참고해서 [화면 이름] 화면을 만들어줘. 반드시 기존 컴포넌트와 토큰만 사용하고, 새 패턴이 필요하면 만들지 말고 '시스템에 없음, 논의 필요'라고 표시해줘.\n\n[디자인 시스템 규칙 요약]\n[해당 화면 기능 명세]",
      },
      {
        title: '엣지케이스 점검',
        when: '화면 완성 후 빠진 상태를 확인할 때',
        prompt:
          '방금 만든 화면에서 빠졌을 수 있는 상태를 점검해줘: 빈 상태(empty state), 로딩, 에러, 권한 없음, 데이터가 1개뿐이거나 매우 많을 때. 각 상태별로 현재 화면에 반영되어 있는지, 없다면 어떻게 처리해야 할지 제안해줘.',
      },
    ],
    checkpoint: '디자인 시스템 이탈 여부, 엣지케이스 누락',
  },
  {
    id: 'gate-2',
    order: 8,
    kind: 'gate',
    name: '게이트 심사 ②',
    summary: '7개 기준으로 전체 결과물을 종합 심사한다.',
    input: 'Step 7에서 완성된 전체 화면',
    deliverables: [
      {
        name: '게이트 체크리스트',
        level: 'augment',
        aiDoes: 'UX·Trust·Control·A11y·Brand·Model·Business 기준 체크리스트 초안 작성',
        humanDoes: '체크리스트 항목 검증',
        tools: ['ChatGPT / Claude'],
      },
      {
        name: '배포 승인',
        level: 'human-own',
        aiDoes: '결정에는 관여하지 않음, 참고자료만 제공',
        humanDoes: '최종 판정, 배포 승인',
        tools: ['Notion'],
      },
    ],
    howTo: [
      'UX·Trust·Control·Accessibility·Brand·Model Behavior·Business 7개 기준으로 점검',
      '기준 미달 항목은 예외 승인 사유를 남기고 통과시키지 않음',
      '체크리스트는 다음 프로젝트에서도 재사용',
    ],
    prompts: [
      {
        title: '게이트 체크리스트 생성',
        when: '출시 전 최종 심사할 때',
        prompt:
          '아래 화면/기능 목록에 대해 UX, Trust, Control, Accessibility, Brand, Model Behavior, Business 7개 게이트 기준으로 체크리스트를 만들어줘. 각 게이트마다 확인 질문을 3개씩, 그리고 이 화면에서 특히 주의해야 할 항목을 표시해줘.\n\n[화면/기능 목록]',
      },
    ],
    checkpoint: '7개 게이트를 실제로 다 통과했는지, 예외 승인 사유가 기록됐는지',
  },
  {
    id: 'launch',
    order: 9,
    kind: 'stage',
    name: '출시·기록',
    summary: '출시하고 결정 이유를 지식 기반에 남긴다.',
    input: '게이트②를 통과한 최종 결과물과 배포 승인',
    deliverables: [
      {
        name: '릴리즈 노트',
        level: 'augment',
        aiDoes: '사용자 관점 변경사항 요약 초안 작성',
        humanDoes: '표현·정확성 확인 후 게시',
        tools: ['ChatGPT / Claude'],
      },
      {
        name: 'Decision Log 기록',
        level: 'human-own',
        aiDoes: '결정 내역을 Decision Log 형식으로 종합 정리(초안)',
        humanDoes: '기록 확정, 다음 프로젝트에 반영',
        tools: ['Notion'],
      },
    ],
    howTo: [
      '사용자 관점 릴리즈 노트를 AI 초안으로 작성',
      '프로젝트 전체 결정 내역을 Decision Log로 종합',
      '기록은 다음 프로젝트의 Step 1(Context Foundation)에 누적',
    ],
    prompts: [
      {
        title: '릴리즈 노트 초안',
        when: '출시 후 변경사항을 정리할 때',
        prompt:
          "이번 릴리즈에서 바뀐 사항을 사용자 관점 릴리즈 노트로 정리해줘. 기술적 구현 내용 말고 '사용자가 무엇을 다르게 경험하는지' 중심으로 3~5개 항목으로 요약해줘.\n\n[변경 사항 목록]",
      },
      {
        title: 'Decision Log 종합',
        when: '프로젝트 종료 후 지식 기반에 기록할 때',
        prompt:
          '이 프로젝트에서 있었던 주요 결정들을 Decision Log 형식으로 종합 정리해줘: [결정 / 선택 이유 / 버린 대안 / 결과가 어땠는지 / 다음 프로젝트에 남길 교훈]. 내가 제공한 결정 내역만 사용해줘.\n\n[프로젝트 진행 중 결정 내역들]',
      },
    ],
    checkpoint: '다음 프로젝트가 참고할 수 있는 형태로 남았는지',
  },
]
