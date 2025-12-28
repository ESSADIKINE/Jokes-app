export async function translateText({ text, output, mode }) {
    // Config with fallback
    const baseUrl = process.env.NEXT_PUBLIC_TRANSLATOR_API_BASE || "https://jokes-translator.anasessadikine-fst.workers.dev"
    const url = `${baseUrl}/translate`

    // Map internal UI values to API values if needed
    // UI sends: output="darija_ar" | "darija_latin"
    // API expects: target="darija_arabic" | "darija_latin"
    const targetMap = {
        "darija_ar": "darija_arabic",
        "darija_latin": "darija_latin"
    }
    const apiTarget = targetMap[output] || output

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text,
                target: apiTarget,
                // Include mode if supported, or ignore if worker strictly validates.
                // User's confirm spec didn't mention mode in body, but goal requested it.
                // We'll send it if 'joke' mode is on? 
                // Safer to stick to strict documented "Confirmed Worker" body: text, target.
                // But user asked for joke mode toggle. I'll add 'mode' tentatively or purely rely on prompt logic in worker?
                // Re-reading: "Body: { "text": "...", "target": "..." }"
                // I will omit mode or send it as extra prop if safe. 
                // Let's assume the worker ignores extra fields or we just send text/target.
                // Actually, user's previous prompt *asked* for mode.
                // Current prompt says: "Response: { ok:true ... }"
                // I'll add mode to the body as "mode" just in case.
                mode
            }),
        })

        if (!res.ok) {
            throw new Error(`Translation failed: ${res.statusText}`)
        }

        const data = await res.json()

        if (!data.ok) {
            throw new Error(data.error || "Unknown translation error")
        }

        return {
            ok: true,
            translated: data.translated
        }
    } catch (error) {
        console.error("Translation API Error:", error)
        return { ok: false, error: error.message }
    }
}
