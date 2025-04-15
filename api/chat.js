export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
  
    const { message } = req.body;
    const HUGGING_FACE_TOKEN = process.env.HUGGING_FACE_TOKEN; // Set in Vercel dashboard
    
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/google/flan-t5-small",
        {
          headers: {
            "Authorization": `Bearer ${HUGGING_FACE_TOKEN}`,
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            inputs: `Answer about Vicky Kumar: ${message}`
          })
        }
      );
      
      if (!response.ok) {
        throw new Error("API request failed");
      }
      
      const result = await response.json();
      return res.status(200).json({ text: result[0].generated_text });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Failed to connect to AI service" });
    }
  }