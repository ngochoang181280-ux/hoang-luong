import React, { useState } from 'react';
import { ClassInfo, ClassData, Subject } from '../types';
import { createNewClassPackage } from '../data/classGenerator';
import { 
  School, 
  X, 
  Check, 
  Sparkles, 
  Users, 
  FileSpreadsheet, 
  Calendar, 
  MapPin, 
  UserCheck 
} from 'lucide-react';

interface AddClassModalProps {
  currentSchoolName: string;
  currentTeacherName: string;
  subjects: Subject[];
  existingClassNames: string[];
  onClose: () => void;
  onAddClass: (newClass: ClassData) => void;
}

export const AddClassModal: React.FC<AddClassModalProps> = ({
  currentSchoolName,
  currentTeacherName,
  subjects,
  existingClassNames,
  onClose,
  onAddClass,
}) => {
  const [className, setClassName] = useState('10A2');
  const [gradeLevel, setGradeLevel] = useState<number>(10);
  const [schoolName, setSchoolName] = useState(currentSchoolName || 'Trường THPT Lê Quý Đôn');
  const [academicYear, setAcademicYear] = useState('2024 - 2025');
  const [currentTerm, setCurrentTerm] = useState<'HK1' | 'HK2'>('HK1');
  const [homeroomTeacher, setHomeroomTeacher] = useState(currentTeacherName || 'Cô Lê Thị Hoài Bảo');
  const [teacherPhone, setTeacherPhone] = useState('0912 345 678');
  const [teacherEmail, setTeacherEmail] = useState('hoaibao.le@thpt.edu.vn');
  const [classroom, setClassroom] = useState('Phòng A205 (Khu nhà B)');
  const [monitorName, setMonitorName] = useState('Nguyễn Văn An');
  const [withSampleData, setWithSampleData] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = className.trim().toUpperCase();

    if (!trimmedName) {
      setErrorMsg('Vui lòng nhập tên lớp chủ nhiệm!');
      return;
    }

    if (existingClassNames.some((n) => n.toUpperCase() === trimmedName)) {
      setErrorMsg(`Lớp "${trimmedName}" đã tồn tại! Vui lòng chọn tên lớp khác.`);
      return;
    }

    const info: ClassInfo = {
      className: trimmedName,
      gradeLevel,
      schoolName: schoolName.trim(),
      academicYear: academicYear.trim(),
      currentTerm,
      homeroomTeacher: homeroomTeacher.trim(),
      teacherPhone: teacherPhone.trim(),
      teacherEmail: teacherEmail.trim(),
      classroom: classroom.trim(),
      monitorName: monitorName.trim() || 'Lớp trưởng',
    };

    const newClassPackage = createNewClassPackage(info, withSampleData, subjects);
    onAddClass(newClassPackage);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-emerald-200">
              <School className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold">
                Thêm Lớp Chủ Nhiệm Mới
              </h2>
              <p className="text-[11px] text-emerald-100/80">
                Tạo không gian lớp học mới đầy đủ hồ sơ, điểm số, chuyên cần và TKB
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="m-4 mb-0 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Thông tin lớp & khối */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-neutral-800 mb-1">
                Tên lớp chủ nhiệm: <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={className}
                onChange={(e) => {
                  setClassName(e.target.value);
                  setErrorMsg(null);
                }}
                placeholder="VD: 10A2, 11B1..."
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-bold text-emerald-950 uppercase focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1">
                Khối lớp:
              </label>
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(Number(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-medium text-neutral-900 bg-white"
              >
                {[6, 7, 8, 9, 10, 11, 12].map((g) => (
                  <option key={g} value={g}>
                    Khối {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-neutral-800 mb-1">
                Học kỳ:
              </label>
              <select
                value={currentTerm}
                onChange={(e) => setCurrentTerm(e.target.value as 'HK1' | 'HK2')}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-medium text-neutral-900 bg-white"
              >
                <option value="HK1">Học kỳ 1</option>
                <option value="HK2">Học kỳ 2</option>
              </select>
            </div>
          </div>

          {/* Năm học & Trường */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Năm học:
              </label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="2024 - 2025"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Tên trường:
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                required
              />
            </div>
          </div>

          {/* Giáo viên chủ nhiệm & Điện thoại */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Giáo viên chủ nhiệm:
              </label>
              <input
                type="text"
                value={homeroomTeacher}
                onChange={(e) => setHomeroomTeacher(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg font-medium"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Số điện thoại GVCN:
              </label>
              <input
                type="text"
                value={teacherPhone}
                onChange={(e) => setTeacherPhone(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
              />
            </div>
          </div>

          {/* Phòng học & Lớp trưởng */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Phòng học:
              </label>
              <input
                type="text"
                value={classroom}
                onChange={(e) => setClassroom(e.target.value)}
                placeholder="VD: Phòng 205 (Nhà B)"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Họ tên Lớp trưởng (nếu có):
              </label>
              <input
                type="text"
                value={monitorName}
                onChange={(e) => setMonitorName(e.target.value)}
                placeholder="VD: Nguyễn Văn An"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
              />
            </div>
          </div>

          {/* Tùy chọn dữ liệu ban đầu cho lớp */}
          <div className="pt-2 border-t border-neutral-200 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block">
              Tùy chọn dữ liệu ban đầu cho lớp mới:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label 
                className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                  withSampleData 
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-xs' 
                    : 'border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <input
                  type="radio"
                  name="sampleOption"
                  checked={withSampleData}
                  onChange={() => setWithSampleData(true)}
                  className="mt-0.5 text-emerald-600"
                />
                <div>
                  <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tạo sẵn 32 học sinh mẫu</span>
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-0.5">
                    Có sẵn điểm số, thời khóa biểu, sơ đồ lớp và thông tin phụ huynh để quản lý ngay.
                  </p>
                </div>
              </label>

              <label 
                className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                  !withSampleData 
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-xs' 
                    : 'border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <input
                  type="radio"
                  name="sampleOption"
                  checked={!withSampleData}
                  onChange={() => setWithSampleData(false)}
                  className="mt-0.5 text-emerald-600"
                />
                <div>
                  <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-neutral-600" />
                    <span>Bắt đầu với lớp trống</span>
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-0.5">
                    Lớp chưa có học sinh; thầy/cô tự thêm học sinh hoặc nhập từ file Excel sau.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 font-medium hover:bg-neutral-50"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-700 text-white font-bold rounded-lg hover:bg-emerald-800 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Tạo & Chuyển sang lớp này</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
