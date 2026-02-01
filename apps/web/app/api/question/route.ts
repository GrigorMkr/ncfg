import { NextResponse } from "next/server";

interface QuestionData {
  question: string;
  name: string;
  email: string;
  postTitle?: string;
}

const RECIPIENT_EMAIL = "yura.posledov@yandex.ru";

export async function POST(request: Request) {
  try {
    const data: QuestionData = await request.json();

    if (!data.question || !data.name || !data.email) {
      return NextResponse.json(
        { error: "Вопрос, имя и email обязательны для заполнения" },
        { status: 400 }
      );
    }

    if (data.question.length > 1000) {
      return NextResponse.json(
        { error: "Вопрос не должен превышать 1000 символов" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Некорректный формат email" },
        { status: 400 }
      );
    }

    // Log the question data (in production, this would be sent via email service)
    console.log("=== Новый вопрос с сайта НЦФГ ===");
    console.log(`Получатель: ${RECIPIENT_EMAIL}`);
    console.log(`Статья: ${data.postTitle || "не указана"}`);
    console.log(`Имя: ${data.name}`);
    console.log(`Email: ${data.email}`);
    console.log(`Вопрос: ${data.question}`);
    console.log("================================");

    // TODO: Integrate with email service (e.g., Resend, SendGrid, Nodemailer)
    // For now, we'll just log the data and return success

    return NextResponse.json({
      success: true,
      message: "Вопрос успешно отправлен",
    });
  } catch (error) {
    console.error("Error processing question:", error);
    return NextResponse.json(
      { error: "Произошла ошибка при обработке вопроса" },
      { status: 500 }
    );
  }
}
