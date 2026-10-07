import React, { useState } from 'react';
import { DepartmentTeachingPlan, DepartmentPlanItem, DepartmentPlanTemplate, Subject } from '../types';
import { 
  FolderKanban, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Printer, 
  Download, 
  Upload, 
  CheckCircle2, 
  FileSpreadsheet, 
  FileText, 
  Laptop, 
  HeartHandshake, 
  Layers, 
  ChevronDown, 
  ArrowUpDown, 
  BookOpen, 
  Sparkles,
  School,
  UserCheck,
  Check,
  X
} from 'lucide-react';
import { downloadFile } from '../utils/templateGenerators';

export const DEPARTMENT_LIST = [
  'Tổ Toán - Tin học',
  'Tổ Khoa học Tự nhiên (Vật lí - Hóa học - Sinh học)',
  'Tổ Ngữ văn',
  'Tổ Ngoại ngữ',
  'Tổ Lịch sử - Địa lí - GDCD',
  'Tổ Công nghệ - Kỹ thuật',
  'Tổ Thể chất - Quốc phòng An ninh - Nghệ thuật',
  'Tổ Hoạt động trải nghiệm & Hướng nghiệp',
];

interface DepartmentTeachingPlanViewProps {
  departmentPlans: DepartmentTeachingPlan[];
  subjects: Subject[];
  onSavePlan: (plan: DepartmentTeachingPlan) => void;
  onDeletePlan: (id: string) => void;
}

export const DepartmentTeachingPlanView: React.FC<DepartmentTeachingPlanViewProps> = ({
  departmentPlans,
  subjects,
  onSavePlan,
  onDeletePlan,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(departmentPlans[0]?.id || '');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Modal / Form thêm dòng bài học mới
  const [editingItem, setEditingItem] = useState<DepartmentPlanItem | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState<boolean>(false);

  const activePlan = departmentPlans.find((p) => p.id === selectedPlanId) || departmentPlans[0];

  const [formData, setFormData] = useState<DepartmentTeachingPlan>(
    activePlan || {
      id: `dept-${Date.now()}`,
      departmentName: 'Tổ Toán - Tin học',
      subjectId: 'math',
      subjectName: 'Toán học',
      gradeLevel: 10,
      className: 'Khối 10',
      academicYear: '2024 - 2025',
      semester: 'HK1',
      templateType: 'template_9_col',
      departmentHead: 'Thầy Trần Quốc Tuấn',
      teacherName: 'Cô Lê Thị Hoài Bảo',
      principalName: 'Ban Giám hiệu duyệt',
      schoolName: 'Trường THPT Lê Quý Đôn',
      items: [],
      updatedAt: new Date().toISOString().slice(0, 10),
    }
  );

  const handleSelectPlan = (plan: DepartmentTeachingPlan) => {
    setSelectedPlanId(plan.id);
    setFormData(plan);
    setIsEditing(false);
  };

  const handleSwitchTemplate = (type: DepartmentPlanTemplate) => {
    setFormData((prev) => ({
      ...prev,
      templateType: type,
    }));
    showNotification(`Đã chuyển sang ${type === 'template_9_col' ? 'Mẫu 1 (9 cột - Chi tiết)' : 'Mẫu 2 (5 cột - Tinh giản)'}!`);
  };

  const handleSave = () => {
    onSavePlan(formData);
    setIsEditing(false);
    showNotification('Đã lưu thành công Kế hoạch dạy học của Tổ chuyên môn!');
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleStartCreateNewPlan = () => {
    const newPlan: DepartmentTeachingPlan = {
      id: `dept-plan-${Date.now()}`,
      departmentName: 'Tổ Toán - Tin học',
      subjectId: 'math',
      subjectName: 'Toán học',
      gradeLevel: 10,
      className: 'Khối 10',
      academicYear: '2024 - 2025',
      semester: 'HK1',
      templateType: 'template_9_col',
      departmentHead: 'Thầy Tổ trưởng chuyên môn',
      teacherName: 'Cô Lê Thị Hoài Bảo',
      principalName: 'Ban Giám hiệu duyệt',
      schoolName: 'Trường THPT Lê Quý Đôn',
      items: [
        {
          id: `item-1`,
          order: 1,
          topicName: 'Bài 1: Mở đầu chương trình',
          periodCount: 2,
          timePoint: 'Tuần 1',
          equipment: 'Máy chiếu, SGK, Phiếu học tập số 1',
          location: 'Lớp học',
          digitalCompetence: 'Ứng dụng phần mềm sơ đồ tư duy số MindMeister',
          specialNeedsSupport: 'Hỗ trợ bản in chữ lớn cỡ 18 cho học sinh nhìn kém',
          learningOutcomes: 'Nắm được các khái niệm và mục tiêu bài học',
        },
      ],
      updatedAt: new Date().toISOString().slice(0, 10),
    };

    onSavePlan(newPlan);
    setSelectedPlanId(newPlan.id);
    setFormData(newPlan);
    setIsEditing(true);
    showNotification('Đã tạo kế hoạch dạy học mới cho tổ chuyên môn!');
  };

  // Mở modal thêm dòng bài học mới
  const handleOpenAddItemModal = () => {
    const nextOrder = (formData.items.length || 0) + 1;
    setEditingItem({
      id: `item-${Date.now()}`,
      order: nextOrder,
      topicName: `Bài ${nextOrder}: ...`,
      periodCount: 2,
      timePoint: `Tuần ${Math.ceil(nextOrder / 2)}`,
      equipment: 'Máy chiếu, SGK, Phiếu học tập',
      location: 'Lớp học',
      digitalCompetence: 'Ứng dụng phần mềm mô phỏng và bài tập số',
      specialNeedsSupport: 'Bố trí bạn cùng tiến hỗ trợ, phân hóa bài tập',
      learningOutcomes: 'Học sinh hiểu và vận dụng được kiến thức bài học',
    });
    setIsItemModalOpen(true);
  };

  // Mở modal sửa dòng bài học
  const handleOpenEditItemModal = (item: DepartmentPlanItem) => {
    setEditingItem({ ...item });
    setIsItemModalOpen(true);
  };

  // Lưu dòng bài học
  const handleSaveItemModal = () => {
    if (!editingItem) return;
    if (!editingItem.topicName.trim()) {
      alert('Vui lòng nhập tên bài học / chuyên đề!');
      return;
    }

    setFormData((prev) => {
      const exists = prev.items.some((i) => i.id === editingItem.id);
      let updatedItems: DepartmentPlanItem[];
      if (exists) {
        updatedItems = prev.items.map((i) => (i.id === editingItem.id ? editingItem : i));
      } else {
        updatedItems = [...prev.items, editingItem];
      }
      return {
        ...prev,
        items: updatedItems,
      };
    });

    setIsItemModalOpen(false);
    setEditingItem(null);
  };

  // Xóa một dòng bài học
  const handleDeleteItem = (itemId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài học này khỏi phân phối chương trình?')) {
      setFormData((prev) => ({
        ...prev,
        items: prev.items.filter((i) => i.id !== itemId).map((it, idx) => ({ ...it, order: idx + 1 })),
      }));
    }
  };

  // Xuất file Excel (.csv UTF-8)
  const handleExportCSV = () => {
    const is9Col = formData.templateType === 'template_9_col';
    const titleLines = [
      `"KẾ HOẠCH DẠY HỌC MÔN HỌC CỦA TỔ CHUYÊN MÔN (PHỤ LỤC I - CÔNG VĂN 5512/BGDĐT-GDTrH)"`,
      `"Trường: ${formData.schoolName} - Năm học: ${formData.academicYear} - Học kỳ: ${formData.semester}"`,
      `"Tổ chuyên môn: ${formData.departmentName} - Môn học: ${formData.subjectName} - Lớp/Khối: ${formData.className}"`,
      `"Tổ trưởng chuyên môn: ${formData.departmentHead} - Giáo viên xây dựng: ${formData.teacherName}"`,
      '',
    ];

    let headers: string[] = [];
    let rows: (string | number)[][] = [];

    if (is9Col) {
      headers = [
        'STT',
        'Bài học / Tên chuyên đề',
        'Số tiết',
        'Thời điểm (Tuần/Tháng)',
        'Thiết bị dạy học & Học liệu số',
        'Địa điểm dạy học',
        'Tích hợp năng lực số / CNTT',
        'Hỗ trợ học sinh khuyết tật / Phân hóa',
        'Yêu cầu cần đạt / Ghi chú',
      ];
      rows = formData.items.map((it) => [
        it.order,
        `"${it.topicName}"`,
        it.periodCount,
        `"${it.timePoint}"`,
        `"${it.equipment}"`,
        `"${it.location}"`,
        `"${it.digitalCompetence}"`,
        `"${it.specialNeedsSupport}"`,
        `"${it.learningOutcomes}"`,
      ]);
    } else {
      headers = [
        'STT',
        'Bài học / Tên chuyên đề',
        'Số tiết',
        'Thời điểm thực hiện (Tuần)',
        'Yêu cầu cần đạt & Thiết bị dạy học',
      ];
      rows = formData.items.map((it) => [
        it.order,
        `"${it.topicName}"`,
        it.periodCount,
        `"${it.timePoint}"`,
        `"${it.learningOutcomes} (Thiết bị: ${it.equipment})"`,
      ]);
    }

    const csvContent = '\uFEFF' + [...titleLines, headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ke_hoach_day_hoc_${formData.departmentName.replace(/[^a-zA-Z0-9_\u00C0-\u1EF9]/g, '_')}_${formData.className}_${formData.templateType === 'template_9_col' ? 'Mau1' : 'Mau2'}.csv`;
    link.click();
  };

  // Xuất file Word (.doc)
  const handleExportWord = () => {
    const is9Col = formData.templateType === 'template_9_col';
    const totalPeriods = formData.items.reduce((sum, i) => sum + (Number(i.periodCount) || 0), 0);

    const docContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Kế hoạch dạy học tổ chuyên môn</title>
<style>
  body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.3; }
  h1 { font-size: 14pt; text-align: center; text-transform: uppercase; margin-bottom: 2px; }
  h2 { font-size: 13pt; text-align: center; margin-top: 2px; font-weight: normal; }
  table { width: 100%; border-collapse: collapse; margin-top: 15px; }
  th, td { border: 1px solid black; padding: 6px; font-size: 11pt; text-align: left; }
  th { background-color: #f2f2f2; text-align: center; font-weight: bold; }
  .text-center { text-align: center; }
</style>
</head>
<body>
  <table style="border: none; width: 100%; margin-bottom: 20px;">
    <tr style="border: none;">
      <td style="border: none; width: 45%; text-align: center;">
        <strong>SỞ GIÁO DỤC VÀ ĐÀO TẠO</strong><br>
        <strong>${formData.schoolName.toUpperCase()}</strong><br>
        <strong>TỔ: ${formData.departmentName.toUpperCase()}</strong>
      </td>
      <td style="border: none; width: 55%; text-align: center;">
        <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong><br>
        <strong>Độc lập - Tự do - Hạnh phúc</strong><br>
        -----------------------
      </td>
    </tr>
  </table>

  <h1>KẾ HOẠCH DẠY HỌC MÔN HỌC CỦA TỔ CHUYÊN MÔN</h1>
  <h2>(Phụ lục I - Kèm theo Công văn số 5512/BGDĐT-GDTrH ngày 18 tháng 12 năm 2020 của Bộ GDĐT)</h2>
  
  <p style="text-align: center; font-style: italic;">
    <strong>Môn học:</strong> ${formData.subjectName} | <strong>Khối lớp:</strong> ${formData.className} | <strong>Năm học:</strong> ${formData.academicYear} (Học kỳ: ${formData.semester})<br>
    <strong>Tổng số bài học:</strong> ${formData.items.length} bài | <strong>Tổng thời lượng:</strong> ${totalPeriods} tiết
  </p>

  <table>
    <thead>
      ${is9Col ? `
      <tr>
        <th style="width: 5%;">STT</th>
        <th style="width: 20%;">Bài học / Chuyên đề</th>
        <th style="width: 7%;">Số tiết</th>
        <th style="width: 9%;">Thời điểm</th>
        <th style="width: 14%;">Thiết bị dạy học & Học liệu</th>
        <th style="width: 10%;">Địa điểm</th>
        <th style="width: 12%;">Tích hợp năng lực số / CNTT</th>
        <th style="width: 12%;">Hỗ trợ HS khuyết tật / Phân hóa</th>
        <th style="width: 11%;">Yêu cầu cần đạt</th>
      </tr>
      ` : `
      <tr>
        <th style="width: 6%;">STT</th>
        <th style="width: 32%;">Bài học / Tên chuyên đề</th>
        <th style="width: 10%;">Số tiết</th>
        <th style="width: 14%;">Thời điểm (Tuần)</th>
        <th style="width: 38%;">Yêu cầu cần đạt & Thiết bị dạy học</th>
      </tr>
      `}
    </thead>
    <tbody>
      ${formData.items.map((it) => is9Col ? `
      <tr>
        <td class="text-center">${it.order}</td>
        <td><strong>${it.topicName}</strong></td>
        <td class="text-center">${it.periodCount}</td>
        <td class="text-center">${it.timePoint}</td>
        <td>${it.equipment}</td>
        <td class="text-center">${it.location}</td>
        <td>${it.digitalCompetence}</td>
        <td>${it.specialNeedsSupport}</td>
        <td>${it.learningOutcomes}</td>
      </tr>
      ` : `
      <tr>
        <td class="text-center">${it.order}</td>
        <td><strong>${it.topicName}</strong></td>
        <td class="text-center">${it.periodCount}</td>
        <td class="text-center">${it.timePoint}</td>
        <td>${it.learningOutcomes} <br><em>(Thiết bị: ${it.equipment})</em></td>
      </tr>
      `).join('')}
    </tbody>
  </table>

  <br><br>
  <table style="border: none; width: 100%;">
    <tr style="border: none;">
      <td style="border: none; width: 33%; text-align: center;">
        <strong>HIỆU TRƯỞNG DUYỆT</strong><br>
        <em>(Ký và ghi rõ họ tên)</em>
        <br><br><br><br>
        <strong>${formData.principalName || 'Ban Giám hiệu'}</strong>
      </td>
      <td style="border: none; width: 33%; text-align: center;">
        <strong>TỔ TRƯỞNG CHUYÊN MÔN</strong><br>
        <em>(Ký và ghi rõ họ tên)</em>
        <br><br><br><br>
        <strong>${formData.departmentHead}</strong>
      </td>
      <td style="border: none; width: 33%; text-align: center;">
        <em>Ngày ...... tháng ...... năm 202...</em><br>
        <strong>NGƯỜI LẬP KẾ HOẠCH</strong><br>
        <em>(Ký và ghi rõ họ tên)</em>
        <br><br><br><br>
        <strong>${formData.teacherName}</strong>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const blob = new Blob(['\uFEFF' + docContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ke_Hoach_Day_Hoc_${formData.departmentName.replace(/[^a-zA-Z0-9_\u00C0-\u1EF9]/g, '_')}_${formData.className}.doc`;
    link.click();
    showNotification('Đã xuất file Word (.doc) thành công!');
  };

  const is9Col = formData.templateType === 'template_9_col';
  const totalPeriods = formData.items.reduce((sum, i) => sum + (Number(i.periodCount) || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="no-print bg-white p-4 rounded-xl border border-neutral-200 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-base font-bold text-neutral-900 flex items-center gap-2">
            <span>Kế hoạch dạy học của Tổ chuyên môn (CV 5512 - Phụ lục I)</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
              Chuẩn 5512
            </span>
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Phân phối chương trình môn học, lớp học theo Mẫu 1 (9 cột) và Mẫu 2 (5 cột), tích hợp năng lực số và giáo dục hòa nhập
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Nút Tạo kế hoạch tổ mới */}
          <button
            type="button"
            onClick={handleStartCreateNewPlan}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tạo kế hoạch mới</span>
          </button>

          {/* Nút Xuất Word */}
          <button
            type="button"
            onClick={handleExportWord}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors shadow-2xs"
            title="Tải kế hoạch dạy học định dạng Word (.doc)"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Xuất file Word</span>
          </button>

          {/* Nút Xuất Excel */}
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 rounded-lg transition-colors shadow-2xs"
            title="Tải kế hoạch dạy học định dạng Excel CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Xuất Excel</span>
          </button>

          {/* Nút In ấn */}
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-neutral-500" />
            <span>In ấn (Print / PDF)</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="no-print bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-2.5 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Control Banner: Bộ chọn Mẫu 1 (9 cột) vs Mẫu 2 (5 cột) & Thông tin Tổ - Môn - Lớp */}
      <div className="no-print bg-white p-4 rounded-xl border border-neutral-200 shadow-2xs space-y-4">
        {/* NÚT LỰA CHỌN MẪU 1 (9 CỘT) VÀ MẪU 2 (5 CỘT) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2.5 bg-neutral-50 rounded-xl border border-neutral-200">
          <div className="flex items-center gap-2 text-xs">
            <Layers className="w-4 h-4 text-emerald-700" />
            <span className="font-bold text-neutral-900">LỰA CHỌN MẪU KẾ HOẠCH DẠY HỌC:</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSwitchTemplate('template_9_col')}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                is9Col
                  ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-500/30'
                  : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-100'
              }`}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${is9Col ? 'bg-white' : 'bg-neutral-400'}`} />
              <span>LỰA CHỌN MẪU 1 (9 CỘT)</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${is9Col ? 'bg-emerald-800 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                Chi tiết & Năng lực số / Khuyết tật
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSwitchTemplate('template_5_col')}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                !is9Col
                  ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-500/30'
                  : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-100'
              }`}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${!is9Col ? 'bg-white' : 'bg-neutral-400'}`} />
              <span>LỰA CHỌN MẪU 2 (5 CỘT)</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${!is9Col ? 'bg-emerald-800 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                Tinh giản tổng hợp
              </span>
            </button>
          </div>
        </div>

        {/* THÔNG TIN TỔ CHUYÊN MÔN, MÔN HỌC, LỚP HỌC */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Tổ chuyên môn */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
              Tổ chuyên môn:
            </label>
            <select
              value={formData.departmentName}
              onChange={(e) => setFormData({ ...formData, departmentName: e.target.value })}
              className="w-full p-2 border border-neutral-300 rounded-lg bg-white font-medium text-neutral-900"
            >
              {DEPARTMENT_LIST.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Môn học */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
              Môn học:
            </label>
            <select
              value={formData.subjectId}
              onChange={(e) => {
                const sub = subjects.find((s) => s.id === e.target.value);
                setFormData({
                  ...formData,
                  subjectId: e.target.value,
                  subjectName: sub ? sub.name : e.target.value,
                });
              }}
              className="w-full p-2 border border-neutral-300 rounded-lg bg-white font-medium text-neutral-900"
            >
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Lớp học / Khối lớp */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
              Lớp học / Khối lớp:
            </label>
            <input
              type="text"
              value={formData.className}
              onChange={(e) => setFormData({ ...formData, className: e.target.value })}
              placeholder="VD: Khối 10, Lớp 10A1..."
              className="w-full p-2 border border-neutral-300 rounded-lg bg-white font-medium text-neutral-900"
            />
          </div>

          {/* Học kỳ & Năm học */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
              Học kỳ & Năm học:
            </label>
            <div className="flex items-center gap-1">
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value as any })}
                className="w-1/2 p-2 border border-neutral-300 rounded-lg bg-white font-medium text-neutral-900"
              >
                <option value="HK1">Học kỳ 1</option>
                <option value="HK2">Học kỳ 2</option>
                <option value="Cả năm">Cả năm</option>
              </select>
              <input
                type="text"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-1/2 p-2 border border-neutral-300 rounded-lg bg-white font-medium text-neutral-900 text-center"
              />
            </div>
          </div>
        </div>

        {/* Thông tin Cán bộ phê duyệt */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-neutral-100 text-xs">
          <div>
            <span className="text-neutral-500 block text-[11px]">Tổ trưởng chuyên môn:</span>
            <input
              type="text"
              value={formData.departmentHead}
              onChange={(e) => setFormData({ ...formData, departmentHead: e.target.value })}
              className="w-full p-1.5 border border-neutral-200 rounded mt-0.5 bg-neutral-50 focus:bg-white text-xs font-semibold text-neutral-900"
            />
          </div>
          <div>
            <span className="text-neutral-500 block text-[11px]">Giáo viên xây dựng kế hoạch:</span>
            <input
              type="text"
              value={formData.teacherName}
              onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
              className="w-full p-1.5 border border-neutral-200 rounded mt-0.5 bg-neutral-50 focus:bg-white text-xs font-semibold text-neutral-900"
            />
          </div>
          <div>
            <span className="text-neutral-500 block text-[11px]">Ban Giám hiệu duyệt:</span>
            <input
              type="text"
              value={formData.principalName || ''}
              onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
              className="w-full p-1.5 border border-neutral-200 rounded mt-0.5 bg-neutral-50 focus:bg-white text-xs font-semibold text-neutral-900"
            />
          </div>
        </div>
      </div>

      {/* Main Table Container: BẢNG KẾ HOẠCH DẠY HỌC (MẪU 1 HOẶC MẪU 2) */}
      <div className="bg-white rounded-2xl border border-neutral-300 shadow-sm overflow-hidden p-6 print:p-0 print:border-none">
        {/* Header Document Formal Info */}
        <div className="text-center space-y-1.5 pb-6 border-b border-neutral-200">
          <div className="flex justify-between items-start text-xs text-neutral-600 mb-2">
            <div className="text-left font-semibold">
              <div>SỞ GD&ĐT TỈNH/THÀNH PHỐ</div>
              <div className="uppercase">{formData.schoolName}</div>
              <div className="uppercase text-emerald-800">{formData.departmentName}</div>
            </div>
            <div className="text-right font-semibold">
              <div>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
              <div className="italic font-normal">Độc lập - Tự do - Hạnh phúc</div>
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-emerald-950">
            KHUNG KẾ HOẠCH DẠY HỌC MÔN HỌC CỦA TỔ CHUYÊN MÔN
          </h2>
          <p className="text-xs text-neutral-500 italic">
            (Kèm theo Công văn số 5512/BGDĐT-GDTrH ngày 18 tháng 12 năm 2020 của Bộ GDĐT - Phụ lục I)
          </p>
          <div className="text-xs font-medium text-neutral-700 pt-1">
            Môn học: <strong className="text-emerald-900">{formData.subjectName}</strong> · Lớp:{' '}
            <strong>{formData.className}</strong> · Năm học: <strong>{formData.academicYear}</strong> ({formData.semester}) · Tổng số: <strong>{formData.items.length} bài</strong> (<strong>{totalPeriods} tiết</strong>)
          </div>

          <div className="pt-2 flex items-center justify-center gap-2">
            <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
              {is9Col ? 'ĐANG CHỌN MẪU 1: CHI TIẾT 9 CỘT (CÓ NĂNG LỰC SỐ & KHUYẾT TẬT)' : 'ĐANG CHỌN MẪU 2: TINH GIẢN 5 CỘT TỔNG HỢP'}
            </span>
          </div>
        </div>

        {/* Action Toolbar on Top of Table */}
        <div className="no-print flex items-center justify-between py-3">
          <div className="text-xs text-neutral-500">
            Phân phối chương trình: <strong>{formData.items.length} bài học</strong> · <strong>{totalPeriods} tiết</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenAddItemModal}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm bài học mới</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-3 py-1.5 bg-white border border-emerald-600 text-emerald-800 hover:bg-emerald-50 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Lưu kế hoạch</span>
            </button>
          </div>
        </div>

        {/* TABLE RENDER: MẪU 1 (9 CỘT) HOẶC MẪU 2 (5 CỘT) */}
        <div className="overflow-x-auto border border-neutral-300 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              {is9Col ? (
                // MẪU 1: 9 CỘT
                <tr className="bg-neutral-100 text-neutral-800 border-b border-neutral-300 font-bold divide-x divide-neutral-200">
                  <th className="py-2.5 px-2 text-center w-12">STT</th>
                  <th className="py-2.5 px-3 min-w-[180px]">Bài học / Tên chuyên đề</th>
                  <th className="py-2.5 px-2 text-center w-16">Số tiết</th>
                  <th className="py-2.5 px-2 text-center w-20">Thời điểm</th>
                  <th className="py-2.5 px-3 min-w-[140px]">Thiết bị dạy học & Học liệu số</th>
                  <th className="py-2.5 px-2 text-center w-24">Địa điểm</th>
                  <th className="py-2.5 px-3 min-w-[160px] bg-cyan-50/70 text-cyan-950">
                    <div className="flex items-center gap-1">
                      <Laptop className="w-3.5 h-3.5 text-cyan-700" />
                      <span>Năng lực số / CNTT</span>
                    </div>
                  </th>
                  <th className="py-2.5 px-3 min-w-[160px] bg-amber-50/70 text-amber-950">
                    <div className="flex items-center gap-1">
                      <HeartHandshake className="w-3.5 h-3.5 text-amber-700" />
                      <span>Hỗ trợ HS khuyết tật</span>
                    </div>
                  </th>
                  <th className="py-2.5 px-3 min-w-[160px]">Yêu cầu cần đạt / Ghi chú</th>
                  <th className="py-2.5 px-2 text-center w-16 no-print">Thao tác</th>
                </tr>
              ) : (
                // MẪU 2: 5 CỘT
                <tr className="bg-neutral-100 text-neutral-800 border-b border-neutral-300 font-bold divide-x divide-neutral-200">
                  <th className="py-2.5 px-2 text-center w-14">STT</th>
                  <th className="py-2.5 px-4 min-w-[220px]">Bài học / Tên chủ đề</th>
                  <th className="py-2.5 px-2 text-center w-20">Số tiết</th>
                  <th className="py-2.5 px-3 text-center min-w-[110px]">Thời điểm thực hiện</th>
                  <th className="py-2.5 px-4 min-w-[300px]">Yêu cầu cần đạt & Thiết bị dạy học</th>
                  <th className="py-2.5 px-2 text-center w-16 no-print">Thao tác</th>
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {formData.items.length === 0 ? (
                <tr>
                  <td colSpan={is9Col ? 10 : 6} className="py-8 text-center text-neutral-400">
                    Chưa có bài học nào trong kế hoạch dạy học này. Vui lòng bấm <strong>"Thêm bài học mới"</strong>.
                  </td>
                </tr>
              ) : (
                formData.items.map((it) => (
                  <tr key={it.id} className="hover:bg-neutral-50/80 divide-x divide-neutral-200">
                    <td className="py-2.5 px-2 text-center font-mono font-semibold text-neutral-700">
                      {it.order}
                    </td>

                    {/* Tên bài học */}
                    <td className="py-2.5 px-3 font-semibold text-neutral-900">
                      {it.topicName}
                    </td>

                    {/* Số tiết */}
                    <td className="py-2.5 px-2 text-center font-mono font-bold text-emerald-800">
                      {it.periodCount}
                    </td>

                    {/* Thời điểm */}
                    <td className="py-2.5 px-2 text-center text-neutral-700 font-medium">
                      {it.timePoint}
                    </td>

                    {is9Col ? (
                      <>
                        {/* Thiết bị */}
                        <td className="py-2.5 px-3 text-neutral-700">
                          {it.equipment}
                        </td>

                        {/* Địa điểm */}
                        <td className="py-2.5 px-2 text-center text-neutral-700 font-medium">
                          {it.location}
                        </td>

                        {/* Năng lực số (Cột 7) */}
                        <td className="py-2.5 px-3 bg-cyan-50/30 text-cyan-950 font-medium leading-relaxed">
                          {it.digitalCompetence}
                        </td>

                        {/* Hỗ trợ khuyết tật (Cột 8) */}
                        <td className="py-2.5 px-3 bg-amber-50/30 text-amber-950 font-medium leading-relaxed">
                          {it.specialNeedsSupport}
                        </td>

                        {/* Yêu cầu cần đạt (Cột 9) */}
                        <td className="py-2.5 px-3 text-neutral-700 leading-relaxed">
                          {it.learningOutcomes}
                        </td>
                      </>
                    ) : (
                      // Mẫu 2: Cột 5 tổng hợp
                      <td className="py-2.5 px-4 text-neutral-800 leading-relaxed">
                        <div>{it.learningOutcomes}</div>
                        <div className="text-[11px] text-neutral-500 mt-0.5 italic">
                          Thiết bị: {it.equipment}
                        </div>
                      </td>
                    )}

                    {/* Thao tác Sửa / Xóa */}
                    <td className="py-2 px-2 text-center no-print">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEditItemModal(it)}
                          className="p-1 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 rounded"
                          title="Chỉnh sửa dòng bài học"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(it.id)}
                          className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                          title="Xóa bài học"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Signature Section for Print and Formal Verification */}
        <div className="mt-8 pt-6 border-t border-neutral-200 grid grid-cols-3 gap-4 text-xs text-center">
          <div>
            <div className="font-bold text-neutral-800 uppercase">HIỆU TRƯỞNG DUYỆT</div>
            <div className="text-[11px] text-neutral-400 italic">(Ký và đóng dấu)</div>
            <div className="h-16 flex items-end justify-center font-bold text-neutral-900">
              {formData.principalName || 'Ban Giám hiệu'}
            </div>
          </div>

          <div>
            <div className="font-bold text-neutral-800 uppercase">TỔ TRƯỞNG CHUYÊN MÔN</div>
            <div className="text-[11px] text-neutral-400 italic">(Ký và ghi rõ họ tên)</div>
            <div className="h-16 flex items-end justify-center font-bold text-neutral-900">
              {formData.departmentHead}
            </div>
          </div>

          <div>
            <div className="text-[11px] text-neutral-500 italic">Ngày ... tháng ... năm 202...</div>
            <div className="font-bold text-neutral-800 uppercase mt-0.5">NGƯỜI XÂY DỰNG KẾ HOẠCH</div>
            <div className="text-[11px] text-neutral-400 italic">(Ký và ghi rõ họ tên)</div>
            <div className="h-16 flex items-end justify-center font-bold text-neutral-900">
              {formData.teacherName}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Thêm / Chỉnh sửa bài học trong Kế hoạch */}
      {isItemModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-neutral-900 flex items-center gap-2">
                <span>{editingItem.id.startsWith('item-') ? 'Soạn bài học mới vào Kế hoạch' : 'Chỉnh sửa bài học'}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                  STT: {editingItem.order}
                </span>
              </h3>
              <button
                type="button"
                onClick={() => setIsItemModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="font-semibold text-neutral-700 block mb-1">
                    Tên bài học / Chuyên đề:
                  </label>
                  <input
                    type="text"
                    value={editingItem.topicName}
                    onChange={(e) => setEditingItem({ ...editingItem, topicName: e.target.value })}
                    placeholder="VD: Bài 1: Mệnh đề toán học..."
                    className="w-full p-2 border border-neutral-300 rounded-lg font-medium text-neutral-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">
                    Số tiết:
                  </label>
                  <input
                    type="number"
                    value={editingItem.periodCount}
                    onChange={(e) => setEditingItem({ ...editingItem, periodCount: Number(e.target.value) })}
                    className="w-full p-2 border border-neutral-300 rounded-lg font-medium text-neutral-900 text-center"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">
                    Thời điểm thực hiện (Tuần / Tháng):
                  </label>
                  <input
                    type="text"
                    value={editingItem.timePoint}
                    onChange={(e) => setEditingItem({ ...editingItem, timePoint: e.target.value })}
                    placeholder="VD: Tuần 1, Tuần 2..."
                    className="w-full p-2 border border-neutral-300 rounded-lg text-neutral-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">
                    Địa điểm dạy học:
                  </label>
                  <input
                    type="text"
                    value={editingItem.location}
                    onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    placeholder="VD: Lớp học, Phòng thực hành, Sân trường..."
                    className="w-full p-2 border border-neutral-300 rounded-lg text-neutral-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">
                  Thiết bị dạy học & Học liệu:
                </label>
                <input
                  type="text"
                  value={editingItem.equipment}
                  onChange={(e) => setEditingItem({ ...editingItem, equipment: e.target.value })}
                  placeholder="Máy chiếu, SGK, phiếu học tập số 1 & 2..."
                  className="w-full p-2 border border-neutral-300 rounded-lg text-neutral-900"
                />
              </div>

              {/* Tích hợp Năng lực số */}
              <div className="bg-cyan-50/50 p-3 rounded-xl border border-cyan-200 space-y-1.5">
                <label className="font-bold text-cyan-950 flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5 text-cyan-700" />
                  <span>Cột 7: Tích hợp năng lực số / Ứng dụng CNTT:</span>
                </label>
                <textarea
                  rows={2}
                  value={editingItem.digitalCompetence}
                  onChange={(e) => setEditingItem({ ...editingItem, digitalCompetence: e.target.value })}
                  placeholder="Mô tả công cụ số sử dụng (GeoGebra, Canva, Quizizz, Padlet, bảng tính Excel...)..."
                  className="w-full p-2 border border-cyan-300 rounded-lg text-xs bg-white text-neutral-900"
                />
              </div>

              {/* Hỗ trợ Học sinh khuyết tật */}
              <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200 space-y-1.5">
                <label className="font-bold text-amber-950 flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-amber-700" />
                  <span>Cột 8: Hỗ trợ học sinh khuyết tật / Phân hóa:</span>
                </label>
                <textarea
                  rows={2}
                  value={editingItem.specialNeedsSupport}
                  onChange={(e) => setEditingItem({ ...editingItem, specialNeedsSupport: e.target.value })}
                  placeholder="Biện pháp hỗ trợ (In chữ lớn cho học sinh nhìn kém, cử bạn cùng tiến kèm cặp, gia hạn thời gian nộp bài)..."
                  className="w-full p-2 border border-amber-300 rounded-lg text-xs bg-white text-neutral-900"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-700 block mb-1">
                  Yêu cầu cần đạt / Ghi chú:
                </label>
                <textarea
                  rows={2}
                  value={editingItem.learningOutcomes}
                  onChange={(e) => setEditingItem({ ...editingItem, learningOutcomes: e.target.value })}
                  placeholder="Yêu cầu cần đạt về kiến thức, kỹ năng theo chương trình..."
                  className="w-full p-2 border border-neutral-300 rounded-lg text-neutral-900"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setIsItemModalOpen(false)}
                className="px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-semibold"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleSaveItemModal}
                className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Lưu bài học vào Kế hoạch</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
