import React, { useState, useRef } from 'react';
import { Upload, Loader2, ScanLine, X, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../lib/utils';
import { analyzeFinancialImage } from '../services/gemini';

function isQuotaError(error: any) {
  return (
    error?.status === 429 ||
    error?.message?.includes('429') ||
    error?.message?.includes('RESOURCE_EXHAUSTED') ||
    error?.message?.includes('quota')
  );
}

export default function ImageAnalyzer() {
  const [preview, setPreview] = useState<string | null>(null);
  const [base64, setBase64] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quotaError, setQuotaError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      // SDK chỉ nhận phần data thuần — bỏ tiền tố "data:image/...;base64,"
      setBase64(dataUrl.split(',')[1] ?? '');
      setResult(null);
      setQuotaError(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!base64) return;
    setIsLoading(true);
    setQuotaError(false);
    try {
      const response = await analyzeFinancialImage(base64, prompt);
      setResult(response || 'Không nhận được kết quả phân tích. Vui lòng thử lại.');
    } catch (error: any) {
      console.error('Error analyzing image:', error);
      if (isQuotaError(error)) {
        setQuotaError(true);
        setResult('Hệ thống đang quá tải (vượt quá hạn mức API). Vui lòng đợi một lát rồi thử lại.');
      } else {
        setResult('Đã xảy ra lỗi khi phân tích ảnh. Vui lòng thử lại.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPreview(null);
    setBase64('');
    setResult(null);
    setQuotaError(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="mt-10 pt-10 border-t border-white/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-500/10 rounded-xl">
          <ScanLine className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold">Phân tích ảnh BCTC thật bằng AI</h3>
          <p className="text-xs text-zinc-500">Chụp màn hình hoặc tải lên ảnh báo cáo tài chính để AI bóc tách và nhận xét</p>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {!preview ? (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex flex-col items-center justify-center gap-3 py-10 rounded-2xl border-2 border-dashed border-white/10 text-zinc-500 hover:border-purple-500/40 hover:text-purple-400 transition-all"
        >
          <Upload className="w-8 h-8" />
          <span className="text-sm font-medium">Nhấn để tải lên ảnh báo cáo tài chính</span>
          <span className="text-xs text-zinc-600">PNG, JPG — ví dụ: ảnh chụp Income Statement, Balance Sheet</span>
        </button>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-white/10">
            <img src={preview} alt="Báo cáo tài chính" className="w-full max-h-80 object-contain bg-black/40" />
            <button
              onClick={handleReset}
              className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-lg text-zinc-300 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <input
            type="text"
            placeholder="Câu hỏi tùy chọn cho AI (vd: 'Tính biên lợi nhuận gộp giúp tôi')..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-all"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/20 hover:bg-purple-700 disabled:opacity-50 transition-all"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ScanLine className="w-4 h-4" />}
            {isLoading ? 'ĐANG PHÂN TÍCH...' : 'PHÂN TÍCH ẢNH'}
          </button>
        </div>
      )}

      {result && (
        <div className="mt-6 bg-white/5 rounded-2xl p-6 border border-white/5">
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
          </div>
          {quotaError && (
            <button
              onClick={handleAnalyze}
              className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/20 text-purple-400 text-xs font-bold hover:bg-purple-600/30 transition-all border border-purple-600/20"
            >
              <Zap className="w-3 h-3" />
              THỬ LẠI
            </button>
          )}
        </div>
      )}
    </div>
  );
}
