import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CriticalThinkingHub from './CriticalThinkingHub.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <CriticalThinkingHub />
    </StrictMode>,
)
