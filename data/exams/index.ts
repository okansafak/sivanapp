import { Exam } from '../../types';
import { TURKISH_EXAMS } from './turkish';
import { ARABIC_EXAMS } from './arabic';
import { MATH_EXAMS } from './math';

// Diğer dersler eklendikçe buraya import edilecek

export const ALL_EXAMS: Exam[] = [
  ...TURKISH_EXAMS,
  ...ARABIC_EXAMS,
  ...MATH_EXAMS
];
