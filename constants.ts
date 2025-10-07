import { Question } from './types';

// The source of truth for all questions and their corresponding crossword data.
export const QUESTIONS_BANK: Readonly<Omit<Question, 'originalIndex'>[]> = [
  {
    question: "Thuật ngữ nào được dùng để chỉ trí tuệ nhân tạo, giúp máy tính có thể học hỏi và làm việc giống con người?",
    choices: ["IoT - Internet of Things", "VR - Virtual Reality", "AI - Artificial Intelligence", "QR - Quick Response"],
    correctChoiceIndex: 2,
    horizontalWords: ["", "", "", "AI", "", "", "", "", ""],
    secretWordIndex: 3,
  },
  {
    question: "Hệ thống nào giúp máy tính có khả năng học hỏi và xử lý thông tin tương tự như con người?",
    choices: ["Hệ thống dữ liệu số", "Hệ thống điều khiển tự động", "Hệ thống trí tuệ nhân tạo", "Hệ thống cơ điện tử"],
    correctChoiceIndex: 2,
    horizontalWords: ["", "Hệ", "thống", "trí", "tuệ", "nhân", "tạo", "", ""],
    secretWordIndex: 3,
  },
  {
    question: "Những robot hiện đại có thể nhận diện khuôn mặt, giao tiếp và phản ứng cảm xúc nhờ ứng dụng công nghệ nào?",
    choices: ["Cảm biến âm thanh", "Bộ điều khiển điện tử", "Hệ thống trí tuệ cảm xúc nhân tạo", "Kết nối Bluetooth"],
    correctChoiceIndex: 2,
    horizontalWords: ["Hệ", "thống", "trí", "tuệ", "cảm", "xúc", "nhân", "tạo"],
    secretWordIndex: 3,
  },
  {
    question: "Ứng dụng nào dưới đây sử dụng trí tuệ nhân tạo để hỗ trợ con người thực hiện các tác vụ như đặt lịch, tra cứu thông tin, hoặc điều khiển thiết bị bằng giọng nói?",
    choices: ["Hệ thống quản lý dữ liệu", "Ứng dụng học ngôn ngữ", "Trợ lý cá nhân (Personal Assistant)", "Trình duyệt web thông thường"],
    correctChoiceIndex: 2,
    horizontalWords: ["Trợ", "lý", "cá", "nhân", "", "", "", ""],
    secretWordIndex: 3,
  },
  {
    question: "Công nghệ nào giúp máy tính tự tạo ra hình ảnh, bài viết hoặc âm thanh mới?",
    choices: ["Phân tích dữ liệu", "Học máy", "AI tạo sinh", "Tự động hóa"],
    correctChoiceIndex: 2,
    horizontalWords: ["", "", "AI", "tạo", "sinh", "", "", ""],
    secretWordIndex: 3,
  },
];

// SECRET_KEYWORD is now derived dynamically in App.tsx from QUESTIONS_BANK
// to ensure it always matches the source data.