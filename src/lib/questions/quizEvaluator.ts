import type { Question } from '../types';

export interface QuizAnswerRecord {
	questionId: string;
	selectedOptionId: string;
	isCorrect: boolean;
	xpEarned: number;
}

export interface QuizSessionSummary {
	totalQuestions: number;
	answeredQuestions: number;
	correctAnswers: number;
	wrongAnswers: number;
	scorePercentage: number;
	isCompleted: boolean;
	isPerfect: boolean;
	earnedLevelXp: number;
}

/**
 * Grades a question by comparing selectedOptionId with question.correctAnswerId.
 */
export function gradeQuestionAnswer(
	question: Question,
	selectedOptionId: string
): { isCorrect: boolean; xpEarned: number } {
	const isCorrect = selectedOptionId === question.correctAnswerId;
	return {
		isCorrect,
		xpEarned: isCorrect ? question.xp || 15 : 0
	};
}

/**
 * Records an answer into the session answers map with strict double-count protection.
 * If question.id has already been graded in this session, existing answer is preserved.
 */
export function recordQuizAnswer(
	existingAnswers: Record<string, QuizAnswerRecord>,
	question: Question,
	selectedOptionId: string
): {
	updatedAnswers: Record<string, QuizAnswerRecord>;
	isNewAnswer: boolean;
	isCorrect: boolean;
	xpEarned: number;
} {
	if (existingAnswers[question.id]) {
		const existing = existingAnswers[question.id];
		return {
			updatedAnswers: existingAnswers,
			isNewAnswer: false,
			isCorrect: existing.isCorrect,
			xpEarned: 0
		};
	}

	const grade = gradeQuestionAnswer(question, selectedOptionId);
	const newRecord: QuizAnswerRecord = {
		questionId: question.id,
		selectedOptionId,
		isCorrect: grade.isCorrect,
		xpEarned: grade.xpEarned
	};

	return {
		updatedAnswers: {
			...existingAnswers,
			[question.id]: newRecord
		},
		isNewAnswer: true,
		isCorrect: grade.isCorrect,
		xpEarned: grade.xpEarned
	};
}

/**
 * Calculates a complete quiz summary based strictly on actual graded answers.
 * - completed: all questions in the level were answered
 * - perfect: all questions were answered correctly (correctAnswers === totalQuestions)
 * - earnedLevelXp: full reward if perfect, proportional if partial, 0 if 0 correct.
 */
export function calculateQuizSummary(
	answers: Record<string, QuizAnswerRecord>,
	totalQuestions: number,
	levelBaseXpReward = 50
): QuizSessionSummary {
	const answeredCount = Object.keys(answers).length;
	const correctCount = Object.values(answers).filter((a) => a.isCorrect).length;
	const wrongCount = Math.max(0, answeredCount - correctCount);
	const total = Math.max(totalQuestions, answeredCount, 1);
	const scorePercentage = Math.round((correctCount / total) * 100);
	const isCompleted = answeredCount >= totalQuestions && totalQuestions > 0;
	const isPerfect = correctCount === totalQuestions && totalQuestions > 0;

	let earnedLevelXp = 0;
	if (isPerfect) {
		earnedLevelXp = levelBaseXpReward;
	} else if (correctCount > 0) {
		earnedLevelXp = Math.round(levelBaseXpReward * (correctCount / total));
	} else {
		earnedLevelXp = 0;
	}

	return {
		totalQuestions,
		answeredQuestions: answeredCount,
		correctAnswers: correctCount,
		wrongAnswers: wrongCount,
		scorePercentage,
		isCompleted,
		isPerfect,
		earnedLevelXp
	};
}
