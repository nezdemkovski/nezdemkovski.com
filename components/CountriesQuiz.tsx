'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { QuizQuestion } from '@/components/CountriesWidget';

interface CountriesQuizProps {
  questions: QuizQuestion[];
  totalCountries: number;
  totalTrips: number;
}

function resultMessage(correct: number, total: number): string {
  const ratio = correct / total;
  if (ratio === 1) return 'Perfect score. You know me well.';
  if (ratio >= 0.7) return "Pretty good — you've been paying attention.";
  if (ratio >= 0.4) return "Not bad. There's more to discover.";
  return 'Time to explore the travels page.';
}

const CountriesQuiz = ({ questions }: CountriesQuizProps) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const { question, answer, options } = questions[questionIndex];
  const hasAnswered = selected !== null;
  const isLast = questionIndex === questions.length - 1;

  function handleSelect(option: string) {
    setSelected(option);
    if (option === answer) setCorrectCount((c) => c + 1);
  }

  function next() {
    if (isLast) {
      setShowResults(true);
    } else {
      setQuestionIndex((i) => i + 1);
      setSelected(null);
    }
  }

  function restart() {
    setQuestionIndex(0);
    setSelected(null);
    setCorrectCount(0);
    setShowResults(false);
  }

  if (showResults) {
    return (
      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-4xl font-bold text-white">
          {correctCount}
          <span className="text-white/30">/{questions.length}</span>
        </p>
        <p className="mt-2 text-sm text-white/50">
          {resultMessage(correctCount, questions.length)}
        </p>
        <button
          onClick={restart}
          className="mt-auto text-xs text-white/30 transition-colors hover:text-white/60"
        >
          play again
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-1 flex-col">
      <div className="flex items-start justify-between gap-2">
        <p className="truncate text-sm font-medium text-white/70">{question}</p>
        <span className="shrink-0 text-xs text-white/30">
          {questionIndex + 1}/{questions.length}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {options.map((option) => {
          const isSelected = selected === option;
          const isCorrect = option === answer;

          return (
            <button
              key={option}
              disabled={hasAnswered}
              onClick={() => handleSelect(option)}
              className={cn(
                'h-9 truncate rounded-xl border px-3 text-sm transition-all duration-200',
                !hasAnswered &&
                  'border-white/20 text-white/70 hover:border-white/40 hover:text-white',
                hasAnswered &&
                  isCorrect &&
                  'border-green-500/50 bg-green-500/20 text-green-400',
                hasAnswered &&
                  isSelected &&
                  !isCorrect &&
                  'border-red-500/50 bg-red-500/20 text-red-400',
                hasAnswered &&
                  !isSelected &&
                  !isCorrect &&
                  'border-white/10 text-white/20 opacity-40',
              )}
            >
              {hasAnswered && isCorrect && '✓ '}
              {option}
            </button>
          );
        })}
      </div>
      {hasAnswered && (
        <button
          onClick={next}
          className="mt-auto text-xs text-white/30 transition-colors hover:text-white/60"
        >
          {isLast ? 'see results' : 'next question'}
        </button>
      )}
    </div>
  );
};

export default CountriesQuiz;
