// app.js
const express = require('express');
const db = require('./db');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));


// 간단한 GET 라우트
// app.js에서 변경
app.get('/api/goals', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT id, title, description, checked, TO_CHAR(date, 'YYYY-MM-DD') AS date 
            FROM goals 
            ORDER BY date DESC`);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});




// 날짜에 따른 GET 라우트
app.get('/api/goals/:date', async (req, res) => {
    const { date } = req.params; // URL 파라미터에서 userId 추출
    try {
        const result = await db.query(
            'SELECT * FROM goals WHERE date = $1',
            [date] // date SQL 쿼리에 바인딩
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});



// POST 라우트 (데이터 삽입)
app.post('/api/goals', async (req, res) => {
    const { title, description, date } = req.body; // title, description, checked, date 추출
    try {
        const result = await db.query(
            'INSERT INTO goals (title, description, checked, date) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, 'false', date] // 각각의 값을 배열로 전달
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


app.put('/api/goals/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, checked, date } = req.body;  // req.body에서 업데이트할 데이터 추출

    try {
        const result = await db.query(
            `UPDATE goals
             SET title = $1, description = $2, checked = $3, date = $4
             WHERE id = $5
             RETURNING id, title, description, checked, TO_CHAR(date, 'YYYY-MM-DD') AS date;`,
            [title, description, checked, date, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.json(result.rows[0]);  // 업데이트된 행 반환
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Database error' });
    }
});









app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});




