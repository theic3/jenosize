const express = require('express');
const axios = require("axios");
const router = express.Router();


function apiKeyValidation(req, res, next) {
  const apiKey = req.headers['api-key'];
  const validApiKey = 'AIzaSyC9xZrczfdDz0ALZ8yHMrJONLAbbU4s35s'; // กำหนดค่า api key ที่ถูกต้อง
  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({ message: 'Invalid API key' });
  }
  next();
  // return apiKey;
}

router.get('/api/places',apiKeyValidation, async (req, res) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query: req.query.query, // คำค้นหา
        type: 'restaurant', // ประเภทร้านอาหาร
        key: req.headers['api-key'], // API Key ของคุณ
      },
    });
    console.log(response.data.results)
    const arr_data = [];
    response.data.results.map((value,key) => {
      arr_data.push(value.name);
    })
    res.json(arr_data);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});


router.post('/api/game24', async (req, res) => {
  const numbers = req.body.numbers;

  // ตรวจสอบว่าตัวเลข 4 ตัวไหม
  if (numbers.length !== 4) {
    return res.status(400).json({ message: 'Invalid input: numbers more than 4 digit' });
  }

  const num1 = Number(numbers[0]);
  const num2 = Number(numbers[1]);
  const num3 = Number(numbers[2]);
  const num4 = Number(numbers[3]);


  // ตรวจสอบว่าตัวเลขทั้ง 4 ตัวอยู่ในช่วง 1-9
  if (![num1, num2, num3, num4].every(num => num >= 1 && num <= 9)) {
    return res.status(400).json({ message: 'Invalid input: numbers must be between 1 and 9' });
  }

  // ลองคำนวณโดยเรียกฟังก์ชัน solveGame24
  if (solveGame24(num1, num2, num3, num4)) {
    return res.json({ message: 'YES' });
  } else {
    return res.json({ message: 'NO' });
  }
});

function solveGame24(a, b, c, d) {
  const operations = ['+', '-', '*', '/'];

  for (const op1 of operations) {
    for (const op2 of operations) {
      for (const op3 of operations) {
        // สร้างลำดับของตัวเลขและตัวดำเนินการ
        const sequence = [a, op1, b, op2, c, op3, d];

        // สร้างสายอักขระจากลำดับของตัวเลขและตัวดำเนินการ
        const expr = sequence.join('');

        // ทดสอบคำนวณด้วย eval()
        try {
          if (eval(expr) === 24) {
            return true;
          }
        } catch (e) {
          continue;
        }
      }
    }
  }

  // ไม่มีวิธีคำนวณได้ที่จะได้ผลลัพธ์เป็น 24
  return false;
}

module.exports = router;