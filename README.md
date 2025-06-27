# Zuna Game - Interactive Scenes

Một ứng dụng web tương tác với 4 cảnh khác nhau, mỗi cảnh có thiết kế và trải nghiệm riêng biệt.

## Tính năng

- **4 cảnh tương tác**: Rừng Bí Ẩn, Đại Dương Xanh, Thành Phố Hiện Đại, Vũ Trụ Vô Tận
- **4 kiểu layout**: Minimal, Centered, Grid, Retro
- **Âm nhạc nền**: Mỗi cảnh có âm nhạc riêng
- **Bản đồ thế giới**: MiniMap có thể mở rộng với điều hướng trực quan
- **Điều hướng nâng cao**: Navigation panel với thông tin cảnh và progress bar
- **Hiệu ứng chuyển cảnh**: Animation mượt mà khi chuyển giữa các cảnh
- **Quản lý trạng thái**: Sử dụng Zustand để quản lý cảnh hiện tại
- **Responsive**: Tương thích với mọi thiết bị

## Cấu trúc dự án

```
Zuna-Game/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Trang chính
│   └── globals.css        # CSS global
├── components/            # React components
│   ├── SceneRenderer.tsx  # Component chính
│   ├── AudioPlayer.tsx    # Phát nhạc
│   ├── MiniMap.tsx        # Bản đồ thế giới
│   ├── Navigation.tsx     # Điều hướng nâng cao
│   ├── SceneTransition.tsx # Hiệu ứng chuyển cảnh
│   └── layouts/           # Các layout khác nhau
│       ├── MinimalLayout.tsx
│       ├── CenteredLayout.tsx
│       ├── GridLayout.tsx
│       ├── RetroLayout.tsx
│       └── index.ts
├── data/                  # Dữ liệu
│   └── scenes.ts         # Định nghĩa các cảnh
├── hooks/                 # Custom hooks
│   └── useSceneStore.ts  # Zustand store
└── package.json
```

## Cài đặt và chạy

1. Cài đặt dependencies:

```bash
npm install
```

2. Chạy development server:

```bash
npm run dev
```

3. Mở trình duyệt tại `http://localhost:3000`

## Cách sử dụng

### Điều hướng cơ bản:

- Mỗi cảnh sẽ hiển thị với layout và âm nhạc riêng
- Nhấn nút "Tiếp tục" để chuyển sang cảnh tiếp theo
- Các cảnh sẽ lặp lại theo thứ tự: Rừng → Đại Dương → Thành Phố → Vũ Trụ → Rừng

### Bản đồ thế giới (MiniMap):

- **Vị trí**: Góc trái trên màn hình
- **Tính năng**:
  - Hiển thị 4 cảnh với icon và màu sắc riêng
  - Click vào bất kỳ cảnh nào để chuyển đến ngay lập tức
  - Có thể mở rộng/thu nhỏ bằng nút toggle
  - Hiển thị đường đi kết nối giữa các cảnh
  - Animation và hiệu ứng đẹp mắt

### Điều hướng nâng cao (Navigation):

- **Vị trí**: Góc phải trên màn hình
- **Tính năng**:
  - Hiển thị thông tin cảnh hiện tại
  - Nút điều hướng trước/sau
  - Progress bar hiển thị tiến độ
  - Thông tin layout hiện tại

### Điều khiển âm nhạc:

- **Vị trí**: Góc phải dưới màn hình
- **Tính năng**:
  - Play/pause âm nhạc
  - Điều chỉnh âm lượng
  - Tự động chuyển nhạc theo cảnh

## Công nghệ sử dụng

- **Next.js 14** với App Router
- **React 18** với TypeScript
- **Zustand** cho state management
- **Tailwind CSS** cho styling
- **Unsplash** cho hình ảnh nền

## Tùy chỉnh

### Thêm cảnh mới:

Chỉnh sửa file `data/scenes.ts`:

```typescript
{
  id: 'new-scene',
  title: 'Tên cảnh',
  description: 'Mô tả cảnh',
  background: 'URL hình ảnh nền',
  music: 'URL file âm nhạc',
  layout: 'minimal' | 'centered' | 'grid' | 'retro',
  color: 'CSS gradient',
  next: 'id-cảnh-tiếp-theo'
}
```

### Tạo layout mới:

1. Thêm component vào `components/layouts/`
2. Cập nhật `SceneRenderer.tsx`
3. Thêm icon và màu sắc vào `MiniMap.tsx`

### Tùy chỉnh MiniMap:

- Thay đổi icon trong `getSceneIcon()`
- Thay đổi màu sắc trong `getSceneColor()` và `getSceneGradient()`
- Điều chỉnh kích thước và vị trí

### Tùy chỉnh Navigation:

- Thêm thông tin hiển thị
- Thay đổi style của progress bar
- Thêm các nút điều khiển khác
