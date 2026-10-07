import React, { useState } from 'react';
import { LessonPlan, DifferentiatedWorksheet, WorksheetLevel, WorksheetExercise } from '../types';
import { 
  Sparkles, 
  Printer, 
  Download, 
  FileText, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  X, 
  Layers, 
  Laptop, 
  Check, 
  Edit3,
  Award,
  BookOpen
} from 'lucide-react';
import { downloadFile } from '../utils/templateGenerators';

interface DifferentiatedWorksheetModalProps {
  lessonPlan: LessonPlan;
  subjectName: string;
  onClose: () => void;
  onSaveToLesson: (worksheet: DifferentiatedWorksheet) => void;
}

export const DifferentiatedWorksheetModal: React.FC<DifferentiatedWorksheetModalProps> = ({
  lessonPlan,
  subjectName,
  onClose,
  onSaveToLesson,
}) => {
  // Sinh dữ liệu phiếu học tập phân hóa ban đầu nếu chưa có
  const generateInitialWorksheet = (): DifferentiatedWorksheet => {
    if (lessonPlan.differentiatedWorksheet) {
      return lessonPlan.differentiatedWorksheet;
    }

    const lesson = lessonPlan.lessonName || 'Bài học';
    const isMath = lessonPlan.subjectId === 'math';
    const isLit = lessonPlan.subjectId === 'lit';
    const isPhys = lessonPlan.subjectId === 'phys';

    return {
      id: `ws-${Date.now()}`,
      title: `PHIẾU HỌC TẬP PHÂN HÓA NĂNG LỰC: ${lesson.toUpperCase()}`,
      lessonName: lesson,
      subjectName,
      className: lessonPlan.className || `Khối ${lessonPlan.gradeLevel}`,
      createdAt: new Date().toISOString().slice(0, 10),
      levels: [
        {
          levelName: 'Mức 1: Cơ bản & Củng cố',
          targetAudience: 'Tất cả học sinh (Đại trà & Học sinh cần trợ giúp, củng cố kiến thức nền tảng)',
          objective: 'Nhận biết định nghĩa, quy tắc và áp dụng trực tiếp công thức cơ bản trong SGK.',
          exercises: [
            {
              id: 'ex-1-1',
              order: 1,
              type: 'dien_khuyet',
              question: isMath
                ? 'Điền vào chỗ trống: Đồ thị hàm số bậc hai y = ax² + bx + c (a ≠ 0) là một đường cong gọi là parabol, có đỉnh I(.....; .....) và trục đối xứng là đường thẳng x = .....'
                : isLit
                ? 'Nêu ngắn gọn định nghĩa và 3 đặc trưng cốt lõi của thể loại được học trong văn bản.'
                : 'Phát biểu định luật và viết biểu thức toán học kèm chú thích đơn vị của các đại lượng.',
              guide: 'Xem lại mục I trong phần kiến thức cốt lõi SGK trang 45.',
              points: 2.0,
            },
            {
              id: 'ex-1-2',
              order: 2,
              type: 'trac_nghiem',
              question: isMath
                ? 'Tọa độ đỉnh của parabol y = x² - 4x + 3 là:'
                : isLit
                ? 'Phương thức biểu đạt chính được tác giả sử dụng trong đoạn trích là gì?'
                : 'Khi lực tác dụng lên vật tăng 2 lần thì gia tốc của vật sẽ:',
              options: isMath
                ? ['A. I(2; -1)', 'B. I(-2; 15)', 'C. I(4; 3)', 'D. I(-4; 35)']
                : ['A. Tăng 2 lần', 'B. Giảm 2 lần', 'C. Không đổi', 'D. Tăng 4 lần'],
              correctAnswer: 'A',
              guide: 'Áp dụng công thức x = -b/(2a) = 2, thay vào tìm y = -1.',
              points: 2.0,
            },
          ],
        },
        {
          levelName: 'Mức 2: Nâng cao & Tư duy',
          targetAudience: 'Học sinh khá, giỏi (Rèn luyện tư duy logic, kỹ năng suy luận và biến đổi)',
          objective: 'Vận dụng kiến thức giải các bài toán qua nhiều bước, phân tích và so sánh.',
          exercises: [
            {
              id: 'ex-2-1',
              order: 1,
              type: 'tu_luan',
              question: isMath
                ? 'Tìm tọa độ giao điểm của parabol (P): y = x² - 3x + 2 và đường thẳng (d): y = x - 1. Vẽ phác thảo đồ thị minh họa miền giao nhau.'
                : isLit
                ? 'Viết đoạn văn ngắn (khoảng 150 chữ) phân tích ý nghĩa của hình tượng nghệ thuật tiêu biểu trong tác phẩm.'
                : 'Một vật có khối lượng 2 kg chuyển động dưới tác dụng của lực kéo 10 N và lực ma sát 2 N. Tính gia tốc chuyển động của vật.',
              guide: 'Lập phương trình hoành độ giao điểm: x² - 3x + 2 = x - 1 <=> x² - 4x + 3 = 0 => x = 1 hoặc x = 3.',
              points: 3.0,
            },
          ],
        },
        {
          levelName: 'Mức 3: Vận dụng thực tế & Dự án số',
          targetAudience: 'Phát triển năng lực xuất sắc & Tích hợp chuyển đổi số / STEM thực tiễn',
          objective: 'Ứng dụng công nghệ số giải quyết vấn đề thực tế, mô hình hóa bài toán cuộc sống.',
          exercises: [
            {
              id: 'ex-3-1',
              order: 1,
              type: 'thuc_hanh_so',
              question: isMath
                ? 'Dự án số: Sử dụng phần mềm GeoGebra hoặc Canva để vẽ mô phỏng chiếc cổng Parabol trường Đại học Bách Khoa có chiều cao h = 8m, khoảng cách chân cổng d = 6m. Viết phương trình parabol và tính bề rộng của cổng ở độ cao 4m so với mặt đất.'
                : isLit
                ? 'Dự án số: Thiết kế một infographic trên Canva hoặc sơ đồ tư duy trên Padlet tóm tắt toàn bộ tiến trình tâm trạng của nhân vật và chia sẻ link nhóm học tập.'
                : 'Dự án số: Sử dụng video quay chậm trên điện thoại và phần mềm phân tích Tracker đo gia tốc rơi tự do của một vật tại sân trường.',
              guide: 'Gắn hệ trục tọa độ Oxy với gốc O tại trung điểm chân cổng. Parabol có đỉnh I(0; 8) và đi qua điểm (3; 0). Phương trình: y = -8/9 x² + 8. Tại y = 4m => x ≈ 2.12m => bề rộng khoảng 4.24m.',
              points: 3.0,
            },
          ],
        },
      ],
    };
  };

  const [worksheet, setWorksheet] = useState<DifferentiatedWorksheet>(generateInitialWorksheet);
  const [activeTabLevel, setActiveTabLevel] = useState<number>(0);
  const [notification, setNotification] = useState<string | null>(null);

  // Thêm câu hỏi mới vào mức hiện tại
  const handleAddExercise = (levelIdx: number) => {
    const nextOrder = worksheet.levels[levelIdx].exercises.length + 1;
    const newEx: WorksheetExercise = {
      id: `ex-${levelIdx + 1}-${Date.now()}`,
      order: nextOrder,
      type: 'tu_luan',
      question: `Bài ${nextOrder}: [Nội dung bài tập bổ sung]...`,
      guide: 'Hướng dẫn giải chi tiết...',
      points: 2.0,
    };

    setWorksheet((prev) => {
      const updatedLevels = [...prev.levels] as [WorksheetLevel, WorksheetLevel, WorksheetLevel];
      updatedLevels[levelIdx] = {
        ...updatedLevels[levelIdx],
        exercises: [...updatedLevels[levelIdx].exercises, newEx],
      };
      return { ...prev, levels: updatedLevels };
    });
  };

  // Xóa bài tập
  const handleDeleteExercise = (levelIdx: number, exId: string) => {
    setWorksheet((prev) => {
      const updatedLevels = [...prev.levels] as [WorksheetLevel, WorksheetLevel, WorksheetLevel];
      updatedLevels[levelIdx] = {
        ...updatedLevels[levelIdx],
        exercises: updatedLevels[levelIdx].exercises.filter((e) => e.id !== exId).map((e, idx) => ({ ...e, order: idx + 1 })),
      };
      return { ...prev, levels: updatedLevels };
    });
  };

  // Cập nhật nội dung câu hỏi
  const handleUpdateExercise = (levelIdx: number, exId: string, field: keyof WorksheetExercise, val: any) => {
    setWorksheet((prev) => {
      const updatedLevels = [...prev.levels] as [WorksheetLevel, WorksheetLevel, WorksheetLevel];
      updatedLevels[levelIdx] = {
        ...updatedLevels[levelIdx],
        exercises: updatedLevels[levelIdx].exercises.map((e) => (e.id === exId ? { ...e, [field]: val } : e)),
      };
      return { ...prev, levels: updatedLevels };
    });
  };

  // Tự động phân hóa lại (Re-generate 1-click)
  const handleRegenerateFromObjectives = () => {
    const fresh = generateInitialWorksheet();
    setWorksheet(fresh);
    setNotification('Đã tự động tạo lại Phiếu học tập phân hóa 3 mức độ dựa trên mục tiêu bài dạy!');
    setTimeout(() => setNotification(null), 3000);
  };

  // Lưu và gắn vào kế hoạch bài dạy
  const handleSaveAndAttach = () => {
    onSaveToLesson(worksheet);
    setNotification('Đã lưu và tích hợp Phiếu học tập phân hóa vào giáo án thành công!');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  // Xuất file Word (.doc)
  const handleExportWord = () => {
    const docContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${worksheet.title}</title>
<style>
  body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.35; padding: 20px; }
  h1 { font-size: 15pt; text-align: center; text-transform: uppercase; margin-bottom: 2pt; color: #065f46; }
  h2 { font-size: 13pt; text-align: center; margin-top: 0; font-style: italic; }
  .header-table { width: 100%; border: none; margin-bottom: 15px; }
  .header-table td { border: none; padding: 4px; }
  .level-box { margin-top: 15px; margin-bottom: 15px; border-left: 3pt solid #047857; padding-left: 10px; }
  .level-title { font-size: 13pt; font-weight: bold; color: #065f46; text-transform: uppercase; }
  .level-target { font-size: 11pt; font-style: italic; color: #4b5563; }
  .exercise { margin-top: 8px; margin-bottom: 8px; }
  .points { font-weight: bold; color: #b45309; }
  .guide { font-size: 10.5pt; color: #374151; background-color: #f3f4f6; padding: 4px 8px; margin-top: 4px; }
</style>
</head>
<body>
  <table class="header-table">
    <tr>
      <td style="width: 50%;">
        <strong>TRƯỜNG THPT LÊ QUÝ ĐÔN</strong><br>
        <strong>Lớp:</strong> ${worksheet.className} | <strong>Môn:</strong> ${worksheet.subjectName}
      </td>
      <td style="width: 50%; text-align: right;">
        <strong>Họ và tên học sinh:</strong> ....................................<br>
        <strong>Tổ:</strong> ........... | <strong>Ngày:</strong> ${worksheet.createdAt}
      </td>
    </tr>
  </table>

  <h1>${worksheet.title}</h1>
  <h2>(Phiếu bài tập phân hóa đối tượng & phát triển năng lực)</h2>

  ${worksheet.levels.map((lvl) => `
    <div class="level-box">
      <div class="level-title">${lvl.levelName}</div>
      <div class="level-target">Đối tượng: ${lvl.targetAudience} - Mục tiêu: ${lvl.objective}</div>
      ${lvl.exercises.map((ex) => `
        <div class="exercise">
          <p><strong>Câu ${ex.order}:</strong> ${ex.question} <span class="points">(${ex.points} điểm)</span></p>
          ${ex.options && ex.options.length > 0 ? `<p style="padding-left: 15px;">${ex.options.join(' &nbsp;&nbsp;&nbsp;&nbsp; ')}</p>` : ''}
          <div class="guide"><em>* Gợi ý / Đáp án:</em> ${ex.guide} ${ex.correctAnswer ? `(Đáp án đúng: <strong>${ex.correctAnswer}</strong>)` : ''}</div>
        </div>
      `).join('')}
    </div>
  `).join('')}
</body>
</html>
    `;

    const blob = new Blob(['\uFEFF' + docContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Phieu_Hoc_Tap_Phan_Hoa_${worksheet.lessonName.replace(/[^a-zA-Z0-9_\u00C0-\u1EF9]/g, '_')}.doc`;
    link.click();
  };

  const currentLevel = worksheet.levels[activeTabLevel];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 max-h-[92vh] flex flex-col">
        {/* Header Modal */}
        <div className="flex items-start justify-between border-b pb-3 shrink-0">
          <div>
            <h3 className="font-bold text-base text-neutral-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <span>Soạn bài giảng tương tác & Phiếu học tập phân hóa 3 mức độ</span>
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Tự động phân hóa theo 3 mức (Cơ bản - Nâng cao - Vận dụng thực tế) dựa trên mục tiêu bài dạy CV 5512
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {notification && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3.5 py-2 rounded-lg flex items-center gap-2 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-700">Bài dạy:</span>
            <span className="font-bold text-emerald-900 bg-white px-2.5 py-1 rounded border border-neutral-200">
              {worksheet.lessonName} ({worksheet.className})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRegenerateFromObjectives}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-lg font-semibold flex items-center gap-1.5 border border-emerald-300 shadow-2xs"
              title="Phân tích lại mục tiêu giáo án để sinh bộ bài tập mới"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Tạo lại tự động (1-Click)</span>
            </button>

            <button
              type="button"
              onClick={handleExportWord}
              className="px-3 py-1.5 bg-sky-700 hover:bg-sky-800 text-white rounded-lg font-semibold flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất Word (.doc)</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-white hover:bg-neutral-100 text-neutral-700 rounded-lg font-medium border border-neutral-300 flex items-center gap-1.5 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-neutral-500" />
              <span>In phiếu A4</span>
            </button>
          </div>
        </div>

        {/* Level Tabs Switcher: 3 MỨC ĐỘ PHÂN HÓA */}
        <div className="grid grid-cols-3 gap-2 shrink-0">
          {worksheet.levels.map((lvl, idx) => {
            const isActive = activeTabLevel === idx;
            const isM1 = idx === 0;
            const isM2 = idx === 1;
            const isM3 = idx === 2;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTabLevel(idx)}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  isActive
                    ? isM1
                      ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                      : isM2
                      ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-500/20'
                      : 'border-purple-600 bg-purple-50/80 ring-2 ring-purple-500/20'
                    : 'border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${
                    isActive 
                      ? isM1 ? 'text-emerald-950' : isM2 ? 'text-sky-950' : 'text-purple-950'
                      : 'text-neutral-700'
                  }`}>
                    {lvl.levelName}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                    isActive ? 'bg-white shadow-2xs' : 'bg-neutral-200 text-neutral-600'
                  }`}>
                    {lvl.exercises.length} câu
                  </span>
                </div>
                <div className="text-[10px] text-neutral-500 line-clamp-1 mt-1">
                  {lvl.targetAudience}
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Body of Current Level */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          <div className="p-3.5 rounded-xl bg-neutral-50/80 border border-neutral-200 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-neutral-900">{currentLevel.levelName}</span>
              <span className="text-neutral-500 font-medium">Đối tượng: {currentLevel.targetAudience}</span>
            </div>
            <p className="text-neutral-600 text-[11px] leading-relaxed">
              <strong>Mục tiêu:</strong> {currentLevel.objective}
            </p>
          </div>

          {/* List of Exercises in Level */}
          <div className="space-y-3">
            {currentLevel.exercises.map((ex, exIdx) => (
              <div
                key={ex.id}
                className="p-4 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Câu {ex.order}
                    </span>
                    <select
                      value={ex.type}
                      onChange={(e) => handleUpdateExercise(activeTabLevel, ex.id, 'type', e.target.value)}
                      className="p-1 text-xs border border-neutral-200 rounded bg-neutral-50 font-medium text-neutral-700"
                    >
                      <option value="tu_luan">Tự luận / Trả lời ngắn</option>
                      <option value="trac_nghiem">Trắc nghiệm 4 lựa chọn</option>
                      <option value="dien_khuyet">Điền khuyết / Khái niệm</option>
                      <option value="thuc_hanh_so">Thực hành số / Dự án STEM</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 font-mono">
                      <span className="text-[11px] text-neutral-500">Điểm:</span>
                      <input
                        type="number"
                        step="0.5"
                        value={ex.points}
                        onChange={(e) => handleUpdateExercise(activeTabLevel, ex.id, 'points', Number(e.target.value))}
                        className="w-14 p-0.5 text-center text-xs border border-neutral-200 rounded font-bold"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteExercise(activeTabLevel, ex.id)}
                      className="text-rose-500 hover:text-rose-700 p-1 rounded"
                      title="Xóa câu hỏi này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Nội dung câu hỏi */}
                <div>
                  <textarea
                    rows={2}
                    value={ex.question}
                    onChange={(e) => handleUpdateExercise(activeTabLevel, ex.id, 'question', e.target.value)}
                    placeholder="Nhập đề bài câu hỏi..."
                    className="w-full p-2 border border-neutral-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Nếu là trắc nghiệm */}
                {ex.type === 'trac_nghiem' && ex.options && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {ex.options.map((opt, optIdx) => (
                      <input
                        key={optIdx}
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...ex.options!];
                          newOpts[optIdx] = e.target.value;
                          handleUpdateExercise(activeTabLevel, ex.id, 'options', newOpts);
                        }}
                        className="p-1.5 border border-neutral-200 rounded text-xs bg-neutral-50"
                      />
                    ))}
                  </div>
                )}

                {/* Gợi ý & Đáp án */}
                <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-200 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-600">
                    <span>* Gợi ý giải & Hướng dẫn chấm:</span>
                    {ex.type === 'trac_nghiem' && (
                      <div className="flex items-center gap-1 font-mono">
                        <span>Đáp án đúng:</span>
                        <input
                          type="text"
                          maxLength={1}
                          value={ex.correctAnswer || 'A'}
                          onChange={(e) => handleUpdateExercise(activeTabLevel, ex.id, 'correctAnswer', e.target.value.toUpperCase())}
                          className="w-8 text-center uppercase font-bold p-0.5 border rounded bg-white text-emerald-800"
                        />
                      </div>
                    )}
                  </div>
                  <textarea
                    rows={1}
                    value={ex.guide}
                    onChange={(e) => handleUpdateExercise(activeTabLevel, ex.id, 'guide', e.target.value)}
                    className="w-full p-1.5 border border-neutral-200 rounded text-[11px] bg-white text-neutral-700"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleAddExercise(activeTabLevel)}
            className="w-full py-2 border border-dashed border-emerald-400 text-emerald-800 rounded-xl text-xs font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm bài tập vào {currentLevel.levelName}</span>
          </button>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t shrink-0 text-xs">
          <div className="text-neutral-500 text-[11px]">
            * Phiếu học tập phân hóa giúp giáo viên triển khai dạy học phân hóa năng lực và giáo dục hòa nhập trên lớp.
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg font-semibold"
            >
              Đóng
            </button>
            <button
              type="button"
              onClick={handleSaveAndAttach}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold flex items-center gap-1.5 shadow-2xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Lưu & Tích hợp vào Kế hoạch bài dạy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
