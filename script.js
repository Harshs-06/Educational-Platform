
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const form = document.getElementById('student-form');
  const formSteps = document.querySelectorAll('.form-step');
  const progressBar = document.getElementById('progress');
  const progressSteps = document.querySelectorAll('.progress-step');
  const nextButtons = document.querySelectorAll('.btn-next');
  const prevButtons = document.querySelectorAll('.btn-prev');
  const fieldCards = document.querySelectorAll('.field-card');
  const fieldNextBtn = document.getElementById('field-next');
  const subfieldsContainer = document.getElementById('subfields-container');
  const selectedFieldName = document.getElementById('selected-field-name');
  const showRoadmapBtn = document.getElementById('show-roadmap');
  const roadmapContainer = document.getElementById('roadmap-container');
  const roadmapContent = document.getElementById('roadmap-content');
  const formContainer = document.querySelector('.form-container');
  const roadmapDescription = document.getElementById('roadmap-description');
  const resetFormBtn = document.getElementById('reset-form');
  const downloadBtn = document.getElementById('download-roadmap');

  // Current step and form data
  let currentStep = 1;
  let selectedField = null;
  let selectedSubfield = null;
  let formData = {};

  // Education fields and subfields data
  const educationFields = {
    'computer-science': {
      name: 'Computer Science',
      subfields: [
        {
          id: 'web-development',
          name: 'Web Development',
          description: 'Build websites and web applications',
          roadmap: [
            {
              stage: 'Beginner',
              title: 'Web Fundamentals',
              description: 'Learn the building blocks of web development',
              items: [
                'HTML5 - Structure and semantics',
                'CSS3 - Styling and layouts',
                'JavaScript basics - Variables, functions, and control flow',
                'Responsive design principles',
                'Basic version control with Git'
              ],
              resources: [
                'MDN Web Docs',
                'freeCodeCamp Web Development Course',
                'The Odin Project',
                'CSS Tricks',
                'JavaScript.info'
              ]
            },
            {
              stage: 'Intermediate',
              title: 'Frontend Development',
              description: 'Create interactive and dynamic user interfaces',
              items: [
                'JavaScript ES6+ features',
                'DOM manipulation',
                'Frontend frameworks (React, Vue, or Angular)',
                'State management',
                'API integration',
                'CSS frameworks and preprocessors'
              ],
              resources: [
                'React Documentation',
                'Vue.js Guide',
                'Frontend Masters',
                'Udemy Courses',
                'JavaScript30 Challenge'
              ]
            },
            {
              stage: 'Advanced',
              title: 'Full-Stack Development',
              description: 'Connect front and back end systems',
              items: [
                'Backend technologies (Node.js, Python, Ruby)',
                'Databases (SQL and NoSQL)',
                'Authentication and Authorization',
                'RESTful API design',
                'Deployment and DevOps basics',
                'Performance optimization'
              ],
              resources: [
                'Node.js Documentation',
                'MongoDB University',
                'AWS Documentation',
                'Full Stack Open',
                'The Complete Node.js Developer Course'
              ]
            },
            {
              stage: 'Expert',
              title: 'Specialized Skills',
              description: 'Master advanced concepts',
              items: [
                'Progressive Web Apps (PWAs)',
                'Server-Side Rendering (SSR)',
                'GraphQL',
                'WebSockets and real-time applications',
                'Microservices architecture',
                'Containerization with Docker'
              ],
              resources: [
                'Web.dev by Google',
                'GraphQL Documentation',
                'Docker Documentation',
                'Next.js Documentation',
                'System Design Primer'
              ]
            }
          ]
        },
        {
          id: 'data-science',
          name: 'Data Science',
          description: 'Analyze and interpret complex data',
          roadmap: [
            {
              stage: 'Beginner',
              title: 'Data Science Fundamentals',
              description: 'Build a foundation in data analysis',
              items: [
                'Python programming basics',
                'Data structures and algorithms',
                'Statistics fundamentals',
                'Data manipulation with Pandas',
                'Data visualization with Matplotlib/Seaborn'
              ],
              resources: [
                'Python for Data Science Handbook',
                'Khan Academy - Statistics and Probability',
                'DataCamp Courses',
                'Kaggle Learn',
                'Python Data Science Handbook'
              ]
            },
            {
              stage: 'Intermediate',
              title: 'Machine Learning Basics',
              description: 'Learn foundational ML concepts and techniques',
              items: [
                'Supervised learning algorithms',
                'Unsupervised learning algorithms',
                'Model evaluation and validation',
                'Feature engineering',
                'Introduction to deep learning'
              ],
              resources: [
                'Andrew Ng\'s Machine Learning Course',
                'Scikit-learn Documentation',
                'Elements of Statistical Learning',
                'Fast.ai Practical Deep Learning',
                'Machine Learning Crash Course by Google'
              ]
            },
            {
              stage: 'Advanced',
              title: 'Applied Data Science',
              description: 'Build advanced models and pipelines',
              items: [
                'Deep learning frameworks (TensorFlow, PyTorch)',
                'Natural Language Processing',
                'Computer Vision',
                'Time Series Analysis',
                'MLOps basics and model deployment'
              ],
              resources: [
                'Deep Learning by Ian Goodfellow',
                'TensorFlow Documentation',
                'PyTorch Tutorials',
                'Hugging Face Documentation',
                'MLOps Specialization on Coursera'
              ]
            },
            {
              stage: 'Expert',
              title: 'Data Science Mastery',
              description: 'Work with complex and specialized applications',
              items: [
                'Reinforcement learning',
                'Generative models and GANs',
                'Advanced MLOps and model monitoring',
                'Big data technologies (Spark, Hadoop)',
                'Research methods and paper implementation'
              ],
              resources: [
                'Reinforcement Learning: An Introduction',
                'Papers with Code',
                'Spark Documentation',
                'NVIDIA Deep Learning Institute',
                'ArXiv Research Papers'
              ]
            }
          ]
        },
        {
          id: 'cybersecurity',
          name: 'Cybersecurity',
          description: 'Protect systems from digital attacks',
          roadmap: [
            {
              stage: 'Beginner',
              title: 'Security Fundamentals',
              description: 'Learn the basics of cybersecurity',
              items: [
                'Computer networking fundamentals',
                'Operating system security basics',
                'Security principles and concepts',
                'Introduction to cryptography',
                'Basic threat identification'
              ],
              resources: [
                'CompTIA Security+ Certification Materials',
                'Cybrary Free Courses',
                'Professor Messer\'s Security+ Videos',
                'OWASP Top 10',
                'HackerSploit YouTube Channel'
              ]
            },
            {
              stage: 'Intermediate',
              title: 'Security Operations',
              description: 'Develop defensive security skills',
              items: [
                'Network security monitoring',
                'Incident response fundamentals',
                'Vulnerability assessment',
                'Security information and event management (SIEM)',
                'Firewall and IDS/IPS configuration'
              ],
              resources: [
                'Blue Team Field Manual',
                'SANS Courses',
                'Practical Malware Analysis',
                'Splunk Training',
                'Certified Ethical Hacker Materials'
              ]
            },
            {
              stage: 'Advanced',
              title: 'Offensive Security',
              description: 'Learn ethical hacking and penetration testing',
              items: [
                'Penetration testing methodologies',
                'Web application security',
                'Exploit development basics',
                'Social engineering techniques',
                'Wireless network security'
              ],
              resources: [
                'OSCP Preparation Materials',
                'HackTheBox',
                'TryHackMe',
                'Web Application Hacker\'s Handbook',
                'Metasploit Unleashed'
              ]
            },
            {
              stage: 'Expert',
              title: 'Security Specialization',
              description: 'Master advanced security domains',
              items: [
                'Advanced malware analysis',
                'Digital forensics',
                'Cloud security',
                'Security architecture and engineering',
                'Security research and zero-day discoveries'
              ],
              resources: [
                'SANS Advanced Courses',
                'BlackHat Conference Presentations',
                'DEF CON Talks',
                'Cloud Security Alliance Materials',
                'Advanced Penetration Testing by Wil Allsopp'
              ]
            }
          ]
        }
      ]
    },
    'business': {
      name: 'Business',
      subfields: [
        {
          id: 'marketing',
          name: 'Marketing',
          description: 'Promote products and services',
          roadmap: [
            {
              stage: 'Beginner',
              title: 'Marketing Fundamentals',
              description: 'Learn the basics of marketing',
              items: [
                'Marketing principles and concepts',
                'Target audience identification',
                'Market research basics',
                'Brand positioning',
                'Marketing mix (4Ps)'
              ],
              resources: [
                'HubSpot Academy Free Courses',
                'Google Digital Garage',
                'Principles of Marketing (Kotler)',
                'Marketing Made Simple',
                'Seth Godin\'s Blog'
              ]
            },
            {
              stage: 'Intermediate',
              title: 'Digital Marketing',
              description: 'Master online marketing channels',
              items: [
                'Content marketing strategy',
                'Search engine optimization (SEO)',
                'Social media marketing',
                'Email marketing campaigns',
                'Pay-per-click advertising',
                'Analytics and reporting'
              ],
              resources: [
                'Google Analytics Academy',
                'Moz SEO Learning Center',
                'Content Marketing Institute',
                'Facebook Blueprint',
                'SEMrush Academy'
              ]
            },
            {
              stage: 'Advanced',
              title: 'Strategic Marketing',
              description: 'Develop comprehensive marketing strategies',
              items: [
                'Marketing automation',
                'Conversion rate optimization',
                'Customer relationship management',
                'Marketing analytics and attribution',
                'Integrated marketing communications'
              ],
              resources: [
                'HubSpot Inbound Marketing Certification',
                'CXL Institute Courses',
                'Marketing Strategy (Harvard Business School)',
                'Growth Hackers Community',
                'Think with Google'
              ]
            },
            {
              stage: 'Expert',
              title: 'Marketing Leadership',
              description: 'Lead marketing initiatives and teams',
              items: [
                'Marketing strategy and planning',
                'Brand management',
                'Marketing innovation',
                'Marketing technology stack management',
                'Cross-functional leadership',
                'Marketing ROI and business impact'
              ],
              resources: [
                'Harvard Business Review Articles',
                'CMO Survey Reports',
                'Marketing Profs',
                'Advanced Marketing Management Courses',
                'Chief Marketing Officer Council Resources'
              ]
            }
          ]
        },
        {
          id: 'finance',
          name: 'Finance',
          description: 'Manage money and investments',
          roadmap: [
            {
              stage: 'Beginner',
              title: 'Finance Fundamentals',
              description: 'Learn the basics of finance',
              items: [
                'Accounting principles',
                'Financial statements analysis',
                'Time value of money',
                'Basic investment concepts',
                'Personal financial planning'
              ],
              resources: [
                'Khan Academy Finance Courses',
                'Corporate Finance Institute Courses',
                'Investopedia Academy',
                'Financial Accounting (Harvard Business School)',
                'The Intelligent Investor (Benjamin Graham)'
              ]
            },
            {
              stage: 'Intermediate',
              title: 'Financial Analysis',
              description: 'Develop analytical finance skills',
              items: [
                'Corporate finance',
                'Financial modeling',
                'Valuation methods',
                'Capital markets',
                'Portfolio management',
                'Risk assessment'
              ],
              resources: [
                'Wall Street Prep',
                'Financial Modeling Course (NYU Stern)',
                'CFA Level 1 Materials',
                'Bloomberg Market Concepts',
                'Financial Times'
              ]
            },
            {
              stage: 'Advanced',
              title: 'Investment Management',
              description: 'Master investment strategies and portfolio management',
              items: [
                'Advanced valuation techniques',
                'Derivatives and options',
                'Alternative investments',
                'Portfolio optimization',
                'Macroeconomic analysis',
                'Fixed income securities'
              ],
              resources: [
                'CFA Level 2 and 3 Materials',
                'Investment Banking (Joshua Rosenbaum)',
                'Options, Futures, and Other Derivatives (Hull)',
                'Investment Valuation (Damodaran)',
                'MIT OpenCourseWare Finance Courses'
              ]
            },
            {
              stage: 'Expert',
              title: 'Financial Leadership',
              description: 'Lead financial strategy and operations',
              items: [
                'Strategic financial management',
                'Mergers and acquisitions',
                'Corporate restructuring',
                'Financial risk management',
                'International finance',
                'Capital raising strategies'
              ],
              resources: [
                'Harvard Business School Case Studies',
                'McKinsey & Company Financial Insights',
                'Journal of Finance',
                'Advanced Corporate Finance Courses',
                'CFO Magazine'
              ]
            }
          ]
        },
        {
          id: 'entrepreneurship',
          name: 'Entrepreneurship',
          description: 'Start and grow businesses',
          roadmap: [
            {
              stage: 'Beginner',
              title: 'Entrepreneurship Fundamentals',
              description: 'Learn the basics of starting a business',
              items: [
                'Ideation and opportunity recognition',
                'Business model basics',
                'Market research and validation',
                'Customer discovery',
                'Basic business planning'
              ],
              resources: [
                'Y Combinator Startup School',
                'How to Start a Startup (Sam Altman)',
                'The Lean Startup (Eric Ries)',
                'Business Model Generation',
                'Entrepreneur\'s Handbook'
              ]
            },
            {
              stage: 'Intermediate',
              title: 'Business Development',
              description: 'Build and grow a sustainable business',
              items: [
                'Product-market fit',
                'Go-to-market strategy',
                'Startup financial modeling',
                'Funding options and strategies',
                'Team building and management',
                'Legal and IP fundamentals'
              ],
              resources: [
                'Sequoia Capital Articles',
                'Andreessen Horowitz Blog',
                'Zero to One (Peter Thiel)',
                'Startup Grind',
                'Venture Deals (Brad Feld)'
              ]
            },
            {
              stage: 'Advanced',
              title: 'Growth and Scaling',
              description: 'Scale your business effectively',
              items: [
                'Growth hacking strategies',
                'Customer acquisition channels',
                'Unit economics optimization',
                'Operational scaling',
                'Strategic partnerships',
                'Advanced fundraising'
              ],
              resources: [
                'Masters of Scale Podcast',
                'Blitzscaling',
                'The Hard Thing About Hard Things',
                'Growth Hackers Conference',
                'First Round Review'
              ]
            },
            {
              stage: 'Expert',
              title: 'Entrepreneurial Leadership',
              description: 'Lead organizations and create lasting impact',
              items: [
                'Strategic vision development',
                'Company culture and values',
                'Exit strategies',
                'Advanced financing rounds',
                'Board management',
                'Entrepreneurial ecosystem building'
              ],
              resources: [
                'Stanford GSB Entrepreneurship Courses',
                'Harvard Business Review Entrepreneurship',
                'Founder\'s Dilemmas (Noam Wasserman)',
                'Reid Hoffman\'s Essays',
                'Startup Genome Reports'
              ]
            }
          ]
        }
      ]
    },
    'engineering': {
      name: 'Engineering',
      subfields: [
        {
          id: 'mechanical-engineering',
          name: 'Mechanical Engineering',
          description: 'Design and build mechanical systems',
          roadmap: [
            {
              stage: 'Beginner',
              title: 'Mechanical Engineering Fundamentals',
              description: 'Learn the basics of mechanical engineering',
              items: [
                'Engineering mathematics',
                'Statics and dynamics',
                'Materials science basics',
                'Engineering drawing and CAD',
                'Thermodynamics fundamentals'
              ],
              resources: [
                'MIT OpenCourseWare - Engineering Mechanics',
                'Khan Academy Physics',
                'Fundamentals of Engineering Exam Review',
                'Engineering Drawing for Beginners',
                'SolidWorks Tutorials'
              ]
            },
            {
              stage: 'Intermediate',
              title: 'Applied Mechanical Engineering',
              description: 'Develop practical engineering skills',
              items: [
                'Machine design',
                'Fluid mechanics',
                'Heat transfer',
                'Manufacturing processes',
                'Mechanical systems and control',
                'Finite Element Analysis (FEA) basics'
              ],
              resources: [
                'Shigley\'s Mechanical Engineering Design',
                'ASME Learning & Development',
                'Machine Design Magazine',
                'Autodesk Certification Courses',
                'Engineering Toolbox'
              ]
            },
            {
              stage: 'Advanced',
              title: 'Specialized Mechanical Engineering',
              description: 'Master specialized mechanical domains',
              items: [
                'Advanced CAD/CAM/CAE',
                'Mechatronics and robotics',
                'Computational fluid dynamics',
                'Advanced materials and composites',
                'Vibrations and acoustics',
                'Product development methodologies'
              ],
              resources: [
                'Professional Engineering (PE) Exam Resources',
                'ANSYS Learning Hub',
                'SAE International Resources',
                'Advanced Dynamics (Cambridge)',
                'Robotics: Modelling, Planning and Control'
              ]
            },
            {
              stage: 'Expert',
              title: 'Mechanical Engineering Leadership',
              description: 'Lead engineering projects and teams',
              items: [
                'Systems engineering',
                'Engineering project management',
                'Design for manufacturing and assembly',
                'Engineering economics',
                'Sustainable engineering',
                'Mechanical innovations and research'
              ],
              resources: [
                'NASA Systems Engineering Handbook',
                'Project Management Institute Courses',
                'INCOSE Systems Engineering Handbook',
                'Advanced Engineering Mathematics',
                'Engineering Management Journal'
              ]
            }
          ]
        },
        {
          id: 'electrical-engineering',
          name: 'Electrical Engineering',
          description: 'Work with electrical systems and power',
          roadmap: [
            {
              stage: 'Beginner',
              title: 'Electrical Engineering Fundamentals',
              description: 'Learn the basics of electrical engineering',
              items: [
                'Circuit analysis',
                'Digital logic',
                'Electricity and magnetism',
                'Basic electronics',
                'Programming for EE (C/C++)'
              ],
              resources: [
                'All About Circuits',
                'MIT OpenCourseWare - Circuits and Electronics',
                'Khan Academy - Electrical Engineering',
                'The Art of Electronics',
                'Digital Design (Morris Mano)'
              ]
            },
            {
              stage: 'Intermediate',
              title: 'Applied Electrical Engineering',
              description: 'Develop practical electrical engineering skills',
              items: [
                'Analog electronics',
                'Digital signal processing',
                'Microcontrollers and embedded systems',
                'Power systems and machines',
                'PCB design and fabrication',
                'Control systems'
              ],
              resources: [
                'Microelectronic Circuits (Sedra/Smith)',
                'IEEE Xplore Digital Library',
                'Arduino and Raspberry Pi Tutorials',
                'TI Resource Center',
                'Control Systems Engineering (Nise)'
              ]
            },
            {
              stage: 'Advanced',
              title: 'Specialized Electrical Engineering',
              description: 'Master specialized electrical domains',
              items: [
                'RF engineering and communications',
                'FPGA design and HDL',
                'Power electronics',
                'Integrated circuit design',
                'Advanced control systems',
                'Mechatronics and robotics'
              ],
              resources: [
                'RF Circuit Design',
                'FPGA Prototyping by VHDL Examples',
                'Power Electronics (Mohan)',
                'CMOS VLSI Design',
                'Modern Control Engineering (Ogata)'
              ]
            },
            {
              stage: 'Expert',
              title: 'Electrical Engineering Leadership',
              description: 'Lead electrical engineering projects and research',
              items: [
                'System-on-chip design',
                'Advanced communication systems',
                'Smart grid technologies',
                'Renewable energy systems',
                'Engineering management',
                'Research and innovation'
              ],
              resources: [
                'IEEE Spectrum',
                'Professional Engineer (PE) Exam Resources',
                'Advanced Engineering Mathematics',
                'Systems Engineering Principles',
                'Electrical Engineering Journal'
              ]
            }
          ]
        },
        {
          id: 'civil-engineering',
          name: 'Civil Engineering',
          description: 'Design and build infrastructure',
          roadmap: [
            {
              stage: 'Beginner',
              title: 'Civil Engineering Fundamentals',
              description: 'Learn the basics of civil engineering',
              items: [
                'Engineering mathematics',
                'Statics and dynamics',
                'Strength of materials',
                'Surveying basics',
                'Construction materials',
                'Civil engineering drawing'
              ],
              resources: [
                'MIT OpenCourseWare - Civil Engineering',
                'Statics and Mechanics of Materials',
                'Civil Engineering Handbook',
                'AutoCAD Civil 3D Tutorials',
                'Surveying: Principles and Applications'
              ]
            },
            {
              stage: 'Intermediate',
              title: 'Applied Civil Engineering',
              description: 'Develop practical civil engineering skills',
              items: [
                'Structural analysis',
                'Soil mechanics and foundation engineering',
                'Hydraulics and hydrology',
                'Transportation engineering',
                'Construction management',
                'Environmental engineering basics'
              ],
              resources: [
                'Structural Analysis (Hibbeler)',
                'Soil Mechanics and Foundations',
                'Open Channel Hydraulics',
                'Highway Engineering Handbook',
                'Construction Management Fundamentals'
              ]
            },
            {
              stage: 'Advanced',
              title: 'Specialized Civil Engineering',
              description: 'Master specialized civil engineering domains',
              items: [
                'Advanced structural design',
                'Geotechnical engineering',
                'Water resources engineering',
                'Urban planning and infrastructure',
                'Advanced transportation systems',
                'Sustainable construction practices'
              ],
              resources: [
                'Reinforced Concrete Design',
                'Foundation Engineering Handbook',
                'Water Resources Engineering',
                'Urban Transportation Planning',
                'LEED Certification Resources'
              ]
            },
            {
              stage: 'Expert',
              title: 'Civil Engineering Leadership',
              description: 'Lead civil engineering projects and innovations',
              items: [
                'Infrastructure systems engineering',
                'Project management for large-scale projects',
                'Advanced structural dynamics and earthquake engineering',
                'Smart cities and infrastructure',
                'Civil engineering research and innovation',
                'Engineering ethics and leadership'
              ],
              resources: [
                'Professional Engineer (PE) Exam Resources',
                'American Society of Civil Engineers (ASCE)',
                'Project Management for Construction',
                'Smart Infrastructure and Construction Journal',
                'Engineering Leadership Development'
              ]
            }
          ]
        }
      ]
    },
    'design': {
      name: 'Design',
      subfields: [
        {
          id: 'ui-ux-design',
          name: 'UI/UX Design',
          description: 'Create user-centered digital experiences',
          roadmap: [
            {
              stage: 'Beginner',
              title: 'UI/UX Fundamentals',
              description: 'Learn the basics of user interface and experience design',
              items: [
                'Design principles and theory',
                'Color theory and typography',
                'User-centered design process',
                'Visual hierarchy and layout',
                'Basic UI elements and patterns'
              ],
              resources: [
                'The Design of Everyday Things (Don Norman)',
                'Refactoring UI',
                'UX Design Institute Fundamentals',
                'Google Material Design Guidelines',
                'Laws of UX'
              ]
            },
            {
              stage: 'Intermediate',
              title: 'UI/UX Practice',
              description: 'Develop practical design skills',
              items: [
                'User research and personas',
                'Wireframing and prototyping',
                'Information architecture',
                'Interaction design patterns',
                'Design systems',
                'Figma/Sketch/Adobe XD proficiency'
              ],
              resources: [
                'Figma Tutorials',
                'Nielsen Norman Group Articles',
                'Interaction Design Foundation Courses',
                'A Book Apart Series',
                'UX Collective Articles'
              ]
            },
            {
              stage: 'Advanced',
              title: 'Specialized UI/UX Design',
              description: 'Master specialized design domains',
              items: [
                'Advanced usability testing',
                'Motion design and microinteractions',
                'Accessibility and inclusive design',
                'Design strategy and metrics',
                'Mobile and responsive design',
                'Complex application design'
              ],
              resources: [
                'Measuring UX and ROI',
                'Microinteractions (Dan Saffer)',
                'Designing for Accessibility',
                'DesignOps Handbook',
                'About Face: The Essentials of Interaction Design'
              ]
            },
            {
              stage: 'Expert',
              title: 'UI/UX Leadership',
              description: 'Lead design teams and strategy',
              items: [
                'UX leadership and team management',
                'Service design and experience strategy',
                'Design thinking facilitation',
                'Emerging technologies (AR/VR, voice UI)',
                'Design ethics and futures',
                'Cross-functional collaboration'
              ],
              resources: [
                'Harvard Business Review Design Thinking',
                'Leading Innovation and Design',
                'This is Service Design Doing',
                'Futures Thinking for Designers',
                'Building Design Systems'
              ]
            }
          ]
        },
        {
          id: 'graphic-design',
          name: 'Graphic Design',
          description: 'Create visual content to communicate messages',
          roadmap: [
            {
              stage: 'Beginner',
              title: 'Graphic Design Fundamentals',
              description: 'Learn the basics of visual design',
              items: [
                'Design principles and elements',
                'Color theory and application',
                'Typography fundamentals',
                'Composition and layout',
                'Adobe Creative Suite basics (Photoshop, Illustrator, InDesign)'
              ],
              resources: [
                'Thinking with Type',
                'Graphic Design: The New Basics',
                'Adobe Creative Suite Tutorials',
                'Behance Creative Courses',
                'Canva Design School'
              ]
            },
            {
              stage: 'Intermediate',
              title: 'Applied Graphic Design',
              description: 'Develop practical graphic design skills',
              items: [
                'Brand identity design',
                'Print and digital media design',
                'Visual storytelling',
                'Advertising design',
                'Information design',
                'Portfolio development'
              ],
              resources: [
                'Logo Design Love',
                'The Non-Designer\'s Design Book',
                'Professional Magazines (Communication Arts, Print)',
                'Design Matters Podcast',
                'Adobe Design Systems'
              ]
            },
            {
              stage: 'Advanced',
              title: 'Specialized Graphic Design',
              description: 'Master specialized graphic design domains',
              items: [
                'Advanced typography',
                'Motion graphics',
                'Packaging design',
                'Editorial design',
                'Environmental graphics',
                'Design strategy'
              ],
              resources: [
                'Grid Systems in Graphic Design',
                'After Effects Tutorials',
                'The Packaging Designer\'s Book of Patterns',
                'Editorial Design',
                'Society for Environmental Graphic Design'
              ]
            },
            {
              stage: 'Expert',
              title: 'Graphic Design Leadership',
              description: 'Lead design projects and teams',
              items: [
                'Creative direction',
                'Design management',
                'Cross-media branding',
                'Emerging technologies in design',
                'Design education and mentorship',
                'Design entrepreneurship'
              ],
              resources: [
                'Creative Leadership',
                'Design Management Institute',
                'AIGA Professional Practices',
                'Business of Design',
                'How to Think Like a Great Graphic Designer'
              ]
            }
          ]
        },
        {
          id: 'product-design',
          name: 'Product Design',
          description: 'Design physical and digital products',
          roadmap: [
            {
              stage: 'Beginner',
              title: 'Product Design Fundamentals',
              description: 'Learn the basics of product design',
              items: [
                'Design thinking process',
                'Sketching and ideation',
                'Basic prototyping',
                'User-centered design principles',
                'Design research methods'
              ],
              resources: [
                'The Design of Everyday Things',
                'Sketching User Experiences',
                'Sprint: How to Solve Problems',
                'Universal Principles of Design',
                'Product Design for the Web'
              ]
            },
            {
              stage: 'Intermediate',
              title: 'Applied Product Design',
              description: 'Develop practical product design skills',
              items: [
                'User research and usability testing',
                'Digital and physical prototyping',
                'Product strategy',
                'Material and manufacturing processes',
                'CAD and 3D modeling',
                'Design systems for products'
              ],
              resources: [
                'Designing Products People Love',
                'Making Things Talk',
                'User Research Methods',
                'Fusion 360 Tutorials',
                'Design Sprint Master Class'
              ]
            },
            {
              stage: 'Advanced',
              title: 'Specialized Product Design',
              description: 'Master specialized product design domains',
              items: [
                'Design for manufacturing (DFM)',
                'Service design for products',
                'Sustainable product design',
                'IoT and connected products',
                'Product design strategy',
                'Design for emerging technologies'
              ],
              resources: [
                'Product Design and Development',
                'Cradle to Cradle',
                'Designing Connected Products',
                'Service Design: From Insight to Implementation',
                'Emotional Design'
              ]
            },
            {
              stage: 'Expert',
              title: 'Product Design Leadership',
              description: 'Lead product design teams and strategy',
              items: [
                'Product innovation and vision',
                'Design team leadership',
                'Product lifecycle management',
                'Strategic design planning',
                'Design ethics and responsibility',
                'Balancing business and user needs'
              ],
              resources: [
                'The Design of Business',
                'Creative Confidence',
                'Change by Design',
                'Product Leadership',
                'Articulating Design Decisions'
              ]
            }
          ]
        }
      ]
    },
    'medicine': {
      name: 'Medicine',
      subfields: [
        {
          id: 'medicine-clinical',
          name: 'Clinical Medicine',
          description: 'Diagnose and treat patients',
          roadmap: [
            {
              stage: 'Beginner',
              title: 'Pre-Medicine',
              description: 'Build a foundation for medical studies',
              items: [
                'Biology and human physiology',
                'General and organic chemistry',
                'Physics and mathematics',
                'Biochemistry',
                'Psychology and social sciences',
                'Research methods and statistics'
              ],
              resources: [
                'Khan Academy MCAT Prep',
                'Human Physiology: An Integrated Approach',
                'Principles of Biochemistry',
                'Pre-Med Hub',
                'AAMC Resources for Pre-Med Students'
              ]
            },
            {
              stage: 'Intermediate',
              title: 'Medical School (Years 1-2)',
              description: 'Master medical sciences and principles',
              items: [
                'Anatomy and histology',
                'Pathophysiology',
                'Pharmacology',
                'Microbiology and immunology',
                'Medical genetics',
                'Introduction to clinical medicine'
              ],
              resources: [
                'First Aid for the USMLE Step 1',
                'Netter\'s Atlas of Human Anatomy',
                'Pathoma',
                'Sketchy Medical',
                'Boards and Beyond'
              ]
            },
            {
              stage: 'Advanced',
              title: 'Medical School (Years 3-4)',
              description: 'Apply medical knowledge in clinical settings',
              items: [
                'Clinical rotations (internal medicine, surgery, pediatrics, etc.)',
                'Physical examination and diagnosis',
                'Evidence-based medicine',
                'Clinical decision making',
                'Medical ethics and professionalism',
                'Preparation for residency'
              ],
              resources: [
                'Case Files Series',
                'Step 2 Resources',
                'UpToDate',
                'New England Journal of Medicine',
                'JAMA (Journal of the American Medical Association)'
              ]
            },
            {
              stage: 'Expert',
              title: 'Residency and Beyond',
              description: 'Specialize in medical practice',
              items: [
                'Specialty training (3-7 years)',
                'Advanced clinical skills',
                'Practice management',
                'Quality improvement',
                'Teaching and research',
                'Continuing medical education'
              ],
              resources: [
                'Specialty-specific textbooks and journals',
                'Medical society memberships',
                'Fellowship training resources',
                'Board certification materials',
                'Continuing Medical Education (CME) courses'
              ]
            }
          ]
        },
        {
          id: 'nursing',
          name: 'Nursing',
          description: 'Provide holistic patient care',
          roadmap: [
            {
              stage: 'Beginner',
              title: 'Pre-Nursing',
              description: 'Build a foundation for nursing studies',
              items: [
                'Anatomy and physiology',
                'Microbiology',
                'Chemistry and nutrition',
                'Psychology and human development',
                'Communication skills',
                'Medical terminology'
              ],
              resources: [
                'Khan Academy Healthcare Courses',
                'Anatomy and Physiology for Dummies',
                'Crash Course Nursing Fundamentals',
                'ATI TEAS Study Resources',
                'NurseHub Beginner Resources'
              ]
            },
            {
              stage: 'Intermediate',
              title: 'Nursing Education',
              description: 'Master nursing sciences and clinical skills',
              items: [
                'Nursing fundamentals',
                'Pharmacology for nurses',
                'Health assessment',
                'Medical-surgical nursing',
                'Mental health nursing',
                'Maternal and child health nursing',
                'Clinical rotations'
              ],
              resources: [
                'Fundamentals of Nursing (Potter and Perry)',
                'Saunders Comprehensive Review for NCLEX',
                'Davis\'s Drug Guide for Nurses',
                'Nursing.com',
                'Nurse Labs'
              ]
            },
            {
              stage: 'Advanced',
              title: 'Professional Nursing',
              description: 'Apply nursing expertise in practice settings',
              items: [
                'Specialized clinical practice',
                'Nursing leadership and management',
                'Evidence-based practice',
                'Quality and safety initiatives',
                'Interprofessional collaboration',
                'Nursing ethics and advocacy'
              ],
              resources: [
                'American Nurses Association Resources',
                'Journal of Nursing Administration',
                'Quality and Safety Education for Nurses',
                'Institute for Healthcare Improvement',
                'Specialty Nursing Certification Resources'
              ]
            },
            {
              stage: 'Expert',
              title: 'Advanced Practice Nursing',
              description: 'Specialize and lead in nursing',
              items: [
                'Advanced practice roles (NP, CNS, CRNA, CNM)',
                'Doctoral education (DNP or PhD)',
                'Healthcare policy and advocacy',
                'Nursing research',
                'Education and mentorship',
                'Healthcare innovation'
              ],
              resources: [
                'Advanced Practice Nursing Journals',
                'Barkley\'s Advanced Assessment',
                'American Association of Nurse Practitioners',
                'Nursing Research Journal',
                'Healthcare Leadership Alliance'
              ]
            }
          ]
        },
        {
          id: 'public-health',
          name: 'Public Health',
          description: 'Promote health and prevent disease in communities',
          roadmap: [
            {
              stage: 'Beginner',
              title: 'Public Health Fundamentals',
              description: 'Learn the basics of public health',
              items: [
                'Introduction to public health',
                'Epidemiology basics',
                'Biostatistics',
                'Environmental health sciences',
                'Social and behavioral health',
                'Global health principles'
              ],
              resources: [
                'CDC Learning Connection',
                'Introduction to Public Health (Schneider)',
                'Epidemiology: Beyond the Basics',
                'Khan Academy Statistics',
                'WHO Training Courses'
              ]
            },
            {
              stage: 'Intermediate',
              title: 'Applied Public Health',
              description: 'Develop practical public health skills',
              items: [
                'Research methods in public health',
                'Program planning and evaluation',
                'Health policy and management',
                'Health communication',
                'Community health assessment',
                'Applied epidemiology'
              ],
              resources: [
                'Essentials of Public Health (Turnock)',
                'Planning, Implementing, and Evaluating Health Promotion Programs',
                'Health Policy Analysis: An Interdisciplinary Approach',
                'SOPHE Health Education Resources',
                'Coursera Public Health Specializations'
              ]
            },
            {
              stage: 'Advanced',
              title: 'Specialized Public Health',
              description: 'Master specialized public health domains',
              items: [
                'Advanced epidemiologic methods',
                'Public health leadership',
                'Health systems and policy analysis',
                'Disease prevention strategies',
                'Emergency preparedness and response',
                'Global health interventions'
              ],
              resources: [
                'Modern Epidemiology (Rothman)',
                'Leadership in Public Health Practice',
                'Annual Review of Public Health',
                'Institute of Medicine Reports',
                'Global Health: Diseases, Programs, Systems and Policies'
              ]
            },
            {
              stage: 'Expert',
              title: 'Public Health Leadership',
              description: 'Lead public health initiatives and policy',
              items: [
                'Public health advocacy and policy development',
                'Complex health systems management',
                'Advanced research and evaluation',
                'Interdisciplinary health approaches',
                'Ethics and equity in health',
                'Innovation in public health practice'
              ],
              resources: [
                'American Public Health Association Resources',
                'Leadership for Public Health Practice',
                'Systems Thinking for Health Systems Strengthening (WHO)',
                'Health Affairs Journal',
                'DrPH Program Resources'
              ]
            }
          ]
        }
      ]
    },
    'arts': {
      name: 'Arts & Humanities',
      subfields: [
        {
          id: 'literature',
          name: 'Literature',
          description: 'Study and create written works',
          roadmap: [
            {
              stage: 'Beginner',
              title: 'Literature Fundamentals',
              description: 'Build a foundation in literary studies',
              items: [
                'Close reading techniques',
                'Literary genres and forms',
                'Basic literary theory',
                'World literature survey',
                'Creative writing essentials',
                'Research methods in literature'
              ],
              resources: [
                'How to Read Literature Like a Professor',
                'The Norton Anthology of World Literature',
                'Elements of Style (Strunk & White)',
                'Poetry Foundation Resources',
                'Open Yale Courses: Introduction to Theory of Literature'
              ]
            },
            {
              stage: 'Intermediate',
              title: 'Literary Analysis',
              description: 'Develop analytical literary skills',
              items: [
                'Critical theory and approaches',
                'Historical literary movements',
                'Comparative literature',
                'Advanced creative writing',
                'Literary research and scholarship',
                'Specialized genre studies'
              ],
              resources: [
                'Literary Theory: An Introduction (Eagleton)',
                'The Cambridge Companion Series',
                'JSTOR Literary Resources',
                'Paris Review Interviews',
                'MLA Style Guide'
              ]
            },
            {
              stage: 'Advanced',
              title: 'Specialized Literary Studies',
              description: 'Master specialized literary domains',
              items: [
                'Advanced literary criticism',
                'Literature and other arts/disciplines',
                'Postcolonial/global literatures',
                'Publishing and editing',
                'Digital humanities',
                'Literary translation'
              ],
              resources: [
                'Critical Inquiry Journal',
                'The Routledge Companion to World Literature',
                'Digital Humanities Quarterly',
                'The Craft of Translation',
                'Advanced Workshops and Writing Programs'
              ]
            },
            {
              stage: 'Expert',
              title: 'Literary Scholarship and Creation',
              description: 'Contribute to literary studies and creation',
              items: [
                'Original literary research',
                'Literature pedagogy',
                'Literary theory development',
                'Professional writing and publication',
                'Literary criticism and review',
                'Cultural and literary institutions'
              ],
              resources: [
                'PMLA (Publications of the Modern Language Association)',
                'American Comparative Literature Association',
                'National Endowment for the Humanities',
                'The Art of Teaching (Wallace)',
                'Advanced Literary Criticism Resources'
              ]
            }
          ]
        },
        {
          id: 'philosophy',
          name: 'Philosophy',
          description: 'Explore fundamental questions about existence',
          roadmap: [
            {
              stage: 'Beginner',
              title: 'Philosophy Fundamentals',
              description: 'Build a foundation in philosophical thinking',
              items: [
                'Introduction to logic and reasoning',
                'History of philosophy survey',
                'Major philosophical questions',
                'Ethics fundamentals',
                'Political philosophy basics',
                'Philosophy of mind introduction'
              ],
              resources: [
                'Sophie\'s World (Gaarder)',
                'Think: A Compelling Introduction to Philosophy (Blackburn)',
                'The Problems of Philosophy (Russell)',
                'Philosophy Bites Podcast',
                'Stanford Encyclopedia of Philosophy'
              ]
            },
            {
              stage: 'Intermediate',
              title: 'Philosophical Systems',
              description: 'Explore major philosophical traditions',
              items: [
                'Ancient philosophy (Greek, Roman, Eastern)',
                'Modern philosophy (Enlightenment)',
                'Contemporary philosophy',
                'Formal logic',
                'Applied ethics',
                'Philosophy of science'
              ],
              resources: [
                'History of Western Philosophy (Russell)',
                'An Introduction to Formal Logic (Smith)',
                'Justice: What\'s the Right Thing to Do? (Sandel)',
                'The Structure of Scientific Revolutions (Kuhn)',
                'Introduction to Classical Eastern Philosophy'
              ]
            },
            {
              stage: 'Advanced',
              title: 'Specialized Philosophy',
              description: 'Master specialized philosophical domains',
              items: [
                'Metaphysics and ontology',
                'Epistemology',
                'Phenomenology and existentialism',
                'Aesthetics and philosophy of art',
                'Philosophy of language',
                'Advanced ethical theory'
              ],
              resources: [
                'Being and Time (Heidegger)',
                'Philosophical Investigations (Wittgenstein)',
                'A Theory of Justice (Rawls)',
                'Mind and World (McDowell)',
                'Philosophy of Mind: Classical and Contemporary Readings'
              ]
            },
            {
              stage: 'Expert',
              title: 'Philosophical Research and Development',
              description: 'Contribute to philosophical discourse',
              items: [
                'Original philosophical research',
                'Philosophy in interdisciplinary contexts',
                'Applied philosophy in contemporary issues',
                'Philosophy pedagogy',
                'Public philosophy and engagement',
                'Contemporary debates and symposia'
              ],
              resources: [
                'Journal of Philosophy',
                'Philosophical Review',
                'American Philosophical Association Resources',
                'Philosophy Talk',
                'Contemporary Debates in Philosophy Series'
              ]
            }
          ]
        },
        {
          id: 'history',
          name: 'History',
          description: 'Study the past to understand the present',
          roadmap: [
            {
              stage: 'Beginner',
              title: 'History Fundamentals',
              description: 'Build a foundation in historical studies',
              items: [
                'World history survey',
                'Historical methods and sources',
                'Historiography introduction',
                'Primary source analysis',
                'Chronological and thematic frameworks',
                'Historical writing basics'
              ],
              resources: [
                'A Little History of the World (Gombrich)',
                'Guns, Germs, and Steel (Diamond)',
                'The Historian\'s Craft (Bloch)',
                'Khan Academy World History',
                'Crash Course History Videos'
              ]
            },
            {
              stage: 'Intermediate',
              title: 'Historical Analysis',
              description: 'Develop analytical historical skills',
              items: [
                'Specialized historical periods',
                'Comparative history',
                'Social and cultural history',
                'Economic and political history',
                'Archives and advanced sources',
                'Historical research methods'
              ],
              resources: [
                'Historical Methods Journal',
                'The Oxford History Series',
                'JSTOR Historical Sources',
                'The Past in Perspective (Feder)',
                'History: A Very Short Introduction (Arnold)'
              ]
            },
            {
              stage: 'Advanced',
              title: 'Specialized Historical Studies',
              description: 'Master specialized historical domains',
              items: [
                'Microhistory and case studies',
                'Global and transnational history',
                'Public history and memory',
                'Digital history methods',
                'Oral history techniques',
                'Advanced historiography'
              ],
              resources: [
                'American Historical Review',
                'Journal of Global History',
                'The Public Historian',
                'Oral History Association Resources',
                'Digital History: A Guide to Gathering, Preserving, and Presenting the Past on the Web'
              ]
            },
            {
              stage: 'Expert',
              title: 'Historical Scholarship',
              description: 'Contribute to historical knowledge',
              items: [
                'Original historical research',
                'Interdisciplinary historical approaches',
                'Historical theory development',
                'History pedagogy',
                'Public engagement with history',
                'Historical preservation and curation'
              ],
              resources: [
                'Journal of Modern History',
                'History and Theory',
                'National Council on Public History',
                'The History Teacher Journal',
                'American Historical Association Resources'
              ]
            }
          ]
        }
      ]
    }
  };

  // Update progress bar
  function updateProgress(step) {
    const percent = ((step - 1) / (formSteps.length - 1)) * 100;
    progressBar.style.width = `${percent}%`;
    
    // Update progress steps
    progressSteps.forEach((progressStep, idx) => {
      if (idx < step) {
        progressStep.classList.add('active');
        if (idx < step - 1) {
          progressStep.classList.add('completed');
        }
      } else {
        progressStep.classList.remove('active', 'completed');
      }
    });
  }

  // Show step
  function showStep(step) {
    formSteps.forEach((formStep, idx) => {
      if (idx === step - 1) {
        formStep.classList.add('active');
      } else {
        formStep.classList.remove('active');
      }
    });
    
    updateProgress(step);
    currentStep = step;
  }

  // Handle next button clicks
  nextButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Collect form data from current step
      const currentStepElement = formSteps[currentStep - 1];
      const inputs = currentStepElement.querySelectorAll('input, select');
      inputs.forEach(input => {
        formData[input.name] = input.value;
      });
      
      showStep(currentStep + 1);
    });
  });

  // Handle previous button clicks
  prevButtons.forEach(button => {
    button.addEventListener('click', () => {
      showStep(currentStep - 1);
    });
  });

  // Handle field card selection
  fieldCards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove selected class from all cards
      fieldCards.forEach(c => c.classList.remove('selected'));
      
      // Add selected class to clicked card
      card.classList.add('selected');
      
      // Enable next button
      fieldNextBtn.disabled = false;
      
      // Store selected field
      selectedField = card.dataset.field;
      
      // Update field name in step 3
      const fieldName = educationFields[selectedField].name;
      selectedFieldName.textContent = fieldName;
      
      // Generate subfields for the selected field
      generateSubfields(selectedField);
    });
  });

  // Generate subfields for the selected field
  function generateSubfields(field) {
    const subfields = educationFields[field].subfields;
    let subfieldsHTML = '';
    
    subfields.forEach(subfield => {
      subfieldsHTML += `
        <div class="subfield-item" data-subfield="${subfield.id}">
          <h4>${subfield.name}</h4>
          <p>${subfield.description}</p>
        </div>
      `;
    });
    
    subfieldsContainer.innerHTML = subfieldsHTML;
    
    // Add event listeners to subfield items
    const subfieldItems = document.querySelectorAll('.subfield-item');
    subfieldItems.forEach(item => {
      item.addEventListener('click', () => {
        // Remove selected class from all items
        subfieldItems.forEach(i => i.classList.remove('selected'));
        
        // Add selected class to clicked item
        item.classList.add('selected');
        
        // Store selected subfield
        selectedSubfield = item.dataset.subfield;
      });
    });
  }

  // Handle show roadmap button click
  showRoadmapBtn.addEventListener('click', () => {
    // Show roadmap container, hide form container
    formContainer.style.display = 'none';
    roadmapContainer.style.display = 'block';
    
    // Find selected field and subfield
    const field = educationFields[selectedField];
    const subfield = field.subfields.find(s => s.id === selectedSubfield);
    
    // Update roadmap description
    roadmapDescription.textContent = `Your personalized path to mastering ${subfield.name} in ${field.name}`;
    
    // Generate roadmap content
    generateRoadmap(subfield);
  });

  // Generate roadmap content
  function generateRoadmap(subfield) {
    const roadmapItems = subfield.roadmap;
    let roadmapHTML = '<div class="roadmap-timeline">';
    
    roadmapItems.forEach(item => {
      let resourcesHTML = '';
      item.resources.forEach(resource => {
        resourcesHTML += `<li>${resource}</li>`;
      });
      
      let itemsHTML = '';
      item.items.forEach(listItem => {
        itemsHTML += `<li>${listItem}</li>`;
      });
      
      roadmapHTML += `
        <div class="roadmap-item">
          <div class="roadmap-stage">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            ${item.stage}
          </div>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <ul class="mb-4 ml-5 list-disc">
            ${itemsHTML}
          </ul>
          <div class="roadmap-resources">
            <h4>Recommended Resources:</h4>
            <ul class="resource-list">
              ${resourcesHTML}
            </ul>
          </div>
        </div>
      `;
    });
    
    roadmapHTML += '</div>';
    roadmapContent.innerHTML = roadmapHTML;
  }

  // Handle reset form button click
  resetFormBtn.addEventListener('click', () => {
    // Reset form and show step 1
    form.reset();
    roadmapContainer.style.display = 'none';
    formContainer.style.display = 'block';
    showStep(1);
    
    // Reset selected field and subfield
    selectedField = null;
    selectedSubfield = null;
    
    // Clear selected classes
    fieldCards.forEach(card => card.classList.remove('selected'));
  });

  // Handle download roadmap button click
  downloadBtn.addEventListener('click', () => {
    alert('This would generate a PDF of your customized learning roadmap in a real application.');
  });

  // Initialize the form
  showStep(1);
});
