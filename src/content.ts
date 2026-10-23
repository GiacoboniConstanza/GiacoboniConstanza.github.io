// Contenido del portfolio (ES/EN). Fuente: CV aprobado (versión web: sin teléfono ni ubicación).
export type Lang = 'es' | 'en'

export const NAME = 'Constanza Giacoboni'
export const LINKS = {
  email: 'coty.giaco@gmail.com',
  linkedin: 'https://www.linkedin.com/in/constanza-giacoboni',
  github: 'https://github.com/GiacoboniConstanza',
  aMedias: 'https://a-medias-delta.vercel.app/',
  site: 'https://giacoboniconstanza.github.io/',
}
export const CV_FILES: Record<Lang, string> = {
  es: '/CV_Constanza_Giacoboni_ES_web.pdf',
  en: '/CV_Constanza_Giacoboni_EN_web.pdf',
}

/** Resumen corto para el comando `stack` de la terminal. */
export const STACK_SHORT: Record<string, string[]> = {
  backend: ['PHP 8', 'CodeIgniter 3/4', 'Shield', 'Composer'],
  frontend: ['JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'DataTables'],
  data: ['MariaDB', 'PostgreSQL', 'Supabase'],
  devops: ['Docker', 'GitLab CI/CD', 'Git', 'Linux', 'Vercel'],
  quality: ['PHPUnit', 'PHPStan', 'PHPCS', 'GrumPHP', 'Playwright'],
  ai: ['Cursor', 'GitHub Copilot', 'ChatGPT', 'Gemini', 'Grok'],
}

type Group = { label?: string; items: string[] }
type Job = { hash: string; ref: string; role: string; org: string; period: string; groups: Group[] }
type Case = { k: string; title: string; body: string[]; tags: string[] }

const es = {
  nav: { profile: 'perfil', stack: 'stack', experience: 'experiencia', cases: 'casos', projects: 'proyectos', education: 'formación', contact: 'contacto' },
  role: 'Tech Lead & Desarrolladora Full Stack',
  tagline: 'Sistemas web de gestión con PHP, CodeIgniter y MariaDB. Liderazgo técnico de equipo, calidad de software y desarrollo asistido por IA.',
  contact: 'Contacto',
  cvLabel: 'CV en PDF',
  profileTitle: 'perfil',
  profile: [
    'Tech Lead y desarrolladora Full Stack con casi 5 años de experiencia en sistemas web de gestión con PHP (CodeIgniter) y MariaDB. Liderazgo de un equipo de 5 personas sin dejar el desarrollo: gestión de proyectos desde el relevamiento con el cliente hasta la puesta en producción.',
    'Experiencia en integraciones de pagos y facturación electrónica, y prácticas sólidas de calidad (CI/CD, tests automatizados, procesos ISO 9001), con uso de herramientas de IA aplicadas al desarrollo.',
  ],
  facts: [
    ['experiencia', '~5 años'],
    ['equipo', '5 personas'],
    ['clientes', '+20 con soporte y desarrollo'],
    ['tests', '+300 en una de las suites'],
    ['crm', '~3000 usuarios'],
    ['pasantes', '2 (1 en planta permanente)'],
  ],
  stackTitle: 'stack',
  stack: [
    { k: 'backend', label: 'Backend', items: ['PHP 8 (CodeIgniter 3 y 4, Shield)', 'Composer', 'Java (básico)'] },
    { k: 'frontend', label: 'Frontend', items: ['JavaScript', 'TypeScript', 'React', 'jQuery', 'Tailwind CSS', 'Bootstrap', 'DataTables'] },
    { k: 'data', label: 'Bases de datos', items: ['MariaDB/MySQL (stored procedures, window functions, transacciones)', 'PostgreSQL', 'Supabase'] },
    { k: 'devops', label: 'DevOps', items: ['Docker', 'GitLab CI/CD', 'Git (GitFlow, worktrees)', 'Linux', 'SSH', 'Vercel', 'Monitoreo (GlitchTip, Uptime Kuma)'] },
    { k: 'quality', label: 'Calidad y testing', items: ['PHPUnit', 'PHPStan', 'PHP_CodeSniffer', 'GrumPHP', 'Playwright'] },
    { k: 'integrations', label: 'Integraciones', items: ['Mercado Pago', 'PagoTIC', 'Facturación electrónica AFIP/ARCA', 'Google APIs'] },
    { k: 'ai', label: 'Desarrollo asistido por IA', items: ['Cursor (agentes de código)', 'Orquestación de asistentes de IA por proyecto', 'GitHub Copilot', 'ChatGPT', 'Gemini', 'Grok'] },
    { k: 'management', label: 'Gestión', items: ['Scrum', 'ClickUp', 'Normas ISO 9001', 'Relevamiento y estimación'] },
  ],
  expTitle: 'experiencia',
  jobs: [
    { hash: 'c3a91f2', ref: 'HEAD -> main', role: 'Tech Lead y Desarrolladora Full Stack', org: 'Whitebox', period: 'Nov 2025 – Actualidad', groups: [
      { label: 'Liderazgo y gestión', items: [
        'Liderazgo de un equipo de 5 desarrolladores que brinda soporte y desarrollo a más de 20 clientes: planificación, asignación y seguimiento de tareas, y revisión de código.',
        'Relevamiento de proyectos, reuniones con clientes actuales y potenciales, y elaboración de propuestas técnicas y presupuestos.',
        'Coordinación de la puesta en marcha de nuevos desarrollos y del pase a los entornos de prueba y producción.',
        'Evaluación, selección e implementación de ClickUp para la gestión del área, y control de documentación, tickets y horas cargadas para las auditorías de calidad ISO 9001.',
        'Gestión del convenio de pasantías con la Universidad Nacional del Comahue: relevamiento de requisitos, articulación con gerencia, entrevistas y selección. Se incorporaron 2 pasantes y 1 pasó a planta permanente.',
        'Entrevistas técnicas para el área, evaluaciones de desempeño y control de horas y horas extra.',
        'Representación de la empresa en eventos del sector (AOG Argentina Oil & Gas Patagonia, Edifica Neuquén y Expo Vocacional, 2026).',
      ] },
      { label: 'Desarrollo', items: [
        'Reimputación histórica de pagos en un sistema de gestión, con scripts SQL de diagnóstico y corrección validados sobre copias de producción.',
        'Correcciones de seguridad en aplicaciones web (prevención de XSS y endurecimiento de la configuración de PHP).',
        'Desarrollo asistido por agentes de IA, con revisión y aprobación propia de cada cambio.',
      ] },
    ] },
    { hash: '7be04d9', ref: 'tag: v2', role: 'Desarrolladora Full Stack', org: 'Whitebox', period: 'Oct 2022 – Nov 2025', groups: [
      { items: [
        'Autora principal del CRM de un colegio profesional con unos 3000 usuarios: cuentas corrientes, interés de cuotas, autogestión de pagos con tarjeta e integraciones con PagoTIC y AFIP.',
        'Desarrollo de módulos de un ERP/CRM: proveedores, tesorería, contabilidad con asientos automáticos y liquidación de haberes.',
        'Introducción de tests automatizados (PHPUnit) en uno de los sistemas principales y desarrollo de gran parte de las suites de tres sistemas, una de ellas con más de 300 tests.',
        'Armado y mantenimiento de pipelines de GitLab CI y entornos Docker, con análisis estático (PHPStan), estándares de código (PHPCS, GrumPHP) y tests end-to-end (Playwright).',
        'Soporte, capacitación y relevamiento con clientes, con metodología Scrum.',
      ] },
    ] },
    { hash: '1f6d2a0', ref: 'tag: v1', role: 'Pasante de Desarrollo', org: 'Instituto de Seguridad Social de Neuquén (ISSN)', period: 'Dic 2021 – Sep 2022', groups: [
      { items: [
        'Desarrollo y mantenimiento de aplicaciones en GeneXus 15.',
        'Mejoras y soporte de la Oficina Virtual en ReactJS, integrada con una API en GeneXus.',
        'Gestión de bases de datos PostgreSQL con pgAdmin.',
      ] },
    ] },
  ] as Job[],
  casesTitle: 'casos destacados',
  cases: [
    { k: 'crm', title: 'CRM de un colegio profesional', body: [
      'Autoría principal de un CRM en producción con unos 3000 usuarios: cuentas corrientes, interés de cuotas, autogestión de pagos con tarjeta e integraciones con PagoTIC y AFIP.',
      'Introducción de tests automatizados con PHPUnit en uno de los sistemas principales.',
    ], tags: ['PHP', 'CodeIgniter', 'MariaDB', 'PagoTIC', 'AFIP', 'PHPUnit'] },
    { k: 'ci', title: 'Calidad y CI/CD', body: [
      'Pipelines de GitLab CI y entornos Docker con análisis estático (PHPStan), estándares de código (PHPCS, GrumPHP) y tests end-to-end (Playwright).',
      'Desarrollo de gran parte de las suites de tests de tres sistemas, una de ellas con más de 300 tests.',
    ], tags: ['GitLab CI', 'Docker', 'PHPStan', 'PHPCS', 'GrumPHP', 'Playwright'] },
    { k: 'lead', title: 'Gestión del área', body: [
      'Equipo de 5 personas con soporte y desarrollo a más de 20 clientes: planificación, seguimiento y revisión de código.',
      'Programa de pasantías con la Universidad Nacional del Comahue (2 pasantes, 1 en planta permanente) e implementación de ClickUp con control de documentación para auditorías ISO 9001.',
    ], tags: ['Scrum', 'ClickUp', 'ISO 9001', 'Code review'] },
    { k: 'ai', title: 'IA aplicada, con revisión', body: [
      'Desarrollo asistido por agentes de IA (Cursor) y orquestación de asistentes por proyecto.',
      'Cada cambio propuesto por la IA pasa por revisión y aprobación propia antes de llegar al repositorio.',
    ], tags: ['Cursor', 'GitHub Copilot', 'ChatGPT', 'Gemini', 'Grok'] },
  ] as Case[],
  projTitle: 'proyectos',
  project: {
    name: 'A Medias',
    desc: 'Aplicación web instalable (PWA) de finanzas compartidas para personas que conviven: reparto de gastos proporcional al sueldo, fondos de ahorro, metas compartidas con gráficos y avisos de vencimientos. Diseño propio, mobile-first y accesible.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase (Auth, PostgreSQL con Row Level Security)', 'Vercel'],
    demo: 'Ver demo',
    repo: 'repositorio privado',
  },
  eduTitle: 'formación',
  edu: [
    ['Lic. en Sistemas de Información (incompleta)', 'Universidad Nacional del Comahue', '2020 – 2024'],
    ['Programación Web Full Stack (318 h)', 'Educación IT, con beca de PAE, Centro PyME-ADENEU y Fundación Pescar', '2021'],
    ['Bachiller en Inglés y Computación', 'Instituto Nuestra Señora de Fátima', '2019'],
  ],
  coursesTitle: 'cursos y eventos',
  courses: [
    ['Phishing Attack Dōjō', 'KnowHow Security Labs (KHSEC)', '2026'],
    ['Patagonia Cybersecurity Day', '', '2026'],
    ['4.º Congreso Patagónico de Ética y Compliance', 'Fundación Potenciar', '2026'],
    ['Herramientas y Competencias para el Mundo del Trabajo', 'Fundación Pescar', '2021'],
  ],
  langsTitle: 'idiomas',
  langs: [
    ['Inglés', 'First Certificate in English (FCE), Cambridge, 2019 (B2)'],
  ],
  contactTitle: 'contacto',
  contactLead: 'Consultas y propuestas por email o LinkedIn.',
  cvEs: 'CV en español',
  cvEn: 'CV en inglés',
  footer: 'Hecho con React, TypeScript y Tailwind CSS · publicado con GitHub Actions.',
}

type Copy = typeof es

const en: Copy = {
  nav: { profile: 'profile', stack: 'stack', experience: 'experience', cases: 'cases', projects: 'projects', education: 'education', contact: 'contact' },
  role: 'Tech Lead & Full Stack Developer',
  tagline: 'Web-based management systems with PHP, CodeIgniter and MariaDB. Technical team leadership, software quality and AI-assisted development.',
  contact: 'Contact',
  cvLabel: 'CV (PDF)',
  profileTitle: 'profile',
  profile: [
    'Tech Lead and Full Stack Developer with nearly 5 years of experience building web-based management systems with PHP (CodeIgniter) and MariaDB. Leads a team of 5 while remaining hands-on in development, managing projects from client requirements gathering through production deployment.',
    'Experienced in payment and electronic invoicing integrations, and solid quality practices (CI/CD, automated testing, ISO 9001 processes), applying AI tools to software development.',
  ],
  facts: [
    ['experience', '~5 years'],
    ['team', '5 people'],
    ['clients', '20+ supported'],
    ['tests', '300+ in one of the suites'],
    ['crm', '~3,000 users'],
    ['interns', '2 (1 hired permanently)'],
  ],
  stackTitle: 'stack',
  stack: [
    { k: 'backend', label: 'Backend', items: ['PHP 8 (CodeIgniter 3 & 4, Shield)', 'Composer', 'Java (basic)'] },
    { k: 'frontend', label: 'Frontend', items: ['JavaScript', 'TypeScript', 'React', 'jQuery', 'Tailwind CSS', 'Bootstrap', 'DataTables'] },
    { k: 'data', label: 'Databases', items: ['MariaDB/MySQL (stored procedures, window functions, transactions)', 'PostgreSQL', 'Supabase'] },
    { k: 'devops', label: 'DevOps', items: ['Docker', 'GitLab CI/CD', 'Git (GitFlow, worktrees)', 'Linux', 'SSH', 'Vercel', 'Monitoring (GlitchTip, Uptime Kuma)'] },
    { k: 'quality', label: 'Quality & Testing', items: ['PHPUnit', 'PHPStan', 'PHP_CodeSniffer', 'GrumPHP', 'Playwright'] },
    { k: 'integrations', label: 'Integrations', items: ['Mercado Pago', 'PagoTIC', 'AFIP/ARCA electronic invoicing', 'Google APIs'] },
    { k: 'ai', label: 'AI-Assisted Development', items: ['Cursor (coding agents)', 'Per-project orchestration of AI assistants', 'GitHub Copilot', 'ChatGPT', 'Gemini', 'Grok'] },
    { k: 'management', label: 'Management', items: ['Scrum', 'ClickUp', 'ISO 9001 standards', 'Requirements gathering and estimation'] },
  ],
  expTitle: 'experience',
  jobs: [
    { hash: 'c3a91f2', ref: 'HEAD -> main', role: 'Tech Lead & Full Stack Developer', org: 'Whitebox', period: 'Nov 2025 – Present', groups: [
      { label: 'Leadership & Management', items: [
        'Leadership of a team of 5 developers providing support and development for 20+ clients: planning, task assignment and tracking, and code review.',
        'Project scoping, meetings with current and prospective clients, and preparation of technical proposals and cost estimates.',
        'Coordination of the rollout of new developments and their deployment to staging and production environments.',
        'Evaluation, selection and implementation of ClickUp for team management; oversight of documentation, tickets and logged hours for ISO 9001 quality audits.',
        'Management of the internship agreement with Universidad Nacional del Comahue: requirements gathering, coordination with management, interviews and selection. 2 interns onboarded, 1 of whom was hired as a permanent employee.',
        'Technical interviews for the team, performance reviews, and tracking of working hours and overtime.',
        'Representation of the company at industry events (AOG Argentina Oil & Gas Patagonia, Edifica Neuquén and Expo Vocacional, 2026).',
      ] },
      { label: 'Engineering', items: [
        'Re-allocation of historical payment records in a management system, using diagnostic and correction SQL scripts validated against production copies.',
        'Security fixes for web applications (XSS prevention and PHP configuration hardening).',
        'AI agent–assisted development, with personal review and approval of every change.',
      ] },
    ] },
    { hash: '7be04d9', ref: 'tag: v2', role: 'Full Stack Developer', org: 'Whitebox', period: 'Oct 2022 – Nov 2025', groups: [
      { items: [
        'Lead author of the CRM for a professional association with about 3,000 users: account ledgers, installment interest, self-service card payments, and PagoTIC and AFIP integrations.',
        'Development of ERP/CRM modules: suppliers, treasury, accounting with automated journal entries, and payroll.',
        'Introduction of automated testing (PHPUnit) into one of the core systems and authorship of a large share of the test suites for three systems, one of them with 300+ tests.',
        'Setup and maintenance of GitLab CI pipelines and Docker environments with static analysis (PHPStan), coding standards (PHPCS, GrumPHP) and end-to-end tests (Playwright).',
        'Client support, training and requirements gathering within a Scrum framework.',
      ] },
    ] },
    { hash: '1f6d2a0', ref: 'tag: v1', role: 'Development Intern', org: 'Instituto de Seguridad Social de Neuquén (ISSN)', period: 'Dec 2021 – Sep 2022', groups: [
      { items: [
        'Development and maintenance of applications in GeneXus 15.',
        'Enhancements and support for the online self-service portal (Oficina Virtual) built in ReactJS and integrated with a GeneXus API.',
        'Management of PostgreSQL databases with pgAdmin.',
      ] },
    ] },
  ],
  casesTitle: 'case studies',
  cases: [
    { k: 'crm', title: 'Professional association CRM', body: [
      'Lead authorship of a production CRM with about 3,000 users: account ledgers, installment interest, self-service card payments, and PagoTIC and AFIP integrations.',
      'Introduction of automated testing with PHPUnit into one of the core systems.',
    ], tags: ['PHP', 'CodeIgniter', 'MariaDB', 'PagoTIC', 'AFIP', 'PHPUnit'] },
    { k: 'ci', title: 'Quality & CI/CD', body: [
      'GitLab CI pipelines and Docker environments with static analysis (PHPStan), coding standards (PHPCS, GrumPHP) and end-to-end tests (Playwright).',
      'Authorship of a large share of the test suites for three systems, one of them with 300+ tests.',
    ], tags: ['GitLab CI', 'Docker', 'PHPStan', 'PHPCS', 'GrumPHP', 'Playwright'] },
    { k: 'lead', title: 'Team management', body: [
      'Team of 5 providing support and development for 20+ clients: planning, tracking and code review.',
      'Internship program with Universidad Nacional del Comahue (2 interns, 1 hired permanently) and a ClickUp rollout with documentation control for ISO 9001 audits.',
    ], tags: ['Scrum', 'ClickUp', 'ISO 9001', 'Code review'] },
    { k: 'ai', title: 'Applied AI, with review', body: [
      'AI agent–assisted development (Cursor) and per-project orchestration of AI assistants.',
      'Every AI-proposed change goes through personal review and approval before reaching the repository.',
    ], tags: ['Cursor', 'GitHub Copilot', 'ChatGPT', 'Gemini', 'Grok'] },
  ],
  projTitle: 'projects',
  project: {
    name: 'A Medias',
    desc: "Installable web app (PWA) for shared finances among people who live together: expense splitting proportional to each person's salary, savings funds, shared goals with charts, and due-date reminders. Own design; mobile-first and accessible.",
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase (Auth, PostgreSQL with Row Level Security)', 'Vercel'],
    demo: 'View demo',
    repo: 'private repository',
  },
  eduTitle: 'education',
  edu: [
    ['Information Systems (B.Sc. program, coursework completed through 3rd year, not finished)', 'Universidad Nacional del Comahue', '2020 – 2024'],
    ['Full Stack Web Programming (318 hours)', 'Educación IT, scholarship from PAE, Centro PyME-ADENEU and Fundación Pescar', '2021'],
    ['High School Diploma in English and Computing', 'Instituto Nuestra Señora de Fátima', '2019'],
  ],
  coursesTitle: 'courses & events',
  courses: [
    ['Phishing Attack Dōjō', 'KnowHow Security Labs (KHSEC)', '2026'],
    ['Patagonia Cybersecurity Day', '', '2026'],
    ['4th Patagonian Congress on Ethics and Compliance', 'Fundación Potenciar', '2026'],
    ['Workplace Tools and Skills (Herramientas y Competencias para el Mundo del Trabajo)', 'Fundación Pescar', '2021'],
  ],
  langsTitle: 'languages',
  langs: [
    ['Spanish', 'Native'],
    ['English', 'Cambridge First Certificate (FCE), 2019 (B2)'],
  ],
  contactTitle: 'contact',
  contactLead: 'Inquiries and proposals via email or LinkedIn.',
  cvEs: 'CV in Spanish',
  cvEn: 'CV in English',
  footer: 'Built with React, TypeScript and Tailwind CSS · deployed with GitHub Actions.',
}

export const T: Record<Lang, Copy> = { es, en }
