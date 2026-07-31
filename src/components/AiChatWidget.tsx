import React, { useState, useEffect, useRef } from 'react';
import { PolicyCheckbox } from './PolicyCheckbox';
import {
  MessageSquare,
  Send,
  Sparkles,
  X,
  Minimize2,
  RefreshCw,
  User,
  Bot,
  ChevronRight,
  Phone,
  Mail,
  CheckCircle2,
  Check,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Clock,
  Zap,
  Building2,
  Layers,
  Star,
  Loader2,
  ArrowRight
} from 'lucide-react';
import { TEMPLATES } from '../data/templates';
import { TemplateDemo } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  actionType?: 'none' | 'template_recommendation' | 'plan_recommendation' | 'extra_services_recommendation' | 'lead_form' | 'contact_info';
  actionData?: any;
}

interface AiChatWidgetProps {
  onSelectTemplate?: (template: TemplateDemo) => void;
  onOpenCustomQuote?: () => void;
}

const FAQS = [
  {
    q: 'What is included in Website Design Services?',
    a: 'Design Plaza creates bespoke 3D animated, high-converting websites built on React 19, Three.js, and Framer Motion. Every site includes responsive layouts, mobile optimization, speed tuning, and standard SEO setup.'
  },
  {
    q: 'What are the Pricing Plans?',
    a: 'We offer 3 straightforward plans:\n• **Basic ($599)**: 1-3 pages, 2 days delivery.\n• **Growth ($1,499)** ⭐ *Popular*: 5-8 pages, 3D hero, lead booking, 3 days delivery.\n• **Premium ($2,899)**: Unlimited pages, custom 3D WebGL models, payment gateway, 5 days delivery.'
  },
  {
    q: 'What Website Categories do you cover?',
    a: 'We cover 18+ industries including Real Estate, Construction, Hotels, Restaurants, Fitness, Fashion, Legal, Medical, Solar, SaaS Tech, E-commerce, and Dental Clinics.'
  },
  {
    q: 'How does the Booking Process work?',
    a: '1) Choose a template or custom request\n2) Select your pricing plan & add-ons\n3) Submit booking & schedule a 1-on-1 strategy call within 2 hours\n4) Delivery & live review in 2-5 business days.'
  },
  {
    q: 'What are Website Care Plans?',
    a: 'Keep your site fast & secure:\n• **Monthly Maintenance ($129/mo)**: Software updates, security monitoring, 24/7 backups.\n• **Monthly SEO Growth ($249/mo)**: Google rankings, keyword updates, technical SEO & monthly blogs.'
  },
  {
    q: 'What Extra Services are available?',
    a: 'Add-ons include Logo Design ($189), Branding Kit ($349), Content Writing ($189), AI Chatbot ($249), E-Commerce Store ($499), Payment Gateways ($169), and Speed Optimization ($149).'
  },
  {
    q: 'What is the Delivery Time?',
    a: 'Turnaround is super fast: 2 days for Basic Plan, 3 days for Growth Plan, and 5 days for Premium Plan with 100% satisfaction guarantee.'
  },
  {
    q: 'How do I contact Support?',
    a: 'Reach our USA Studio Team 24/7:\n📧 Email: support@designplaza.agency\n📞 Phone: +1 (800) 555-PLAZA\n🏢 Offices: New York, NY & San Francisco, CA.'
  }
];

export const AiChatWidget: React.FC<AiChatWidgetProps> = ({
  onSelectTemplate,
  onOpenCustomQuote
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'faq' | 'plans' | 'contact'>('chat');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [leadSubmitted, setLeadSubmitted] = useState<string | null>(null);

  // Lead Form state inside chat
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadNote, setLeadNote] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [agreedPolicy, setAgreedPolicy] = useState(false);

  // Chat History stored in LocalStorage
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem('designplaza_chat_history');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'msg-welcome',
        sender: 'bot',
        text: '👋 Hello! Welcome to **Design Plaza USA Studio**. I am **PlazaAI**, your Senior Web Strategy Assistant.\n\nHow can I help you today? Ask me about website designs, pricing plans, delivery timelines, or custom features.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: [
          'Which pricing plan is best for me?',
          'Recommend a website template for my business',
          'What is the delivery time?',
          'How do I book a website?'
        ],
        actionType: 'none'
      }
    ];
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('designplaza_chat_history', JSON.stringify(messages));
    } catch (e) {
      console.error(e);
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  const scrollToBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: Message = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);
    scrollToBottom();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await response.json();

      const botMsg: Message = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: data.reply || 'Thank you for your message! Our USA strategy team is available to assist you.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: data.suggestedQuestions,
        actionType: data.actionType,
        actionData: data.actionData
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: Message = {
        id: 'bot-err-' + Date.now(),
        sender: 'bot',
        text: "I'm here to help! You can review our pricing plans, website templates, or contact our USA team directly at **support@designplaza.agency**.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: ['View pricing plans', 'Recommend a template', 'Contact info']
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
      scrollToBottom();
    }
  };

  const handleClearHistory = () => {
    const resetMsgs: Message[] = [
      {
        id: 'msg-welcome',
        sender: 'bot',
        text: '👋 Chat history reset! I am **PlazaAI**, your USA Web Advisor. Ask me anything about our website design services, plans, or booking process.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: [
          'Which pricing plan is best for me?',
          'Recommend a website template for my business',
          'What extra services are available?',
          'Contact live support'
        ]
      }
    ];
    setMessages(resetMsgs);
    localStorage.removeItem('designplaza_chat_history');
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail) return;

    setIsSubmittingLead(true);
    try {
      const res = await fetch('/api/chat/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          phone: leadPhone,
          note: leadNote
        })
      });
      const data = await res.json();
      setLeadSubmitted(data.message || 'Lead request received!');

      const confirmMsg: Message = {
        id: 'bot-lead-' + Date.now(),
        sender: 'bot',
        text: `✅ **Lead Submitted Successfully!**\nThank you, **${leadName}**! Our USA Senior Architect will review your inquiry and contact you at **${leadEmail}** within 2 hours.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: ['Explore Website Templates', 'Check Pricing Plans', 'View Care Plans']
      };
      setMessages((prev) => [...prev, confirmMsg]);
      setLeadName('');
      setLeadEmail('');
      setLeadPhone('');
      setLeadNote('');
    } catch (err) {
      console.error('Lead submit error:', err);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <>
      {/* Floating Circular AI Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-400 p-0.5 shadow-[0_0_25px_rgba(37,99,235,0.55)] hover:shadow-[0_0_35px_rgba(16,185,129,0.75)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
            aria-label="Open AI Assistant Chat"
          >
            {/* Ambient outer ping glow */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 animate-ping opacity-20 pointer-events-none" />

            {/* Inner Circular Icon Container */}
            <div className="w-full h-full bg-gray-950 rounded-full flex items-center justify-center relative z-10 group-hover:bg-gray-900 transition-colors">
              <Bot className="w-6 h-6 text-blue-400 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-300" />
              <Sparkles className="w-3 h-3 text-amber-300 absolute top-2 right-2 animate-pulse" />
            </div>

            {/* Notification badge */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 z-20 w-5 h-5 bg-amber-400 text-gray-950 text-[10px] font-black rounded-full flex items-center justify-center shadow-md ring-2 ring-gray-950 animate-bounce">
                1
              </span>
            )}
          </button>
        )}
      </div>

      {/* Main Chat Drawer / Widget Window */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 sm:w-[420px] sm:h-[640px] w-full h-full bg-gray-950/95 sm:bg-gray-950 border border-gray-800/80 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl transition-all duration-300">
          
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-gray-900 via-gray-900 to-blue-950/80 border-b border-gray-800/80 px-4 py-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <div className="w-full h-full bg-gray-950 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-gray-950" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-extrabold text-white tracking-tight">PlazaAI Advisor</h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    USA Studio
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online • 24/7 Agency Support
                </p>
              </div>
            </div>

            {/* Top Action Controls */}
            <div className="flex items-center gap-1.5 text-gray-400">
              <button
                onClick={handleClearHistory}
                title="Reset Chat"
                className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Navigation Tabs */}
          <div className="bg-gray-900/60 border-b border-gray-800/60 px-3 py-1.5 flex items-center justify-between gap-1 text-xs shrink-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-1.5 px-2.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === 'chat'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>AI Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`flex-1 py-1.5 px-2.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === 'faq'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FAQ</span>
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className={`flex-1 py-1.5 px-2.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === 'plans'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Plans</span>
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`flex-1 py-1.5 px-2.5 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all whitespace-nowrap ${
                activeTab === 'contact'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>
          </div>

          {/* TAB CONTENT 1: AI CHAT */}
          {activeTab === 'chat' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[88%]">
                    {msg.sender === 'bot' && (
                      <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0 mb-1">
                        <Bot className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                    )}
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/20'
                          : 'bg-gray-900 border border-gray-800 text-gray-200 rounded-bl-none shadow-sm'
                      }`}
                    >
                      {/* Message Content formatted */}
                      <div className="space-y-1.5 whitespace-pre-line">
                        {msg.text.split('\n').map((paragraph, idx) => {
                          if (!paragraph.trim()) return null;
                          return <p key={idx}>{paragraph}</p>;
                        })}
                      </div>

                      {/* Action Card Rendering: Template Recommendation */}
                      {msg.actionType === 'template_recommendation' && msg.actionData && (
                        <div className="mt-3 p-3 rounded-xl bg-gray-950/80 border border-blue-500/30 space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-bold text-blue-400">
                            <span className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                              Recommended Template
                            </span>
                            <span>${msg.actionData.price || 1450}</span>
                          </div>
                          <h4 className="text-xs font-bold text-white">{msg.actionData.title || 'Featured Interactive Demo'}</h4>
                          <p className="text-[11px] text-gray-400">Industry: {msg.actionData.niche || 'General Business'}</p>
                          <button
                            onClick={() => {
                              const match = TEMPLATES.find((t) => t.id === msg.actionData.recommendedDemoId) || TEMPLATES[0];
                              if (onSelectTemplate) onSelectTemplate(match);
                            }}
                            className="w-full py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-blue-600/30"
                          >
                            <span>Preview Live 3D Demo</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      )}

                      {/* Action Card Rendering: Plan Recommendation */}
                      {msg.actionType === 'plan_recommendation' && (
                        <div className="mt-3 space-y-2">
                          <div className="p-2.5 rounded-xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 flex items-center justify-between">
                            <div>
                              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Most Popular</span>
                              <h5 className="text-xs font-bold text-white">Growth Plan — $1,499</h5>
                              <p className="text-[10px] text-gray-300">5-8 Pages • 3D Hero • Lead Booking • 3 Days</p>
                            </div>
                            <button
                              onClick={() => {
                                if (onOpenCustomQuote) onOpenCustomQuote();
                              }}
                              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold shrink-0"
                            >
                              Select Plan
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px]">
                            <div className="p-2 rounded-lg bg-gray-950 border border-gray-800 text-gray-300">
                              <p className="font-bold text-white">Basic Plan ($599)</p>
                              <p className="text-gray-400">1-3 Pages • 2 Days</p>
                            </div>
                            <div className="p-2 rounded-lg bg-gray-950 border border-gray-800 text-gray-300">
                              <p className="font-bold text-white">Premium ($2,899)</p>
                              <p className="text-gray-400">Unlimited • 5 Days</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Card Rendering: Lead Form Widget */}
                      {msg.actionType === 'lead_form' && (
                        <form onSubmit={handleLeadSubmit} className="mt-3 p-3 rounded-xl bg-gray-950 border border-emerald-500/30 space-y-2">
                          <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-bold">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Request Callback & Free Proposal</span>
                          </div>
                          <input
                            type="text"
                            placeholder="Your Name *"
                            value={leadName}
                            onChange={(e) => setLeadName(e.target.value)}
                            required
                            className="w-full px-2.5 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-white text-[11px] focus:outline-none focus:border-blue-500"
                          />
                          <input
                            type="email"
                            placeholder="Your Email *"
                            value={leadEmail}
                            onChange={(e) => setLeadEmail(e.target.value)}
                            required
                            className="w-full px-2.5 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-white text-[11px] focus:outline-none focus:border-blue-500"
                          />
                          <input
                            type="tel"
                            placeholder="Phone / WhatsApp (Optional)"
                            value={leadPhone}
                            onChange={(e) => setLeadPhone(e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-white text-[11px] focus:outline-none focus:border-blue-500"
                          />
                          <button
                            type="submit"
                            disabled={isSubmittingLead}
                            className="w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                          >
                            {isSubmittingLead ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Submit Strategy Request</span>}
                          </button>
                        </form>
                      )}

                      {/* Action Card Rendering: Contact Info */}
                      {msg.actionType === 'contact_info' && (
                        <div className="mt-3 p-3 rounded-xl bg-gray-950 border border-blue-500/30 space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-white">
                            <Phone className="w-3.5 h-3.5 text-blue-400" />
                            <span>Toll-Free USA: +1 (800) 555-PLAZA</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-white">
                            <Mail className="w-3.5 h-3.5 text-blue-400" />
                            <a href="mailto:support@designplaza.agency" className="hover:underline text-blue-300">
                              support@designplaza.agency
                            </a>
                          </div>
                        </div>
                      )}

                      <span className="block text-[9px] text-gray-500 mt-1 text-right">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>

                  {/* Suggested Question Chips */}
                  {msg.sender === 'bot' && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 ml-9">
                      {msg.suggestedQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(q)}
                          className="px-2.5 py-1 rounded-full bg-blue-950/60 hover:bg-blue-900/80 border border-blue-500/30 text-[11px] font-medium text-blue-300 hover:text-white transition-all text-left"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Animation */}
              {isTyping && (
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="px-3 py-2 rounded-2xl bg-gray-900 border border-gray-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          )}

          {/* TAB CONTENT 2: FREQUENTLY ASKED QUESTIONS */}
          {activeTab === 'faq' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="mb-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h4>
                <p className="text-[11px] text-gray-400">Click any question to ask PlazaAI instantly.</p>
              </div>
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-500/40 transition-colors"
                >
                  <button
                    onClick={() => {
                      setActiveTab('chat');
                      handleSendMessage(faq.q);
                    }}
                    className="w-full text-left font-bold text-xs text-blue-300 hover:text-blue-200 flex items-center justify-between gap-2"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                  <p className="mt-1.5 text-[11px] text-gray-400 leading-relaxed whitespace-pre-line">{faq.a}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB CONTENT 3: PRICING PLANS */}
          {activeTab === 'plans' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="text-center mb-1">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Design Plaza Pricing Plans</h4>
                <p className="text-[11px] text-gray-400">100% Satisfaction Guarantee & Fast USA Delivery</p>
              </div>

              {/* Basic Plan */}
              <div className="p-3.5 rounded-xl bg-gray-900 border border-gray-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-extrabold text-white">Basic Starter</h5>
                  <span className="text-xs font-bold text-emerald-400">$599</span>
                </div>
                <p className="text-[11px] text-gray-400">Best for small businesses needing a clean 1-3 page online presence.</p>
                <div className="text-[10px] text-gray-300 space-y-1">
                  <p className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-400" /> 1-3 Custom Animated Pages</p>
                  <p className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-400" /> Mobile Responsive Layout</p>
                  <p className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-400" /> 2 Business Days Delivery</p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('chat');
                    handleSendMessage('I want to book the Basic Plan ($599)');
                  }}
                  className="w-full py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-[11px] font-bold"
                >
                  Choose Basic Plan
                </button>
              </div>

              {/* Growth Plan */}
              <div className="p-3.5 rounded-xl bg-gradient-to-b from-blue-950 to-gray-900 border border-blue-500/50 space-y-2 relative">
                <span className="absolute -top-2.5 right-3 bg-blue-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
                  MOST POPULAR
                </span>
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-extrabold text-white">Growth Agency</h5>
                  <span className="text-xs font-bold text-blue-300">$1,499</span>
                </div>
                <p className="text-[11px] text-gray-300">Complete multi-page website with interactive 3D hero & lead engine.</p>
                <div className="text-[10px] text-gray-200 space-y-1">
                  <p className="flex items-center gap-1.5"><Check className="w-3 h-3 text-blue-400" /> 5-8 Custom Animated Pages</p>
                  <p className="flex items-center gap-1.5"><Check className="w-3 h-3 text-blue-400" /> Interactive 3D Hero Banner</p>
                  <p className="flex items-center gap-1.5"><Check className="w-3 h-3 text-blue-400" /> Instant Lead Booking & Calendar</p>
                  <p className="flex items-center gap-1.5"><Check className="w-3 h-3 text-blue-400" /> 3 Business Days Delivery</p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('chat');
                    handleSendMessage('I want to book the Growth Plan ($1,499)');
                  }}
                  className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold shadow-md shadow-blue-600/30"
                >
                  Choose Growth Plan
                </button>
              </div>

              {/* Premium Plan */}
              <div className="p-3.5 rounded-xl bg-gray-900 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-extrabold text-amber-300">Premium Enterprise</h5>
                  <span className="text-xs font-bold text-amber-300">$2,899</span>
                </div>
                <p className="text-[11px] text-gray-400">High-scale custom WebGL 3D models, payment gateway, and priority support.</p>
                <div className="text-[10px] text-gray-300 space-y-1">
                  <p className="flex items-center gap-1.5"><Check className="w-3 h-3 text-amber-400" /> Unlimited Custom Pages</p>
                  <p className="flex items-center gap-1.5"><Check className="w-3 h-3 text-amber-400" /> Custom 3D WebGL Models</p>
                  <p className="flex items-center gap-1.5"><Check className="w-3 h-3 text-amber-400" /> Stripe / PayPal Integration</p>
                  <p className="flex items-center gap-1.5"><Check className="w-3 h-3 text-amber-400" /> 5 Business Days Delivery</p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('chat');
                    handleSendMessage('I want to book the Premium Plan ($2,899)');
                  }}
                  className="w-full py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-bold"
                >
                  Choose Premium Plan
                </button>
              </div>
            </div>
          )}

          {/* TAB CONTENT 4: CONTACT & LIVE SUPPORT */}
          {activeTab === 'contact' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-900/40 via-gray-900 to-indigo-950/60 border border-blue-500/30 space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
                  <Building2 className="w-4 h-4" />
                  <span>Design Plaza USA Headquarters</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Our USA design architects and WebGL engineers are available 24/7 for strategy consultations and project onboarding.
                </p>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2.5 text-gray-200">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>+1 (800) 555-PLAZA (+1 800-555-7529)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-200">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <a href="mailto:support@designplaza.agency" className="text-blue-300 hover:underline">
                      support@designplaza.agency
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5 text-gray-200">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Response Time: Within 15 Minutes</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setActiveTab('chat');
                      handleSendMessage('I want to schedule a live call with a lead architect');
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Request Immediate Call Back</span>
                  </button>
                </div>
              </div>

              {/* Direct Inquiry Form */}
              <form onSubmit={handleLeadSubmit} className="p-4 rounded-2xl bg-gray-900 border border-gray-800 space-y-3">
                <h4 className="text-xs font-bold text-white">Send Direct Message to Studio</h4>
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-gray-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Business Email *"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-gray-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
                <textarea
                  placeholder="Tell us about your project or questions..."
                  value={leadNote}
                  onChange={(e) => setLeadNote(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-gray-800 text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
                />
                <PolicyCheckbox
                  id="chk-chat-lead"
                  checked={agreedPolicy}
                  onChange={setAgreedPolicy}
                />
                <button
                  type="submit"
                  disabled={isSubmittingLead || !agreedPolicy}
                  className={`w-full py-2 rounded-xl text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 ${
                    agreedPolicy && !isSubmittingLead
                      ? 'bg-emerald-600 hover:bg-emerald-500 cursor-pointer'
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-60'
                  }`}
                  title={agreedPolicy ? 'Send message' : 'Please agree to the Website Ownership Policy first'}
                >
                  {isSubmittingLead ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Send Message</span>}
                </button>
              </form>
            </div>
          )}

          {/* INPUT BAR (When on Chat Tab) */}
          {activeTab === 'chat' && (
            <div className="bg-gray-900/90 border-t border-gray-800 p-3 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask PlazaAI anything..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-gray-950 border border-gray-800 text-white text-xs focus:outline-none focus:border-blue-500/80 placeholder-gray-500"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white transition-all shrink-0 shadow-md shadow-blue-600/30"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

        </div>
      )}
    </>
  );
};
