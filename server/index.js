import 'dotenv/config'
import express from 'express'
import OpenAI from 'openai'
import { buildAssistantInstructions } from './ai/assistant.js'

const app = express()
const PORT = Number(process.env.PORT || 3001)

app.use(express.json({ limit: '100kb' }))

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'mariba-assistant',
    mode: process.env.RESTAURANT_DATA_MODE || 'demo',
  })
})

app.post('/api/chat', async (req, res) => {
  try {
    const message = String(req.body?.message || '').trim()
    const previousResponseId = req.body?.previousResponseId || undefined

    if (!message) {
      return res.status(400).json({
        error: 'Mensagem vazia.',
      })
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({
        error: 'OPENAI_API_KEY não configurada no servidor.',
      })
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const request = {
      model: process.env.OPENAI_MODEL || 'gpt-5-mini',
      instructions: buildAssistantInstructions(),
      input: message,
    }

    if (previousResponseId) {
      request.previous_response_id = previousResponseId
    }

    const response = await client.responses.create(request)

    return res.json({
      message: response.output_text || 'Não consegui responder agora.',
      responseId: response.id,
    })
  } catch (error) {
    console.error('Erro em /api/chat:', error)

    return res.status(500).json({
      error: 'Não foi possível falar com o assistente agora.',
    })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor Maribá ativo em http://localhost:${PORT}`)
  console.log(`Teste: http://localhost:${PORT}/api/health`)
})
