import { useState, useRef, useEffect } from 'react';
import { CheckCircle, Brain, MessageCircle, Shield, Zap, ArrowRight, ArrowLeft, ChevronDown, ChevronUp, Grid, Sparkles, Send, Trash2, Loader2, Layers, AlertTriangle, HelpCircle, Scale, User, Home } from 'lucide-react';

// --- STYLES ---
const customStyles = `
    /* Scrollbar for chat */
    .chat-scroll::-webkit-scrollbar { width: 6px; }
    .chat-scroll::-webkit-scrollbar-track { background: transparent; }
    .chat-scroll::-webkit-scrollbar-thumb { background-color: #475569; border-radius: 20px; }
    
    .typing-dot {
        animation: typing 1.4s infinite ease-in-out both;
    }
    .typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .typing-dot:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes typing {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
    }
    
    .animate-fadeIn {
        animation: fadeIn 0.5s ease-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

// --- DATA & CONTENT (Paul-Elder Model) ---

const elementsOfThought = [
    { id: 'purpose', title: 'Purpose', desc: 'Goals, objectives, function', questions: ['What is my central aim?', 'What am I trying to accomplish?', 'Is my purpose justifiable?'] },
    { id: 'question', title: 'Question at Issue', desc: 'Problem, issue', questions: ['What question am I raising?', 'Am I considering the complexities in the question?', 'Is the question clear and unbiased?'] },
    { id: 'information', title: 'Information', desc: 'Data, facts, evidence, observations', questions: ['What information am I using?', 'Is the information accurate and relevant?', 'Have I gathered sufficient information?'] },
    { id: 'interpretation', title: 'Interpretation & Inference', desc: 'Conclusions, solutions', questions: ['How did I reach this conclusion?', 'Is there another way to interpret the information?', 'Does my conclusion follow from the data?'] },
    { id: 'concepts', title: 'Concepts', desc: 'Theories, definitions, laws, principles', questions: ['What is the main idea here?', 'Can I explain this idea clearly?', 'Am I using concepts with care and precision?'] },
    { id: 'assumptions', title: 'Assumptions', desc: 'Presuppositions, axioms, taking for granted', questions: ['What am I taking for granted?', 'Is this assumption justifiable?', 'How is this assumption shaping my point of view?'] },
    { id: 'implications', title: 'Implications & Consequences', desc: 'That which follows logically, effects', questions: ['If someone accepted my position, what would be the implications?', 'What are the likely consequences of this action?'] },
    { id: 'pov', title: 'Point of View', desc: 'Frame of reference, perspective, orientation', questions: ['From what point of view am I looking at this issue?', 'Is there another point of view I should consider?', 'What are the strengths/weaknesses of my viewpoint?'] },
];

const intellectualStandards = [
    { id: 'clarity', title: 'Clarity', desc: 'The gateway standard. If a statement is unclear, we cannot determine accuracy or relevance.', questions: ['Could you elaborate further?', 'Could you give me an example?', 'Could you illustrate what you mean?'] },
    { id: 'accuracy', title: 'Accuracy', desc: 'Is that really true? How could we check that?', questions: ['How could we verify or test that?', 'How could we find out if that is true?'] },
    { id: 'precision', title: 'Precision', desc: 'Could you give me more details? Could you be more specific?', questions: ['Could you be more exact?', 'Could you give me more details?', 'Can you be more specific?'] },
    { id: 'relevance', title: 'Relevance', desc: 'How is that connected to the question?', questions: ['How does that bear on the issue?', 'How does this help us with the problem?'] },
    { id: 'depth', title: 'Depth', desc: 'How does your answer address the complexities in the question?', questions: ['What factors make this a difficult problem?', 'What are some of the complexities of this question?'] },
    { id: 'breadth', title: 'Breadth', desc: 'Do we need to consider another point of view?', questions: ['Do we need to look at this from another perspective?', 'Do we need to consider another point of view?'] },
    { id: 'logic', title: 'Logic', desc: 'Does this really make sense? Does that follow from what you said?', questions: ['Does all this make sense together?', 'Does your first paragraph fit in with your last?', 'Does what you say follow from the evidence?'] },
    { id: 'significance', title: 'Significance', desc: 'Is this the most important problem to consider?', questions: ['Is this the central idea to focus on?', 'Which of these facts are most important?'] },
    { id: 'fairness', title: 'Fairness', desc: 'Are we considering all relevant viewpoints in good faith?', questions: ['Do I have any vested interest in this issue?', 'Am I sympathetically representing the viewpoints of others?'] },
];

const intellectualTraits = [
    { trait: 'Intellectual Humility', opposite: 'Intellectual Arrogance', desc: 'Knowing what you don\'t know; consciousness of the limits of one\'s knowledge. Sensitivity to bias and prejudice.' },
    { trait: 'Intellectual Courage', opposite: 'Intellectual Cowardice', desc: 'Facing ideas and beliefs even if they are unpopular, dangerous, or absurd. Recognizing that some "dangerous" ideas may be true.' },
    { trait: 'Intellectual Empathy', opposite: 'Intellectual Narrow-mindedness', desc: 'Imaginatively putting oneself in the place of others to genuinely understand them.' },
    { trait: 'Intellectual Autonomy', opposite: 'Intellectual Conformity', desc: 'Thinking for oneself; having rational control of one\'s beliefs, values, and inferences.' },
    { trait: 'Intellectual Integrity', opposite: 'Intellectual Hypocrisy', desc: 'Holding oneself to the same rigorous standards of evidence and proof to which one holds one\'s antagonists.' },
    { trait: 'Intellectual Perseverance', opposite: 'Intellectual Laziness', desc: 'Struggling with confusion and unsettled questions over an extended period to achieve deeper understanding.' },
    { trait: 'Confidence in Reason', opposite: 'Distrust of Reason', desc: 'Faith that people can learn to think for themselves and draw reasonable conclusions.' },
    { trait: 'Fairmindedness', opposite: 'Intellectual Unfairness', desc: 'Treating all viewpoints alike, without reference to one\'s own feelings or vested interests.' },
];

// --- COMPONENTS: Critical Thinking Views ---

const HomeView = ({ setActiveTab }) => (
    <div className="relative min-h-screen">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative p-8 max-w-6xl mx-auto animate-fadeIn">
            {/* Hero Section */}
            <div className="text-center mb-20 mt-12">
                <div className="inline-block mb-6">
                    <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-full px-6 py-2">
                        <Brain className="text-emerald-400" size={20} />
                        <span className="text-sm font-medium text-emerald-400">Paul-Elder Framework</span>
                    </div>
                </div>

                <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent leading-tight">
                    Master Your
                    <br />
                    <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Thinking</span>
                </h1>

                <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
                    Welcome to your personal Critical Thinking Hub. This tool is designed to help you internalize the <span className="text-emerald-400 font-medium">Paul-Elder framework</span>—the gold standard for reasoning.
                </p>

                <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-emerald-500" />
                        <span>Interactive Learning</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-emerald-500" />
                        <span>AI-Powered Feedback</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-emerald-500" />
                        <span>Practical Tools</span>
                    </div>
                </div>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <button
                    onClick={() => setActiveTab('elements')}
                    className="group relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700/50 hover:border-emerald-500/50 transition-all text-left hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg shadow-emerald-500/20">
                            <Grid size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Learn the Basics</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">Explore the 8 Elements of Thought and Universal Standards.</p>
                        <div className="mt-4 flex items-center text-emerald-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Start Learning <ArrowRight size={16} className="ml-2" />
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => setActiveTab('solver')}
                    className="group relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all text-left hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-500/5 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg shadow-blue-500/20">
                            <Zap size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Solve a Problem</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">Use the interactive template to tackle a specific issue step-by-step.</p>
                        <div className="mt-4 flex items-center text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Start Solving <ArrowRight size={16} className="ml-2" />
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => setActiveTab('checklist')}
                    className="group relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all text-left hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-500/5 text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg shadow-purple-500/20">
                            <MessageCircle size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Check Reasoning</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">Verify your logic with the comprehensive reasoning checklist.</p>
                        <div className="mt-4 flex items-center text-purple-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Start Checking <ArrowRight size={16} className="ml-2" />
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => setActiveTab('ai-tutor')}
                    className="group relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700/50 hover:border-orange-500/50 transition-all text-left hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-500/5 text-orange-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg shadow-orange-500/20">
                            <Sparkles size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Ask the Tutor</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">Get Socratic guidance from the AI on any topic.</p>
                        <div className="mt-4 flex items-center text-orange-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Start Chatting <ArrowRight size={16} className="ml-2" />
                        </div>
                    </div>
                </button>
            </div>
        </div>
    </div>
);

const ElementsOfThoughtView = ({ setActiveTab }) => {
    const [selectedElement, setSelectedElement] = useState(null);

    return (
        <div className="p-8 max-w-4xl mx-auto animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">The Elements of Thought</h2>
                <p className="text-slate-400">
                    Whenever we think, we think for a <span className="text-emerald-400">purpose</span>, within a <span className="text-emerald-400">point of view</span>,
                    based on <span className="text-emerald-400">assumptions</span>, leading to <span className="text-emerald-400">implications</span> and <span className="text-emerald-400">consequences</span>.
                    We use <span className="text-emerald-400">data</span>, facts, and experiences to make <span className="text-emerald-400">inferences</span> based on <span className="text-emerald-400">concepts</span>
                    to answer a <span className="text-emerald-400">question</span>.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Interactive Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {elementsOfThought.map((el) => (
                        <button
                            key={el.id}
                            onClick={() => setSelectedElement(el)}
                            className={`p-4 rounded-xl border text-left transition-all duration-300 ${selectedElement?.id === el.id
                                ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg scale-105'
                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-emerald-500/50 hover:bg-slate-700'
                                }`}
                        >
                            <span className="block font-bold text-sm mb-1">{el.title}</span>
                            <span className="text-[10px] opacity-70 line-clamp-2">{el.desc}</span>
                        </button>
                    ))}
                </div>

                {/* Detail Panel */}
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 flex flex-col h-full transition-all duration-300">
                    {selectedElement ? (
                        <div className="animate-fadeIn">
                            <h3 className="text-2xl font-bold text-emerald-400 mb-2">{selectedElement.title}</h3>
                            <p className="text-slate-300 mb-6 text-sm italic">{selectedElement.desc}</p>
                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                                <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 tracking-wider">Key Questions (Page 6)</h4>
                                <ul className="space-y-3">
                                    {selectedElement.questions.map((q, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-200 text-sm">
                                            <span className="text-emerald-500 mt-1 flex-shrink-0"><MessageCircle size={14} /></span>
                                            {q}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-600 text-center p-8">
                            <Brain size={48} className="mb-4 opacity-20" />
                            <p>Select an element to explore its definition and guiding questions.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={() => setActiveTab('standards')}
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                    Next: Intellectual Standards <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};

const StandardsView = ({ setActiveTab }) => {
    const [activeStandard, setActiveStandard] = useState(null);

    return (
        <div className="p-8 max-w-4xl mx-auto animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Universal Intellectual Standards</h2>
                <p className="text-slate-400">
                    Standards which must be applied to thinking to ensure its quality. To be learned, they must be taught explicitly.
                </p>
            </div>
            <div className="space-y-3">
                {intellectualStandards.map((std) => (
                    <div key={std.id} className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden transition-all duration-300">
                        <button
                            onClick={() => setActiveStandard(activeStandard === std.id ? null : std.id)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-700/50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${activeStandard === std.id ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'
                                    }`}>
                                    {std.title[0]}
                                </div>
                                <span className={`font-medium ${activeStandard === std.id ? 'text-white' : 'text-slate-300'}`}>
                                    {std.title}
                                </span>
                            </div>
                            {activeStandard === std.id ? <ChevronUp size={20} className="text-slate-500" /> : <ChevronDown size={20} className="text-slate-500" />}
                        </button>
                        {activeStandard === std.id && (
                            <div className="p-4 pt-0 pl-16 border-t border-slate-700/50 bg-slate-800/50 animate-slideDown">
                                <p className="text-slate-400 text-sm mb-4 mt-4">{std.desc}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {std.questions.map((q, i) => (
                                        <div key={i} className="bg-slate-900/50 p-3 rounded border border-slate-700/50 text-sm text-emerald-300">
                                            &quot;{q}&quot;
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={() => setActiveTab('traits')}
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                    Next: Intellectual Traits <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
};

const TraitsView = () => (
    <div className="p-8 max-w-5xl mx-auto animate-fadeIn">
        <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Intellectual Traits</h2>
            <p className="text-slate-400">
                Consistent application of intellectual standards to the elements of thought leads to the development of intellectual traits.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {intellectualTraits.map((item, idx) => (
                <div key={idx} className="group relative bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/10">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-emerald-400">{item.trait}</h3>
                        <span className="text-[10px] font-mono bg-slate-900 text-red-400 px-2 py-1 rounded border border-slate-700">
                            VS {item.opposite}
                        </span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
    </div>
);

const QuestionTypesView = () => {
    const [selectedType, setSelectedType] = useState(null);

    const questionTypes = [
        {
            id: 'one-system',
            title: '1. One System',
            subtitle: 'Questions of Fact',
            icon: CheckCircle,
            color: 'blue',
            outcome: 'A Correct Answer',
            basis: 'Knowledge',
            nature: 'These are questions with a definitive, correct answer. They rely on established procedures, facts, or definitions.',
            system: 'There is an established system (like mathematics, biology, or historical record) that provides the answer.',
            examples: [
                'What is the boiling point of water?',
                'What is the square root of 144?',
                'How does a computer hard drive work?'
            ]
        },
        {
            id: 'no-system',
            title: '2. No System',
            subtitle: 'Questions of Preference',
            icon: User,
            color: 'orange',
            outcome: 'A Subjective Opinion',
            basis: 'Cannot be assessed',
            nature: 'These are questions asking for a subjective preference or personal taste. There is no "correct" answer, only an honest one.',
            system: 'There is no external system to judge the answer. It is purely internal/subjective.',
            examples: [
                'What is your favorite color?',
                'Do you prefer vanilla or chocolate?',
                'Is this painting beautiful?'
            ]
        },
        {
            id: 'multi-system',
            title: '3. Multi-System',
            subtitle: 'Questions of Judgment',
            icon: Scale,
            color: 'purple',
            outcome: 'Better & Worse Answers',
            basis: 'Judgment',
            nature: 'Complex questions that require reasoning through multiple perspectives. There is no single "correct" answer, but answers can be evaluated.',
            system: 'Requires integrating insights from multiple systems (e.g., ethics, economics, psychology).',
            examples: [
                'Should we implement a Universal Basic Income?',
                'Is capital punishment justified?',
                'How can we best solve the climate crisis?'
            ],
            pitfalls: [
                { title: 'Dogmatism', desc: 'Treating a Judgment question as a Fact question.' },
                { title: 'Relativism', desc: 'Treating a Judgment question as a Preference question.' }
            ]
        }
    ];

    return (
        <div className="p-8 max-w-5xl mx-auto animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Three Kinds of Questions</h2>
                <p className="text-slate-400">
                    To approach a question effectively, figure out what type it is. (Page 16)
                </p>
            </div>

            {selectedType ? (
                <div className="animate-fadeIn">
                    <button
                        onClick={() => setSelectedType(null)}
                        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft size={18} /> Back to Overview
                    </button>

                    <div className={`bg-slate-800 rounded-xl border border-${selectedType.color}-500/30 p-8 shadow-2xl`}>
                        <div className="flex items-start gap-6 mb-8">
                            <div className={`p-4 rounded-full bg-${selectedType.color}-500/10 text-${selectedType.color}-400`}>
                                <selectedType.icon size={40} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-2">{selectedType.title}</h3>
                                <div className={`text-${selectedType.color}-400 font-medium text-lg`}>{selectedType.subtitle}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Nature of the Question</h4>
                                    <p className="text-slate-300 leading-relaxed">{selectedType.nature}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">The System</h4>
                                    <p className="text-slate-300 leading-relaxed">{selectedType.system}</p>
                                </div>
                                <div className="flex gap-4 mt-4">
                                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 flex-1">
                                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Outcome</div>
                                        <div className="text-emerald-400 font-bold">{selectedType.outcome}</div>
                                    </div>
                                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 flex-1">
                                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Basis</div>
                                        <div className="text-slate-300 font-medium">{selectedType.basis}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Examples</h4>
                                    <ul className="space-y-3">
                                        {selectedType.examples.map((ex, i) => (
                                            <li key={i} className="flex items-start gap-3 text-slate-300">
                                                <span className={`text-${selectedType.color}-500 mt-1`}><HelpCircle size={16} /></span>
                                                {ex}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {selectedType.pitfalls && (
                                    <div className="bg-red-900/10 rounded-xl p-6 border border-red-500/20">
                                        <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <AlertTriangle size={16} /> Common Errors
                                        </h4>
                                        <div className="space-y-4">
                                            {selectedType.pitfalls.map((pit, i) => (
                                                <div key={i}>
                                                    <div className="text-red-300 font-bold text-sm">{pit.title}</div>
                                                    <div className="text-red-200/70 text-sm">{pit.desc}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {questionTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setSelectedType(type)}
                            className={`bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center text-center hover:border-${type.color}-500/50 hover:bg-slate-800/80 transition-all group hover:-translate-y-1 duration-300`}
                        >
                            <div className={`w-16 h-16 bg-${type.color}-500/10 text-${type.color}-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <type.icon size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">{type.title}</h3>
                            <div className={`text-${type.color}-400 text-sm font-medium mb-4`}>{type.subtitle}</div>
                            <p className="text-slate-400 text-sm mb-6 min-h-[40px] line-clamp-2">{type.nature}</p>

                            <div className="w-full mt-auto space-y-3">
                                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Outcome</div>
                                    <div className="text-emerald-400 font-bold">{type.outcome}</div>
                                </div>
                                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Basis</div>
                                    <div className="text-slate-300 font-medium">{type.basis}</div>
                                </div>
                            </div>

                            <div className="mt-6 text-xs text-slate-500 group-hover:text-white transition-colors flex items-center gap-1">
                                View Details <ArrowRight size={12} />
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const DevelopmentView = () => {
    const [selectedStage, setSelectedStage] = useState(null);

    const stages = [
        {
            title: "Unreflective Thinker",
            desc: "We are unaware of significant problems in our thinking.",
            signs: ["Rarely questions own beliefs", "Assumes reasoning is flawless", "Unaware of bias"],
            goal: "Recognize that critical thinking matters"
        },
        {
            title: "Challenged Thinker",
            desc: "We become aware of problems in our thinking.",
            signs: ["Starting to notice logical gaps", "Aware that thinking can be flawed", "Uncertain how to improve"],
            goal: "Begin to identify specific weak points"
        },
        {
            title: "Beginning Thinker",
            desc: "We try to improve but without regular practice.",
            signs: ["Sporadic attempts to think critically", "Recognize the need for standards", "Lack systematic approach"],
            goal: "Commit to consistent practice"
        },
        {
            title: "Practicing Thinker",
            desc: "We recognize the need for regular practice.",
            signs: ["Actively working to improve", "Regular self-assessment", "Building new thinking habits"],
            goal: "Develop automaticity in applying standards"
        },
        {
            title: "Advanced Thinker",
            desc: "We advance in keeping with our practice.",
            signs: ["Good thinking habits forming", "Consistent application of standards", "Growing intellectual confidence"],
            goal: "Internalize high-quality thinking"
        },
        {
            title: "Master Thinker",
            desc: "Good habits of thought become second nature.",
            signs: ["Thinking critically is automatic", "Constantly refining reasoning", "Model for others"],
            goal: "Continue to deepen and expand mastery"
        }
    ];

    return (
        <div className="p-8 max-w-4xl mx-auto animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Stages of Critical Thinking Development</h2>
                <p className="text-slate-400">Development is a process. Where are you on the journey? (Page 20)</p>
            </div>

            <div className="space-y-4 relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-yellow-500 to-emerald-500"></div>
                {stages.map((stage, i) => (
                    <div key={i} className="relative pl-12 group">
                        <div className={`absolute left-[11px] top-4 w-3 h-3 rounded-full border-2 border-slate-900 transition-all duration-300 ${selectedStage === i ? 'bg-emerald-500 scale-150' : 'bg-slate-600 group-hover:bg-emerald-500'
                            }`}></div>
                        <button
                            onClick={() => setSelectedStage(selectedStage === i ? null : i)}
                            className="w-full bg-slate-800 p-4 rounded-lg border border-slate-700 group-hover:border-emerald-500/50 transition-all text-left"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold text-white">{stage.title}</h3>
                                <span className="text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded">Stage {i + 1}/6</span>
                            </div>
                            <p className="text-slate-400 text-sm mb-3">{stage.desc}</p>

                            {selectedStage === i && (
                                <div className="animate-fadeIn mt-4 pt-4 border-t border-slate-700 space-y-4">
                                    <div>
                                        <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">Signs You're Here</h4>
                                        <ul className="space-y-2">
                                            {stage.signs.map((sign, j) => (
                                                <li key={j} className="text-sm text-slate-300 flex items-start gap-2">
                                                    <span className="text-emerald-500 mt-1"><CheckCircle size={14} /></span>
                                                    {sign}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                                        <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-1">Next Goal</h4>
                                        <p className="text-blue-200 text-sm">{stage.goal}</p>
                                    </div>
                                </div>
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const BarriersView = () => {
    const [selectedBarrier, setSelectedBarrier] = useState(null);

    const egocentric = [
        {
            label: "It's true because I believe it.",
            sub: "Innate egocentrism",
            antidote: "Ask: 'What evidence supports this belief? Could I be wrong?'",
            example: "Believing your political views are objectively correct without examining opposing arguments."
        },
        {
            label: "It's true because we believe it.",
            sub: "Innate sociocentrism",
            antidote: "Question group consensus. Seek perspectives from outside your circle.",
            example: "Assuming your culture's practices are superior without understanding others."
        },
        {
            label: "It's true because I want to believe it.",
            sub: "Innate wish fulfillment",
            antidote: "Distinguish what you wish were true from what the evidence shows.",
            example: "Believing a business idea will succeed just because you're passionate about it."
        },
        {
            label: "It's true because I have always believed it.",
            sub: "Innate self-validation",
            antidote: "Be willing to abandon long-held beliefs when new evidence emerges.",
            example: "Sticking to outdated medical advice because 'it's what I was taught.'"
        },
        {
            label: "It's true because it is in my selfish interest to believe it.",
            sub: "Innate selfishness",
            antidote: "Recognize when personal gain is clouding your judgment.",
            example: "A smoker dismissing health research because quitting is difficult."
        }
    ];

    return (
        <div className="p-8 max-w-6xl mx-auto animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Barriers to Thinking</h2>
                <p className="text-slate-400">
                    Humans naturally use self-centered psychological standards to determine what to believe. Recognize these
                    patterns to overcome them. (Page 21)
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Egocentric Thinking */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="text-yellow-500" />
                        <h3 className="text-xl font-bold text-white">Egocentric Thinking</h3>
                    </div>
                    <div className="space-y-3">
                        {egocentric.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedBarrier(selectedBarrier === `ego-${i}` ? null : `ego-${i}`)}
                                className="w-full bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-yellow-500/50 transition-all text-left"
                            >
                                <div className="p-4">
                                    <div className="text-emerald-300 font-medium mb-1">&quot;{item.label}&quot;</div>
                                    <div className="text-slate-500 text-xs uppercase tracking-wide">{item.sub}</div>
                                </div>

                                {selectedBarrier === `ego-${i}` && (
                                    <div className="bg-slate-900/50 p-4 border-t border-slate-700 space-y-3 animate-fadeIn">
                                        <div>
                                            <h4 className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-1">Example</h4>
                                            <p className="text-sm text-slate-300">{item.example}</p>
                                        </div>
                                        <div className="bg-emerald-900/20 border border-emerald-500/30 p-3 rounded-lg">
                                            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Antidote</h4>
                                            <p className="text-sm text-emerald-200">{item.antidote}</p>
                                        </div>
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sociocentric Thinking */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="text-red-500" />
                        <h3 className="text-xl font-bold text-white">Sociocentric Thinking</h3>
                    </div>
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 text-sm text-slate-300 leading-relaxed h-full">
                        <p className="mb-6 text-base font-medium text-white">The uncritical tendency to place one&apos;s culture, nation, or religion above all others.</p>

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Common Manifestations</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1"><AlertTriangle size={14} /></span>
                                        <span className="text-slate-400">Self-serving positive descriptions of ourselves.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1"><AlertTriangle size={14} /></span>
                                        <span className="text-slate-400">Negative descriptions of those who think differently.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1"><AlertTriangle size={14} /></span>
                                        <span className="text-slate-400">Uncritical internalization of group norms.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1"><AlertTriangle size={14} /></span>
                                        <span className="text-slate-400">Blind conformity to group restrictions.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1"><AlertTriangle size={14} /></span>
                                        <span className="text-slate-400">Failure to think beyond traditional prejudices.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-emerald-900/20 border border-emerald-500/30 p-4 rounded-lg mt-4">
                                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">How to Overcome</h4>
                                <p className="text-emerald-200 text-sm">Actively seek out and empathetically consider perspectives from outside your "in-group." Question traditions and group beliefs with the same rigor you apply to outsiders.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ChecklistView = () => {
    const [checks, setChecks] = useState({});

    const toggleCheck = (id) => {
        setChecks(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const checklistItems = [
        { id: 'purpose', label: '1. All reasoning has a PURPOSE.', sub: 'State your purpose clearly. Distinguish it from related purposes.' },
        { id: 'question', label: '2. All reasoning is an attempt to figure something out.', sub: 'State the question at issue clearly and precisely.' },
        { id: 'assumptions', label: '3. All reasoning is based on ASSUMPTIONS.', sub: 'Clearly identify your assumptions and determine whether they are justifiable.' },
        { id: 'pov', label: '4. All reasoning is done from some POINT OF VIEW.', sub: 'Identify your point of view. Seek other points of view.' },
        { id: 'data', label: '5. All reasoning is based on DATA and INFORMATION.', sub: 'Restrict your claims to those supported by the data you have.' },
        { id: 'concepts', label: '6. All reasoning is expressed through CONCEPTS.', sub: 'Identify key concepts and explain them clearly.' },
        { id: 'inferences', label: '7. All reasoning contains INFERENCES.', sub: 'Infer only what the evidence implies.' },
        { id: 'implications', label: '8. All reasoning leads somewhere (IMPLICATIONS).', sub: 'Trace the implications and consequences that follow from your reasoning.' }
    ];

    const progress = Math.round((Object.values(checks).filter(Boolean).length / checklistItems.length) * 100);

    return (
        <div className="p-8 max-w-3xl mx-auto animate-fadeIn">
            <div className="mb-8 flex items-end justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Reasoning Checklist</h2>
                    <p className="text-slate-400">Based on Pages 4-5 of the Miniature Guide.</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold text-emerald-400">{progress}%</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Complete</div>
                </div>
            </div>

            <div className="space-y-3">
                {checklistItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => toggleCheck(item.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 text-left ${checks[item.id]
                            ? 'bg-emerald-900/20 border-emerald-500/50'
                            : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                            }`}
                    >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border flex-shrink-0 transition-colors ${checks[item.id] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-500 text-transparent'
                            }`}>
                            <CheckCircle size={14} />
                        </div>
                        <div>
                            <h3 className={`font-medium ${checks[item.id] ? 'text-emerald-300' : 'text-slate-200'}`}>
                                {item.label}
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">{item.sub}</p>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={() => setChecks({})}
                    className="text-sm text-slate-500 hover:text-white underline underline-offset-4 transition-colors"
                >
                    Reset Checklist
                </button>
            </div>
        </div>
    );
};

const SolverView = () => {
    const [step, setStep] = useState(0);
    const [inputs, setInputs] = useState({});
    const [showExample, setShowExample] = useState(false);
    const [aiFeedback, setAiFeedback] = useState({});
    const [analyzing, setAnalyzing] = useState(false);
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    const steps = [
        {
            id: 'goals',
            title: "1. Recognize Goals & Needs",
            text: "Figure out, and regularly re-articulate, your goals, purposes, and needs. Recognize problems as obstacles to reaching your goals.",
            prompt: "What is your primary goal in this situation?",
            example: "Goal: To find a job that balances my need for income with my passion for graphic design."
        },
        {
            id: 'problem',
            title: "2. State the Problem",
            text: "Wherever possible take problems one by one. State each problem as clearly and precisely as you can.",
            prompt: "State the problem in one clear sentence.",
            example: "Problem: I have applied to 50 jobs in the last month but have received zero interview requests."
        },
        {
            id: 'type',
            title: "3. Determine Problem Type",
            text: "Study the problem to determine the kind of problem you are dealing with. What do you have to do to solve it?",
            prompt: "Is this a problem of fact, preference, or judgment? Why?",
            example: "Type: Judgment. There is no single 'right' way to get a job, but there are better and worse strategies based on evidence."
        },
        {
            id: 'control',
            title: "4. Distinguish Control",
            text: "Distinguish problems over which you have some control from problems over which you have no control. Concentrate on problems you can solve.",
            prompt: "What parts of this problem can you actually control?",
            example: "Control: I can control my portfolio quality and networking. I cannot control the hiring market or specific recruiter decisions."
        },
        {
            id: 'info',
            title: "5. Seek Information",
            text: "Figure out the information you need to solve the problem. Actively seek that information.",
            prompt: "What data or facts do you need?",
            example: "Info needed: Feedback on my portfolio, list of companies hiring, average response rates for my industry."
        },
        {
            id: 'analysis',
            title: "6. Analyze Information",
            text: "Carefully analyze and interpret the information you collect, drawing reasonable inferences.",
            prompt: "What does the information tell you? What are the key insights?",
            example: "Analysis: My portfolio lacks case studies, which are standard in the industry. My applications are too generic."
        },
        {
            id: 'options',
            title: "7. Determine Options",
            text: "Determine your options for action. What can you do in the short term? In the long term? Recognize limitations in money, time, and power.",
            prompt: "List 3 possible courses of action.",
            example: "Options: 1. Revamp portfolio. 2. Reach out to alumni network. 3. Take a freelance gig to build experience."
        },
        {
            id: 'eval',
            title: "8. Evaluate Options",
            text: "Evaluate your options, determining their advantages and disadvantages.",
            prompt: "What are the pros and cons of your best option?",
            example: "Eval: Revamping portfolio takes time (Con) but addresses the root cause (Pro). Networking is faster but requires social energy."
        },
        {
            id: 'strategy',
            title: "9. Adopt a Strategy",
            text: "Adopt a strategy. Follow through on it. This may involve direct action or a carefully thought-through wait-and-see approach.",
            prompt: "What is your immediate next step?",
            example: "Strategy: Spend 1 week updating portfolio with 3 deep case studies, then apply to 5 targeted jobs per week."
        },
        {
            id: 'monitor',
            title: "10. Monitor & Revise",
            text: "When you act, monitor the implications of your action. Be ready to revise your strategy if the situation requires it.",
            prompt: "How will you know if your strategy is working?",
            example: "Monitor: If I don't get an interview in 2 weeks after the update, I will ask a mentor for a portfolio review."
        }
    ];

    const handleInput = (e) => {
        setInputs({ ...inputs, [steps[step].id]: e.target.value });
    };

    const analyzeWithAI = async () => {
        const currentInput = inputs[steps[step].id];
        if (!currentInput || !currentInput.trim()) return;

        setAnalyzing(true);

        const systemPrompt = `
            You are a Critical Thinking Tutor based on the Paul-Elder framework.
            The user is on Step ${step + 1}: "${steps[step].title}".
            Description: "${steps[step].text}"
            
            User Input: "${currentInput}"
            
            Your task:
            1. Evaluate their input based on Intellectual Standards (Clarity, Precision, Depth, etc.).
            2. Provide 1-2 specific Socratic questions to help them improve their answer.
            3. Be encouraging but rigorous. Keep it brief (under 50 words).
        `;

        const payload = {
            contents: [{ role: 'user', parts: [{ text: systemPrompt }] }]
        };

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            const feedback = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't analyze that right now.";
            setAiFeedback({ ...aiFeedback, [steps[step].id]: feedback.replace(/\*/g, '') });
        } catch (error) {
            console.error(error);
            setAiFeedback({ ...aiFeedback, [steps[step].id]: "Connection error. Please try again." });
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto h-full flex flex-col animate-fadeIn">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 relative overflow-hidden shadow-2xl flex flex-col h-full max-h-[800px]">
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-700">
                    <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }}></div>
                </div>

                <div className="mb-6 flex-shrink-0">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="text-emerald-400 font-mono text-xs uppercase tracking-widest">Problem Solving Template • Step {step + 1} of {steps.length}</h4>
                        <button
                            onClick={() => setShowExample(!showExample)}
                            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                        >
                            <HelpCircle size={12} /> {showExample ? 'Hide Example' : 'Show Example'}
                        </button>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">{steps[step].title}</h2>
                    <p className="text-slate-300 text-lg leading-relaxed">{steps[step].text}</p>

                    {showExample && (
                        <div className="mt-4 bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg text-blue-200 text-sm animate-fadeIn">
                            <span className="font-bold text-blue-400 uppercase text-xs tracking-wider block mb-1">Example</span>
                            {steps[step].example}
                        </div>
                    )}
                </div>

                <div className="flex-1 flex flex-col min-h-0 mb-6 gap-4">
                    <div className="flex-1 flex flex-col">
                        <label className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 block">Your Input</label>
                        <textarea
                            value={inputs[steps[step].id] || ''}
                            onChange={handleInput}
                            placeholder={steps[step].prompt}
                            className="w-full flex-1 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-all resize-none"
                        />
                    </div>

                    {aiFeedback[steps[step].id] && (
                        <div className="bg-emerald-900/10 border border-emerald-500/20 p-4 rounded-xl animate-fadeIn">
                            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                                <Sparkles size={12} /> AI Feedback
                            </div>
                            <p className="text-emerald-100 text-sm leading-relaxed">{aiFeedback[steps[step].id]}</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-slate-700 flex-shrink-0">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setStep(Math.max(0, step - 1))}
                            disabled={step === 0}
                            className="text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 transition-colors"
                        >
                            Previous
                        </button>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={analyzeWithAI}
                            disabled={analyzing || !inputs[steps[step].id]?.trim()}
                            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {analyzing ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                            Get Feedback
                        </button>
                        <button
                            onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
                            disabled={step === steps.length - 1 || !inputs[steps[step].id]?.trim()}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Next Step
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- AITutor View (Enhanced) ---
const AITutorView = ({ context = "General" }) => {
    const [messages, setMessages] = useState([
        { role: 'system', text: 'I am your Socratic Critical Thinking Tutor...' },
        { role: 'assistant', text: 'Hello. I am your Critical Thinking Assistant, guided by the concepts of Paul and Elder. How can I help you analyze a problem, article, or idea today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const chatEndRef = useRef(null);
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const callGemini = async (userText) => {
        setLoading(true);
        setAnalysis("Consulting the Miniature Guide...");
        await new Promise(r => setTimeout(r, 800));

        const history = messages.filter(m => m.role !== 'system').map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.text }]
        }));

        // Strictly restricted to Paul-Elder
        const systemPrompt = `
            You are "Critical Thinking Assistant", an expert AI companion whose entire knowledge is drawn EXCLUSIVELY from "The Miniature Guide to Critical Thinking: Concepts and Tools" (Paul & Elder).
            
            **Your Mandate:**
            - Help the user think better by systematically applying the tools in the Paul-Elder framework.
            - NEVER use concepts not present in the book.
            
            **Mandatory Tools to Reference:**
            1. Elements of Thought: Purpose, Question, Information, Interpretation, Concepts, Assumptions, Implications, POV.
            2. Intellectual Standards: Clarity, Accuracy, Precision, Relevance, Depth, Breadth, Logic, Significance, Fairness.
            3. Intellectual Traits: Humility, Courage, Empathy, Autonomy, Integrity, Perseverance, Confidence in Reason, Fairmindedness.
            4. Three Kinds of Questions: One System (Fact), No System (Preference), Multi-System (Judgment).
            
            **Current Context:** ${context}
            
            **If user is in 'Problem Solver' mode:**
            Guide them strictly through the 10 steps of the Problem Solving Template (Page 17).
            
            **Response Style:**
            - Concise, structured, Socratic.
            - Use phrases like: "Let's clarify...", "What is your purpose?", "What assumptions are we making?".
            - End responses by asking a high-quality question from Page 6 of the book.
            - No asterisks. Use bolding for emphasis.
        `;

        const payload = {
            contents: [
                ...history,
                { role: 'user', parts: [{ text: userText }] }
            ],
            systemInstruction: { parts: [{ text: systemPrompt }] }
        };

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble accessing my logic centers.";
            setMessages(prev => [...prev, { role: 'assistant', text: botResponse.replace(/\*/g, '') }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', text: "Connection error." }]);
        } finally {
            setLoading(false);
            setAnalysis(null);
        }
    };

    const handleSend = () => {
        if (!input.trim()) return;
        const newUserMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, newUserMsg]);
        setInput('');
        callGemini(input);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto h-full flex flex-col">
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                        <Sparkles className="text-emerald-400" /> Socratic AI Tutor
                    </h2>
                    <p className="text-slate-400 text-sm">Context: <span className="text-emerald-400 font-semibold">{context}</span></p>
                </div>
                <button onClick={() => setMessages([{ role: 'system', text: '...' }, { role: 'assistant', text: 'Chat cleared.' }])} className="text-xs flex items-center gap-1 text-slate-500 hover:text-red-400 transition-colors">
                    <Trash2 size={14} /> Clear History
                </button>
            </div>
            <div className="flex-1 bg-slate-900 rounded-xl border border-slate-800 p-4 overflow-hidden flex flex-col shadow-inner relative">
                <div className="flex-1 overflow-y-auto space-y-6 pr-2 chat-scroll">
                    {messages.slice(1).map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-md ${msg.role === 'user' ? 'bg-slate-700 text-slate-100 rounded-br-none' : 'bg-emerald-900/20 border border-emerald-500/30 text-emerald-100 rounded-bl-none'
                                }`}>
                                {msg.role === 'assistant' && (
                                    <div className="flex items-center gap-2 mb-2 text-emerald-500 text-xs font-bold uppercase tracking-wider border-b border-emerald-500/20 pb-1">
                                        <Brain size={12} /> Assistant
                                    </div>
                                )}
                                <div className="markdown-body">{msg.text}</div>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start w-full">
                            <div className="bg-slate-800 p-4 rounded-2xl rounded-bl-none border border-slate-700 flex flex-col gap-3 min-w-[200px] animate-pulse">
                                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
                                    <Loader2 size={14} className="animate-spin" />
                                    {analysis || "Thinking..."}
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                <div className="mt-4 relative">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask a question or state a problem..." className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-4 pr-12 py-4 text-white focus:outline-none focus:border-emerald-500 transition-all shadow-lg" disabled={loading} />
                    <button onClick={handleSend} disabled={loading || !input.trim()} className="absolute right-2 top-2 bottom-2 bg-emerald-600 hover:bg-emerald-500 text-white w-10 rounded-lg flex items-center justify-center transition-all">
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Navigation Component ---

const NavButton = ({ id, label, icon: Icon, activeTab, setActiveTab }) => (
    <button
        onClick={() => setActiveTab(id)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${activeTab === id
            ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/50'
            : 'hover:bg-slate-800 hover:text-white'
            }`}
    >
        <Icon size={18} />
        <span className="text-sm font-medium">{label}</span>
    </button>
);

const Navigation = ({ activeTab, setActiveTab }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-900 border-b border-slate-800 z-50 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Brain size={20} className="text-emerald-400" />
                    <h1 className="text-lg font-bold text-emerald-400">Critical Hub</h1>
                </div>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-slate-300 hover:text-white p-2"
                >
                    {mobileMenuOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40 animate-fadeIn"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <div className={`
                fixed md:relative
                w-64 bg-slate-900 text-slate-300 h-screen flex flex-col flex-shrink-0 border-r border-slate-800
                transition-transform duration-300 z-40
                ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                md:translate-x-0
            `}>
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                        <Brain size={24} />
                        Critical Hub
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">Paul-Elder Framework</p>
                </div>
                <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                    <div>
                        <button
                            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${activeTab === 'home' ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/50' : 'hover:bg-slate-800 hover:text-white'}`}
                        >
                            <Home size={18} />
                            <span className="text-sm font-medium">Home</span>
                        </button>
                    </div>
                    <div>
                        <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Foundations</h3>
                        <NavButton id="elements" label="Elements of Thought" icon={Grid} activeTab={activeTab} setActiveTab={setActiveTab} onClick={() => setMobileMenuOpen(false)} />
                        <NavButton id="standards" label="Intellectual Standards" icon={CheckCircle} activeTab={activeTab} setActiveTab={setActiveTab} onClick={() => setMobileMenuOpen(false)} />
                        <NavButton id="traits" label="Intellectual Traits" icon={Shield} activeTab={activeTab} setActiveTab={setActiveTab} onClick={() => setMobileMenuOpen(false)} />
                    </div>
                    <div>
                        <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tools & Analysis</h3>
                        <NavButton id="questions" label="Three Question Types" icon={HelpCircle} activeTab={activeTab} setActiveTab={setActiveTab} onClick={() => setMobileMenuOpen(false)} />
                        <NavButton id="checklist" label="Reasoning Checklist" icon={MessageCircle} activeTab={activeTab} setActiveTab={setActiveTab} onClick={() => setMobileMenuOpen(false)} />
                        <NavButton id="solver" label="Problem Solver" icon={Zap} activeTab={activeTab} setActiveTab={setActiveTab} onClick={() => setMobileMenuOpen(false)} />
                    </div>
                    <div>
                        <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Development</h3>
                        <NavButton id="development" label="Stages & Barriers" icon={Layers} activeTab={activeTab} setActiveTab={setActiveTab} onClick={() => setMobileMenuOpen(false)} />
                        <NavButton id="barriers" label="Barriers to Thinking" icon={AlertTriangle} activeTab={activeTab} setActiveTab={setActiveTab} onClick={() => setMobileMenuOpen(false)} />
                    </div>
                    <div>
                        <NavButton id="ai-tutor" label="Socratic AI Tutor" icon={Sparkles} activeTab={activeTab} setActiveTab={setActiveTab} onClick={() => setMobileMenuOpen(false)} />
                    </div>
                </nav>
            </div>
        </>
    );
};

// --- Main App Layout ---

export default function CriticalThinkingHub() {
    const [activeTab, setActiveTab] = useState('home');

    const renderContent = () => {
        switch (activeTab) {
            case 'home': return <HomeView setActiveTab={setActiveTab} />;
            case 'elements': return <ElementsOfThoughtView setActiveTab={setActiveTab} />;
            case 'standards': return <StandardsView setActiveTab={setActiveTab} />;
            case 'traits': return <TraitsView />;
            case 'checklist': return <ChecklistView />;
            case 'solver': return <SolverView />;
            case 'questions': return <QuestionTypesView />;
            case 'development': return <DevelopmentView />;
            case 'barriers': return <BarriersView />;
            case 'ai-tutor': return <AITutorView context={activeTab === 'ai-tutor' ? 'General Thinking' : activeTab} />;
            default: return <ElementsOfThoughtView />;
        }
    };

    return (
        <div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
            <style>{customStyles}</style>
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-950 to-slate-900 relative flex flex-col pt-16 md:pt-0">
                <div className="flex-1">
                    {renderContent()}
                </div>

                {/* Footer */}
                <footer className="border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            {/* Creator Attribution */}
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-slate-500">Made with</span>
                                <span className="text-red-500 animate-pulse">♥</span>
                                <span className="text-slate-500">by</span>
                                <span className="font-bold text-emerald-400">FELMON FEKADU</span>
                            </div>

                            {/* Framework Attribution */}
                            <div className="text-center text-sm text-slate-500">
                                <p>Based on the Paul-Elder Critical Thinking Framework</p>
                                <p className="text-xs mt-1">
                                    Special thanks to <span className="text-emerald-400 font-medium">Dr. Richard Paul</span> & <span className="text-emerald-400 font-medium">Dr. Linda Elder</span>
                                </p>
                            </div>

                            {/* Year */}
                            <div className="text-sm text-slate-600">
                                © {new Date().getFullYear()}
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}