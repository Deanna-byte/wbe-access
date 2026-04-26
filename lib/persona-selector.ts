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
    keywords: ['投资', '理财', '股票', '基金', '财富', '资产', '金钱', '赚钱', '存钱', '黄金', '巴菲特', '芒格'],
    personas: ['buffett', 'munger', 'duan_yongping', 'ray_dalio', 'howard_marks']
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    name_zh: '健康医疗',
    keywords: ['健康', '运动', '饮食', '睡眠', '减肥', '锻炼', '身体', '疾病', '长寿', 'Peter Attia'],
    personas: ['peter_attia', 'andrew_huberman', 'rhonda_patrick', 'bryan_johnson']
  },
  {
    id: 'career',
    name: 'Career Development',
    name_zh: '职业发展',
    keywords: ['职业', '工作', '跳槽', '晋升', '技能', '面试', '简历', '职场', '职业发展'],
    personas: ['cal_newport', 'adam_grant', 'reid_hoffman', 'scott_galloway']
  },
  {
    id: 'startup',
    name: 'Startup & Business',
    name_zh: '创业商业',
    keywords: ['创业', '商业', '公司', '产品', '管理', '团队', '融资', 'CEO'],
    personas: ['paul_graham', 'ben_horowitz', 'peter_thiel', 'zhang_yiming']
  },
  {
    id: 'life',
    name: 'Life & Philosophy',
    name_zh: '人生哲学',
    keywords: ['人生', '选择', '焦虑', '意义', '幸福', '迷茫', '目标', '价值观', '内耗', 'Naval'],
    personas: ['naval', 'tim_ferriss', 'mark_manson', 'ryan_holiday', 'yuval_harari']
  },
  {
    id: 'relationship',
    name: 'Relationship',
    name_zh: '情感关系',
    keywords: ['感情', '恋爱', '婚姻', '家庭', '沟通', '亲密关系', '伴侣', '两性'],
    personas: ['esther_perel', 'john_gottman', 'brene_brown']
  },
  {
    id: 'learning',
    name: 'Learning & Education',
    name_zh: '教育学习',
    keywords: ['学习', '教育', '技能', '考试', '记忆', '读书', '学习方法'],
    personas: ['barbara_oakley', 'scott_young', 'angela_duckworth']
  },
  {
    id: 'tech',
    name: 'Technology',
    name_zh: '科技技术',
    keywords: ['编程', '技术', '代码', '架构', '开发', 'AI', '程序员', 'Linux'],
    personas: ['linus_torvalds', 'john_carmack', 'andrej_karpathy', 'dhh']
  }
];

export function analyzeDomain(question: string): string {
  const lowerQuestion = question.toLowerCase();

  for (const domain of domains) {
    for (const keyword of domain.keywords) {
      if (lowerQuestion.includes(keyword)) {
        return domain.id;
      }
    }
  }

  return 'life';
}

export function selectPersonas(domainId: string, count: number = 3): Persona[] {
  const domain = domains.find(d => d.id === domainId);
  if (!domain) return [];

  const selectedPersonas = domain.personas.slice(0, count);
  return selectedPersonas
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
