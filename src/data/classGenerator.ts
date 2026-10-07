import { 
  ClassInfo, 
  Student, 
  Subject, 
  ClassData, 
  TimetableEntry, 
  WeeklyMeetingPlan 
} from '../types';
import { 
  subjectsList, 
  generateMockScores, 
  generateInitialSeats, 
  initialTimetable, 
  initialMeetingPlans 
} from './mockData';

// Danh sách họ và tên đệm phổ biến ở Việt Nam
const LAST_NAMES = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý'];
const MIDDLE_BOY = ['Văn', 'Đức', 'Hữu', 'Quang', 'Minh', 'Tuấn', 'Thành', 'Hoàng', 'Đình', 'Xuân'];
const FIRST_BOY = ['An', 'Bảo', 'Cường', 'Dũng', 'Đạt', 'Huy', 'Hải', 'Khang', 'Khoa', 'Kiên', 'Lâm', 'Long', 'Minh', 'Nam', 'Nghĩa', 'Phong', 'Phúc', 'Quân', 'Sơn', 'Tài', 'Thắng', 'Thịnh', 'Trung', 'Tú', 'Việt'];

const MIDDLE_GIRL = ['Thị', 'Ngọc', 'Phương', 'Mai', 'Thanh', 'Thu', 'Kim', 'Bích', 'Hải', 'Quỳnh'];
const FIRST_GIRL = ['Anh', 'Chi', 'Diệp', 'Dung', 'Giang', 'Hà', 'Hân', 'Hiền', 'Hương', 'Linh', 'Ly', 'Mai', 'My', 'Nga', 'Ngân', 'Nhi', 'Như', 'Oanh', 'Phương', 'Quỳnh', 'Thảo', 'Trang', 'Trâm', 'Uyên', 'Vy', 'Yến'];

const JOBS = [
  'Kỹ sư xây dựng', 'Bác sĩ', 'Giáo viên', 'Kinh doanh tự do', 'Công chức nhà nước', 
  'Kế toán', 'Luật sư', 'Nhân viên văn phòng', 'Dược sĩ', 'Kiến trúc sư', 'Công an', 'Lực lượng vũ trang'
];

const STREETS = [
  'Kim Mã', 'Đội Cấn', 'Liễu Giai', 'Văn Cao', 'Hoàng Hoa Thám', 'Thụy Khuê', 'Lạc Long Quân',
  'Nguyễn Thái Học', 'Trần Phú', 'Điện Biên Phủ', 'Phan Đình Phùng', 'Quán Thánh', 'Hàng Bông', 'Cầu Giấy'
];

/**
 * Sinh danh sách học sinh mẫu thực tế cho một lớp mới
 */
export function generateSampleStudentsForClass(
  className: string, 
  gradeLevel: number, 
  count: number = 30
): Student[] {
  const students: Student[] = [];
  const birthYear = 2024 - (gradeLevel + 5); // Lớp 10 -> 2009, Lớp 11 -> 2008, Lớp 12 -> 2007

  for (let i = 1; i <= count; i++) {
    const isMale = i % 2 !== 0;
    const lastName = LAST_NAMES[(i * 3) % LAST_NAMES.length];
    const middleName = isMale 
      ? MIDDLE_BOY[(i * 2) % MIDDLE_BOY.length] 
      : MIDDLE_GIRL[(i * 2) % MIDDLE_GIRL.length];
    const firstName = isMale 
      ? FIRST_BOY[(i * 5) % FIRST_BOY.length] 
      : FIRST_GIRL[(i * 5) % FIRST_GIRL.length];

    const fullName = `${lastName} ${middleName} ${firstName}`;
    const month = String((i % 12) + 1).padStart(2, '0');
    const day = String((i * 2 % 28) + 1).padStart(2, '0');
    const team = ((i - 1) % 4 + 1) as 1 | 2 | 3 | 4;

    const rollStr = String(i).padStart(2, '0');
    const code = `${className}-${rollStr}`;

    const student: Student = {
      id: `s-${className.toLowerCase().replace(/[^a-z0-9]/g, '')}-${i}`,
      rollNumber: i,
      studentCode: code,
      fullName,
      gender: isMale ? 'Nam' : 'Nữ',
      dob: `${birthYear}-${month}-${day}`,
      ethnic: 'Kinh',
      address: `Số ${(i * 7) % 150 + 2} ${STREETS[i % STREETS.length]}, Hà Nội`,
      team,
      role: i === 1 ? 'Lớp trưởng' : i === 2 ? 'Lớp phó học tập' : i <= 6 && i % 4 === 0 ? 'Tổ trưởng' : 'Học sinh',
      fatherName: `${lastName} Văn ${isMale ? 'Hùng' : 'Dũng'}`,
      fatherPhone: `09${(i * 13) % 90 + 10} ${String((i * 37) % 900 + 100)} ${String((i * 71) % 900 + 100)}`,
      fatherJob: JOBS[i % JOBS.length],
      motherName: `Nguyễn Thị ${FIRST_GIRL[(i + 4) % FIRST_GIRL.length]}`,
      motherPhone: `09${(i * 17) % 90 + 10} ${String((i * 43) % 900 + 100)} ${String((i * 83) % 900 + 100)}`,
      motherJob: JOBS[(i + 3) % JOBS.length],
      hasVisionImpairment: i % 4 === 0,
      heightCm: isMale ? 168 + (i % 12) : 156 + (i % 10),
      specialNotes: i === 1 
        ? 'Gương mẫu, có trách nhiệm với tập thể' 
        : i % 5 === 0 
        ? 'Cần theo dõi môn Toán & Khoa học tự nhiên' 
        : undefined,
      conduct: i % 15 === 0 ? 'Khá' : 'Tốt',
    };

    students.push(student);
  }

  return students;
}

/**
 * Sinh thời khóa biểu mẫu theo lớp
 */
export function generateTimetableForClass(className: string): TimetableEntry[] {
  return initialTimetable.map((t) => ({
    ...t,
    room: `Phòng ${className}`,
  }));
}

/**
 * Tạo trọn bộ gói dữ liệu hoàn chỉnh cho một lớp chủ nhiệm mới (ClassData)
 */
export function createNewClassPackage(
  info: ClassInfo,
  withSampleData: boolean = true,
  subjects: Subject[] = subjectsList
): ClassData {
  const classId = info.className;

  if (!withSampleData) {
    return {
      id: classId,
      classInfo: info,
      students: [],
      scores: {},
      attendance: [],
      discipline: [],
      seats: generateInitialSeats([]),
      timetable: generateTimetableForClass(info.className),
      meetingPlans: initialMeetingPlans.map((m) => ({
        ...m,
        id: `meet-${classId.toLowerCase()}-${m.weekNumber}`,
      })),
      createdAt: new Date().toISOString(),
    };
  }

  const sampleStudents = generateSampleStudentsForClass(info.className, info.gradeLevel, 32);
  const sampleScores = generateMockScores(sampleStudents, subjects);
  const sampleSeats = generateInitialSeats(sampleStudents);
  const sampleTimetable = generateTimetableForClass(info.className);

  return {
    id: classId,
    classInfo: info,
    students: sampleStudents,
    scores: sampleScores,
    attendance: [
      {
        id: `att-${classId}-1`,
        date: new Date().toISOString().slice(0, 10),
        studentId: sampleStudents[4]?.id || 's01',
        status: 'late',
        note: 'Đi học muộn 10 phút do hỏng xe',
      },
    ],
    discipline: [
      {
        id: `disc-${classId}-1`,
        date: new Date().toISOString().slice(0, 10),
        studentId: sampleStudents[0]?.id || 's01',
        type: 'khen_thuong',
        category: 'Phong trào',
        content: `Ban chỉ huy lớp ${info.className} hoàn thành xuất sắc đợt thi đua chào mừng ngày nhà giáo`,
        pointChange: 10,
        reporter: 'GVCN',
        status: 'Đã giải quyết',
      },
    ],
    seats: sampleSeats,
    timetable: sampleTimetable,
    meetingPlans: initialMeetingPlans.map((m) => ({
      ...m,
      id: `meet-${classId.toLowerCase()}-${m.weekNumber}`,
    })),
    createdAt: new Date().toISOString(),
  };
}
