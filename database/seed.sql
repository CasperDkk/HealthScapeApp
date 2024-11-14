-- seed.sql
USE healthscape;
-- Insert sample users
INSERT INTO users (username, email, password)
VALUES (
        'john_doe',
        'john@example.com',
        'hashed_password_1'
    ),
    (
        'jane_smith',
        'jane@example.com',
        'hashed_password_2'
    );
-- Insert sample hydration logs
INSERT INTO hydration_logs (user_id, amount, notes)
VALUES (1, 2.5, 'Drank water during workout'),
    (1, 1.0, 'Morning hydration'),
    (2, 3.0, 'Daily goal reached');
-- Insert sample sleep logs
INSERT INTO sleep_logs (user_id, duration, quality, notes)
VALUES (1, 7.5, 'good', 'Felt rested in the morning'),
    (2, 6.0, 'fair', 'Woke up several times');
-- Insert sample mood logs
INSERT INTO mood_logs (user_id, mood, notes)
VALUES (1, 'happy', 'Great day at work!'),
    (2, 'neutral', 'Just an average day');
-- Insert sample nutrition logs
INSERT INTO nutrition_logs (
        user_id,
        food_item,
        calories,
        serving_size,
        notes
    )
VALUES (
        1,
        'Chicken Salad',
        350,
        '1 bowl',
        'Healthy lunch option'
    ),
    (
        2,
        'Pasta',
        600,
        '1 plate',
        'Dinner with friends'
    );
-- Insert sample activity logs
INSERT INTO activity_logs (user_id, activity, duration, intensity, notes)
VALUES (
        1,
        'Running',
        1.0,
        'high',
        'Ran 5 km in the park'
    ),
    (
        2,
        'Yoga',
        0.5,
        'moderate',
        'Morning yoga session'
    );