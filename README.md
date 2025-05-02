#Thazh Social Network

Dự án này là một mạng xã hội mini sử dụng Next.js và Supabase để cung cấp các tính năng như đăng ký, đăng nhập, đăng bài, theo dõi, like, và bình luận.

## I. Cài đặt và chạy dự án 
###  1. Yêu cầu 
  *Node.js >= 16 
  *Tài khoản Supabase 
  *Tài khoản Vercel (nếu deploy lên Vercel) ###  2. Clone repository
 
``git clone https://github.com/KairomGithub/Thazh-Social-Network.git``

  
``cd thazh-social-network``
   
###  3. Cài đặt dependencies

``npm install``
   
###  4. Cấu hình môi trường 

- Tạo file .env.local ở thư mục gốc và thêm các biến môi trường:

``NEXT_PUBLIC_SUPABASE_URL=your-supabase-url NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key``

###  5. Cấu trúc thư mục 📁 

``mini-social-network 
│── 📁 pages # Chứa các trang chính 
│ 
├── 📄 index.js # Trang chủ hiển thị bài viết 
│ 
├── 📄 login.js # Trang đăng nhập 
│ 
├── 📄 signup.js # Trang đăng ký 
│ 
├── 📄 profile.js # Trang cá nhân 
│ 
├── 📄 post.js # Trang đăng bài 
│── 📁 components # Chứa các component tái sử dụng 
│── 📁 utils # Chứa các helper functions │ 
├── 📄 auth.js # Xử lý xác thực 
│ 
├── 📄 supabaseClient.js # Kết nối với Supabase 
│── 📄 .gitignore # Danh sách file không commit 
│── 📄 package.json # Danh sách dependencies 
│── 📄 next.config.js # Cấu hình Next.js │── 📄 vercel.json # Cấu hình deploy Vercel 
│── 📄 README.md # Tài liệu hướng dẫn``

###  6. Chạy dự án 

 - Chạy lệnh sau để khởi động dự án:

``npm run dev`` 

 - Mở trình duyệt và truy cập:   

``http://localhost:3000``

###  7. Deploy lên Vercel 
 - Bước 1: Đăng nhập Vercel

``npm install -g vercel vercel login``

- Bước 2: Deploy dự án vercel 

Làm theo hướng dẫn trên màn hình để hoàn tất quá trình deploy.

###  8. Tính năng chính 
 [x] Đăng ký & đăng nhập (Email & mật khẩu, Google, GitHub) 
 [x] Đăng bài (hỗ trợ text, ảnh, video tối đa 15MB) 
 [x] Trang cá nhân (hiển thị thông tin user, bài đăng, người theo dõi)
 [x] Theo dõi & bỏ theo dõi [x] Like & Comment bài viết 

###  9. Các file không nên commit 

 Thêm vào .gitignore để tránh upload file nhạy cảm:
 node_modules/ .env.local .vercel/ 

📌 Nếu có lỗi hoặc cần hỗ trợ, hãy mở issue hoặc liên hệ mình! 🚀

