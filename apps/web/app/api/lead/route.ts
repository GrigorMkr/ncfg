import { NextResponse } from "next/server";

interface LeadData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
}

const RECIPIENT_EMAIL = "yura.posledov@yandex.ru";

export async function POST(request: Request) {
  try {
    const data: LeadData = await request.json();

    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: "Имя и email обязательны для заполнения" },
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

    // Log the lead data (in production, this would be sent via email service)
    console.log("=== Новая заявка с сайта НЦФГ ===");
    console.log(`Получатель: ${RECIPIENT_EMAIL}`);
    console.log(`Имя: ${data.name}`);
    console.log(`Email: ${data.email}`);
    console.log(`Телефон: ${data.phone || "не указан"}`);
    console.log(`Компания: ${data.company || "не указана"}`);
    console.log(`Сообщение: ${data.message || "не указано"}`);
    console.log("================================");

    // TODO: Integrate with email service (e.g., Resend, SendGrid, Nodemailer)
    // For now, we'll just log the data and return success

    return NextResponse.json({
      success: true,
      message: "Заявка успешно отправлена",
    });
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json(
      { error: "Произошла ошибка при обработке заявки" },
      { status: 500 }
    );
  }
}
