import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  console.log("[publish] API hit");

  try {
    const { name, email, institution, discipline, title, description } = await request.json();
    console.log("[publish] Form data received:", { name, email, institution, discipline });

    if (!name || !email || !institution || !discipline) {
      console.log("[publish] Missing required fields");
      return NextResponse.json(
        { error: "Name, email, institution, and discipline are required." },
        { status: 400 }
      );
    }

    console.log("[publish] Sending to info@writespan.com...");
    const result1 = await resend.emails.send({
      from: "WriteSpan Press <info@writespan.com>",
      to: "info@writespan.com",
      replyTo: email,
      subject: `Textbook author inquiry — ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px 20px;">
          <p style="font-size: 20px; font-weight: 700;">New textbook author inquiry</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Institution:</strong> ${institution}</p>
          <p><strong>Discipline:</strong> ${discipline}</p>
          ${title ? `<p><strong>Working title:</strong> ${title}</p>` : ""}
          ${description ? `<p><strong>Description:</strong><br>${description}</p>` : ""}
        </div>
      `,
    });
    console.log("[publish] Send to info result:", JSON.stringify(result1));

    if (result1.error) {
      console.error("[publish] Resend error:", result1.error);
      return NextResponse.json(
        { error: `Resend error: ${result1.error.message || JSON.stringify(result1.error)}` },
        { status: 500 }
      );
    }

    console.log("[publish] Sending confirmation to professor...");
    const result2 = await resend.emails.send({
      from: "WriteSpan Press <info@writespan.com>",
      to: email,
      subject: "We received your textbook author inquiry",
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 32px 20px;">
          <p style="font-size: 20px; font-weight: 700;">Thank you, ${name}.</p>
          <p>We received your interest in publishing a textbook with WriteSpan Press. One of us will reach out within a few days.</p>
          <p>Talk soon,<br><strong>WriteSpan Press</strong></p>
        </div>
      `,
    });
    console.log("[publish] Confirmation result:", JSON.stringify(result2));

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[publish] Caught error:", err);
    console.error("[publish] Error message:", err?.message);
    console.error("[publish] Error stack:", err?.stack);
    return NextResponse.json(
      { error: `Server error: ${err?.message || "unknown"}` },
      { status: 500 }
    );
  }
}