export type DelegationLevel = 'automate' | 'augment' | 'amplify' | 'human-own'

export interface DelegationInfo {
  level: DelegationLevel
  label: string
  definition: string
  humanInvolvement: string
  checkpoint: string
}

export const delegationLevels: DelegationInfo[] = [
  {
    level: 'automate',
    label: 'Automate',
    definition: 'AI가 규칙적·반복적 작업을 전담 실행',
    humanInvolvement: '결과물 존재·형식만 확인, 세부 검수는 최소',
    checkpoint: '원본 누락, 포맷 오류 여부',
  },
  {
    level: 'augment',
    label: 'Augment',
    definition: 'AI가 초안·분석을 만들고 사람이 검토·수정',
    humanInvolvement: '산출물마다 리뷰 후 승인 또는 반려',
    checkpoint: '맥락 적합성, 기존 패턴과의 일관성',
  },
  {
    level: 'amplify',
    label: 'Amplify',
    definition: 'AI가 대안의 폭을 넓혀 탐색 범위를 확장',
    humanInvolvement: '여러 안 중 의미 있는 것을 선택',
    checkpoint: '다양성이 실제로 확보됐는지, 변주가 편향되지 않았는지',
  },
  {
    level: 'human-own',
    label: 'Human Own',
    definition: 'AI는 참고자료만 제공, 결정과 책임은 사람',
    humanInvolvement: '처음부터 끝까지 사람이 주도',
    checkpoint: '판단 근거가 기록(Decision Log)으로 남았는지',
  },
]

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
  delegation: DelegationLevel
  summary: string
  aiRole: string
  humanRole: string
  howTo: string[]
  prompts: PromptExample[]
  checkpoint: string
}

export const workflows: WorkflowStage[] = [
  {
    id: 'research',
    order: 1,
    kind: 'stage',
    name: '자료 수집·분석',
    delegation: 'automate',
    summary: '요구사항, VOC, 경쟁사 자료를 모아 1차로 정리한다.',
    aiRole: '전사, 1차 요약, 중복 제거, 포맷 통일',
    humanRole: '편향 검토, 맥락 누락 확인, 우선순위 판단',
    howTo: [
      '인터뷰 녹음/회의록을 AI에게 전사·요약 요청',
      '여러 소스(VOC, 경쟁사 리뷰, 요구사항 문서)를 한 표로 통합',
      "AI가 뽑은 패턴에 대해 '왜 그렇게 판단했는지' 되물어 검증",
    ],
    prompts: [
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
    ],
    checkpoint: '원본 누락, 과잉 일반화, 표본 편향 여부',
  },
  {
    id: 'structure',
    order: 2,
    kind: 'stage',
    name: '구조 정의',
    delegation: 'augment',
    summary: '메뉴 구조와 화면별 상세 기능을 정의한다.',
    aiRole: '유사 서비스 사례 조사, 메뉴·기능 초안 제시',
    humanRole: '비즈니스 우선순위·범위 최종 결정',
    howTo: [
      '요구사항 정리본을 바탕으로 IA(정보구조) 초안 2안 요청',
      '화면별 필수/향후 기능 구분 요청',
      '결정된 범위만 반영하고 나머지는 별도 백로그로 분리',
    ],
    prompts: [
      {
        title: 'IA 초안 생성',
        when: '메뉴 구조 초안이 필요할 때',
        prompt:
          '다음 제품 요구사항과 사용자 목표를 바탕으로 정보구조(IA) 초안을 2가지 안으로 제시해줘. 각 안마다 1) 메뉴 트리(3단계까지) 2) 이 구조를 선택한 이유 3) 트레이드오프(장단점)를 표로 정리해줘.\n\n[요구사항 요약 붙여넣기]',
      },
      {
        title: '기능 명세 초안',
        when: '화면별 상세 기능을 정의할 때',
        prompt:
          "아래 메뉴 항목 각각에 대해 1) 핵심 기능 목록 2) 필수(MVP) vs 향후(Nice to have) 구분 3) 참고할 만한 유사 서비스 패턴을 정리해줘. 확신이 없는 부분은 '확인 필요'로 표시해줘.\n\n[메뉴 목록]",
      },
    ],
    checkpoint: '비즈니스 목표와의 정합성, 빠진 예외 케이스',
  },
  {
    id: 'concept',
    order: 3,
    kind: 'stage',
    name: '대표 화면 시안',
    delegation: 'amplify',
    summary: '대표 화면을 여러 구조·톤으로 병렬 탐색한다.',
    aiRole: '3~5개의 구조·톤 병렬 생성',
    humanRole: '목표·신뢰·접근성 기준으로 선별',
    howTo: [
      '동일 화면에 대해 서로 다른 접근의 안을 병렬로 요청',
      '안끼리 실제로 다른지, 변주가 편향되지 않았는지 확인',
      '확정 전 AI에게 비판적 리뷰어 역할로 반박 요청',
    ],
    prompts: [
      {
        title: '병렬 컨셉 생성',
        when: '한 화면에 대해 여러 접근을 빠르게 비교하고 싶을 때',
        prompt:
          '다음 화면의 목적과 핵심 사용자 목표를 바탕으로 서로 다른 접근의 UX 컨셉 3가지를 제시해줘. 각 컨셉마다 1) 핵심 레이아웃 아이디어 2) 강조하는 사용자 가치 3) 예상 리스크(신뢰/접근성/구현 난이도)를 표로 정리해줘. 세 컨셉은 서로 명확히 달라야 해.\n\n[화면 목적 / 사용자 목표]',
      },
      {
        title: '반대 관점 리뷰',
        when: '확정 전 최종 검토할 때',
        prompt:
          '방금 제시한 안에 대해 비판적인 리뷰어 역할로 반박해줘. 1) 이 안이 실패할 수 있는 시나리오 2) 접근성 관점에서 놓친 것 3) 이 안을 선택하지 말아야 할 이유를 각각 최소 2개씩 제시해줘.',
      },
    ],
    checkpoint: '다양성이 실제로 확보됐는지, 안끼리 겹치지 않는지',
  },
  {
    id: 'gate-1',
    order: 4,
    kind: 'gate',
    name: '게이트 심사 ①',
    delegation: 'human-own',
    summary: '대표 시안을 최종 확정하고 판단 근거를 기록한다.',
    aiRole: '후보별 장단점 비교표 초안 작성',
    humanRole: '최종 확정, 판단 근거를 Decision Log에 기록',
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
    order: 5,
    kind: 'stage',
    name: '디자인 시스템 구축',
    delegation: 'augment',
    summary: '확정 시안을 토대로 토큰·컴포넌트 규칙을 만든다.',
    aiRole: '확정 시안에서 토큰·컴포넌트 후보 추출',
    humanRole: '원칙·예외·금지 패턴 확정',
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
    order: 6,
    kind: 'stage',
    name: '전체 화면 전개',
    delegation: 'augment',
    summary: '분석 자료와 디자인 시스템을 기반으로 나머지 화면을 만든다.',
    aiRole: '시스템 규칙에 맞춰 화면 대량 생성',
    humanRole: '일관성·엣지케이스 검수',
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
    order: 7,
    kind: 'gate',
    name: '게이트 심사 ②',
    delegation: 'human-own',
    summary: '7개 기준으로 전체 결과물을 종합 심사한다.',
    aiRole: '게이트별 체크리스트 초안 작성',
    humanRole: '최종 판정, 배포 승인',
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
    order: 8,
    kind: 'stage',
    name: '출시·기록',
    delegation: 'human-own',
    summary: '출시하고 결정 이유를 지식 기반에 남긴다.',
    aiRole: '변경 요약, 승인/탈락 이유 문서화 초안',
    humanRole: '기록 확정, 다음 프로젝트 반영',
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
