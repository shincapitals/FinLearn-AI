/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Zap, 
  PenTool, 
  Rocket, 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  X, 
  Send, 
  TrendingUp, 
  PieChart, 
  Activity,
  Loader2,
  Sparkles,
  Settings,
  ExternalLink
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from './lib/utils';
import { MODULES, Module } from './data/modules';
import { chatWithAI, analyzeFinancialImage, getRealTimeCompanyData, getCompanyESGData } from './services/gemini';

type TabType = 'theory' | 'deepDive' | 'exercise' | 'project';
type PersonaType = 'General' | 'Value Investing' | 'Growth Stocks' | 'Technical Analysis' | 'Dividend Investing';

export default function App() {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(3); // Start with Module 4 (Coca-Cola example from image)
  const [activeTab, setActiveTab] = useState<TabType>('deepDive');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [persona, setPersona] = useState<PersonaType>('General');
  const [customKeywords, setCustomKeywords] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Chào bạn! Tôi là trợ lý AI chuyên về phân tích tài chính. Bạn cần hỗ trợ gì về bài học hôm nay không?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [realTimeData, setRealTimeData] = useState<Record<number, string>>({});
  const [esgData, setEsgData] = useState<Record<number, string>>({});
  const [isLoadingRealTime, setIsLoadingRealTime] = useState(false);

  const currentModule = MODULES[currentModuleIndex];

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleFetchRealTimeData = async () => {
    setIsLoadingRealTime(true);
    try {
      const [data, esg] = await Promise.all([
        getRealTimeCompanyData(currentModule.companyExample),
        currentModule.id === 1 ? getCompanyESGData(currentModule.companyExample) : Promise.resolve(null)
      ]);
      setRealTimeData(prev => ({ ...prev, [currentModule.id]: data || 'Không có dữ liệu thực tế.' }));
      if (esg) setEsgData(prev => ({ ...prev, [currentModule.id]: esg }));
    } catch (error: any) {
      console.error('Error fetching real-time data:', error);
      let errorMsg = 'Đã xảy ra lỗi khi tải dữ liệu thực tế. Vui lòng thử lại sau.';
      if (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('RESOURCE_EXHAUSTED')) {
        errorMsg = 'Hệ thống đang quá tải (vượt quá hạn mức API). Vui lòng đợi một lát rồi thử lại.';
      }
      setRealTimeData(prev => ({ ...prev, [currentModule.id]: errorMsg }));
    } finally {
      setIsLoadingRealTime(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMsg = inputMessage;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await chatWithAI(userMsg, persona, customKeywords);
      setChatMessages(prev => [...prev, { role: 'ai', text: response || 'Xin lỗi, tôi gặp lỗi khi xử lý câu hỏi.' }]);
    } catch (error: any) {
      console.error(error);
      const isQuotaError = error?.status === 429 || 
                          error?.message?.includes('429') || 
                          error?.message?.includes('RESOURCE_EXHAUSTED') ||
                          error?.message?.includes('quota');
      
      let errorMsg = 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      if (isQuotaError) {
        errorMsg = 'Hệ thống đang quá tải (vượt quá hạn mức API). Vui lòng đợi một lát rồi thử lại.';
      }
      setChatMessages(prev => [...prev, { role: 'ai', text: errorMsg }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRetryLastMessage = async () => {
    const lastUserMsg = [...chatMessages].reverse().find(m => m.role === 'user')?.text;
    if (lastUserMsg) {
      setInputMessage(lastUserMsg);
      handleSendMessage();
    }
  };

  const tabs = [
    { id: 'theory', label: 'Lý thuyết', icon: BookOpen },
    { id: 'deepDive', label: 'Deep Dive', icon: Zap },
    { id: 'exercise', label: 'Bài tập', icon: PenTool },
    { id: 'project', label: 'Project', icon: Rocket },
  ];

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#E4E6EB] font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0F1115]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <TrendingUp className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Đọc Hiểu Báo Cáo Tài Chính</h1>
              <p className="text-xs text-zinc-500 font-medium">Mini Course • Học qua ví dụ thực tế từ S&P500 & VN30</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Removed Progress Bar */}
          </div>
        </div>

        {/* Module Navigation */}
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
          <div className="flex items-center gap-8 h-14 no-scrollbar">
            {MODULES.map((mod, idx) => (
              <button
                key={mod.id}
                onClick={() => setCurrentModuleIndex(idx)}
                className={cn(
                  "text-sm font-medium whitespace-nowrap transition-all relative h-full flex items-center px-1",
                  currentModuleIndex === idx ? "text-blue-500" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <span className="mr-2 opacity-50">{idx + 1}</span>
                {mod.shortTitle}
                {currentModuleIndex === idx && (
                  <motion.div layoutId="activeModule" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Module Header */}
        <div className="mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-bold uppercase tracking-widest mb-4">
            Module {currentModuleIndex + 1} / {MODULES.length}
          </div>
          <h2 className="text-5xl font-bold tracking-tight mb-4">Thực Hành: Phân Tích {currentModule.companyExample}</h2>
          <p className="text-zinc-400 text-lg max-w-2xl">{currentModule.description}</p>
        </div>

        {/* Content Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border relative",
                  activeTab === tab.id 
                    ? "bg-white/5 border-white/10 text-white shadow-xl" 
                    : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-4 h-4", activeTab === tab.id ? "text-blue-400" : "text-zinc-600")} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="activeTab" className="absolute -bottom-[1px] left-4 right-4 h-0.5 bg-blue-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto">
          <motion.div
              key={`${currentModuleIndex}-${activeTab}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#16191F] rounded-3xl border border-white/5 p-8 min-h-[500px] shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-6 text-blue-500">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {tabs.find(t => t.id === activeTab)?.label} — PHÂN TÍCH CHUYÊN SÂU
                </span>
              </div>

              <div className="prose prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {currentModule.sections[activeTab] as string}
                </ReactMarkdown>

                {activeTab === 'theory' && currentModule.id === 1 && esgData[1] && (
                  <div className="mt-8 p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-emerald-500/10 rounded-xl">
                        <Sparkles className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-emerald-400">Sáng kiến ESG mới nhất (Apple)</h4>
                        <p className="text-xs text-emerald-500/60 font-medium uppercase tracking-wider">Cập nhật 2024/2025</p>
                      </div>
                    </div>
                    <div className="text-zinc-300 text-sm leading-relaxed prose prose-invert prose-emerald max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{esgData[1]}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>

              {(activeTab === 'theory' || activeTab === 'deepDive' || activeTab === 'exercise') && (
                <div className="mt-10 pt-10 border-t border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-xl">
                        <Activity className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">Dữ liệu thực tế: {currentModule.companyExample}</h3>
                        <p className="text-xs text-zinc-500">Nhấn nút để cập nhật dữ liệu mới nhất qua Google Search</p>
                      </div>
                    </div>
                    {isLoadingRealTime && (
                      <div className="flex items-center gap-2 text-blue-500 text-xs font-bold animate-pulse">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        ĐANG CẬP NHẬT...
                      </div>
                    )}
                  </div>

                  <div className={cn(
                    "bg-white/5 rounded-2xl p-6 border border-white/5 relative overflow-hidden min-h-[120px] flex flex-col items-center justify-center",
                    isLoadingRealTime && "opacity-50"
                  )}>
                    {isLoadingRealTime ? (
                      <div className="flex flex-col items-center justify-center py-6 gap-4">
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                        <p className="text-sm text-zinc-500">Đang truy xuất dữ liệu tài chính mới nhất...</p>
                      </div>
                    ) : realTimeData[currentModule.id] ? (
                      <div className="prose prose-invert prose-sm max-w-none w-full">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {realTimeData[currentModule.id]}
                        </ReactMarkdown>
                        <button 
                          onClick={handleFetchRealTimeData}
                          className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/20 text-blue-400 text-xs font-bold hover:bg-blue-600/30 transition-all border border-blue-600/20"
                        >
                          <Zap className="w-3 h-3" />
                          CẬP NHẬT LẠI
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-zinc-500 text-sm mb-4">Dữ liệu thực tế chưa được tải.</p>
                        <button 
                          onClick={handleFetchRealTimeData}
                          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all mx-auto"
                        >
                          <Zap className="w-4 h-4" />
                          CẬP NHẬT DỮ LIỆU THỰC TẾ
                        </button>
                      </div>
                    )}
                    
                    {/* Decorative background element */}
                    <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                      <TrendingUp className="w-32 h-32 text-blue-500" />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
              <button
                disabled={currentModuleIndex === 0}
                onClick={() => setCurrentModuleIndex(prev => prev - 1)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/5 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                Trước
              </button>
              <div className="text-zinc-600 font-mono text-sm">
                {currentModuleIndex + 1} / {MODULES.length}
              </div>
              <button
                disabled={currentModuleIndex === MODULES.length - 1}
                onClick={() => setCurrentModuleIndex(prev => prev + 1)}
                className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all"
              >
                Tiếp theo
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>

      {/* Floating AI Chatbot */}
      <div className="fixed bottom-8 right-8 z-50">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-20 right-0 w-96 h-[550px] bg-[#1A1D23] rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Trợ lý FinLearn AI</h4>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] text-zinc-500 font-medium">Đang trực tuyến</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-all">
                  <X className="w-4 h-4 text-zinc-500" />
                </button>
              </div>

              {/* Persona Selection */}
              <div className="px-4 py-3 bg-black/20 border-b border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Settings className="w-3 h-3 text-zinc-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Chế độ chuyên gia</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {(['General', 'Value Investing', 'Growth Stocks', 'Technical Analysis', 'Dividend Investing'] as PersonaType[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPersona(p)}
                      className={cn(
                        "flex-1 min-w-[100px] py-1.5 rounded-lg text-[10px] font-bold border transition-all",
                        persona === p 
                          ? "bg-blue-600 border-blue-500 text-white" 
                          : "bg-white/5 border-white/10 text-zinc-500 hover:text-zinc-300"
                      )}
                    >
                      {p === 'General' ? 'Tổng quát' : 
                       p === 'Value Investing' ? 'Giá trị' : 
                       p === 'Growth Stocks' ? 'Tăng trưởng' :
                       p === 'Technical Analysis' ? 'Kỹ thuật' : 'Cổ tức'}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {['ESG', 'Định lượng', 'So sánh ngành', 'Rủi ro', 'Dòng tiền'].map((kw) => {
                    const isActive = customKeywords.split(',').map(k => k.trim()).includes(kw);
                    return (
                      <button
                        key={kw}
                        onClick={() => {
                          setCustomKeywords(prev => {
                            const keywords = prev.split(',').map(k => k.trim()).filter(k => k !== '');
                            if (keywords.includes(kw)) {
                              return keywords.filter(k => k !== kw).join(', ');
                            } else {
                              return [...keywords, kw].join(', ');
                            }
                          });
                        }}
                        className={cn(
                          "px-2 py-1 rounded-md border text-[9px] transition-all",
                          isActive 
                            ? "bg-blue-500/20 border-blue-500/50 text-blue-400" 
                            : "bg-white/5 border-white/10 text-zinc-400 hover:text-blue-400 hover:border-blue-500/30"
                        )}
                      >
                        {isActive ? '✓ ' : '+ '}{kw}
                      </button>
                    );
                  })}
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Tùy chỉnh: 'ESG', 'Quantitative'..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[10px] focus:outline-none focus:border-blue-500 transition-all"
                    value={customKeywords}
                    onChange={(e) => setCustomKeywords(e.target.value)}
                  />
                  {customKeywords && (
                    <button 
                      onClick={() => setCustomKeywords('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[80%] p-3 rounded-2xl text-sm",
                      msg.role === 'user' 
                        ? "bg-blue-600 text-white rounded-tr-none" 
                        : "bg-white/5 text-[#E4E6EB] border border-white/5 rounded-tl-none"
                    )}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                      {msg.role === 'ai' && (msg.text.includes('quá tải') || msg.text.includes('hạn mức')) && (
                        <button 
                          onClick={handleRetryLastMessage}
                          className="mt-2 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-600/20 text-blue-400 text-[10px] font-bold hover:bg-blue-600/30 transition-all border border-blue-600/20"
                        >
                          <Zap className="w-3 h-3" />
                          THỬ LẠI CÂU HỎI NÀY
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                      <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-4 border-t border-white/5 bg-black/20">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Hỏi AI về tài chính..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all pr-12"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:bg-blue-600 hover:text-white rounded-lg transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/40 hover:scale-110 active:scale-95 transition-all group"
        >
          <MessageSquare className="text-white w-6 h-6 group-hover:rotate-12 transition-all" />
        </button>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 text-center">
        <p className="text-zinc-600 text-xs">© 2026 FinLearn AI • Nền tảng học phân tích tài chính thông minh</p>
      </footer>
    </div>
  );
}
