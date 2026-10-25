import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  X,
  Database,
  Key,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Layers,
  MessageSquare,
  Check,
  Copy,
  ChevronDown,
  ArrowRight,
  Info,
  MapPin,
  ShoppingBag,
  PackageCheck,
  Mic,
  MicOff,
} from 'lucide-react';
import { Product } from '../../types';
import { IndusCodeBadge } from '../common/IndusCodeBadge';
import { HardwareProductImage } from '../common/HardwareProductImage';
import {
  sendChatMessage,
  ChatMessage,
  getGeminiApiKey,
  setGeminiApiKey,
} from '../../services/chatService';

interface ChatbotWidgetProps {
  onSelectProduct: (product: Product) => void;
  onNavigate: (tab: string, state?: any) => void;
}

const QUICK_SUGGESTIONS = [
  '3x12 लकड़ी का स्क्रू और गिट्टी',
  'Gala bolt M4 aur dhibri kahan milegi?',
  'PVC Pipe 20mm ke sath kya lagta hai?',
  'Tala aur kabja dikhao',
  'Find Wood Screw 3x12 mm',
  'How does Indus Code work?',
];

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  onSelectProduct,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Hello! I am **IndusAssistant**, your adaptive AI hardware catalog and specification assistant for **INDUS CODE**.\n\nआप मुझसे **हिंदी (Hindi)** या **Hinglish** में भी पूछ सकते हैं:\n* 📍 **Workshop Storage & Regional Supplier Locations**\n* 🔗 **Companions & Accessories (इसके साथ क्या लगता है)**\n* 🛒 **Frequently Bought Together (लोग आमतौर पर क्या खरीदते हैं)**\n\n*Try asking: "3x12 लकड़ी का स्क्रू और गिट्टी", "Gala bolt M4 aur dhibri kahan milegi", or "PVC pipe 20mm ke sath kya lagta hai"*.`,
      timestamp: new Date().toISOString(),
      suggestedActions: [
        { label: '3x12 लकड़ी का स्क्रू और गिट्टी', action: 'search', searchQuery: '3x12 लकड़ी का स्क्रू और गिट्टी' },
        { label: 'Gala bolt M4 aur dhibri', action: 'search', searchQuery: 'Gala bolt M4 aur dhibri' },
        { label: 'PVC pipe 20mm & companions', action: 'search', searchQuery: 'PVC Pipe 20 mm' },
      ],
      modelUsed: 'grounded-engine',
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [apiKeyInput, setApiKeyInput] = useState<string>('');
  const [apiKeySaved, setApiKeySaved] = useState<boolean>(false);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Speak to Search Voice State
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechLanguage, setSpeechLanguage] = useState<'en-IN' | 'hi-IN'>('en-IN');
  const [voiceFeedback, setVoiceFeedback] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Clean up speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceFeedback('Voice recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      setTimeout(() => setVoiceFeedback(null), 4000);
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = speechLanguage;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceFeedback(
          speechLanguage === 'hi-IN'
            ? 'सुन रहा हूँ... बोलिए (उदा. "3x12 लकड़ी का स्क्रू और गिट्टी")'
            : 'Listening... Speak now (e.g. "M4 machine screw and hex nut")'
        );
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const captured = finalTranscript || interimTranscript;
        if (captured) {
          setInputMessage(captured);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setVoiceFeedback('Microphone permission blocked. Please allow mic access in your browser settings.');
        } else if (event.error === 'no-speech') {
          setVoiceFeedback('No speech detected. Please try speaking again.');
        } else {
          setVoiceFeedback(`Voice notice: ${event.error}`);
        }
        setIsListening(false);
        setTimeout(() => setVoiceFeedback(null), 4000);
      };

      recognition.onend = () => {
        setIsListening(false);
        setTimeout(() => setVoiceFeedback(null), 1500);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
      setVoiceFeedback('Could not initialize microphone.');
      setTimeout(() => setVoiceFeedback(null), 3000);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setVoiceFeedback(null);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Check API key status on mount
  useEffect(() => {
    const key = getGeminiApiKey();
    setHasApiKey(!!key);
    setApiKeyInput(key);
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    setInputMessage('');

    // Append user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(query, [...messages, userMsg]);
      setMessages(prev => [...prev, response]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: `An unexpected issue occurred while querying the catalog. Please check your query or verify your connection.`,
          timestamp: new Date().toISOString(),
          suggestedActions: [
            { label: 'Browse Search Catalog', action: 'navigate', targetTab: 'search' },
          ],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSaveApiKey = () => {
    setGeminiApiKey(apiKeyInput);
    setHasApiKey(!!apiKeyInput.trim());
    setApiKeySaved(true);
    setTimeout(() => setApiKeySaved(false), 2000);
    setShowSettings(false);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: `Chat history cleared. How can I help you explore the **INDUS CODE** national hardware catalog today?`,
        timestamp: new Date().toISOString(),
        suggestedActions: [
          { label: 'Find M10 Hex Bolt', action: 'search', searchQuery: 'M10 Hex Bolt' },
          { label: 'Search Bearing 6205', action: 'search', searchQuery: 'Bearing 6205' },
        ],
        modelUsed: 'grounded-engine',
      },
    ]);
  };

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Robust Markdown Parser for industrial formatting
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');

    return (
      <div className="space-y-2 text-sm leading-relaxed">
        {lines.map((line, lineIdx) => {
          const trimmed = line.trim();

          // Empty line
          if (!trimmed) {
            return <div key={lineIdx} className="h-1" />;
          }

          // Headers
          if (trimmed.startsWith('#### ')) {
            return (
              <h4 key={lineIdx} className="font-bold text-[#ffd899] text-xs sm:text-sm mt-3 pt-2 border-t border-[#43230e] flex items-center gap-1.5">
                {parseInlineSpans(trimmed.replace('#### ', ''))}
              </h4>
            );
          }
          if (trimmed.startsWith('### ')) {
            return (
              <h3 key={lineIdx} className="font-bold text-[#fff4e0] text-sm sm:text-base mt-2">
                {parseInlineSpans(trimmed.replace('### ', ''))}
              </h3>
            );
          }

          // Bullet points
          if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            const content = trimmed.substring(2);
            return (
              <div key={lineIdx} className="flex items-start gap-2 pl-1 text-[#f5eedc]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#dfa856] shrink-0 mt-2" />
                <div className="flex-1">{parseInlineSpans(content)}</div>
              </div>
            );
          }

          // Sub-bullets
          if (trimmed.startsWith('  * ') || trimmed.startsWith('  - ')) {
            const content = trimmed.substring(4);
            return (
              <div key={lineIdx} className="flex items-start gap-2 pl-4 text-xs text-[#caa27c]">
                <span className="w-1 h-1 rounded-full bg-[#967150] shrink-0 mt-1.5" />
                <div className="flex-1">{parseInlineSpans(content)}</div>
              </div>
            );
          }

          // Standard paragraph
          return (
            <p key={lineIdx} className="text-[#f5eedc]">
              {parseInlineSpans(trimmed)}
            </p>
          );
        })}
      </div>
    );
  };

  // Helper to parse inline bold, code, and Indus Code highlights
  const parseInlineSpans = (text: string): React.ReactNode => {
    // Regex splits for inline tokens: **bold**, `code`, or IDC-XXX-000000
    const parts = text.split(/(\*\*.*?\*\*|`.*?`|IDC-[A-Z]{3}-\d{6})/g);

    return parts.map((part, idx) => {
      if (!part) return null;

      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-bold text-[#fff4e0]">{part.slice(2, -2)}</strong>;
      }

      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={idx} className="italic text-[#dfa856]">{part.slice(1, -1)}</em>;
      }

      if (part.startsWith('`') && part.endsWith('`')) {
        const codeContent = part.slice(1, -1);
        if (codeContent.startsWith('IDC-')) {
          return (
            <span
              key={idx}
              onClick={(e) => handleCopyCode(codeContent, e)}
              className="inline-flex items-center gap-1 font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-[#100702] text-amber-400 border border-[#522910] cursor-pointer hover:bg-[#2b1509] transition-colors shadow-2xs"
              title="Click to copy Indus Code"
            >
              <span>{codeContent}</span>
              {copiedCode === codeContent ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-3 h-3 text-[#aa8464]" />
              )}
            </span>
          );
        }
        return (
          <code key={idx} className="font-mono text-xs bg-[#100702] text-[#ffd899] px-1 py-0.5 rounded border border-[#43230e]">
            {codeContent}
          </code>
        );
      }

      if (/^IDC-[A-Z]{3}-\d{6}$/.test(part)) {
        return (
          <span
            key={idx}
            onClick={(e) => handleCopyCode(part, e)}
            className="inline-flex items-center gap-1 font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-[#100702] text-amber-400 border border-[#522910] cursor-pointer hover:bg-[#2b1509] transition-colors shadow-2xs"
            title="Click to copy Indus Code"
          >
            <span>{part}</span>
            {copiedCode === part ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <Copy className="w-3 h-3 text-[#aa8464]" />
            )}
          </span>
        );
      }

      return part;
    });
  };

  return (
    <>
      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[440px] h-[640px] max-h-[85vh] bg-[#1a0e06] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] border-2 border-[#54290e] flex flex-col z-50 overflow-hidden font-sans transition-all duration-200 animate-in fade-in slide-in-from-bottom-4">
          {/* Header - Hardwood Cornice */}
          <div className="bg-[#120803] text-[#fff4e0] px-4 py-3 flex items-center justify-between border-b-2 border-[#43230e] shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2b1509] border border-[#522910] flex items-center justify-center text-amber-400 shadow-inner">
                <Bot className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm tracking-tight text-[#fff4e0]">IndusAssistant</h3>
                  <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-600/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-[#a47a55] flex items-center gap-1">
                  <span>Grounded Catalog AI</span>
                  <span>•</span>
                  <span className="text-amber-400 font-mono text-[10px]">
                    {hasApiKey ? 'Gemini 2.5 Flash' : 'Registry Engine'}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-1.5 rounded-lg transition-colors ${
                  showSettings ? 'bg-[#3b1d09] text-amber-400' : 'text-[#a47a55] hover:text-white hover:bg-[#2b1509]'
                }`}
                title="Configure Gemini API Key"
                aria-label="Settings"
              >
                <Key className="w-4 h-4" />
              </button>
              <button
                onClick={handleClearHistory}
                className="p-1.5 rounded-lg text-[#a47a55] hover:text-white hover:bg-[#2b1509] transition-colors"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#a47a55] hover:text-white hover:bg-[#2b1509] transition-colors"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Settings Drawer */}
          {showSettings && (
            <div className="bg-[#1f1006] p-3 text-xs text-[#dec2a2] border-b border-[#43230e] animate-in fade-in duration-150">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-[#ffd899] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Gemini API Configuration
                </span>
                <span className="text-[10px] text-[#a47a55]">Optional</span>
              </div>
              <p className="text-[11px] text-[#a47a55] mb-2 leading-relaxed">
                IndusAssistant features built-in offline Hindi &amp; Hinglish vernacular processing. You can optionally attach a free Google Gemini API key (<a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline font-semibold">Get API Key</a>) to activate generative conversational reasoning in Hindi, Hinglish, and regional dialects.
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={e => setApiKeyInput(e.target.value)}
                  placeholder="Paste GEMINI_API_KEY..."
                  className="flex-1 bg-[#100702] border border-[#43230e] rounded-lg px-2.5 py-1.5 text-white text-xs placeholder:text-[#875d38] focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={handleSaveApiKey}
                  className="brass-plate px-3 py-1 font-bold text-xs rounded-lg transition-colors shrink-0"
                >
                  {apiKeySaved ? 'Saved!' : 'Save'}
                </button>
              </div>
            </div>
          )}

          {/* Quick Suggestion Chips */}
          <div className="bg-[#180c05] border-b border-[#3d1e0c] px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            <span className="text-[11px] font-bold text-[#ffd899] uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Try:
            </span>
            {QUICK_SUGGESTIONS.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(suggestion)}
                disabled={isLoading}
                className="whitespace-nowrap text-xs bg-[#241207] hover:bg-[#361a0a] text-[#dec2a2] hover:text-[#fff4e0] px-2.5 py-1 rounded-full border border-[#4a2610] hover:border-amber-600/50 transition-colors shadow-sm shrink-0"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#140a04]">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Sender Tag */}
                <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-[#a47a55]">
                  {msg.sender === 'assistant' ? (
                    <>
                      <Bot className="w-3 h-3 text-amber-500" />
                      <span className="font-semibold text-[#dec2a2]">IndusAssistant</span>
                      {msg.modelUsed === 'gemini-2.5-flash' && (
                        <span className="text-[9px] bg-[#331808] text-amber-300 px-1 rounded font-mono border border-[#522910]">Gemini 2.5</span>
                      )}
                      {msg.languageDetected && msg.languageDetected !== 'english' && (
                        <span className="text-[9px] bg-[#1a2d1d] text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold border border-emerald-700/60 uppercase">
                          {msg.languageDetected}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="font-semibold text-[#dec2a2]">You</span>
                  )}
                  <span>•</span>
                  <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[90%] rounded-2xl px-4 py-3 shadow-md ${
                    msg.sender === 'user'
                      ? 'brass-plate font-semibold text-[#1a0f00] rounded-tr-xs'
                      : 'bg-[#241208] border border-[#48240f] text-[#f7ecd5] rounded-tl-xs'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    renderFormattedText(msg.text)
                  )}

                  {/* Clickable Product Preview Cards (if matched) */}
                  {msg.matchedProducts && msg.matchedProducts.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#3d1e0c] space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#ffd899] flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5 text-amber-500" />
                          Requested Hardware ({msg.matchedProducts.length})
                        </span>
                        <span className="text-[10px] text-[#aa8464] font-normal">
                          canonical specifications
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {msg.matchedProducts.map(product => (
                          <div
                            key={product.id}
                            onClick={() => onSelectProduct(product)}
                            className="group p-2.5 bg-[#180c05] hover:bg-[#2a1408] border border-[#43230e] hover:border-amber-600/60 rounded-xl cursor-pointer transition-all flex items-start gap-3 text-left shadow-sm"
                          >
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#100702] border border-[#43230e] shrink-0 group-hover:scale-105 transition-transform">
                              <HardwareProductImage
                                src={product.primaryImageUrl}
                                alt={product.canonicalName}
                                indusCode={product.indusCode}
                                canonicalName={product.canonicalName}
                                categoryId={product.categoryId}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-mono text-[11px] font-bold text-amber-400 bg-[#2b1509] px-1.5 py-0.5 rounded border border-[#522910]">
                                  {product.indusCode}
                                </span>
                                <span className="text-[10px] text-emerald-300 bg-emerald-950/80 px-1.5 py-0.5 rounded font-bold border border-emerald-600/50">
                                  Verified
                                </span>
                                {product.specifications?.storageLocation && (
                                  <span className="text-[10px] text-[#ffd899] bg-[#2d160a] px-1.5 py-0.5 rounded border border-[#5c2f14] flex items-center gap-0.5">
                                    <MapPin className="w-2.5 h-2.5 text-amber-400" />
                                    Bin: {product.specifications.storageLocation}
                                  </span>
                                )}
                              </div>
                              <h5 className="font-bold text-xs text-[#fff4e0] truncate mt-1 group-hover:text-amber-400 transition-colors">
                                {product.canonicalName}
                              </h5>
                              <p className="text-[11px] text-[#a47a55] truncate">
                                {product.specifications?.material
                                  ? String(product.specifications.material)
                                  : product.description}
                              </p>
                              <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-amber-400 group-hover:underline">
                                <span>View Specifications &amp; Suppliers</span>
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Frequently Bought Together & Companion Products Cards */}
                  {msg.companionProducts && msg.companionProducts.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#3d1e0c] space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#dfa856] flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <ShoppingBag className="w-3.5 h-3.5 text-[#dfa856]" />
                          Frequently Bought Together &amp; Companions
                        </span>
                        <span className="text-[10px] text-[#aa8464] lowercase font-normal">
                          what people usually buy
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {msg.companionProducts.map(companion => (
                          <div
                            key={companion.id}
                            onClick={() => onSelectProduct(companion)}
                            className="group p-2.5 bg-[#1b0d05] hover:bg-[#2e160a] border border-[#522a12] hover:border-[#dfa856]/70 rounded-xl cursor-pointer transition-all flex items-start gap-3 text-left shadow-sm relative overflow-hidden"
                          >
                            <div className="w-11 h-11 rounded-lg overflow-hidden bg-[#100702] border border-[#43230e] shrink-0 group-hover:scale-105 transition-transform">
                              <HardwareProductImage
                                src={companion.primaryImageUrl}
                                alt={companion.canonicalName}
                                indusCode={companion.indusCode}
                                canonicalName={companion.canonicalName}
                                categoryId={companion.categoryId}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-mono text-[10px] font-bold text-[#dfa856] bg-[#2b1509] px-1.5 py-0.5 rounded border border-[#522910]">
                                  {companion.indusCode}
                                </span>
                                <span className="text-[9px] uppercase tracking-wider text-amber-300 bg-amber-950/70 px-1 py-0.5 rounded font-bold border border-amber-700/40">
                                  Companion
                                </span>
                                {companion.specifications?.storageLocation && (
                                  <span className="text-[9px] text-[#baa085] flex items-center gap-0.5">
                                    <MapPin className="w-2.5 h-2.5 text-amber-500" />
                                    Bin: {companion.specifications.storageLocation}
                                  </span>
                                )}
                              </div>
                              <h5 className="font-bold text-xs text-[#fff4e0] truncate mt-1 group-hover:text-amber-400 transition-colors">
                                {companion.canonicalName}
                              </h5>
                              <p className="text-[10px] text-[#aa8464] truncate">
                                {companion.description}
                              </p>
                              <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-[#dfa856] group-hover:underline">
                                <span>View Companion Item</span>
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggested Action Buttons */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-[#3d1e0c] flex flex-wrap gap-1.5">
                      {msg.suggestedActions.map((action, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => {
                            if (action.action === 'select_product' && action.product) {
                              onSelectProduct(action.product);
                            } else if (action.action === 'search') {
                              onNavigate('search', { query: action.searchQuery || '' });
                            } else if (action.action === 'navigate' && action.targetTab) {
                              onNavigate(action.targetTab);
                            }
                          }}
                          className="inline-flex items-center gap-1 text-xs bg-[#2f1709] hover:bg-[#43210e] text-[#ffd899] hover:text-white px-2.5 py-1 rounded-lg border border-[#5a2c10] transition-colors font-semibold shadow-sm"
                        >
                          <span>{action.label}</span>
                          <ArrowRight className="w-3 h-3 shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex flex-col items-start animate-fade-in">
                <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-[#a47a55]">
                  <Bot className="w-3 h-3 text-amber-500" />
                  <span className="font-semibold text-[#dec2a2]">IndusAssistant</span>
                  <span>•</span>
                  <span>Searching catalog...</span>
                </div>
                <div className="bg-[#241208] border border-[#48240f] rounded-2xl rounded-tl-xs px-4 py-3 shadow-md flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-600 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
                  </div>
                  <span className="text-xs text-[#dec2a2] font-medium">
                    Consulting Indus Code registry &amp; supplier database...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Voice Feedback Banner */}
          {voiceFeedback && (
            <div className="px-3.5 py-1.5 bg-[#251105] border-t border-[#48240f] text-xs flex items-center justify-between text-[#ffd899] animate-in fade-in duration-150">
              <div className="flex items-center gap-2 min-w-0">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  {isListening && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  )}
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isListening ? 'bg-red-500' : 'bg-amber-400'}`}></span>
                </span>
                <span className="font-medium text-[11px] truncate text-[#ffd899]">{voiceFeedback}</span>
              </div>
              {isListening && (
                <button
                  type="button"
                  onClick={stopListening}
                  className="text-[10px] font-bold uppercase text-red-400 hover:text-red-300 ml-2 shrink-0 underline"
                >
                  Stop
                </button>
              )}
            </div>
          )}

          {/* Input Bar */}
          <div className="p-3 bg-[#180c05] border-t-2 border-[#43230e] shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isListening ? "Listening... speak now" : "Ask or speak about screws, bolts, pipes, codes..."}
                disabled={isLoading}
                className={`flex-1 bg-[#100702] text-[#fff4e0] placeholder:text-[#875d38] text-sm px-3.5 py-2.5 rounded-xl border transition-all outline-none ${
                  isListening
                    ? 'border-red-500/80 ring-2 ring-red-500/30'
                    : 'border-[#43230e] focus:border-amber-500'
                }`}
              />

              {/* Voice Language Toggle (EN/HI) */}
              <button
                type="button"
                onClick={() => {
                  const nextLang = speechLanguage === 'en-IN' ? 'hi-IN' : 'en-IN';
                  setSpeechLanguage(nextLang);
                  if (isListening) {
                    stopListening();
                  }
                }}
                className="text-[10px] font-mono font-bold px-2 py-2 rounded-xl bg-[#2b1509] text-[#dfa856] border border-[#522910] hover:bg-[#3d1e0c] transition-colors shrink-0"
                title={`Current voice recognition: ${speechLanguage === 'en-IN' ? 'English/Hinglish (India)' : 'Hindi (India)'}. Click to switch.`}
              >
                {speechLanguage === 'en-IN' ? 'EN' : 'HI'}
              </button>

              {/* Speak to Search Microphone Button */}
              <button
                type="button"
                onClick={toggleListening}
                disabled={isLoading}
                className={`p-2.5 rounded-xl border transition-all shadow-md shrink-0 active:scale-95 flex items-center justify-center ${
                  isListening
                    ? 'bg-red-600/30 border-red-500 text-red-400 animate-pulse ring-2 ring-red-500/50'
                    : 'bg-[#2b1509] border-[#522910] text-[#dfa856] hover:text-[#fff4e0] hover:bg-[#3d1e0c] hover:border-amber-600/50'
                }`}
                title={isListening ? 'Stop listening' : 'Speak to search (Hindi / Hinglish / English)'}
                aria-label={isListening ? 'Stop listening' : 'Speak to search'}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4 text-red-400" />
                ) : (
                  <Mic className="w-4 h-4 text-[#dfa856]" />
                )}
              </button>

              {/* Send Button */}
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className="brass-plate p-2.5 rounded-xl disabled:opacity-40 transition-all shadow-md shrink-0 active:scale-95"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-[#1a0f00]" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-[#a47a55] px-1">
              <span className="flex items-center gap-1">
                <span>Press <strong className="text-[#dec2a2]">Enter</strong> or click <strong className="text-amber-400">Mic</strong> to speak</span>
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Grounded Registry
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <div className="hidden md:flex items-center gap-1.5 bg-[#241308] text-[#ffd899] text-xs px-3.5 py-1.5 rounded-full shadow-2xl border border-[#54290e] animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">Need hardware specs or Indus Codes?</span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-[#241308] text-white shadow-[0_10px_25px_rgba(0,0,0,0.8)] hover:shadow-amber-500/20 hover:bg-[#351b0a] border-2 border-[#54290e] hover:border-amber-500 transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label={isOpen ? 'Close IndusAssistant' : 'Open IndusAssistant'}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-[#ffd899] group-hover:text-white transition-colors" />
          ) : (
            <>
              <div className="relative">
                <Bot className="w-7 h-7 text-amber-400 group-hover:text-amber-300 transition-colors" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#241308] animate-pulse" />
              </div>
            </>
          )}
        </button>
      </div>
    </>
  );
};
