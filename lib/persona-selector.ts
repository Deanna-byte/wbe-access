import personasData from '@/data/personas.json';
import fs from 'fs';
import path from 'path';

export interface Persona {
  id: string;
  name: string;
  name_zh: string;
  avatar: string;
  domains: string[];
  thinking_models: string[];
  bio: string;
  style: string;
  domain_zh?: string;
}

export interface DomainConfig {
  id: string;
  name: string;
  name_zh: string;
  keywords: string[];
  personas: string[];
}

const domains: DomainConfig[] = [
  {
    id: 'finance',
    name: 'Finance & Investment',
    name_zh: '理财投资',
    keywords: ['投资', '理财', '股票', '基金', '财富', '资产', '金钱', '赚钱', '存钱', '黄金', '巴菲特', '芒格', '买房', '存款', '国债', '债券', '比特币', '加密货币', '退休', '储蓄'],
    personas: ['buffett', 'munger', 'duan_yongping', 'ray_dalio', 'howard_marks']
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    name_zh: '健康医疗',
    keywords: ['健康', '运动', '饮食', '睡眠', '减肥', '锻炼', '身体', '疾病', '长寿', 'Peter Attia', '跑步', '健身', '养生', '营养', '免疫力', '生病', '医院', '医生', '体检'],
    personas: ['peter_attia', 'andrew_huberman', 'rhonda_patrick', 'bryan_johnson']
  },
  {
    id: 'career',
    name: 'Career Development',
    name_zh: '职业发展',
    keywords: ['职业', '工作', '跳槽', '晋升', '技能', '面试', '简历', '职场', '职业发展', '辞职', '上班', '加班', '同事', '老板', '领导', '加薪', '绩效', '转行', 'offer', '工资'],
    personas: ['cal_newport', 'adam_grant', 'reid_hoffman', 'scott_galloway']
  },
  {
    id: 'startup',
    name: 'Startup & Business',
    name_zh: '创业商业',
    keywords: ['创业', '商业', '公司', '产品', '管理', '团队', '融资', 'CEO', '合伙人', '股权', '用户', '增长', '市场', '盈利', '创业', '独角兽', 'A轮', 'B轮', '商业模式'],
    personas: ['paul_graham', 'ben_horowitz', 'peter_thiel', 'zhang_yiming']
  },
  {
    id: 'life',
    name: 'Life & Philosophy',
    name_zh: '人生哲学',
    keywords: ['人生', '选择', '焦虑', '意义', '幸福', '迷茫', '目标', '价值观', '内耗', 'Naval', '快乐', '孤独', '成长', '自我', '未来', '方向', '人际', '朋友', '心态', '情绪', '压力'],
    personas: ['naval', 'tim_ferriss', 'mark_manson', 'ryan_holiday', 'yuval_harari']
  },
  {
    id: 'relationship',
    name: 'Relationship',
    name_zh: '情感关系',
    keywords: ['感情', '恋爱', '婚姻', '家庭', '沟通', '亲密关系', '伴侣', '两性', '分手', '复合', '约会', '相亲', '异性', '夫妻', '孩子', '父母', '原生家庭'],
    personas: ['esther_perel', 'john_gottman', 'brene_brown']
  },
  {
    id: 'learning',
    name: 'Learning & Education',
    name_zh: '教育学习',
    keywords: ['学习', '教育', '技能', '考试', '记忆', '读书', '学习方法', '英语', '写作', '演讲', '思维', '专注', '效率', '自律', '费曼'],
    personas: ['barbara_oakley', 'scott_young', 'angela_duckworth']
  },
  {
    id: 'tech',
    name: 'Technology',
    name_zh: '科技技术',
    keywords: ['编程', '技术', '代码', '架构', '开发', 'AI', '程序员', 'Linux', '产品经理', '前端', '后端', '算法', '数据', '机器学习', '深度学习', 'ChatGPT', 'GPT'],
    personas: ['linus_torvalds', 'john_carmack', 'andrej_karpathy', 'dhh']
  }
];

export function analyzeDomain(question: string): string {
  const lowerQuestion = question.toLowerCase();

  // 打分制：每个领域统计命中关键词数量，取最高分
  let bestDomain = 'life';
  let bestScore = 0;

  for (const domain of domains) {
    let score = 0;
    for (const keyword of domain.keywords) {
      if (lowerQuestion.includes(keyword)) {
        score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestDomain = domain.id;
    }
  }

  // 如果没有任何关键词匹配，综合判断
  if (bestScore === 0) {
    const q = lowerQuestion;
    // 基于常见词综合判断
    if (/\b(工作|上班|老板|同事|升职|加薪|辞职|跳槽|面试|职场|职业)\b/.test(q)) return 'career';
    if (/\b(创业|融资|产品|团队|管理|商业|市场)\b/.test(q)) return 'startup';
    if (/\b(健康|运动|减肥|睡眠|饮食|疾病|身体|锻炼)\b/.test(q)) return 'health';
    if (/\b(投资|股票|理财|基金|财富|赚钱|钱|资产)\b/.test(q)) return 'finance';
    if (/\b(感情|恋爱|婚姻|伴侣|亲密|分手|两性|家庭)\b/.test(q)) return 'relationship';
    if (/\b(学习|考试|读书|记忆|技能|教育)\b/.test(q)) return 'learning';
    if (/\b(编程|代码|程序员|技术|开发|AI|互联网)\b/.test(q)) return 'tech';
  }

  return bestDomain;
}

export function selectPersonas(domainId: string, count: number = 3): Persona[] {
  const domain = domains.find(d => d.id === domainId);
  if (!domain) return [];

  // 随机打乱后取前 count 个，避免每次都选同样的人
  const shuffled = [...domain.personas].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  return selected
    .map(id => (personasData as Persona[]).find(p => p.id === id))
    .filter((p): p is Persona => p !== undefined);
}

export function getPersonaPrompt(personaId: string, question: string): string {
  const promptPath = path.join(process.cwd(), 'data', 'prompts', `${personaId}.txt`);

  try {
    const template = fs.readFileSync(promptPath, 'utf-8');
    return template.replace('{{QUESTION}}', question);
  } catch {
    console.error(`Prompt not found for ${personaId}`);
    return `请以专业的角度回答以下问题：\n\n${question}`;
  }
}

export function getAllPersonas(): Persona[] {
  return personasData as Persona[];
}

export function getDomains(): DomainConfig[] {
  return domains;
}

export function getPersonasByDomain(): Record<string, Persona[]> {
  const result: Record<string, Persona[]> = {};
  for (const domain of domains) {
    result[domain.id] = (personasData as Persona[]).filter(p => p.domains.includes(domain.id));
  }
  return result;
}
