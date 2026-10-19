import 'dotenv/config'; // برای خواندن متغیرهای فایل .env
import db from './DB.js';

async function testConnection() {
    try {
        // یک کوئری ساده برای گرفتن لیست جداول دیتابیس
        const [tables] = await db.query("SHOW TABLES;");
        
        console.log("✅ اتصال به دیتابیس با موفقیت برقرار شد!");
        console.log("تعداد جداول پیدا شده:", tables.length);
        console.log("لیست جداول:");
        console.log(tables);

    } catch (error) {
        console.error("❌ اتصال به دیتابیس ناموفق بود. دلیل خطا:");
        console.error(error.message);
    } finally {
        // قطع اتصال تا برنامه در ترمینال باز نماند
        process.exit();
    }
}

testConnection();