CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

INSERT INTO roles (id, name, description) VALUES
(1, 'administrador', 'Acceso total al sistema y creación de cursos'),
(2, 'profesor', 'Puede crear cursos pero no tiene acceso total'),
(3, 'user', 'Usuario estándar del sistema');
	
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    second_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    second_last_name VARCHAR(100),
    email VARCHAR(150) NOT NULL UNIQUE,
    secondary_email VARCHAR(150),
    password TEXT,
    profile_photo TEXT,
    registration_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    role_id INT NOT NULL,
    oauth_provider VARCHAR(50),
    oauth_id VARCHAR(150),

    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_users_oauth ON users(oauth_provider, oauth_id);

-- Tabla de categorías para programación
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);	

-- Insertar categorías específicas de programación
INSERT INTO categories (name, description) VALUES
('Desarrollo Web', 'HTML, CSS, JavaScript, React, Vue, Angular'),
('Backend', 'Node.js, Python, Java, PHP, Ruby'),
('Base de Datos', 'SQL, PostgreSQL, MySQL, MongoDB, Redis'),
('DevOps', 'Docker, Kubernetes, CI/CD, AWS, Azure'),
('Sistemas Operativos', 'Linux, Windows Server, Administración de sistemas'),
('Desarrollo Móvil', 'React Native, Flutter, iOS, Android'),
('Control de Versiones', 'Git, GitHub, GitLab'),
('Seguridad', 'Ciberseguridad, Pentesting, Seguridad en aplicaciones'),
('Arquitectura de Software', 'Patrones de diseño, Microservicios, Clean Architecture'),
('Testing', 'Unit Testing, Integration Testing, TDD');

-- Tabla de niveles (enum type)
CREATE TYPE course_level AS ENUM ('basico', 'intermedio', 'avanzado');

CREATE TABLE technologies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(255) NOT NULL 
);

CREATE TABLE resource_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE, -- 'GitHub', 'Figma', 'PDF', 'Drive', 'Documentación'
    icon_url VARCHAR(255) -- Para mostrar el logo de GitHub, Figma, etc.
);

INSERT INTO resource_types (name) VALUES ('GitHub'), ('Figma'), ('Google Drive'), ('PDF'), ('URL Externa');

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name_course VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    technology_id INT NOT NULL, 
    instructor_id INT NOT NULL,
    category_id INT NOT NULL,
    level course_level NOT NULL DEFAULT 'basico',
    image_url VARCHAR(500),
    total_modules INT NOT NULL DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00 CHECK (average_rating >= 0 AND average_rating <= 5),
    total_ratings INT DEFAULT 0,
    duration_hours DECIMAL(5,2),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    
    -- Llaves foráneas
    CONSTRAINT fk_technology FOREIGN KEY (technology_id) REFERENCES technologies(id) ON DELETE RESTRICT,
    CONSTRAINT fk_instructor FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

CREATE TABLE modules (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    order_index INT NOT NULL DEFAULT 1,
    CONSTRAINT fk_course_modules FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    module_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content_type VARCHAR(50) NOT NULL, -- 'video', 'markdown', etc.
    
    -- Campos para Bunny.net
    bunny_library_id VARCHAR(50),      -- El ID de la librería (fijo)
    bunny_video_id VARCHAR(100),       -- El ID único del video subido
    
    body_text TEXT,                    -- Notas o explicación de la clase
    duration_minutes INT DEFAULT 0,    
    order_index INT NOT NULL,
    is_preview BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_module_lessons 
        FOREIGN KEY (module_id) 
        REFERENCES modules(id) 
        ON DELETE CASCADE
);

select * from lessons;

SELECT column_name, data_type, character_maximum_length 
FROM information_schema.columns 
WHERE table_name = 'lessons';

CREATE TABLE lesson_resources (
    id SERIAL PRIMARY KEY,
    lesson_id INT NOT NULL,
    resource_type_id INT NOT NULL,
    url TEXT NOT NULL,
    title VARCHAR(100),
    
    CONSTRAINT fk_resource_lesson 
        FOREIGN KEY (lesson_id) 
        REFERENCES lessons(id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_resource_type 
        FOREIGN KEY (resource_type_id) 
        REFERENCES resource_types(id) 
        ON DELETE RESTRICT
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_courses_instructor ON courses(instructor_id);
CREATE INDEX idx_courses_category ON courses(category_id);
CREATE INDEX idx_courses_level ON courses(level);
CREATE INDEX idx_courses_rating ON courses(average_rating DESC);
CREATE INDEX idx_courses_active ON courses(is_active);
CREATE INDEX idx_modules_course ON modules(course_id);
CREATE INDEX idx_lessons_module ON lessons(module_id);
CREATE INDEX idx_resources_lesson ON lesson_resources(lesson_id);

-- Tabla para las calificaciones individuales de los cursos
CREATE TABLE course_ratings (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_course_rating FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_rating FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT unique_user_course_rating UNIQUE (course_id, user_id)
);
	
CREATE INDEX idx_ratings_course ON course_ratings(course_id);
CREATE INDEX idx_ratings_user ON course_ratings(user_id);

-- Tabla de métodos de pago
CREATE TABLE payment_methods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE, -- 'stripe', 'paypal', 'mercadopago'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO payment_methods (name, is_active) VALUES 
('stripe', true),
('paypal', false),
('mercadopago', false);

-- Tabla de precios de cursos (para compra individual)
CREATE TABLE course_prices (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL UNIQUE,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    currency VARCHAR(3) NOT NULL DEFAULT 'USD', -- USD, MXN, EUR
    discount_percentage DECIMAL(5,2) DEFAULT 0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
    is_free BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_course_price FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Tabla de planes de suscripción
CREATE TABLE subscription_plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE, -- 'Plan Mensual', 'Plan Anual'
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    billing_period VARCHAR(20) NOT NULL, -- 'monthly', 'yearly'
    stripe_price_id VARCHAR(255), -- ID del precio en Stripe
    features TEXT[], -- Array de características del plan
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO subscription_plans (name, description, price, currency, billing_period, features, is_active) VALUES
('Plan Mensual', 'Acceso ilimitado a todos los cursos', 19.99, 'USD', 'monthly', 
 ARRAY['Acceso a todos los cursos', 'Certificados de finalización', 'Soporte prioritario', 'Sin anuncios'], true),
('Plan Anual', 'Acceso ilimitado a todos los cursos con descuento anual', 199.99, 'USD', 'yearly', 
 ARRAY['Acceso a todos los cursos', 'Certificados de finalización', 'Soporte prioritario', 'Sin anuncios', '2 meses gratis'], true);

-- Tabla de suscripciones de usuarios
CREATE TABLE user_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    subscription_plan_id INT NOT NULL,
    stripe_subscription_id VARCHAR(255), -- ID de suscripción en Stripe
    stripe_customer_id VARCHAR(255), -- ID del cliente en Stripe
    status VARCHAR(50) NOT NULL, -- 'active', 'canceled', 'past_due', 'paused'
    current_period_start TIMESTAMP,
    current_period_end TIMESTAMP,
    cancel_at_period_end BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_subscription_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_subscription_plan FOREIGN KEY (subscription_plan_id) REFERENCES subscription_plans(id) ON DELETE RESTRICT
);

CREATE INDEX idx_user_subscriptions_user ON user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_status ON user_subscriptions(status);
CREATE INDEX idx_user_subscriptions_stripe ON user_subscriptions(stripe_subscription_id);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    payment_method_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    status VARCHAR(50) NOT NULL,
    stripe_payment_intent_id VARCHAR(255),
    stripe_session_id VARCHAR(255),
    payment_date TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_payment_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_payment_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE RESTRICT,
    CONSTRAINT fk_payment_method FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id) ON DELETE RESTRICT
);

CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_course ON payments(course_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_stripe_intent ON payments(stripe_payment_intent_id);
CREATE INDEX idx_payments_stripe_session ON payments(stripe_session_id);

CREATE TABLE course_enrollments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    payment_id INT,
    subscription_id INT,
    enrollment_type VARCHAR(20) NOT NULL,
    enrollment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    
    CONSTRAINT fk_enrollment_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_enrollment_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    CONSTRAINT fk_enrollment_payment FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE SET NULL,
    CONSTRAINT fk_enrollment_subscription FOREIGN KEY (subscription_id) REFERENCES user_subscriptions(id) ON DELETE SET NULL,
    CONSTRAINT unique_user_course_enrollment UNIQUE (user_id, course_id)
);

CREATE INDEX idx_enrollments_user ON course_enrollments(user_id);
CREATE INDEX idx_enrollments_course ON course_enrollments(course_id);
CREATE INDEX idx_enrollments_active ON course_enrollments(is_active);
CREATE INDEX idx_enrollments_type ON course_enrollments(enrollment_type);

-- vamos vamos nuevo
CREATE TABLE module_likes (
    id SERIAL PRIMARY KEY,
    module_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_like_module FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE,
    CONSTRAINT fk_like_user_module FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT unique_user_module_like UNIQUE (module_id, user_id)
);

CREATE INDEX idx_module_likes_module ON module_likes(module_id);
CREATE INDEX idx_module_likes_user ON module_likes(user_id);

CREATE TABLE lesson_comments (
    id SERIAL PRIMARY KEY,
    lesson_id INT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_edited BOOLEAN DEFAULT false,
    is_deleted BOOLEAN DEFAULT false,
    
    CONSTRAINT fk_comment_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_lesson_comments_lesson ON lesson_comments(lesson_id);
CREATE INDEX idx_lesson_comments_user ON lesson_comments(user_id);
CREATE INDEX idx_lesson_comments_created ON lesson_comments(created_at DESC);

CREATE TABLE comment_replies (
    id SERIAL PRIMARY KEY,
    parent_comment_id INT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_edited BOOLEAN DEFAULT false,
    is_deleted BOOLEAN DEFAULT false,
    
    CONSTRAINT fk_reply_parent_comment FOREIGN KEY (parent_comment_id) REFERENCES lesson_comments(id) ON DELETE CASCADE,
    CONSTRAINT fk_reply_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_comment_replies_parent ON comment_replies(parent_comment_id);
CREATE INDEX idx_comment_replies_user ON comment_replies(user_id);
CREATE INDEX idx_comment_replies_created ON comment_replies(created_at DESC);

CREATE TABLE comment_likes (
    id SERIAL PRIMARY KEY,
    comment_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_like_comment FOREIGN KEY (comment_id) REFERENCES lesson_comments(id) ON DELETE CASCADE,
    CONSTRAINT fk_like_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT unique_user_comment_like UNIQUE (comment_id, user_id)
);

CREATE INDEX idx_comment_likes_comment ON comment_likes(comment_id);
CREATE INDEX idx_comment_likes_user ON comment_likes(user_id);

CREATE TABLE reply_likes (
    id SERIAL PRIMARY KEY,
    reply_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_like_reply FOREIGN KEY (reply_id) REFERENCES comment_replies(id) ON DELETE CASCADE,
    CONSTRAINT fk_like_user_reply FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT unique_user_reply_like UNIQUE (reply_id, user_id)
);

CREATE INDEX idx_reply_likes_reply ON reply_likes(reply_id);
CREATE INDEX idx_reply_likes_user ON reply_likes(user_id);

CREATE TABLE lesson_progress (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    completed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_progress_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_progress_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    CONSTRAINT unique_user_lesson_progress UNIQUE (user_id, lesson_id)
);

CREATE INDEX idx_lesson_progress_user ON lesson_progress(user_id);
CREATE INDEX idx_lesson_progress_lesson ON lesson_progress(lesson_id);