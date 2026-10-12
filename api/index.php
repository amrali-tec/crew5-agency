<?php
require_once __DIR__ . '/config.php';

$pdo = getDB();

// Parse request URI
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
// Normalize URI path: remove base prefix if present
$uri = preg_replace('#^/api#', '', $uri);
$uri = trim($uri, '/');
$segments = $uri ? explode('/', $uri) : [];

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$resource = $segments[0] ?? '';
$id = $segments[1] ?? null;
$subAction = $segments[2] ?? null;

// ==========================================
// 1. Authentication Endpoints
// ==========================================
if ($resource === 'auth') {
    if ($id === 'login' && $method === 'POST') {
        $input = getJsonInput();
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        $stmt = $pdo->prepare("SELECT * FROM admins WHERE email = ? LIMIT 1");
        $stmt->execute([$email]);
        $admin = $stmt->fetch();

        if ($admin && $admin['password'] === $password) {
            $token = base64_encode($email . ':' . time());
            sendJson([
                "success" => true,
                "token" => $token,
                "user" => [
                    "email" => $admin['email'],
                    "name" => $admin['name'],
                    "role" => $admin['role']
                ]
            ]);
        }
        sendJson(["success" => false, "message" => "البريد الإلكتروني أو كلمة المرور غير صحيحة"], 401);
    }

    if ($id === 'me' && $method === 'GET') {
        $stmt = $pdo->query("SELECT email, name, role FROM admins LIMIT 1");
        $admin = $stmt->fetch();
        if ($admin) {
            sendJson(["success" => true, "user" => $admin]);
        }
        sendJson(["success" => false, "message" => "غير مصرح"], 401);
    }

    if ($id === 'update-password' && $method === 'PUT') {
        $input = getJsonInput();
        $current = $input['currentPassword'] ?? '';
        $new = $input['newPassword'] ?? '';

        $stmt = $pdo->query("SELECT * FROM admins LIMIT 1");
        $admin = $stmt->fetch();

        if ($admin && $admin['password'] === $current) {
            $update = $pdo->prepare("UPDATE admins SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
            $update->execute([$new, $admin['id']]);
            sendJson(["success" => true, "message" => "تم تحديث كلمة المرور بنجاح"]);
        }
        sendJson(["success" => false, "message" => "كلمة المرور الحالية غير صحيحة"], 400);
    }
}

// ==========================================
// 2. Stats Endpoint
// ==========================================
if ($resource === 'stats' && $method === 'GET') {
    $totalProjects = (int)$pdo->query("SELECT COUNT(*) FROM projects")->fetchColumn();
    $totalBlogs = (int)$pdo->query("SELECT COUNT(*) FROM blogs")->fetchColumn();
    $totalPages = (int)$pdo->query("SELECT COUNT(*) FROM pages")->fetchColumn();
    $totalMessages = (int)$pdo->query("SELECT COUNT(*) FROM messages")->fetchColumn();
    $unreadMessages = (int)$pdo->query("SELECT COUNT(*) FROM messages WHERE status = 'new'")->fetchColumn();
    $totalViews = (int)$pdo->query("SELECT COALESCE(SUM(views), 0) FROM blogs")->fetchColumn() + 4200;

    $stmt = $pdo->query("SELECT * FROM messages ORDER BY id DESC LIMIT 5");
    $recentMessages = $stmt->fetchAll();

    sendJson([
        "success" => true,
        "data" => [
            "totalProjects" => $totalProjects,
            "totalBlogs" => $totalBlogs,
            "totalPages" => $totalPages,
            "totalMessages" => $totalMessages,
            "unreadMessages" => $unreadMessages,
            "totalViews" => $totalViews,
            "recentMessages" => $recentMessages
        ]
    ]);
}

// ==========================================
// 3. Projects Endpoints (CRUD)
// ==========================================
if ($resource === 'projects') {
    $jsonDbFile = __DIR__ . '/../server/data/database.json';

    if ($method === 'GET' && !$id) {
        if (file_exists($jsonDbFile)) {
            $dbData = json_decode(file_get_contents($jsonDbFile), true);
            if (!empty($dbData['projects'])) {
                sendJson(["success" => true, "data" => $dbData['projects']]);
            }
        }
        $stmt = $pdo->query("SELECT * FROM projects ORDER BY id DESC");
        $rows = $stmt->fetchAll();
        foreach ($rows as &$r) {
            $r['tags'] = json_decode($r['tags'] ?: '[]', true);
            $r['results'] = json_decode($r['results'] ?: '[]', true);
        }
        sendJson(["success" => true, "data" => $rows]);
    }

    if ($method === 'GET' && $id) {
        if (file_exists($jsonDbFile)) {
            $dbData = json_decode(file_get_contents($jsonDbFile), true);
            if (!empty($dbData['projects'])) {
                foreach ($dbData['projects'] as $proj) {
                    if ($proj['id'] == $id || ($proj['slug'] ?? '') === $id) {
                        sendJson(["success" => true, "data" => $proj]);
                    }
                }
            }
        }
        $stmt = $pdo->prepare("SELECT * FROM projects WHERE id = ? OR slug = ? LIMIT 1");
        $stmt->execute([$id, $id]);
        $project = $stmt->fetch();
        if ($project) {
            $project['tags'] = json_decode($project['tags'] ?: '[]', true);
            $project['results'] = json_decode($project['results'] ?: '[]', true);
            sendJson(["success" => true, "data" => $project]);
        }
        sendJson(["success" => false, "message" => "المشروع غير موجود"], 404);
    }

    if ($method === 'POST') {
        $in = getJsonInput();
        $slug = $in['slug'] ?? 'project-' . time();
        $tags = json_encode($in['tags'] ?? [], JSON_UNESCAPED_UNICODE);
        $results = json_encode($in['results'] ?? [], JSON_UNESCAPED_UNICODE);

        $stmt = $pdo->prepare("INSERT INTO projects (slug, title, category, category_key, client, year, description, full_details, image_url, tags, results) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $slug,
            $in['title'] ?? '',
            $in['category'] ?? 'تصميم وتطوير المواقع',
            $in['categoryKey'] ?? 'web',
            $in['client'] ?? '',
            $in['year'] ?? '2025',
            $in['description'] ?? '',
            $in['fullDetails'] ?? '',
            $in['imageUrl'] ?? '',
            $tags,
            $results
        ]);
        $newId = $pdo->lastInsertId();
        sendJson(["success" => true, "data" => ["id" => $newId, "slug" => $slug]], 201);
    }

    if ($method === 'PUT' && $id) {
        $in = getJsonInput();
        $tags = json_encode($in['tags'] ?? [], JSON_UNESCAPED_UNICODE);
        $results = json_encode($in['results'] ?? [], JSON_UNESCAPED_UNICODE);

        $stmt = $pdo->prepare("UPDATE projects SET title = ?, category = ?, category_key = ?, client = ?, year = ?, description = ?, full_details = ?, image_url = ?, tags = ?, results = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
        $stmt->execute([
            $in['title'] ?? '',
            $in['category'] ?? '',
            $in['categoryKey'] ?? '',
            $in['client'] ?? '',
            $in['year'] ?? '',
            $in['description'] ?? '',
            $in['fullDetails'] ?? '',
            $in['imageUrl'] ?? '',
            $tags,
            $results,
            $id
        ]);
        sendJson(["success" => true, "message" => "تم تحديث المشروع بنجاح"]);
    }

    if ($method === 'DELETE' && $id) {
        $stmt = $pdo->prepare("DELETE FROM projects WHERE id = ?");
        $stmt->execute([$id]);
        sendJson(["success" => true, "message" => "تم حذف المشروع بنجاح"]);
    }
}

// ==========================================
// 4. Blogs Endpoints (CRUD)
// ==========================================
if ($resource === 'blogs') {
    if ($method === 'GET' && !$id) {
        $stmt = $pdo->query("SELECT * FROM blogs ORDER BY id DESC");
        $rows = $stmt->fetchAll();
        foreach ($rows as &$r) {
            $r['tags'] = json_decode($r['tags'] ?: '[]', true);
            $r['author'] = [
                'name' => $r['author_name'],
                'role' => $r['author_role'],
                'avatar' => $r['author_avatar']
            ];
        }
        sendJson(["success" => true, "data" => $rows]);
    }

    if ($method === 'GET' && $id) {
        $stmt = $pdo->prepare("SELECT * FROM blogs WHERE id = ? OR slug = ? LIMIT 1");
        $stmt->execute([$id, $id]);
        $blog = $stmt->fetch();
        if ($blog) {
            $pdo->prepare("UPDATE blogs SET views = views + 1 WHERE id = ?")->execute([$blog['id']]);
            $blog['tags'] = json_decode($blog['tags'] ?: '[]', true);
            $blog['author'] = [
                'name' => $blog['author_name'],
                'role' => $blog['author_role'],
                'avatar' => $blog['author_avatar']
            ];
            sendJson(["success" => true, "data" => $blog]);
        }
        sendJson(["success" => false, "message" => "المقال غير موجود"], 404);
    }

    if ($method === 'POST') {
        $in = getJsonInput();
        $slug = $in['slug'] ?? 'post-' . time();
        $tags = json_encode($in['tags'] ?? [], JSON_UNESCAPED_UNICODE);
        $author = $in['author'] ?? [];

        $stmt = $pdo->prepare("INSERT INTO blogs (slug, title, category, read_time, date, author_name, author_role, author_avatar, excerpt, content, image_url, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $slug,
            $in['title'] ?? '',
            $in['category'] ?? 'التسويق الرقمي',
            $in['readTime'] ?? '4 دقائق قراءة',
            $in['date'] ?? date('Y-m-d'),
            $author['name'] ?? 'محمد أحمد',
            $author['role'] ?? 'فريق Crew5',
            $author['avatar'] ?? '/assets/avatar_2.jpg',
            $in['excerpt'] ?? '',
            $in['content'] ?? '',
            $in['imageUrl'] ?? '',
            $tags
        ]);
        sendJson(["success" => true, "data" => ["id" => $pdo->lastInsertId(), "slug" => $slug]], 201);
    }

    if ($method === 'PUT' && $id) {
        $in = getJsonInput();
        $tags = json_encode($in['tags'] ?? [], JSON_UNESCAPED_UNICODE);
        $author = $in['author'] ?? [];

        $stmt = $pdo->prepare("UPDATE blogs SET title = ?, category = ?, read_time = ?, excerpt = ?, content = ?, image_url = ?, tags = ?, author_name = ?, author_role = ?, author_avatar = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
        $stmt->execute([
            $in['title'] ?? '',
            $in['category'] ?? '',
            $in['readTime'] ?? '',
            $in['excerpt'] ?? '',
            $in['content'] ?? '',
            $in['imageUrl'] ?? '',
            $tags,
            $author['name'] ?? 'محمد أحمد',
            $author['role'] ?? 'فريق Crew5',
            $author['avatar'] ?? '/assets/avatar_2.jpg',
            $id
        ]);
        sendJson(["success" => true, "message" => "تم تحديث المقال بنجاح"]);
    }

    if ($method === 'DELETE' && $id) {
        $stmt = $pdo->prepare("DELETE FROM blogs WHERE id = ?");
        $stmt->execute([$id]);
        sendJson(["success" => true, "message" => "تم حذف المقال بنجاح"]);
    }
}

// ==========================================
// 5. Dynamic Custom Pages Endpoints (Page Builder)
// ==========================================
if ($resource === 'pages') {
    if ($method === 'GET' && !$id) {
        $stmt = $pdo->query("SELECT * FROM pages ORDER BY id DESC");
        $rows = $stmt->fetchAll();
        foreach ($rows as &$r) {
            $decoded = json_decode($r['blocks'] ?: '[]', true);
            $r['blocks'] = is_array($decoded) ? $decoded : [];
            $r['isPublished'] = (bool)$r['is_published'];
        }
        sendJson(["success" => true, "data" => $rows]);
    }

    if ($method === 'GET' && $id) {
        $stmt = $pdo->prepare("SELECT * FROM pages WHERE id = ? OR slug = ? LIMIT 1");
        $stmt->execute([$id, $id]);
        $page = $stmt->fetch();
        if ($page) {
            $decoded = json_decode($page['blocks'] ?: '[]', true);
            $page['blocks'] = is_array($decoded) ? $decoded : [];
            $page['isPublished'] = (bool)$page['is_published'];
            sendJson(["success" => true, "data" => $page]);
        }
        sendJson(["success" => false, "message" => "الصفحة غير موجودة"], 404);
    }

    if ($method === 'POST') {
        $in = getJsonInput();
        $slug = preg_replace('/[^a-zA-Z0-9_-]/', '-', strtolower($in['slug'] ?? 'page-' . time()));
        $slug = trim($slug, '-');
        $blocks = json_encode($in['blocks'] ?? [], JSON_UNESCAPED_UNICODE);
        $isPublished = isset($in['isPublished']) ? ($in['isPublished'] ? 1 : 0) : 1;

        $stmt = $pdo->prepare("INSERT INTO pages (slug, title, seo_description, blocks, is_published) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $slug,
            $in['title'] ?? 'صفحة مخصصة جديدة',
            $in['seoDescription'] ?? '',
            $blocks,
            $isPublished
        ]);
        sendJson(["success" => true, "data" => ["id" => $pdo->lastInsertId(), "slug" => $slug]], 201);
    }

    if ($method === 'PUT' && $id) {
        $in = getJsonInput();
        $blocks = json_encode($in['blocks'] ?? [], JSON_UNESCAPED_UNICODE);
        $isPublished = isset($in['isPublished']) ? ($in['isPublished'] ? 1 : 0) : 1;

        $stmt = $pdo->prepare("UPDATE pages SET title = ?, slug = ?, seo_description = ?, blocks = ?, is_published = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
        $stmt->execute([
            $in['title'] ?? '',
            $in['slug'] ?? '',
            $in['seoDescription'] ?? '',
            $blocks,
            $isPublished,
            $id
        ]);
        sendJson(["success" => true, "message" => "تم تحديث الصفحة بنجاح"]);
    }

    if ($method === 'DELETE' && $id) {
        $stmt = $pdo->prepare("DELETE FROM pages WHERE id = ?");
        $stmt->execute([$id]);
        sendJson(["success" => true, "message" => "تم حذف الصفحة بنجاح"]);
    }
}

// ==========================================
// 6. Services Endpoints (CRUD)
// ==========================================
if ($resource === 'services') {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT category_json FROM services_data LIMIT 1");
        $json = $stmt->fetchColumn();
        $data = $json ? json_decode($json, true) : [];
        sendJson(["success" => true, "data" => $data]);
    }

    if ($method === 'PUT') {
        $in = getJsonInput();
        $json = json_encode($in, JSON_UNESCAPED_UNICODE);
        $stmt = $pdo->prepare("UPDATE services_data SET category_json = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1");
        $stmt->execute([$json]);
        sendJson(["success" => true, "data" => $in]);
    }
}

// ==========================================
// 7. Messages Endpoints (CRUD)
// ==========================================
if ($resource === 'messages') {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM messages ORDER BY id DESC");
        sendJson(["success" => true, "data" => $stmt->fetchAll()]);
    }

    if ($method === 'POST') {
        $in = getJsonInput();
        if (empty($in['name']) || empty($in['email']) || empty($in['message'])) {
            sendJson(["success" => false, "message" => "يرجى تعبئة الحقول المطلوبة"], 400);
        }

        $stmt = $pdo->prepare("INSERT INTO messages (name, email, phone, service, message, status) VALUES (?, ?, ?, ?, ?, 'new')");
        $stmt->execute([
            $in['name'],
            $in['email'],
            $in['phone'] ?? '',
            $in['service'] ?? 'عام',
            $in['message']
        ]);
        sendJson(["success" => true, "message" => "تم إرسال رسالتك بنجاح", "id" => $pdo->lastInsertId()], 201);
    }

    if ($method === 'PUT' && $id) {
        $in = getJsonInput();
        $status = $in['status'] ?? 'read';
        $stmt = $pdo->prepare("UPDATE messages SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
        $stmt->execute([$status, $id]);
        sendJson(["success" => true, "message" => "تم تحديث حالة الرسالة"]);
    }

    if ($method === 'DELETE' && $id) {
        $stmt = $pdo->prepare("DELETE FROM messages WHERE id = ?");
        $stmt->execute([$id]);
        sendJson(["success" => true, "message" => "تم حذف الرسالة بنجاح"]);
    }
}

// ==========================================
// 8. Testimonials Endpoints (CRUD)
// ==========================================
if ($resource === 'testimonials') {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM testimonials ORDER BY id DESC");
        sendJson(["success" => true, "data" => $stmt->fetchAll()]);
    }

    if ($method === 'POST') {
        $in = getJsonInput();
        $stmt = $pdo->prepare("INSERT INTO testimonials (name, role, review, avatar, rating, project) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $in['name'] ?? '',
            $in['role'] ?? '',
            $in['review'] ?? '',
            $in['avatar'] ?? '/assets/avatar_1.jpg',
            $in['rating'] ?? 5,
            $in['project'] ?? ''
        ]);
        sendJson(["success" => true, "id" => $pdo->lastInsertId()], 201);
    }

    if ($method === 'PUT' && $id) {
        $in = getJsonInput();
        $stmt = $pdo->prepare("UPDATE testimonials SET name = ?, role = ?, review = ?, avatar = ?, rating = ?, project = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
        $stmt->execute([
            $in['name'] ?? '',
            $in['role'] ?? '',
            $in['review'] ?? '',
            $in['avatar'] ?? '',
            $in['rating'] ?? 5,
            $in['project'] ?? '',
            $id
        ]);
        sendJson(["success" => true, "message" => "تم تحديث التقييم بنجاح"]);
    }

    if ($method === 'DELETE' && $id) {
        $stmt = $pdo->prepare("DELETE FROM testimonials WHERE id = ?");
        $stmt->execute([$id]);
        sendJson(["success" => true, "message" => "تم حذف التقييم بنجاح"]);
    }
}

// ==========================================
// 9. Team Endpoints (CRUD)
// ==========================================
if ($resource === 'team') {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM team ORDER BY id ASC");
        $rows = $stmt->fetchAll();
        foreach ($rows as &$r) {
            $r['skills'] = json_decode($r['skills'] ?: '[]', true);
        }
        sendJson(["success" => true, "data" => $rows]);
    }

    if ($method === 'POST') {
        $in = getJsonInput();
        $skills = json_encode($in['skills'] ?? [], JSON_UNESCAPED_UNICODE);
        $stmt = $pdo->prepare("INSERT INTO team (name, role, initials, bio, avatar, skills) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $in['name'] ?? '',
            $in['role'] ?? '',
            $in['initials'] ?? 'CR',
            $in['bio'] ?? '',
            $in['avatar'] ?? '/assets/avatar_2.jpg',
            $skills
        ]);
        sendJson(["success" => true, "id" => $pdo->lastInsertId()], 201);
    }

    if ($method === 'PUT' && $id) {
        $in = getJsonInput();
        $skills = json_encode($in['skills'] ?? [], JSON_UNESCAPED_UNICODE);
        $stmt = $pdo->prepare("UPDATE team SET name = ?, role = ?, initials = ?, bio = ?, avatar = ?, skills = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
        $stmt->execute([
            $in['name'] ?? '',
            $in['role'] ?? '',
            $in['initials'] ?? '',
            $in['bio'] ?? '',
            $in['avatar'] ?? '',
            $skills,
            $id
        ]);
        sendJson(["success" => true, "message" => "تم تحديث بيانات العضو بنجاح"]);
    }

    if ($method === 'DELETE' && $id) {
        $stmt = $pdo->prepare("DELETE FROM team WHERE id = ?");
        $stmt->execute([$id]);
        sendJson(["success" => true, "message" => "تم حذف العضو بنجاح"]);
    }
}

// ==========================================
// 10. Site Settings Endpoints
// ==========================================
if ($resource === 'settings') {
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT setting_value FROM settings WHERE setting_key = 'site_config' LIMIT 1");
        $json = $stmt->fetchColumn();
        $data = $json ? json_decode($json, true) : [];
        sendJson(["success" => true, "data" => $data]);
    }

    if ($method === 'PUT') {
        $in = getJsonInput();
        $json = json_encode($in, JSON_UNESCAPED_UNICODE);
        $stmt = $pdo->prepare("UPDATE settings SET setting_value = ?, updated_at = CURRENT_TIMESTAMP WHERE setting_key = 'site_config'");
        $stmt->execute([$json]);
        sendJson(["success" => true, "data" => $in]);
    }
}

// ==========================================
// 11. File Upload Endpoint
// ==========================================
if ($resource === 'upload' && $method === 'POST') {
    if (!isset($_FILES['file'])) {
        sendJson(["success" => false, "message" => "لم يتم إرفاق ملف"], 400);
    }

    $file = $_FILES['file'];
    $uploadDir = __DIR__ . '/../public/uploads/';
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $cleanName = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($file['name'], PATHINFO_FILENAME));
    $filename = $cleanName . '_' . time() . '.' . $ext;
    $targetPath = $uploadDir . $filename;

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        sendJson([
            "success" => true,
            "fileUrl" => "/uploads/" . $filename,
            "filename" => $filename
        ]);
    } else {
        sendJson(["success" => false, "message" => "فشل نقل الملف المرفوع"], 500);
    }
}

// Fallback for unmatched routes
sendJson(["success" => false, "message" => "API Route Not Found: " . $method . " /" . $uri], 404);
