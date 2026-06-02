import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../lib/utils';
import { QuizQuestion } from '../data/modules';

export default function QuizSection({ questions }: { questions: QuizQuestion[] }) {
  // answers[i] = chỉ số đáp án người dùng đã chọn cho câu i (undefined nếu chưa trả lời)
  const [answers, setAnswers] = useState<Record<number, number>>({});

  if (!questions || questions.length === 0) {
    return <p className="text-zinc-500 text-sm">Module này chưa có câu hỏi trắc nghiệm.</p>;
  }

  const handleSelect = (qIndex: number, optionIndex: number) => {
    // Khóa câu đã trả lời: không cho chọn lại
    if (answers[qIndex] !== undefined) return;
    setAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.reduce(
    (acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0),
    0
  );
  const allAnswered = answeredCount === questions.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-zinc-500">
          Đã trả lời {answeredCount}/{questions.length} câu
        </p>
        {answeredCount > 0 && (
          <button
            onClick={() => setAnswers({})}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-zinc-400 hover:text-white text-xs font-bold transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            LÀM LẠI
          </button>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const selected = answers[qIndex];
          const isAnswered = selected !== undefined;
          return (
            <div
              key={qIndex}
              className="bg-white/5 border border-white/5 rounded-2xl p-6"
            >
              <div className="flex gap-3 mb-4">
                <span className="text-blue-500 font-bold text-sm shrink-0">{qIndex + 1}.</span>
                <p className="text-[#E4E6EB] font-medium text-sm leading-relaxed">{q.question}</p>
              </div>

              <div className="space-y-2">
                {q.options.map((opt, optIndex) => {
                  const isCorrect = optIndex === q.correctIndex;
                  const isChosen = selected === optIndex;
                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleSelect(qIndex, optIndex)}
                      disabled={isAnswered}
                      className={cn(
                        'w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl border text-sm transition-all',
                        !isAnswered && 'bg-white/5 border-white/10 text-zinc-300 hover:border-blue-500/40 hover:text-white cursor-pointer',
                        isAnswered && isCorrect && 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300',
                        isAnswered && isChosen && !isCorrect && 'bg-red-500/10 border-red-500/40 text-red-300',
                        isAnswered && !isCorrect && !isChosen && 'bg-white/5 border-white/10 text-zinc-500 opacity-60'
                      )}
                    >
                      {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />}
                      {isAnswered && isChosen && !isCorrect && <XCircle className="w-4 h-4 shrink-0 text-red-400" />}
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="mt-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-400 mb-2">Giải thích</p>
                  <div className="prose prose-invert prose-sm max-w-none text-zinc-300">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{q.explanation}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allAnswered && (
        <div className="mt-8 p-6 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Award className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-white">
              Kết quả: {correctCount}/{questions.length} câu đúng
            </p>
            <p className="text-sm text-zinc-400">
              {correctCount === questions.length
                ? 'Xuất sắc! Bạn đã nắm vững module này.'
                : 'Hãy xem lại phần Lý thuyết và Deep Dive cho những câu sai nhé.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
