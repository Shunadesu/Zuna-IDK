'use client';

import { useState } from 'react';
import { useSceneStore } from '../hooks/useSceneStore';
import { useMapStore } from '../hooks/useMapStore';
import { scenes, Scene } from '../data/scenes';

export default function SceneEditor() {
  const { currentSceneId, setCurrentScene } = useSceneStore();
  const { isSceneEditorVisible, toggleSceneEditor, mapOpacity } = useMapStore();
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSceneSelect = (scene: Scene) => {
    setSelectedScene(scene);
    setIsEditing(false);
  };

  const handleEditScene = () => {
    setIsEditing(true);
  };

  const handleSaveScene = (updatedScene: Scene) => {
    // Trong thực tế, bạn sẽ cần cập nhật scenes array
    console.log('Saving scene:', updatedScene);
    setIsEditing(false);
  };

  if (!isSceneEditorVisible) return null;

  return (
    <div 
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-md rounded-xl p-6 text-white z-40 max-w-4xl max-h-[80vh] overflow-y-auto"
      style={{ 
        backgroundColor: `rgba(0, 0, 0, ${mapOpacity})`
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Trình chỉnh sửa cảnh</h3>
        <button
          onClick={toggleSceneEditor}
          className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scene List */}
        <div className="space-y-3">
          <h4 className="font-semibold text-lg">Danh sách cảnh</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {scenes.map((scene) => (
              <div
                key={scene.id}
                className={`
                  p-3 rounded-lg cursor-pointer transition-all duration-200
                  ${selectedScene?.id === scene.id 
                    ? 'bg-white/30 border border-white/50' 
                    : 'bg-white/10 hover:bg-white/20'
                  }
                  ${currentSceneId === scene.id ? 'ring-2 ring-yellow-400' : ''}
                `}
                onClick={() => handleSceneSelect(scene)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{scene.title}</div>
                    <div className="text-xs text-white/60">{scene.type}</div>
                  </div>
                  <div className="text-sm">
                    {currentSceneId === scene.id && <span className="text-yellow-400">●</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scene Details */}
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Chi tiết cảnh</h4>
          {selectedScene ? (
            <div className="space-y-4">
              {isEditing ? (
                <SceneEditForm 
                  scene={selectedScene} 
                  onSave={handleSaveScene}
                  onCancel={() => setIsEditing(false)}
                />
              ) : (
                <SceneDetails 
                  scene={selectedScene} 
                  onEdit={handleEditScene}
                  onSelect={() => setCurrentScene(selectedScene.id)}
                />
              )}
            </div>
          ) : (
            <div className="text-white/60 text-center py-8">
              Chọn một cảnh để xem chi tiết
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-white/20">
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
            + Thêm cảnh mới
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            📋 Xuất dữ liệu
          </button>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
            📥 Nhập dữ liệu
          </button>
        </div>
      </div>
    </div>
  );
}

function SceneDetails({ scene, onEdit, onSelect }: { 
  scene: Scene; 
  onEdit: () => void; 
  onSelect: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-white/10 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-white/60">ID:</span>
            <div className="font-mono">{scene.id}</div>
          </div>
          <div>
            <span className="text-white/60">Loại:</span>
            <div className="capitalize">{scene.type}</div>
          </div>
          <div>
            <span className="text-white/60">Layout:</span>
            <div className="capitalize">{scene.layout}</div>
          </div>
          <div>
            <span className="text-white/60">Cảnh tiếp:</span>
            <div>{scene.next || 'Kết thúc'}</div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <span className="text-white/60 text-sm">Tiêu đề:</span>
          <div className="font-medium">{scene.title}</div>
        </div>
        <div>
          <span className="text-white/60 text-sm">Mô tả:</span>
          <div className="text-sm">{scene.description}</div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onSelect}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
        >
          Chuyển đến
        </button>
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors text-sm"
        >
          Chỉnh sửa
        </button>
      </div>
    </div>
  );
}

function SceneEditForm({ scene, onSave, onCancel }: { 
  scene: Scene; 
  onSave: (scene: Scene) => void; 
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(scene);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white/60 mb-1">ID</label>
          <input
            type="text"
            value={formData.id}
            onChange={(e) => setFormData({...formData, id: e.target.value})}
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Loại</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value as any})}
            className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
          >
            <option value="start">Bắt đầu</option>
            <option value="branch">Ngã rẽ</option>
            <option value="end">Kết thúc</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-white/60 mb-1">Tiêu đề</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-white/60 mb-1">Mô tả</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={3}
          className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm"
        >
          Lưu
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors text-sm"
        >
          Hủy
        </button>
      </div>
    </form>
  );
} 