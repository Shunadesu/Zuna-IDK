export interface Scene {
  id: string;
  title: string;
  description: string;
  background: string;
  music: string;
  layout: 'minimal' | 'centered' | 'grid' | 'retro';
  color: string;
  next: string | null; // null means end point
  type: 'start' | 'branch' | 'end'; // scene type for map layout
  connections?: string[]; // multiple possible next scenes for branching
}

export const scenes: Scene[] = [
  {
    id: 'forest',
    title: 'Rừng Bí Ẩn',
    description: 'Bạn đang đứng giữa một khu rừng cổ đại, những tia nắng xuyên qua tán lá tạo nên những vệt sáng kỳ ảo. Tiếng chim hót và tiếng lá xào xạc vang vọng khắp nơi.',
    background: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    music: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    layout: 'minimal',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    next: 'ocean',
    type: 'start',
    connections: ['ocean', 'city']
  },
  {
    id: 'ocean',
    title: 'Đại Dương Xanh',
    description: 'Những con sóng xanh biếc vỗ vào bờ cát trắng. Bầu trời trong xanh phản chiếu trên mặt nước tạo nên một khung cảnh thanh bình và mênh mông.',
    background: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80',
    music: 'https://www.soundjay.com/misc/sounds/ocean-wave-1.wav',
    layout: 'centered',
    color: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
    next: 'space',
    type: 'branch',
    connections: ['space', 'city']
  },
  {
    id: 'city',
    title: 'Thành Phố Hiện Đại',
    description: 'Những tòa nhà chọc trời sáng rực trong đêm, ánh đèn neon nhấp nháy tạo nên một bức tranh đô thị sôi động và hiện đại.',
    background: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    music: 'https://www.soundjay.com/misc/sounds/city-traffic-1.wav',
    layout: 'grid',
    color: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
    next: 'space',
    type: 'branch',
    connections: ['space']
  },
  {
    id: 'space',
    title: 'Vũ Trụ Vô Tận',
    description: 'Bạn đang lơ lửng trong không gian vô tận, xung quanh là những ngôi sao lấp lánh và các thiên hà xa xôi. Một cảm giác kỳ vĩ và bí ẩn bao trùm.',
    background: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    music: 'https://www.soundjay.com/misc/sounds/space-ambience-1.wav',
    layout: 'retro',
    color: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
    next: null,
    type: 'end',
    connections: []
  }
];

export const getSceneById = (id: string): Scene | undefined => {
  return scenes.find(scene => scene.id === id);
};

export const getStartScene = (): Scene => {
  return scenes.find(scene => scene.type === 'start') || scenes[0];
};

export const getEndScenes = (): Scene[] => {
  return scenes.filter(scene => scene.type === 'end');
};

export const getBranchScenes = (): Scene[] => {
  return scenes.filter(scene => scene.type === 'branch');
}; 