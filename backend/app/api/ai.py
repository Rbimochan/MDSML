from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
import os
from anthropic import Anthropic

from app.models.db import get_db
from app.models.user import User
from app.api.deps import get_current_user
from app.config import settings

router = APIRouter()

# Initialize Anthropic client
client = Anthropic() if settings.CLAUDE_API_KEY else None

@router.post("/ai/chat")
async def ai_chat(
    message: dict,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Chat with Claude AI tutor for learning support."""
    
    if not client or not settings.CLAUDE_API_KEY:
        raise HTTPException(
            status_code=503,
            detail="AI service is not configured. Please set CLAUDE_API_KEY."
        )
    
    user_message = message.get("message", "")
    context = message.get("context", "general")
    
    if not user_message:
        raise HTTPException(status_code=400, detail="Message is required")
    
    try:
        # Build system prompt based on context
        system_prompt = """You are Tex, an intelligent math tutor for MDSML (Math-Driven Machine Learning).
Your role is to:
1. Help students understand mathematical concepts deeply
2. Ask Socratic questions to guide learning
3. Connect concepts to real ML applications
4. Provide hints without giving away answers
5. Be encouraging and supportive

Keep responses concise (1-2 sentences) and in friendly tone."""

        if context == "learning_math_ml":
            system_prompt += "\nFocus on making connections between math and machine learning applications."
        
        # Call Claude API
        response = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=150,
            system=system_prompt,
            messages=[
                {"role": "user", "content": user_message}
            ]
        )
        
        ai_response = response.content[0].text
        
        return {
            "response": ai_response,
            "user_message": user_message
        }
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI service error: {str(e)}"
        )
